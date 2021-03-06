import React, { useState } from "react";
import { Badge, Alert, Container, Row, Col, Spinner } from "react-bootstrap";
import { parseDate } from "../../utils/helpers/date";
import useFetchingData from "../../utils/hooks/use-fetching-data";
import WeatherRestClient from "../../services/weather-rest-client";
import WeatherStaticResourceClient from "../../services/weather-static-resource-client";
import SuggestionSearch from "../suggestion-search";
import WeatherInfo from "./weather-info";
import { DAYS_OF_WEEK } from "../../constants";

const DEBOUNCE_LOCATION_SUGGESTION_LOADING_TIME_IN_MS = 500;
const MAXIMUM_SEARCHING_DAY_COUNT = 5;

function loadLocationSuggestions(keyword) {
  return WeatherRestClient.searchLocation(keyword);
}

async function loadWeatherInfo({ woeid }) {
  const { consolidated_weather: weatherInfoList } =
    await WeatherRestClient.searchWeatherInformation(woeid);

  return weatherInfoList
    .splice(Math.max(weatherInfoList.length - MAXIMUM_SEARCHING_DAY_COUNT, 0))
    .map((dailyInfo) => {
      const {
        id,
        weather_state_name: weatherStateName,
        weather_state_abbr: weatherAbbr,
        applicable_date: applicableDate,
        min_temp: minTemp,
        max_temp: maxTemp,
        wind_speed: winSpeed,
        humidity,
        predictability,
      } = dailyInfo;

      return {
        key: id,
        id,
        weatherStateName,
        weatherImagePath:
          WeatherStaticResourceClient.getWeatherStateImagePath(weatherAbbr),
        minTemp: Math.floor(minTemp),
        maxTemp: Math.floor(maxTemp),
        winSpeed: Math.floor(winSpeed),
        humidity,
        predictability,
        ...parseDate(applicableDate),
      };
    });
}

function Main() {
  const [location, setLocation] = useState(null);

  function handleSearchWeatherInfo(location) {
    setLocation(location);
  }

  const {
    loading,
    hasError,
    data: dailyWeatherInfoList,
  } = useFetchingData(location, loadWeatherInfo);

  const todayWeatherInfo = dailyWeatherInfoList && dailyWeatherInfoList[0];

  return (
    <>
      <SuggestionSearch
        disabled={loading}
        placeholder="Type a location"
        onSearch={handleSearchWeatherInfo}
        handleLoadSuggestions={loadLocationSuggestions}
        renderSuggestion={({ title }) => <span>{title}</span>}
        suggestionKeyAttribute="woeid"
        debounceSuggestionLoadingTimeInMs={
          DEBOUNCE_LOCATION_SUGGESTION_LOADING_TIME_IN_MS
        }
      />
      {location ? (
        <div className="main__section">
          <h3 className="main__header-title center">
            {loading && (
              <p>
                Fetching weather information for{" "}
                <Badge bg="secondary">{location.title}</Badge> ...
              </p>
            )}
          </h3>
          {!loading && todayWeatherInfo && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ textAlign: "left", marginRight: 40 }}>
                <p className="main__text--large white-text">{location.title}</p>
                <p className="main__text--small white-text">
                  {DAYS_OF_WEEK[todayWeatherInfo.dayOfWeek]}{" "}
                  {todayWeatherInfo.date}
                </p>
                <p className="main__text--small white-text">
                  {todayWeatherInfo.weatherStateName}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  style={{ marginRight: 10, height: 70 }}
                  src={todayWeatherInfo.weatherImagePath}
                />
                <div style={{ marginRight: 10 }}>
                  <p className="main__text--small white-text">
                    Predictability: {todayWeatherInfo.predictability}%
                  </p>
                  <p className="main__text--small white-text">
                    Humidity: {todayWeatherInfo.humidity}%
                  </p>
                  <p className="main__text--small white-text">
                    Win speed: {todayWeatherInfo.winSpeed}mph
                  </p>
                </div>
              </div>
            </div>
          )}
          <Container>
            <Row className="justify-content-md-center">
              {loading ? (
                <Spinner animation="border" />
              ) : hasError ? (
                <Alert variant="danger">
                  Unexpected errors happen! Please try again!
                </Alert>
              ) : (
                dailyWeatherInfoList &&
                dailyWeatherInfoList.length &&
                dailyWeatherInfoList.map(({ key, ...props }, index = 0) => (
                  <Col
                    className="card__item"
                    aria-selected={index === 0}
                    key={key}
                    sm="12"
                    md
                  >
                    <WeatherInfo {...props} />
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </div>
      ) : (
        <Alert className="main__section" variant="secondary">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            This is where you can search for the weather information of all over
            the world by typing the location on the above input field.
          </p>
          <hr />
          <p className="mb-0">Have a good day!</p>
        </Alert>
      )}
    </>
  );
}

export default Main;

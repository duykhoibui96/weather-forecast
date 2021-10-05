import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherRestClient from "../../../services/weather-rest-client";
import MainWeatherForecastContent from "../main";

function renderComponent() {
  render(<MainWeatherForecastContent />);
}

const SEARCHING_KEYWORD = "Ho Chi Minh";
const PLACEHOLDER = "Type a location";
const MOCK_SEARCH_LOCATION_RESPONSE = [
  {
    latt_long: "10.759180,106.662498",
    location_type: "City",
    title: "Ho Chi Minh City",
    woeid: 1252431,
  },
];
const MOCK_SEARCH_WEATHER_INFORMATION = {
  consolidated_weather: [
    {
      id: 4881651424296960,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "SE",
      created: "2021-10-05T16:39:46.578490Z",
      applicable_date: "2021-10-05",
      min_temp: 24.23,
      max_temp: 31.07,
      the_temp: 30.045,
      wind_speed: 3.208252654436756,
      wind_direction: 145.89574420147287,
      air_pressure: 1006.5,
      humidity: 78,
      visibility: 10.224041597073093,
      predictability: 77,
    },
    {
      id: 5405424388931584,
      weather_state_name: "Light Rain",
      weather_state_abbr: "lr",
      wind_direction_compass: "W",
      created: "2021-10-05T16:39:49.672687Z",
      applicable_date: "2021-10-06",
      min_temp: 23.905,
      max_temp: 28.78,
      the_temp: 28.14,
      wind_speed: 4.199989320056205,
      wind_direction: 268.7437629131723,
      air_pressure: 1005.5,
      humidity: 84,
      visibility: 7.5095815437843,
      predictability: 75,
    },
    {
      id: 5696351221317632,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "W",
      created: "2021-10-05T16:39:52.573026Z",
      applicable_date: "2021-10-07",
      min_temp: 23.6,
      max_temp: 29.04,
      the_temp: 28.65,
      wind_speed: 6.847168129391022,
      wind_direction: 275.6683322396841,
      air_pressure: 1004.5,
      humidity: 83,
      visibility: 8.86354937166945,
      predictability: 77,
    },
    {
      id: 4901761492975616,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "W",
      created: "2021-10-05T16:39:56.260497Z",
      applicable_date: "2021-10-08",
      min_temp: 23.165,
      max_temp: 29.689999999999998,
      the_temp: 28.86,
      wind_speed: 8.783174377173308,
      wind_direction: 260.84306305237976,
      air_pressure: 1005.5,
      humidity: 83,
      visibility: 11.01225095442615,
      predictability: 77,
    },
    {
      id: 6684691915603968,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "WSW",
      created: "2021-10-05T16:39:58.641863Z",
      applicable_date: "2021-10-09",
      min_temp: 23.365000000000002,
      max_temp: 28.82,
      the_temp: 28.759999999999998,
      wind_speed: 9.151689975293618,
      wind_direction: 255.84028347666344,
      air_pressure: 1007.0,
      humidity: 83,
      visibility: 9.852772309711286,
      predictability: 77,
    },
    {
      id: 5342548995342336,
      weather_state_name: "Heavy Rain",
      weather_state_abbr: "hr",
      wind_direction_compass: "W",
      created: "2021-10-05T16:40:02.866264Z",
      applicable_date: "2021-10-10",
      min_temp: 24.34,
      max_temp: 30.205,
      the_temp: 28.54,
      wind_speed: 6.204014753837588,
      wind_direction: 265.5,
      air_pressure: 1008.0,
      humidity: 85,
      visibility: 8.64451602640579,
      predictability: 77,
    },
  ],
  time: "2021-10-05T23:49:32.525218+07:00",
  sun_rise: "2021-10-05T05:42:02.327165+07:00",
  sun_set: "2021-10-05T17:41:22.414927+07:00",
  timezone_name: "LMT",
  parent: {
    title: "Vietnam",
    location_type: "Country",
    woeid: 23424984,
    latt_long: "15.974210,107.868042",
  },
  sources: [
    {
      title: "BBC",
      slug: "bbc",
      url: "http://www.bbc.co.uk/weather/",
      crawl_rate: 360,
    },
    {
      title: "Forecast.io",
      slug: "forecast-io",
      url: "http://forecast.io/",
      crawl_rate: 480,
    },
    {
      title: "Met Office",
      slug: "met-office",
      url: "http://www.metoffice.gov.uk/",
      crawl_rate: 180,
    },
    {
      title: "OpenWeatherMap",
      slug: "openweathermap",
      url: "http://openweathermap.org/",
      crawl_rate: 360,
    },
    {
      title: "World Weather Online",
      slug: "world-weather-online",
      url: "http://www.worldweatheronline.com/",
      crawl_rate: 360,
    },
  ],
  title: "Ho Chi Minh City",
  location_type: "City",
  woeid: 1252431,
  latt_long: "10.759180,106.662498",
  timezone: "Asia/Ho_Chi_Minh",
};

describe("MainWeatherForecast", () => {
  beforeEach(() => {
    WeatherRestClient.searchLocation = jest
      .fn()
      .mockReturnValue(MOCK_SEARCH_LOCATION_RESPONSE);
    WeatherRestClient.searchWeatherInformation = jest
      .fn()
      .mockReturnValue(MOCK_SEARCH_WEATHER_INFORMATION);
  });

  it("should fetching location info when typing in the search field", async () => {
    renderComponent();

    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: SEARCHING_KEYWORD } });

    await waitFor(() => {
      expect(WeatherRestClient.searchLocation).toHaveBeenCalledWith(
        SEARCHING_KEYWORD
      );
    });
  });

  it("should display locations after fetching location info", async () => {
    renderComponent();

    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: SEARCHING_KEYWORD } });

    await waitFor(() => {
      expect(WeatherRestClient.searchLocation).toHaveBeenCalledWith(
        SEARCHING_KEYWORD
      );
    });

    MOCK_SEARCH_LOCATION_RESPONSE.forEach(({ title }) =>
      expect(screen.getByLabelText("suggestion", { text: title })).toBeVisible()
    );
  });

  it("should hide suggestions when start fetching weather information", async () => {
    renderComponent();

    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: SEARCHING_KEYWORD } });

    await waitFor(() => {
      expect(WeatherRestClient.searchLocation).toHaveBeenCalledWith(
        SEARCHING_KEYWORD
      );
    });

    const searchButton = screen.getByLabelText("submit-button");
    fireEvent.click(searchButton);

    expect(screen.queryByLabelText("search-suggestion-wrapper")).toBeNull();
  });

  it("should fetching weather information after selecting a location", async () => {
    renderComponent();

    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: SEARCHING_KEYWORD } });

    await waitFor(() => {
      expect(WeatherRestClient.searchLocation).toHaveBeenCalledWith(
        SEARCHING_KEYWORD
      );
    });

    const searchButton = screen.getByLabelText("submit-button");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(WeatherRestClient.searchWeatherInformation).toHaveBeenCalledWith(
        MOCK_SEARCH_LOCATION_RESPONSE[0].woeid
      );
    });
  });

  it("should display weather information after fetching data", async () => {
    renderComponent();

    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: SEARCHING_KEYWORD } });

    await waitFor(() => {
      expect(WeatherRestClient.searchLocation).toHaveBeenCalledWith(
        SEARCHING_KEYWORD
      );
    });

    const searchButton = screen.getByLabelText("submit-button");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(WeatherRestClient.searchWeatherInformation).toHaveBeenCalledWith(
        MOCK_SEARCH_LOCATION_RESPONSE[0].woeid
      );
    });

    MOCK_SEARCH_WEATHER_INFORMATION.consolidated_weather.forEach(({ id }) => {
      expect(screen.getByLabelText(`weather-info-${id}`)).toBeVisible();
    });
  });
});

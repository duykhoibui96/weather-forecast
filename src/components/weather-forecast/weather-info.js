import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { DAYS_OF_WEEK } from "../../constants";

function WeatherInfo(props) {
  const {
    dayOfWeek,
    date,
    weatherStateName,
    weatherImagePath,
    minTemp,
    maxTemp,
  } = props;
  return (
    <Card border="light">
      <Card.Body className="center">
        <Card.Title>{DAYS_OF_WEEK[dayOfWeek]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
      </Card.Body>
      <Card.Body className="center">
        <Card.Img variant="top" src={weatherImagePath} />
        <Card.Subtitle className="mt-3 text-muted">
          {weatherStateName}
        </Card.Subtitle>
        <div>
          <span style={{ marginRight: 10 }}>
            <b>{maxTemp} &#8451;</b>
          </span>
          <span className="text-muted">{minTemp} &#8451;</span>
        </div>
      </Card.Body>
    </Card>
  );
}

WeatherInfo.propTypes = {
  dayOfWeek: PropTypes.oneOf(Object.keys(DAYS_OF_WEEK)).isRequired,
  date: PropTypes.string.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  weatherStateName: PropTypes.string.isRequired,
  weatherImagePath: PropTypes.string.isRequired,
};

export default WeatherInfo;

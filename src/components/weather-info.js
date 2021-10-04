import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { DAYS_IN_WEEK } from '../constants'

function WeatherInfo(props) {
    const { dayInWeek, date, weatherStateName, weatherImagePath, minTemp, maxTemp } = props
    return (
        <Card border='light' style={{ width: '18rem' }}>
            <Card.Body style={{ textAlign: 'center' }}>
                <Card.Title>{DAYS_IN_WEEK[dayInWeek]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
            </Card.Body>
            <Card.Body style={{ textAlign: 'center' }}>
                <Card.Img variant='top' src={weatherImagePath}/>
                <Card.Subtitle className="mt-3 text-muted">{weatherStateName}</Card.Subtitle>
                <div>
                    <span style={{marginRight: 10, fontWeight: 'bold'}}>{maxTemp} &#8451;</span>
                    <span>{minTemp} &#8451;</span>
                </div>
            </Card.Body>
        </Card>
    )
};

WeatherInfo.propTypes = {
    dayInWeek: PropTypes.oneOf(Object.keys(DAYS_IN_WEEK)).isRequired,
    date: PropTypes.string.isRequired,
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
    weatherStateName: PropTypes.string.isRequired,
    weatherImagePath: PropTypes.string.isRequired
};

export default WeatherInfo;


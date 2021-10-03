import React from 'react'
import PropTypes from 'prop-types'
import { DAYS_IN_WEEK } from '../constants'

function WeatherInfo(props) {
    const { day, date, minTemp, maxTemp } = props
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{DAYS_IN_WEEK[day]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
                <Card.Text>{minTemp}</Card.Text>
                <Card.Text>{maxTemp}</Card.Text>
            </Card.Body>
        </Card>
    )
}

WeatherInfo.propTypes = {
    day: PropTypes.oneOf(Object.keys(DAYS_IN_WEEK)).isRequired,
    date: PropTypes.string.isRequired,
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired
}

export default WeatherInfo


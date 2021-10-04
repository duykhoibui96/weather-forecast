import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { DAYS_IN_WEEK } from '../constants'
import WeatherRestClient from '../services/weather-rest-client'
import WeatherStaticResourceClient from '../services/weather-static-resource-client'
import AutoSuggestionSearch from './auto-suggestion-search'
import WeatherInfo from './weather-info'

function WeatherForecast() {
    const [loading, setloading] = useState(false)
    const [location, setLocation] = useState(null)
    const [dailyWeatherInfoList, setDailyWeatherInfoList] = useState([])

    function loadLocationSuggestions(keyword) {
        return WeatherRestClient.searchLocation(keyword);
    }

    function formatLocation(location) {
        return {
            ...location,
            key: location.woeid
        };
    }

    async function handleSearchWeatherInfo(location) {
        setLocation(location)
        setloading(true)
        setDailyWeatherInfoList([])

        const { woeid } = location
        const { consolidated_weather: weatherInfoList } = await WeatherRestClient.searchWeatherInformation(woeid)

        setDailyWeatherInfoList(weatherInfoList.map((dailyInfo) => {
            const { 
                id: key,
                weather_state_name: weatherStateName,
                weather_state_abbr: weatherAbbr,
                applicable_date: applicableDate,
                min_temp: minTemp,
                max_temp: maxTemp
            } = dailyInfo

            const dateObj = new Date(applicableDate)
            const date = `${dateObj.getDate()}/${dateObj.getMonth()}`
            const dayInWeek = Object.keys(DAYS_IN_WEEK)[dateObj.getDay()]

            return {
                key,
                weatherStateName,
                weatherImagePath: WeatherStaticResourceClient.getWeatherStateImagePath(weatherAbbr),
                dayInWeek,
                date,
                minTemp: Math.floor(minTemp),
                maxTemp: Math.floor(maxTemp)
            }
        }))
        setloading(false)
    }

    return (
        <div style={{ margin: 100, padding: 50 }}>
            <AutoSuggestionSearch
                disabled={loading}
                placeholder='Searching for a city'
                onSearch={handleSearchWeatherInfo}
                handleLoadSuggestions={loadLocationSuggestions}
                formatSuggestion={formatLocation}
            />
            {
                location && (
                    <h3 style={{ marginTop: 10 }}>
                    {
                        loading
                        ? <p>Fetching weather information for city <Badge bg='secondary'>{location.title}</Badge> ...</p>
                        : <p>Weather information of <Badge bg='secondary'>{location.title}</Badge></p>
                    }
                    </h3>
                )
            }
            <div style={{ display: 'flex' }}>
            {
                dailyWeatherInfoList.map(({key, ...props}) => (
                    <WeatherInfo key={key} {...props} />
                ))
            }
            </div>
        </div>
    )
}

export default WeatherForecast

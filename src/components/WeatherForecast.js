import React, { useState } from 'react'
import loadWeatherInfoByLocationId from '../services/loadWeatherInfoByLocationId'
import SearchForm from './SearchForm'

function WeatherForecast() {
    const [searchingDisabled, setSearchingDisabled] = useState(false)
    const [weatherInfoList, setWeatherInfoList] = useState([])

    async function handleSearchWeatherInformation(locationCode) {
        setSearchingDisabled(true)
        const data = await loadWeatherInfoByLocationId(locationCode)
        setSearchingDisabled(false)
        setWeatherInfoList(data)
    }

    return (
        <div style={{margin: 100, padding: 50}}>
            <SearchForm
                disabled={searchingDisabled}
                onSearchWeatherInformation={handleSearchWeatherInformation}
            />
        </div>
    )
}

export default WeatherForecast

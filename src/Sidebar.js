// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import styled from 'styled-components'
import getSelectedLocatoinId from './locationGetter'

function Sidebar({selectedLocationId, observationLocations, forecastLocation, queryWeatherForecast}) {
    const id = getSelectedLocatoinId(selectedLocationId)
    const [infoToFetch, setInfoToFetch] = useState(null)
    const [foreCastNextHour, setForeCastNextHour] = useState(1)

    // eslint-disable-next-line no-console
    console.log('hello')
    const loc = observationLocations.find(loc => loc.info.id === id)
    
    // eslint-disable-next-line no-unused-vars
    const WeatherForecast = () => {
        var timePairArr = []
        var weatherData = null
        switch (infoToFetch) {
        case 'temperature':
            weatherData = forecastLocation !== null ? forecastLocation.data.temperature.timeValuePairs : null
            timePairArr = forecastLocation !== null ? weatherData : []
            break
        case 'windspeedms':
            weatherData = forecastLocation !== null ? forecastLocation.data.windspeedms.timeValuePairs : null
            timePairArr = forecastLocation !== null ? weatherData : []
            break
        default:
            return
        }
        timePairArr.map(timepair => timepair.time = new Date(timepair.time).toLocaleDateString('fi-FI').concat(': ').concat(new Date(timepair.time).toLocaleTimeString('fi-FI')))
        return (
            <div>
                <h4>Weather forecast for place 
                    <br />{forecastLocation.info.name}</h4>
                <h3>{infoToFetch}</h3>
                {timePairArr.map(observation =>
                    <div>Time : {observation.time} <br /> Value : {observation.value}</div>)}
                <br />
            </div>
        )
    }

    return <div>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
        {forecastLocation && <button onClick={() => setInfoToFetch('temperature')}>See forecast for air temperature</button>}
        <br />
        {forecastLocation &&<button onClick={() => setInfoToFetch('windspeedms')}>See forecast for wind speed</button>}
        <br />
        {infoToFetch !== null && <button onClick={() => {
            setForeCastNextHour(foreCastNextHour + 1)
            queryWeatherForecast(forecastLocation, foreCastNextHour - 1, foreCastNextHour)}
        }>Forecast for next hour</button>}
        {infoToFetch !== null && <button onClick={() => {
            setForeCastNextHour(foreCastNextHour  - 1)
            queryWeatherForecast(forecastLocation, foreCastNextHour - 2, foreCastNextHour)}
        }>Go back 1 hour</button>}      
        {infoToFetch !== null && <WeatherForecast />} 
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`

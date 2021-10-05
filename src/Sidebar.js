import React, { useState } from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';

function Sidebar({selectedLocationId, observationLocations, forecastLocation}) {
    const id = getSelectedLocatoinId(selectedLocationId);
    const [infoToFetch, setInfoToFetch] = useState(null)

    const loc = observationLocations.find(loc => loc.info.id === id)
    
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
        }
        timePairArr.map(timepair => timepair.time = new Date(timepair.time).toLocaleDateString('fi-FI').concat(": ").concat(new Date(timepair.time).toLocaleTimeString('fi-FI')))
        return (
            <div>
                <h4>Weather forecast for place {forecastLocation.info.name}</h4>
                <h3>{infoToFetch}</h3>
                {timePairArr.map(observation =>
                    <div>Time : {observation.time} <br /> Temperature : {observation.value}</div>)}}
            </div>
        )
    }

    return <div>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
        {forecastLocation && <button onClick={() => setInfoToFetch('temperature')}>See forecast for air temperature</button>}
        <br />
        {forecastLocation &&<button onClick={() => setInfoToFetch('windspeed')}>See forecast for wind speed</button>}
        {infoToFetch !== null && <WeatherForecast />}
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;
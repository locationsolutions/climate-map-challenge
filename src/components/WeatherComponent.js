import React from 'react'
import styled from 'styled-components'

const StyledWeather = styled.div`
    background-color: green;
    position: absolute;
    top: 30%;
    bottom: 5%;
    border: 1px solid green;
    width: 300px;
    height: 100vh;
    text-align: center;
    color: #FFF;
`
const StyledH2 = styled.h2`
    font-weight: bold;
    font-size: 14px;
`

const StyledTable = styled.table`
    margin: 10px auto;
    border: 0.5px solid #FFF;
    color: #FFF;
    padding: 5px;
    font-size: 12px;
`

const DEFAULT_WELCOME_TEXT = 'Please select a location by double clicking to the marker!'
function WeatherComponent ({loc, observationLocationSize}) {
    console.info(JSON.stringify(loc, null, 4))
    return (
        <StyledWeather>
            <StyledH2>Realtime weather</StyledH2>
            {
                (loc) ? (
                    <StyledTable>
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>{loc.info.name}</td>
                            </tr>
                            <tr>
                                <th>Region:</th>
                                <td>{loc.info.region}</td>
                            </tr>
                            <tr>
                                <th>{loc.data.t.property.label}</th>
                                <td>{loc.data.t.timeValuePairs.find( pair => Math.min(pair.time)).value}</td>
                            </tr>
                            <tr>
                                <th>{loc.data.ws_10min.property.label}</th>
                                <td>{loc.data.ws_10min.timeValuePairs.find( pair => Math.min(pair.time)).value}</td>
                            </tr>
                            <tr>
                                <th>{loc.data.td.property.label}</th>
                                <td>{loc.data.td.timeValuePairs.find( pair => Math.min(pair.time)).value}</td>
                            </tr>
                            <tr>
                                <th>{loc.data.snowdepth.property.label}</th>
                                <td>{loc.data.snowdepth.timeValuePairs.find( pair => Math.min(pair.time)).value}</td>
                            </tr>
                            <tr>
                                <th>{loc.data.r_1h.property.label}</th>
                                <td>{loc.data.r_1h.timeValuePairs.find( pair => Math.min(pair.time)).value}</td>
                            </tr>
                        </tbody>

                    </StyledTable>
                ) : (
                    <div>
                       <p>
                       {
                         (observationLocationSize > 0)? (`${observationLocationSize} locations are available for checking weather. ${DEFAULT_WELCOME_TEXT}`) : ('Data is fetching...')
                       }
                       </p>
                    </div>
                )
            }
        </StyledWeather>
    )
}

export default WeatherComponent

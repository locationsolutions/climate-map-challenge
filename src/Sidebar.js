// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line no-unused-vars
import { Paper, Button, TableContainer, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
// eslint-disable-next-line no-unused-vars
//import { makeStyles } from '@material-ui/core/styles'

function Sidebar({forecastLocation, queryWeatherForecast}) {
    const [infoToFetch, setInfoToFetch] = useState(null)
    const [foreCastNextHour, setForeCastNextHour] = useState(1)

    /*
    const useStyles = makeStyles({
        table: {
            display: 'flex',
            padding: '10px',
            borderWidth: '1px',
            position: 'absolute',
        }
    })
    */

    //const classes = useStyles()
    
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
                <h4>Weather forecast for place <br /> {forecastLocation.info.name}</h4>
                <h3>{infoToFetch}</h3>
                <TableContainer component={Paper} aria-label='spanning table'>
                    <Table sx={{ minWidth: 50 }}>
                        <TableBody>
                            {timePairArr.map((observation) =>
                                <TableRow
                                    key={observation.time}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        Time: {observation.time} Value : {observation.value}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>      

        )
    }

    return <div>
        {forecastLocation && <Button variant='outlined' onClick={() => setInfoToFetch('temperature')}>Temperature forecast</Button>}
        <br />
        {forecastLocation &&<Button variant='outlined' onClick={() => setInfoToFetch('windspeedms')}>Wind speed forecast</Button>}
        <br />
        {infoToFetch !== null && <Button variant='outlined' onClick={() => {
            setForeCastNextHour(foreCastNextHour + 1)
            queryWeatherForecast(forecastLocation, foreCastNextHour - 1, foreCastNextHour)}
        }>Next hour</Button>}
        {infoToFetch !== null && <Button variant='outlined' onClick={() => {
            setForeCastNextHour(foreCastNextHour  - 1)
            queryWeatherForecast(forecastLocation, foreCastNextHour - 2, foreCastNextHour)}
        }>Go back 1 hour</Button>}      
        {infoToFetch !== null && <WeatherForecast />} 
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`

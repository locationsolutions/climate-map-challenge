import React from 'react';
import getSelectedLocatoinId from './locationGetter';
import Extremes from './Extremes'

export const styles = {
    container: {
        padding: '1em 2em',
        width: '400px',
        boxSizing: 'border-box',
    },
	redDot: {
		height: '1.5em',
		width: '1.5em',
		backgroundColor: '#FFA07A',
		borderRadius: '50%',
		display: 'inline-block',
        marginRight: '0.3em'
	},
	blueDot: {
		height: '1.5em',
		width: '1.5em',
		backgroundColor: '#87CEEB',
		borderRadius: '50%',
		display: 'inline-block',
        marginRight: '0.3em'
	},
	centered: {
		display: 'flex',
        alignItems: 'center',
        padding: '2px'
	},
    button: {
		backgroundColor: '#ffffff',
        border: 'none',
        color: '#008CBA',
		textAlign: 'left',
        fontSize: '1em',
        fontWeight: 'bold',
	}
}

function Sidebar({selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);
    const loc = observationLocations.find(loc => loc.info.id === id);
    let maxTemp = null
    let minTemp = null
    let startTime = null
    let endTime = null
    let tempList = []
    let tempNow = null
    let dateTimeNow = null    
    let maxTime = null
    let minTime = null
    let avgTemp = null
    let smallDate = {
        day: 'numeric', month: 'numeric', hour: '2-digit'
    }  
    let dateOptions = {  
        weekday: 'long', month: 'numeric',  
        day: 'numeric', hour: '2-digit', minute: '2-digit'  
    };
    
    if (loc && loc.data) {
        const tempData = loc.data.t.timeValuePairs
        maxTemp = tempData[0].value
        minTemp = tempData[0].value
        startTime = new Date(tempData[0].time).toLocaleTimeString('fi-FI', smallDate)
        endTime = new Date(tempData[tempData.length-1].time).toLocaleTimeString('fi-FI', smallDate)
        let i = 0
        while (i < tempData.length) {
            let t = tempData[i].value
            if (!isNaN(t)) {
                tempList.push(t)
                tempNow = t
                dateTimeNow = new Date(tempData[i].time).toLocaleString('fi-FI', dateOptions)
                if (t >= maxTemp) {
                    maxTemp = t
                    maxTime = dateTimeNow
                }
                if (t <= minTemp) {
                    minTemp = t
                    minTime = dateTimeNow
                } 
            }
            i++
        }
        avgTemp = (tempList.reduce((a,b) => (a+b)) / tempList.length).toFixed(1);
    }
    if (loc) {
        return <div style={styles.container}>
            <h3>Suomen sääasemien lämpötilahavainnot 24h ajalta tasatunnein</h3>
            <div style={styles.centered}>
                <span style={styles.blueDot}></span> Lämpötila alle 0 °C
            </div>
            <div style={styles.centered}>
                <span style={styles.redDot}></span> Lämpötila yli 0 °C
            </div>
            <h4>{loc.info.name}</h4>
            <p>Uusin havainto {dateTimeNow}
                <br/>
                Lämpötila: <b>{tempNow} °C</b>
            </p>
            <p>Keskilämpötila 24h: <b>{avgTemp} °C</b>
                <br/><i>Havainnot {startTime} - {endTime}</i>
            </p>
            <p>Lämpimin hetki asemalla 
                <br/>{maxTime}
                <br/>Lämpötila: <b>{maxTemp} °C</b>
            </p>
            <p>Kylmin hetki asemalla 
                <br/>{minTime}
                <br/>Lämpötila: <b>{minTemp} °C</b>
            </p>
            <h4>Yksittäisen aseman tiedot näet tuplaklikkaamalla sääasemaa kartalla</h4>
        </div>        
    } else {
        return <div style={styles.container}>        
            <h3>Suomen sääasemien lämpötilahavainnot 24h ajalta tasatunnein</h3>
            <div style={styles.centered}>
                <span style={styles.blueDot}></span> Lämpötila alle 0 °C
            </div>
            <div style={styles.centered}>
                <span style={styles.redDot}></span> Lämpötila yli 0 °C
            </div>
            <Extremes observationLocations={observationLocations} />
            <h4>Yksittäisen aseman tiedot näet tuplaklikkaamalla sääasemaa kartalla</h4>
        </div> 
    }
    
}

export default Sidebar

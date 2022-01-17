import React from 'react';

function Extremes({observationLocations}) {
    let locMaxTemp = null
    let locMinTemp = null
    let dateTimeNow = null
    let locMaxTime = null
    let locMinTime = null
    let warmest = null
    let warmestTime = null
    let warmestPlace = null
    let coldest = null
    let coldestTime = null
    let coldestPlace = null
    let dateOptions = {  
        weekday: 'long', month: 'numeric',  
        day: 'numeric', hour: '2-digit', minute: '2-digit'  
    };  
    for (let i in observationLocations) {
        const loc = observationLocations[i]
        if (loc && loc.data) {
            const tempData = loc.data.t.timeValuePairs    
            locMaxTemp = tempData[0].value
            locMinTemp = tempData[0].value
            let i = 0
            while (i < tempData.length) {
                let t = tempData[i].value
                if (!isNaN(t)) {
                    dateTimeNow = new Date(tempData[i].time).toLocaleString('fi-FI', dateOptions)
                    if (t >= locMaxTemp) {
    	                locMaxTemp = t
                        locMaxTime = dateTimeNow
                    }
                    if (t <= locMinTemp) {
                        locMinTemp = t
                        locMinTime = dateTimeNow
                    } 
                }
                i++
            }
            if (locMaxTemp > warmest) {
                warmest = locMaxTemp
                warmestTime = locMaxTime
                warmestPlace = loc.info.name
            }
            if (locMinTemp < coldest) {
                coldest = locMinTemp
                coldestTime = locMinTime
                coldestPlace = loc.info.name
            }
        }  
    }

    return <div>
        <p>Viimeisen 24 tunnin kylmin lämpötila <br/> <b>{coldest} °C</b> 
            <br/> sääasemalla {coldestPlace} 
            <br/> {coldestTime}
        </p>
        <p>Viimeisen 24 tunnin lämpimin lämpötila <br/> <b>{warmest} °C</b>
            <br/> sääasemalla {warmestPlace}
            <br/> {warmestTime}
        </p>
    </div>
}

export default Extremes;
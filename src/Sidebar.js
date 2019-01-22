import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';


function Sidebar({selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);
    return <div>

            { /* // Clicked place and region */}
        <pre><h3>Place: {loc && String(loc.info.name, null, 4)}</h3>
             <h2>Region: {loc && String(loc.info.region, null, 4)}</h2>

            { /* // Closest to current time with data */ }
            <h3>Weather at {loc && String(new Date(loc.data.t.timeValuePairs[24].time).toLocaleTimeString())} </h3>
            <li>Temp: {loc && String(loc.data.t.timeValuePairs[24].value || "no data ")  + String(loc.data.t.property.unit)} </li>
            <li>Snowdepth: {loc && String(loc.data.snowdepth.timeValuePairs[24].value || "no data ") + String(loc.data.snowdepth.property.unit)} </li>

            { /*   // 3 hours from closest current time */ }
            <h3>Weather was at {loc && String(new Date(loc.data.t.timeValuePairs[21].time).toLocaleTimeString())} </h3>
            <li>Temp: {loc && String(loc.data.t.timeValuePairs[21].value || "no data ") + String(loc.data.t.property.unit)} </li>
            <li>Snowdepth: {loc && String(loc.data.snowdepth.timeValuePairs[21].value || "no data ") + String(loc.data.snowdepth.property.unit)} </li>

            { /*   // 6 hours from closest current time */ }
            <h3>Weather was at {loc && String(new Date(loc.data.t.timeValuePairs[18].time).toLocaleTimeString())} </h3>
            <li>Temp: {loc && String(loc.data.t.timeValuePairs[18].value || "no data ") + String(loc.data.t.property.unit)}  </li>
            <li>Snowdepth: {loc && String(loc.data.snowdepth.timeValuePairs[18].value || "no data ") + String(loc.data.snowdepth.property.unit)} </li>

            { /*   // 9 hours from closest current time */ }
            <h3>Weather was at {loc && String(new Date(loc.data.t.timeValuePairs[15].time).toLocaleTimeString())} </h3>
            <li>Temp: {loc && String(loc.data.t.timeValuePairs[15].value || "no data ") + String(loc.data.t.property.unit)}  </li>
            <li>Snowdepth: {loc && String(loc.data.snowdepth.timeValuePairs[15].value || "no data ") + String(loc.data.snowdepth.property.unit)} </li>

        </pre>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;

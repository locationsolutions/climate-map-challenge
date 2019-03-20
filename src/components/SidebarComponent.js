import React from 'react';
import styled from "styled-components";
import getSelectedLocationId from '../utils/LocationGetterUtil';
import WeatherComponent from './WeatherComponent'
import ThemeComponent from './ThemeComponent'

const WrapperSidebar = styled.div`
    display: flex;
    width: 300px;
    height: 100vh;
`;

function SidebarComponent({selectedLocationId, observationLocations, setTheme}) {
    console.log("selectedLocationId: ", selectedLocationId)
    const id = getSelectedLocationId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);
    return (
      <WrapperSidebar>
        {/*<pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>*/}
        <ThemeComponent setTheme={setTheme}/>
        <WeatherComponent loc={loc} observationLocationSize={observationLocations.length}/>
      </WrapperSidebar>
    )
}

export default SidebarComponent;

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

function SidebarComponent({selectedLocationId, observationLocations}) {
    console.log("selectedLocationId: ", selectedLocationId)
    const id = getSelectedLocationId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);
    return (
      <WrapperSidebar>
        {/*<pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>*/}
        <ThemeComponent />
        <WeatherComponent loc={loc}/>
      </WrapperSidebar>
    )
}

export default SidebarComponent;

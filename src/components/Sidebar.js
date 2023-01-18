import React from "react";
import styled from "styled-components";
import getSelectedLocatoinId from "./locationGetter";
import LocationInfo from "./LocationInfo";
import MainInfo from "./Maininfo";

function Sidebar({ selectedLocationId, observationLocations }) {
  const id = getSelectedLocatoinId(selectedLocationId);

  const loc = observationLocations.find((loc) => loc.info.id === id);
  return (
    <div>{loc === undefined ? <MainInfo /> : <LocationInfo loc={loc} />}</div>
  );
}

export default styled(Sidebar)`
  width: 300px;
  height: 100vh;
`;

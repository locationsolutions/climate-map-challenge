import React from "react";
import styled from "styled-components";
import getSelectedLocatoinId from "./locationGetter";
import LocationInfo from "./LocationInfo";
import MainInfo from "./Maininfo";

function Sidebar({ selectedLocationId, observationLocations }) {
  const id = getSelectedLocatoinId(selectedLocationId);

  const loc = observationLocations.find((loc) => loc.info.id === id);

  // TODO: close currently shown location info (to go back to MainInfo)

  return (
    <div className="sidebar">
      {loc === undefined ? (
        <MainInfo allLocations={observationLocations} />
      ) : (
        <LocationInfo loc={loc} />
      )}
    </div>
  );
}

export default styled(Sidebar)`
  width: 500px;
  height: 100vh;
`;

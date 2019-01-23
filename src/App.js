import React, { useState, useEffect } from "react";
import "./style/app.css";

import fetchObservationLocation from "./util/fetchObservationLocations";
import Sidebar from "./containers/Sidebar";
import Map from "./containers/Map";

const App = () => {
  const [observeLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => fetchObservationLocation(setObservationLocations), []);

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="App">
      <Sidebar
        selectedLocation={selectedLocation}
        observeLocations={observeLocations}
        className="sidebar"
        clearSelectedLocation={clearSelectedLocation}
      />
      <Map
        observeLocations={observeLocations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </div>
  );
};

export default App;

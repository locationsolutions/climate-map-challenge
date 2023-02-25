import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MapMain from "./components/MapMain";
import { fetchObservationLocations } from "./api/fetchObservationLocations";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading...");

  const [observationLocations, setObservationLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(
    () =>
      fetchObservationLocations(
        setObservationLocations,
        setLoading,
        setLoadingText
      ),
    []
  );

  const map = (
    <MapMain
      setSelectedLocation={setSelectedLocation}
      observationLocations={observationLocations}
    />
  );

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <span>
            {loadingText.includes("Error") ? (
              <p className="error">{loadingText}</p>
            ) : (
              <p>{loadingText}</p>
            )}
          </span>
        </div>
      ) : null}
      <Sidebar
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
      />
      {map}
    </div>
  );
}

export default App;

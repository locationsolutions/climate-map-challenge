import React, { useState, useEffect } from "react";
import getGeolocation from "../utils/getGeolocation";
import getClosestLocation from "../utils/getClosestLocation";

function MainInfo({ allLocations }) {
  const [closestLocationToUser, setClosestLocationToUser] = useState(null);
  const userLocation = getGeolocation();

  const helpTextLocation = "Please choose a location.";

  let loc = null;
  if (closestLocationToUser !== null) {
    loc = allLocations.find((loc) => loc.info.id === closestLocationToUser.id);
  }

  console.log(closestLocationToUser);

  useEffect(
    (c) => {
      console.log("test:", allLocations, " --- ", userLocation);
      if (userLocation !== null && allLocations.length > 0) {
        setClosestLocationToUser(
          getClosestLocation(
            userLocation,
            mapLocationPositionsWithId(allLocations)
          )
        );
      }
    },
    [userLocation, allLocations]
  );

  return (
    <div className="container">
      <span>
        {closestLocationToUser !== null && loc !== null ? (
          <div className="center">
            <p> Your location:</p>
            <h2 className="move-up">{loc.info.name}</h2>
            <span className="temperature center">
              Latest temperature: <span>{getLatestTemperature(loc)}°C</span>
            </span>
            <p className="info force-bottom">{helpTextLocation}</p>
          </div>
        ) : (
          <div className="center">
            <h2>No Location Data Available!</h2>
            <p className="info force-bottom">{helpTextLocation}</p>
            <p className="warning move-up">
              Please enable location permission.
            </p>
          </div>
        )}
      </span>
    </div>
  );
}

// TODO: move these
function mapLocationPositionsWithId(loc) {
  if (loc === undefined) return;
  const positionsWithId = loc.map((loc) => {
    return {
      id: loc.info.id,
      name: loc.info.name, // for debugging
      latitude: loc.position.lat,
      longitude: loc.position.lon,
    };
  });
  return positionsWithId;
}

// this is too complex... fix this...
function getLatestTemperature(loc) {
  if (!loc || !loc.data || !loc.data.t || !loc.data.t.timeValuePairs)
    return null;

  const latestIndex = loc.data.t.timeValuePairs.length - 1;
  let latestLocationTemperature = null;

  for (let i = latestIndex; i >= 0; i--) {
    if (!isNaN(loc.data.t.timeValuePairs[i].value)) {
      latestLocationTemperature = loc.data.t.timeValuePairs[i].value;
      break;
    }
  }

  if (latestLocationTemperature === NaN || latestLocationTemperature === null) {
    latestLocationTemperature = "N/A";
  }
  return latestLocationTemperature;
}

export default MainInfo;

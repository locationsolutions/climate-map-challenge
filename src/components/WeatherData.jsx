import React, { useState } from "react";

function WeatherData({ weatherData }) {
  const [index, setindex] = useState(0);

  const handleNext = () => {
    if (index === weatherData.precipitation.highAndLowPerDay.length - 1) {
      setindex(0);
    } else {
      setindex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index === 0) {
      setindex(weatherData.precipitation.highAndLowPerDay.length - 1);
    } else {
      setindex(index - 1);
    }
  };

  const currentTemperatureItem =
    weatherData.temperature.highAndLowPerDay[index];
  const currentPrecipitationItem =
    weatherData.precipitation.highAndLowPerDay[index];

  return (
    <div className="center">
      <span className="day force-move-up">{currentTemperatureItem.day}</span>

      <h3>Temperature</h3>
      <div className="data-block">
        <br />

        <div className="item left">
          High:
          <span className="temperature center">
            {isNaN(currentTemperatureItem.high)
              ? "N/A"
              : currentTemperatureItem.high}
            {isNaN(currentTemperatureItem.high)
              ? null
              : weatherData.temperature.units}
          </span>
        </div>
        <br />
        <div className="item right">
          Low:{" "}
          <span className="temperature low center">
            {isNaN(currentTemperatureItem.low)
              ? "N/A"
              : currentTemperatureItem.low}
            {isNaN(currentTemperatureItem.low)
              ? null
              : weatherData.temperature.units}
          </span>
        </div>
      </div>
      <h3>Precipitation</h3>
      <div className="data-block">
        <br />

        <div className="item">
          High:
          <span className="precipitation center">
            {isNaN(currentPrecipitationItem.high)
              ? "N/A"
              : currentPrecipitationItem.high}
            {isNaN(currentPrecipitationItem.high)
              ? null
              : weatherData.precipitation.units}
          </span>
        </div>
        <br />
        <div className="item">
          Low:{" "}
          <span className="precipitation low center">
            {isNaN(currentPrecipitationItem.low)
              ? "N/A"
              : currentPrecipitationItem.low}
            {isNaN(currentPrecipitationItem.low)
              ? null
              : weatherData.precipitation.units}
          </span>
        </div>
      </div>

      <br />
      <div className="buttons">
        <span className="btn left" onClick={handlePrevious}>
          Previous
        </span>
        <span className="btn right" onClick={handleNext}>
          Next
        </span>
      </div>
    </div>
  );
}

export default WeatherData;

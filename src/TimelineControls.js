import React, { useEffect, useState } from "react";

/**
 * Cycles through datapoints at set rate, 250ms
 * Should ultimately implement controllable timeline or slider
 * with start/stop for autoplay
 * @param {*} props | .observationData  | Observation locations, we only really need on location for timestamps
 * @param {*} props | getCurrentDataIndex  | Emits current index to parent
 * @returns styled HTML element, infobox
 */

const TimelineControls = (props) => {
  const [currentDataindex, setCurrentDataIndex] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const [observationData, setObservationData] = useState([
    { time: 0, value: 0 },
  ]);

  if (0 === dataLength && props.observationData.length > 0) {
    setDataLength(props.observationData[0].data.r_1h.timeValuePairs.length);
    setObservationData(props.observationData[0].data.r_1h.timeValuePairs);
    setCurrentDataIndex(0);
  }

  /**
   * Start ticker when we have some datapoints
   */
  if (parseInt(dataLength)) {
    useEffect(
      () => {
        const ticker = setTimeout(() => {
          setCurrentDataIndex((currentDataindex + 1) % dataLength);
          props.getCurrentDataIndex(currentDataindex);
        }, 250);
        return () => {
          clearInterval(ticker);
        };
      },
      [currentDataindex]
    );
  }

  function timestampToDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("fi-FI", options).format(date);
  }

  /**
   * Title and dates if datapoints are loaded
   * otherwise show loading message
   */
  let infobox = "";
  if (parseInt(dataLength)) {
    infobox = <div id="infobox">
        <p className="infobox__title">Datapoints date and time</p>
        <p className="infobox__subtitle">
          (toggle layers from menu on left)
        </p>
        <p className="infobox__date">
          {timestampToDate(observationData[currentDataindex].time)}
        </p>

        <div className="slider slider__container">
          <p>Change time, 1hr increment</p>
          <input type="range" className="slider__controller" min="0" max={dataLength - 1} step="1" value={currentDataindex} name="timeSlider" onChange={(event) => {
              setCurrentDataIndex(parseInt(event.target.value));
              props.getCurrentDataIndex(currentDataindex);
            }} />
        </div>
      </div>;
  } else {
    infobox = (
      <div id="infobox">
        <p>Loading data...</p>
      </div>
    );
  }

  return infobox;
};

export default TimelineControls;

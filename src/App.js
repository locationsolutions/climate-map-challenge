import React, {useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import WeatherMap from "./WeatherMap"
import HeatSlider from "./HeatSlider"
import HeaderText from "./HeaderText"
import IconsToLoaders from "./IconsToLoaders"
import DataGetter from "./DataGetter"
import {chartData, chartOptions} from "./DataSetup"


function App() {
  // Initialize state of application
  // selectedLocation is id of selected location, not the json itself
  const [observationLocations, setObservationLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  //index of date to be used for heatmap, and numerical value for date
  const [dateIndex, setDateIndex] = useState(0);
  const [thisDate, setThisDate] = useState(1604008800000);

  // clickedLocation is the object that has been clicked
  const clickedLocation = observationLocations.find(loc=> loc.info.id === selectedLocation);

  // ugly way of setting up properties. Need to be fixed to useState() and useEffect()
  var timeList = null;
  var valListT = null;
  var valListRain = null;

  // jsons for chart-js-2 properties
  var data = null;
  var options = null;

  // check if loading isn't finished
  const [loading, setLoading] = useState(true);
  const temperatureColor= "#E87C64";
  const rainColor= "#64B8E8";
  const position = [65, 26];

  // change heatmap properties only if data fetch is complete
  if (!(observationLocations.length ===0) && !(observationLocations[0].data=== undefined)) {
    var newdate= observationLocations[0].data.t.timeValuePairs[dateIndex].time;
    if(thisDate!== newdate){
      setThisDate(newdate)
    }
  }

  if (selectedLocation) {
    timeList=  clickedLocation.data.t.timeValuePairs.map(row=> ''+ new Date(row.time));
    valListT = clickedLocation.data.t.timeValuePairs.map(row=> row.value);
    valListRain = clickedLocation.data.r_1h.timeValuePairs.map(row=> row.value);

    data = chartData({timeList:timeList, temperatureColor:temperatureColor, valListT:valListT, rainColor:rainColor, valListRain:valListRain});

    options = chartOptions({timeList:timeList})
  }

  return (
    <div className="App">

      <IconsToLoaders/>

      <DataGetter setLoading = {setLoading} setObservationLocations={setObservationLocations}/>

      <Sidebar selectedLocationId={selectedLocation} observationLocations={observationLocations}/>

      <HeaderText />

      <WeatherMap
        position={position}
        observationLocations={observationLocations}
        selectedLocation={selectedLocation}
        clickedLocation={clickedLocation}
        setSelectedLocation={setSelectedLocation}
        data={data}
        options={options}
        loading={loading}
        dateIndex = {dateIndex}
        thisDate={thisDate}
      />

      <HeatSlider dateIndex = {dateIndex} setDateIndex={setDateIndex}/>

    </div>
  );
}

export default App;

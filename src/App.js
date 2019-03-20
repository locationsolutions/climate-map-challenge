import React, {useEffect, useState} from 'react';
import './App.css';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import SidebarComponent from './components/SidebarComponent';
import MapComponent from './components/MapComponent'
import FetchObservationLocations from './services/FetchObservationLocationsService'


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const THEME_OPTIONS = ['https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
]
function App() {
  const [observationLocations, setObservationLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [defaultTheme, setTheme] = useState(1);

  useEffect(() => FetchObservationLocations(setObservationLocations), []);

  const map = (<MapComponent
                 observationLocations={observationLocations}
                 setSelectedLocation={setSelectedLocation}
                 theme={THEME_OPTIONS[defaultTheme]}
               />);

  return (
    <div className="App">
      <SidebarComponent
          selectedLocationId={selectedLocation}
          observationLocations={observationLocations}
          setTheme={setTheme}
      />
        {map}
    </div>
  );

}

export default App;

import React, {Component} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";


const MapContainer = styled(Map)`
    width: 100vw;
    height: 100vh;
`;


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


class App extends Component {
    constructor() {
        super();

        this.state = {
            observationLocations: []
        }
    }

    componentDidMount() {
        const connection = new Metolib.WfsConnection();
        if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
            connection.getData({
                begin: Date.now() - 60e3 * 60 * 24 * 6,
                end: Date.now(),
                requestParameter: "t,snowdepth,r_1h",
                timestep: 60 * 60 * 1000,
                bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
                callback: (data, errors) => {
                    if (errors.length > 0) {

                        errors.forEach(err => {
                            console.error('FMI API error: ' + err.errorText);
                        });
                        return;
                    }
                    this.setState({
                        observationLocations: data.locations
                            .map(loc => {
                                const [lon, lat] = loc.info.position.map(parseFloat);
                                return {...loc, position: {lat, lon}}
                            })
                    });

                    connection.disconnect();
                }
            });
        }
    }

    render() {

        const position = [65, 26];
        console.log(this.state.observationLocations);
        const map = (
            <MapContainer center={position} zoom={6}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {this.state.observationLocations.map(loc => <Marker position={[loc.position.lat, loc.position.lon]}
                                                                    key={loc.info.id}>
                </Marker>)}
            </MapContainer>
        );

        return (
            <div className="App">
                {map}
            </div>
        );
    }
}

export default App;

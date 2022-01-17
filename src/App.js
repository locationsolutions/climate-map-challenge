import React, { useEffect, useState } from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import { Map, Marker, Popup, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';
import Sidebar from './Sidebar';

const MapContainer = styled(Map)`
	width: calc(100vw - 400px);
	height: 100vh;
	position:absolute;
	top:0px;
	left:400px;
`;

const markerHtmlStyles = `
	width: 1.5rem;
	height: 1.5rem;
	display: block;
	left: -1rem;
	top: -1rem;
	position: relative;
	border-radius: 3rem 3rem 0;
	transform: rotate(45deg);
	border: 1px solid #FFFFFF;
	background-color:`

const red = '#FFA07A'
const blue = '#87CEEB'

const iconProps = {
	className: 'custom-pin',
	iconAnchor: [0, 24],
	labelAnchor: [-6, 0],
	popupAnchor: [0, -36]
}

const blueIcon = L.divIcon({
	...iconProps,
	html: `<span style='${markerHtmlStyles} ${blue}' />`
})

const redIcon = L.divIcon({
	...iconProps,
	html: `<span style='${markerHtmlStyles} ${red}' />`
})

function App() {
	const [observationLocations, setObservationLocations] = useState([]);

	const [selectedLocation, setSelectedLocation] = useState(null);

	useEffect(function fetchObservationLocations() {
		const connection = new Metolib.WfsConnection();
		if (connection.connect('https://opendata.fmi.fi/wfs', 
				'fmi::observations::weather::cities::multipointcoverage')) {
			connection.getData({
				begin: Date.now() - 60e3 * 60 * 24,
				end: Date.now() - 60e3 * 90,
				requestParameter: 't',
				timestep: 60 * 60 * 1000,
				bbox: '20.6455928891, 59.846373196, 31.5160921567, 70.1641930203',
				callback: (data, errors) => {
					if (errors.length > 0) {
						errors.forEach(err => {
							console.error('FMI API error: ' + err.errorText);
						});
						return;
					}
					setObservationLocations(data.locations
						.map(loc => {
							const [lat, lon] = loc.info.position.map(parseFloat);
							return {...loc, position: {lat, lon}}
						})
					);

					connection.disconnect();
				}
			});
		}
	}, []);

	const position = [65, 26];
	const map = (
		<MapContainer center={position} zoom={6} doubleClickZoom={false} closePopupOnClick={false}>
			<LayersControl position='topright' collapsed={false}>
				<LayersControl.BaseLayer checked name='OpenStreetMap'>
					<TileLayer
						url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						subdomains='abcd'
						maxZoom={19}
						minZoom={5}
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name='Tumma taustakartta'>
					<TileLayer
						url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
						attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> 
							&copy; <a href="https://carto.com/attributions">CARTO</a>'
						subdomains='abcd'
						maxZoom={19}
						minZoom={5}
					/>
				</LayersControl.BaseLayer>
				<LayersControl.Overlay checked name='Lämpötila'>
					<LayerGroup>
						{observationLocations.map(loc => 
							<Marker 
								position={[loc.position.lat, loc.position.lon]} 
								icon={loc.data.t.timeValuePairs[(loc.data.t.timeValuePairs.length)-1].value < 0 ? blueIcon : redIcon}
								key={loc.info.id}
								title={loc.info.name} 
								onClick={() => { setSelectedLocation(loc.info.id)}}
							>
								<Popup>
								{loc.info.name} 
								<br/> Lämpötila {loc.data.t.timeValuePairs[(loc.data.t.timeValuePairs.length)-1].value} °C.
								</Popup>
							</Marker>)
						}
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>
		</MapContainer>
	);

	return (
		<div className='App'>
			<Sidebar selectedLocationId={selectedLocation} 
				observationLocations={observationLocations}/>
			{map}
		</div>
	);

}

export default App;
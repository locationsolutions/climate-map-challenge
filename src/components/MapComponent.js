import React, { useState, useEffect } from 'react'
import {
    LayersControl,
    Map,
    Marker,
    TileLayer,
} from 'react-leaflet'
import styled from 'styled-components'
import handleThemeSelection from './ThemeComponent'

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`

const position = [26, 62]
const { BaseLayer } = LayersControl
const THEME_OPTIONS = ['https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                       'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
]
export default function MapComponent({observationLocations, setSelectedLocation}) {
    //console.log(JSON.stringify(observationLocations[1],null,4))

    const [defaultTheme, setTheme] = useState(THEME_OPTIONS[1])

    useEffect(() => handleThemeSelection(setTheme), []);
    return (
        <MapContainer
            center={position}
            zoom={6}
            maxZoom={10}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={false}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
        >
            <LayersControl position="topright">
                <BaseLayer checked name="OpenStreetMap.Mapnik">
                    <TileLayer
                        url= {defaultTheme}
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        subdomains='abcd'
                        maxZoom={19}
                    />
                </BaseLayer>
            </LayersControl>
            { observationLocations.map(loc => <Marker position={[loc.position.lat, loc.position.lon]}
                                                      key={loc.info.id}
                                                      title={loc.info.name}
                                                      zIndexOffset={1000}
                                                      onClick={() => setSelectedLocation(loc.info.id)}
                                              >
                                             </Marker>
            )}
        </MapContainer>
    )
}


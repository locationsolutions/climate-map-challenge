import React from 'react'
import {
    LayersControl,
    Map,
    Marker,
    TileLayer,
} from 'react-leaflet'
import styled from 'styled-components'

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`

const position = [63, 24]
const { BaseLayer } = LayersControl

export default function MapComponent({observationLocations, setSelectedLocation, theme}) {
    //console.log(JSON.stringify(observationLocations[1],null,4))

    return (
        <MapContainer
            center={position}
            zoom={5.3}
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
                        url= {theme}
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

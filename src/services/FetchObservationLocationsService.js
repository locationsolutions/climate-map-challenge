import Metolib from '@fmidev/metolib';

const SERVER_URL = 'https://opendata.fmi.fi/wfs'
const STORED_QUERY_OBSERVATION = 'fmi::observations::weather::cities::multipointcoverage'

const PARAMS_OBJ = {
    begin: Date.now() - 60e3 * 60 * 24 * 6,
    end: Date.now(),
    requestParameter: "t,td,ws_10min,snowdepth,r_1h",
    timestep: 60 * 60 * 1000,
    bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
    //sites: ["Kaisaniemi,Helsinki", "Turku"],
}

export default function FetchObservationLocationsService (setObservationLocations) {
    const connection = new Metolib.WfsConnection();
    if (connection.connect(SERVER_URL, STORED_QUERY_OBSERVATION)) {
        connection.getData({
            begin: PARAMS_OBJ.begin,
            end: PARAMS_OBJ.end,
            requestParameter: PARAMS_OBJ.requestParameter,
            timestep: PARAMS_OBJ.timestep,
            bbox: PARAMS_OBJ.bbox,
            sites : PARAMS_OBJ.sites,
            callback: (data, errors) => {
                if (errors.length > 0) {

                    errors.forEach(err => {
                        console.error('FMI API error: ' + err.errorText);
                    });
                    return;
                }

                setObservationLocations(data.locations
                    .map(loc => {
                        const [lon, lat] = loc.info.position.map(parseFloat);
                        return {...loc, position: {lat, lon}}
                    })
                );

                connection.disconnect();
            }
        });
    }
}
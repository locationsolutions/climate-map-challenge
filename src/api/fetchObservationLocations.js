import Metolib from "@fmidev/metolib";

export function fetchObservationLocations(
  setObservationLocations,
  setLoading,
  setLoadingText
) {
  const connection = new Metolib.WfsConnection();

  if (
    connection.connect(
      "http://opendata.fmi.fi/wfs",
      "fmi::observations::weather::cities::multipointcoverage"
    )
  ) {
    connection.getData({
      begin: Date.now() - 60e3 * 60 * 24 * 6, // TODO: fix this to make 24h chunks work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      end: Date.now(),
      requestParameter: "t,snowdepth,r_1h",
      timestep: 60 * 60 * 1000,
      bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
      callback: (data, errors) => {
        if (errors.length > 0) {
          errors.forEach((err) => {
            console.error("FMI API error: " + err.errorText);
          });
          setLoadingText("Error loading..."); // todo: fix this causing re-render...
          setLoading(false); // todo: fix this causing re-render...
          return;
        }

        try {
          setObservationLocations(
            data.locations.map((loc) => {
              const [lat, lon] = loc.info.position.map(parseFloat);
              return { ...loc, position: { lat, lon } };
            })
          );
        } catch (error) {
          console.log(
            "fetchObservationLocations: setObservationLocations error:",
            error
          );
        }

        connection.disconnect();
        setLoadingText(""); // todo: fix this causing re-render...
        setLoading(false); // todo: fix this causing re-render...
      },
    });
  } else {
    setLoadingText("Error connecting to API");
    setLoading(false);
  }
}

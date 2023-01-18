import convertTimestampToDate from "./convertTimestampToDate";
import mapArrayToChunks from "./mapArrayToChunks";
import mapValueHighsAndLows from "./mapValueHighsAndLows";

function doDayHighAndLow(loc, forDays = 6) {
  const dayChunks = mapArrayToChunks(loc.data.r_1h.timeValuePairs, 24);
  const maxDayChunks = dayChunks.filter((item, index) => {
    return index < forDays; // hack to limit amount of days
  });
  console.log(dayChunks);
  const highsAndLows = maxDayChunks.map((day, index) => {
    const { high, low } = mapValueHighsAndLows(day);
    return { day: convertTimestampToDate(day[0].time, "fi-FI"), high, low };
  });
  return highsAndLows;
}

function convertLocationDataToObject(loc) {
  if (loc === undefined || loc === null) return;
  const locationObject = {
    id: loc.info.id,
    name: loc.info.name,
    region: loc.info.region,
    weatherData: {
      precipitation: {
        units: loc.data.r_1h.property.unit,
        highAndLowPerDay: doDayHighAndLow(loc),
      },
    },
  };

  return locationObject;
}

export default convertLocationDataToObject;

import formatDateTime from "./formatDateTime";
import { observeHours } from "../var";
import calcAverage from "./calcAverage";

export default (data, type) => {
  const groupType = [];
  for (let i = 0; i < observeHours + 1; i++) {
    let time = null;
    const allCitiesPair = data.map((loc, index) => {
      const pair = loc.data[type].timeValuePairs[i];
      if (!time && pair) time = pair.time;
      return pair;
    });

    if (allCitiesPair.length) {
      const { average } = calcAverage(allCitiesPair, false);
      groupType.push({
        time: formatDateTime(time),
        [type]: average
      });
    }
  }
  return groupType;
};

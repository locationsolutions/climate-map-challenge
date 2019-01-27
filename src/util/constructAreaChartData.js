import { observeHours } from "../var";
import formatDateTime from "./formatDateTime";
import calcAverage from "./calcAverage";
import defineLabel from "./defineLabel";

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
      const { average } = calcAverage(allCitiesPair);
      groupType.push({
        time: formatDateTime(time),
        [defineLabel(type).name]: average
      });
    }
  }
  return {
    data: groupType,
    selectedLocInfo: data.length === 1 ? data[0] : {}
  };
};

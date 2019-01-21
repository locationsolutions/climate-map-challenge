import formatDateTime from "./formatDateTime";
import calcAverage from "./calcAverage";

export default (data, type) => {
  const allRegionsData = data.map((region, i) => {
    const pairs = region.data[type].timeValuePairs;
    const dateValuePairs = pairs.map(({ time, value }) => {
      const date = formatDateTime(time).substr(0, 2);
      return { date, value };
    });
    const seen = {};
    dateValuePairs.map(({ date, value }) => {
      if (!seen.hasOwnProperty(date)) {
        seen[date] = [];
      }
      return seen[date].push(value);
    });
    const keys = Object.keys(seen);
    const regionMinMaxAvg = keys.map(date => {
      const { average, arr } = calcAverage(seen[date]);
      if (!average) {
        return { date, min: NaN, max: NaN, average: NaN };
      }
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return { date, min, max, average };
    });
    return regionMinMaxAvg;
  });

  const finalData = [];
  for (let i = 0; i < 7; i++) {
    if (allRegionsData && allRegionsData.length) {
      const { date } = allRegionsData && allRegionsData[0][i];
      const oneDayMin = allRegionsData.map(
        region => region[i] && region[i].min
      );
      const oneDayMax = allRegionsData.map(
        region => region[i] && region[i].max
      );
      const oneDayAvg = allRegionsData.map(
        region => region[i] && region[i].average
      );
      const min = calcAverage(oneDayMin).average;
      const max = calcAverage(oneDayMax).average;
      const average = calcAverage(oneDayAvg).average;
      finalData.push({ date, min, max, average });
    }
  }
  return finalData;
};

import constructAreaChartData from "./constructAreaChartData";
import constructComposedChartData from "./constructComposedChartData";
import { defaultType } from "../var";

export default (arr, id, type, setter) => {
  let clone = [...arr];
  if (id) {
    clone = arr.filter(a => a.info.id === id);
  }
  const data = constructAreaChartData(clone, type || defaultType);
  const composedData = constructComposedChartData(clone, type || defaultType);
  setter({ data, composedData, type: type || defaultType });
};

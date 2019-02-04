import { defaultType } from "../var";
import constructAreaChartData from "./constructAreaChartData";
import constructComposedChartData from "./constructComposedChartData";

export default (arr, id, type, setter) => {
  let clone = [...arr];
  if (id) {
    clone = arr.filter(a => a.info.id === id);
  }
  const { data, selectedLocInfo } = constructAreaChartData(
    clone,
    type || defaultType
  );
  const composedData = constructComposedChartData(clone, type || defaultType);
  setter({ data, composedData, type: type || defaultType, selectedLocInfo });
};

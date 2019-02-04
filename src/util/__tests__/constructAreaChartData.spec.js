import constructAreaChartData from "../constructAreaChartData";
import { observeHours } from "../../var";

describe("constructAreaChartData func", () => {
  const type = "snowdepth";
  let data = [
    {
      data: {
        [type]: {
          timeValuePairs: [{ time: 0, value: 1 }, { time: 1, value: NaN }]
        }
      }
    }
  ];
  it("return data with length <= 1", () => {
    const { data: result } = constructAreaChartData(data, type);
    expect(result).toHaveLength(observeHours + 1);
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });
  it("return selectedLocInfo", () => {
    const { selectedLocInfo } = constructAreaChartData(data, type);
    expect(selectedLocInfo).toMatchObject(data[0]);
  });
  it("return no selectedLocInfo when data contains more than 1 object", () => {
    data = [
      ...data,
      {
        data: {
          [type]: {
            timeValuePairs: [{ time: 0, value: 1 }, { time: 1, value: NaN }]
          }
        }
      }
    ];
    const { selectedLocInfo } = constructAreaChartData(data, type);
    expect(selectedLocInfo).toMatchObject({});
  });
});

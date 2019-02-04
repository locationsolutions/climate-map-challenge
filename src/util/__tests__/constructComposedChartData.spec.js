import constructComposedChartData from "../constructComposedChartData";
import formatDateTime from "../formatDateTime";

describe("constructComposedChartData", () => {
  const type = "snowdepth";
  const firstDayTime = 1548097200000;
  const secondDayTime = 1548137200000;
  const timeValuePairs = [
    { time: firstDayTime, value: -1 },
    { time: firstDayTime + 1, value: NaN },
    { time: secondDayTime, value: NaN },
    { time: 1548197200000, value: 1 },
    { time: 1548297200000, value: 2 },
    { time: 1548397200000, value: 3 },
    { time: 1548497200000, value: 4 }
  ];
  const data = [
    {
      data: {
        [type]: {
          timeValuePairs
        }
      }
    }
  ];
  it("return arr with 7-day objects", () => {
    const result = constructComposedChartData(data, type);
    expect(result).toHaveLength(7);

    expect(result[0]).toMatchObject({
      date: formatDateTime(firstDayTime).substr(0, 2),
      min: -1,
      max: -1,
      average: -1
    });

    expect(result[1]).toMatchObject({
      date: formatDateTime(secondDayTime).substr(0, 2),
      min: undefined,
      max: undefined,
      average: undefined
    });

    expect(result[6]).toEqual(expect.objectContaining({ date: undefined }));
  });
});

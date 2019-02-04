import calcAverage from "../calcAverage";

describe("calcAverage func", () => {
  it("return undefined if no arr type is passed", () => {
    expect(calcAverage()).not.toBeDefined();
  });
  describe("when an array is passed as first arg", () => {
    it("return undefined average when arr is empty", () => {
      expect(calcAverage([])).toMatchObject({ average: undefined });
    });
    it("return undefined average if arr contains all NaN", () => {
      const arr = [NaN, NaN];
      expect(calcAverage(arr)).toMatchObject({ average: undefined });
    });
    it("return undefined average when all objects in arr contain NaN", () => {
      const arr = [{ value: undefined }, { value: NaN }];
      expect(calcAverage(arr)).toMatchObject({ average: undefined });
    });
    it("calculate average when arr contains at least 1 object with non-NaN value", () => {
      const arr = [undefined, { time: 0, value: 0 }, { time: 1, value: NaN }];
      expect(calcAverage(arr)).toMatchObject({
        average: 0,
        arr: [0]
      });
    });
    it("calculate average when arr contains at least 1 number with non-NaN value", () => {
      const arr = [NaN, 1];
      expect(calcAverage(arr)).toMatchObject({
        average: 1,
        arr: [1]
      });
    });
  });
});

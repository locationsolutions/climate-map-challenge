import defineLabel from "../defineLabel";

describe("defineLabel func", () => {
  const arr = [
    {
      type: "t",
      unit: "degC",
      name: "Temperature"
    },
    {
      type: "r_1h",
      unit: "mm",
      name: "Precipitation"
    },
    {
      type: "a",
      unit: "cm",
      name: "Snowdepth"
    }
  ];
  arr.map(({ type, unit: u, name: n }) => {
    it("return corresponding unit and name", () => {
      const { unit, name } = defineLabel(type);
      expect(unit).toBe(u);
      expect(name).toBe(n);
    });
  });
});

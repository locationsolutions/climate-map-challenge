export default type => {
  switch (type) {
    case "t":
      return {
        unit: "degC",
        name: "Temperature"
      };
    case "r_1h":
      return {
        unit: "mm",
        name: "Precipitation"
      };
    default:
      return {
        unit: "cm",
        name: "Snowdepth"
      };
  }
};

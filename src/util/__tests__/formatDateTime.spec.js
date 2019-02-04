import formatDateTime from "../formatDateTime";

describe("formatDateTime func", () => {
  it("return undefined if no timestamp is passed", () => {
    const result = formatDateTime();
    expect(result).not.toBeDefined();
  });
  it("return string value if timestamp is passed", () => {
    const timestamp = new Date().getTime();
    const result = formatDateTime(timestamp);
    expect(typeof result).toBe("string");
  });
});

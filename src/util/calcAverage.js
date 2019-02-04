export default arr => {
  if (Array.isArray(arr)) {
    if (!arr.length) {
      return { average: undefined };
    }
    const truthy =
      typeof arr[0] === "number"
        ? arr.filter(v => !isNaN(v))
        : arr.filter(item => item && !isNaN(item.value)).map(v => v.value);

    const len = truthy.length;
    if (!len) {
      return { average: undefined };
    }
    const sum = truthy.reduce((a, b) => a + b);
    return {
      average: sum / len,
      arr: truthy
    };
  }
};

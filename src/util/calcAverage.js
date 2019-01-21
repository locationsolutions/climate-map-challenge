export default (arr, arrContainsNumbersOnly = true) => {
  if (arr) {
    const truthy = !arrContainsNumbersOnly
      ? arr.filter(item => item && !isNaN(item.value)).map(v => v.value)
      : arr.filter(v => !isNaN(v));

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

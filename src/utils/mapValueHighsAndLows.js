function mapValueHighsAndLows(array) {
  if (!Array.isArray(array)) return;

  const high = array.reduce(
    (max, item) => Math.max(max, item.value),
    array[0].value
  );
  const low = array.reduce(
    (min, item) => Math.min(min, item.value),
    array[0].value
  );
  console.log(`The highest value is ${high} and the lowest value is ${low}`);

  return { high, low };
}

export default mapValueHighsAndLows;


// for use in the Temperature component, we need to convert the temperature (in C) to 
// a shade of blue, depending on the magnitude. While the function is very crude 
// (only works in the winter...), it serves its purpose.
function tempToHexColor(temp) {

    const deepBlue = 40;
    const lightBlue = 255;

    let blue = 0;
    if (temp < -20) {
      blue = deepBlue;
    }
    else if (temp < 0 && temp >= -20) {

      blue = lightBlue - Math.abs(temp * 10.75); // simply what works with the min and max values
    } else {
      blue = lightBlue;
    }

  const hexBlue = blue.toString(16);

  return '#0000' + hexBlue.slice(0, 2); // no red or green are needed, nor decimals
} // tempToHexColor

export default tempToHexColor;
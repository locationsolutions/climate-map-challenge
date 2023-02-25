import { useState, useEffect } from "react";

function getGeolocation() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return position;
}

export default getGeolocation;

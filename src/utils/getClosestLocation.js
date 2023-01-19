//geolib would have been a better option...

function getClosestLocation(location, locations) {
  if (location === undefined || locations === undefined) return;
  const userLat = location.coords.latitude;
  const userLng = location.coords.longitude;

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  let closestLocation;
  let closestDistance = Infinity;

  for (let i = 0; i < locations.length; i++) {
    let lat = locations[i].latitude;
    let lng = locations[i].longitude;
    let distance = getDistanceFromLatLonInKm(userLat, userLng, lat, lng);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestLocation = {
        id: locations[i].id,
        name: locations[i].name,
        latitude: locations[i].latitude,
        longitude: locations[i].longitude,
      };
    }
  }

  return closestLocation;
}

export default getClosestLocation;

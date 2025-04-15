import {getGeoLocation, calculateDistance} from "../lib/geo.js";

const test = () => {
  const currentLocation = getGeoLocation();
  console.log("Current location:", currentLocation);
};

export {test};

import {getGeoLocation} from "../lib/geo.js";
import {updateSession} from "../script/session.js";

const map = L.map("map", {zoomControl: false}).setView([60.175, 24.95], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

/**
 * Adds a marker to the leaflet map
 * @param {*} lat - latitude
 * @param {*} lon - longitude
 * @param {*} name - popup name
 * @param {*} callback -
 */
const addMarker = (lat, lon, name, icon, callback) => {
  const marker = L.marker([lat, lon], {icon: icon}).addTo(map);
  marker.bindPopup(name);
  marker._icon.classList.add("restaurant-marker");
  marker.on("click", () => {
    callback(marker);
  });
  return marker;
};

const updatePosition = (loc) => {
  const pos = loc ? loc : getGeoLocation();
  map.setView(pos, 13);
  updateSession("pos", pos);
};

export {addMarker, updatePosition};

import {getGeoLocation} from "../lib/geo.js";
import {updateSession} from "../script/session.js";

const map = L.map("map").setView([60.175, 24.95], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const addMarker = (lat, lon, name) => {
  const marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(name);
};

const updatePosition = () => {
  const pos = getGeoLocation();
  map.setView(pos, 13);
  updateSession("pos", pos);
};

export {addMarker, updatePosition};

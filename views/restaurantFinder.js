import createHeader from "../components/header.js";
import {addMarker, updatePosition} from "../components/map.js";
import {updateSession, session} from "../script/session.js";
import {addSearch} from "../script/main.js";
import {mapIcons} from "../icons/icons.js";

const detailsText = document.querySelector(".restaurant-name");
const detailsLink = document.querySelector("#restaurant-details");
let prevMarker = null;

const updateInfo = () => {
  if (session.current.selected.length <= 1) {
    detailsText.textContent = "No restaurant selected";
    detailsLink.querySelector("button").disabled = true;
  } else {
    const restaurant = session.current.restaurants.find(
      (restaurant) => restaurant._id === session.current.selected
    );
    detailsLink.href = `restaurant-view.html?id=${restaurant._id}`;
    detailsText.textContent = restaurant.name;
    detailsLink.querySelector("button").disabled = false;
  }
};

updateInfo();

const createRestaurantPopups = (restaurants) => {
  for (const restaurant of restaurants) {
    const location = restaurant.location.coordinates;
    const icon =
      restaurant._id === session.current.selected
        ? mapIcons.selected
        : mapIcons.restaurant;
    const m = addMarker(
      location[1],
      location[0],
      restaurant.name,
      icon,
      (marker) => selectRestaurant(restaurant, marker)
    );
    if (restaurant._id === session.current.selected) {
      prevMarker = m;
    }
  }
};

const selectRestaurant = async (restaurant, marker) => {
  updateSession("selected", restaurant._id);
  updateInfo();
  if (prevMarker) {
    prevMarker.setIcon(mapIcons.restaurant);
    prevMarker._icon.classList.add("restaurant-marker");
  }
  marker.setIcon(mapIcons.selected);
  marker._icon.classList.add("restaurant-marker");
  prevMarker = marker;
  zoomTo(restaurant);
};

const zoomTo = (restaurant) => {
  const cords = [...restaurant.location.coordinates].reverse();
  updatePosition(cords);
};

createHeader();
addSearch({callback: selectRestaurant});
createRestaurantPopups(session.current.restaurants);

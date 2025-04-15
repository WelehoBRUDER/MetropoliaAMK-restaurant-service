import createHeader from "../components/header.js";
import {addMarker, updatePosition} from "../components/map.js";
import {updateSession, session} from "../script/session.js";
import {addSearch} from "../script/main.js";

const detailsText = document.querySelector(".restaurant-name");
const detailsLink = document.querySelector("#restaurant-details");

const updateInfo = () => {
  console.log(session.current.selected);
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
    addMarker(location[1], location[0], restaurant.name, () =>
      selectRestaurant(restaurant)
    );
  }
};

const selectRestaurant = async (restaurant) => {
  updateSession("selected", restaurant._id);
  updateInfo();
  zoomTo(restaurant);
};

const zoomTo = (restaurant) => {
  const cords = [...restaurant.location.coordinates].reverse();
  updatePosition(cords);
};

createHeader();
addSearch({callback: selectRestaurant});
createRestaurantPopups(session.current.restaurants);

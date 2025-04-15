import createHeader from "../components/header.js";
import {addMarker, updatePosition, clearMarkers} from "../components/map.js";
import {updateSession, session} from "../script/session.js";
import {addSearch} from "../script/main.js";
import {mapIcons} from "../icons/icons.js";
import {
  getRestaurants,
  getCompanies,
  getCities,
  getNearestRestaurant,
  filterRestaurants,
} from "../script/filterRestaurants.js";
import {createRestaurantsTable} from "../components/restaurantsTable.js";
import {getGeoLocation} from "../lib/geo.js";

const navigatorButton = document.querySelector(".navigator");
const detailsText = document.querySelector(".restaurant-name");
const detailsLink = document.querySelector("#restaurant-details");
const companyFilterTool = document.querySelector(".company-filter");
const restaurantList = document.querySelector(".restaurant-list-container");
const cityFilterTool = document.querySelector(".city-filter");
let prevMarker = null;
let includeCompanies = [];
let city = "All";

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
  clearMarkers();
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
  if (prevMarker?._icon) {
    prevMarker.setIcon(mapIcons.restaurant);
    prevMarker._icon.classList.add("restaurant-marker");
  }
  if (marker?._icon) {
    marker.setIcon(mapIcons.selected);
    marker._icon.classList.add("restaurant-marker");
    prevMarker = marker;
  }
  zoomTo(restaurant);
};

const createCompanyFilter = () => {
  const companies = getCompanies();
  if (includeCompanies.length === 0) {
    includeCompanies = [...companies];
  }
  companyFilterTool.innerHTML = "";
  companies.forEach((company) => {
    const selection = document.createElement("div");
    selection.classList.add("flex-row");
    selection.innerHTML = `
      <input type="checkbox" id="${company}" name="${company}" value="${company}" checked="true">
      <label for="${company}">${company}</label>
    `;
    companyFilterTool.append(selection);
    const checkbox = selection.querySelector("input[type=checkbox]");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        includeCompanies.push(checkbox.value);
      } else {
        includeCompanies = includeCompanies.filter(
          (company) => company !== checkbox.value
        );
      }
      filterAndRefresh();
    });
  });
};

const createCityFilter = () => {
  const cities = getCities();
  cityFilterTool.innerHTML = "";
  cities.forEach((cityName) => {
    const option = document.createElement("option");
    option.value = cityName;
    option.textContent = cityName;

    cityFilterTool.append(option);
  });
  cityFilterTool.value = city;
  cityFilterTool.addEventListener("change", () => {
    city = cityFilterTool.value;
    filterAndRefresh();
  });
};

const filterAndRefresh = () => {
  filterRestaurants({
    company: {include: includeCompanies, exclude: []},
    city,
  });
  createRestaurantPopups(getRestaurants());
  createRestaurantsTable(restaurantList, getRestaurants(), selectRestaurant);
};

const zoomTo = (restaurant) => {
  const cords = [...restaurant.location.coordinates].reverse();
  updatePosition(cords);
};

navigatorButton.addEventListener("click", () => {
  goToNearestRestaurant();
});

const goToNearestRestaurant = async () => {
  const currentLocation = await getGeoLocation();
  const nearestRestaurant = getNearestRestaurant(...currentLocation);
  selectRestaurant(nearestRestaurant);
};

createHeader();
addSearch({callback: selectRestaurant});
createCompanyFilter();
createCityFilter();
createRestaurantPopups(session.current.restaurants);
createRestaurantsTable(
  restaurantList,
  session.current.restaurants,
  selectRestaurant
);

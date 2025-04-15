import createHeader from "../components/header.js";
import {addMarker, updatePosition, clearMarkers} from "../components/map.js";
import {updateSession, session} from "../script/session.js";
import {addSearch} from "../script/main.js";
import {mapIcons} from "../icons/icons.js";
import {
  getRestaurants,
  getCompanies,
  filterByCompany,
} from "../script/filterRestaurants.js";

const detailsText = document.querySelector(".restaurant-name");
const detailsLink = document.querySelector("#restaurant-details");
const companyFilterTool = document.querySelector(".company-filter");
let prevMarker = null;
let includeCompanies = [];

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
  if (prevMarker) {
    prevMarker.setIcon(mapIcons.restaurant);
    prevMarker._icon.classList.add("restaurant-marker");
  }
  marker.setIcon(mapIcons.selected);
  marker._icon.classList.add("restaurant-marker");
  prevMarker = marker;
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
      filterByCompany(includeCompanies, []);
      createRestaurantPopups(getRestaurants());
    });
  });
};

const zoomTo = (restaurant) => {
  const cords = [...restaurant.location.coordinates].reverse();
  updatePosition(cords);
};

createHeader();
addSearch({callback: selectRestaurant});
createCompanyFilter();
createRestaurantPopups(session.current.restaurants);

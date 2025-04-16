import createHeader from "../components/header.js";
import {
  addMarker,
  updatePosition,
  clearMarkers,
  findMarker,
} from "../components/map.js";
import {updateSession, session} from "../script/session.js";
import {addSearch} from "../script/main.js";
import {mapIcons} from "../icons/icons.js";
import {
  getRestaurants,
  getCompanies,
  getCities,
  getNearestRestaurant,
  filterRestaurants,
  isFavorite,
} from "../script/filterRestaurants.js";
import {createRestaurantsTable} from "../components/restaurantsTable.js";
import {getGeoLocation} from "../lib/geo.js";
import {postAddFavorite, postRemoveFavorite} from "../routes/routes.js";
import {getUserData} from "../script/userData.js";

const showOnMapButton = document.querySelector("#show-on-map");
const addToFavoritesButton = document.querySelector("#add-to-favorites");
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

const getRestaurantIcon = async (restaurantId) => {
  let icon;
  if (await isFavorite(restaurantId)) {
    if (restaurantId === session.current.selected) {
      icon = mapIcons.favoriteSelected;
    } else {
      icon = mapIcons.favorite;
    }
  } else {
    if (restaurantId === session.current.selected) {
      icon = mapIcons.selected;
    } else {
      icon = mapIcons.restaurant;
    }
  }
  return icon;
};

updateInfo();

const createRestaurantPopups = async (restaurants) => {
  clearMarkers();
  for (const restaurant of restaurants) {
    const location = restaurant.location.coordinates;
    let icon = await getRestaurantIcon(restaurant._id);
    const m = addMarker(location[1], location[0], restaurant, icon, (marker) =>
      selectRestaurant(restaurant, marker)
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
    prevMarker.setIcon(await getRestaurantIcon(prevMarker.restaurant));
    prevMarker._icon.classList.add("restaurant-marker");
  }
  if (!marker) {
    marker = findMarker(restaurant._id);
  }
  if (marker?._icon) {
    marker.setIcon(await getRestaurantIcon(marker.restaurant));
    marker._icon.classList.add("restaurant-marker");
    prevMarker = marker;
  }
  window.scrollTo(0, 0);
  updateFavoriteStar();
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

showOnMapButton.addEventListener("click", () => {
  const restaurant = session.current.restaurants.find(
    (restaurant) => restaurant._id === session.current.selected
  );
  if (restaurant) {
    zoomTo(restaurant);
  }
});

const updateFavoriteStar = async () => {
  if (!session.current.selected) {
    addToFavoritesButton.style.display = "none";
    return;
  }
  addToFavoritesButton.style.display = "block";
  const icon = addToFavoritesButton.querySelector("img");
  const isFav = await isFavorite(session.current.selected);
  if (isFav) {
    icon.src = "../icons/star_rate_24dp_B89230_FILL0_wght400_GRAD0_opsz24.png";
    addToFavoritesButton.title = "Remove from favorites";
  } else {
    icon.src = "../icons/star_rate_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
    addToFavoritesButton.title = "Add to favorites";
  }
  if (session.current.selected) {
    updateCurrentMarker();
  }
};

const addToFavorites = async () => {
  const user = await getUserData();
  if (!user) return;
  const response = await postAddFavorite(user, session.current.selected);
  if (response.status === "success") {
    await getUserData({forceReload: true});
    updateFavoriteStar();
  }
};
const removeFromFavorites = async () => {
  const user = await getUserData();
  if (!user) return;
  const response = await postRemoveFavorite(user, session.current.selected);
  if (response.status === "success") {
    await getUserData({forceReload: true});
    updateFavoriteStar();
  }
};

addToFavoritesButton.addEventListener("click", async () => {
  const isFav = await isFavorite(session.current.selected);
  if (isFav) {
    removeFromFavorites();
  } else {
    addToFavorites();
  }
});

const updateCurrentMarker = async () => {
  let marker = findMarker(session.current.selected);
  if (marker?._icon) {
    marker.setIcon(await getRestaurantIcon(marker.restaurant));
    marker._icon.classList.add("restaurant-marker");
  }
};

const init = () => {
  createCompanyFilter();
  createCityFilter();
  createRestaurantPopups(session.current.restaurants);
  createRestaurantsTable(
    restaurantList,
    session.current.restaurants,
    selectRestaurant
  );
  updateFavoriteStar();
};

createHeader();
addSearch({callback: selectRestaurant});
init();

import {calculateDistance} from "../lib/geo.js";
import {session, loadSession} from "./session.js";
import {getUserData} from "./userData.js";

let restaurants = [];

const loadRestaurants = async () => {
  await loadSession();
  restaurants = [...session.current.restaurants];
};

const getCompanies = () => {
  const companies = new Set();
  [...session.current.restaurants].forEach((restaurant) => {
    companies.add(restaurant.company);
  });
  return [...companies].sort((a, b) => a.localeCompare(b));
};

const getCities = () => {
  const cities = new Set();
  [...session.current.restaurants].forEach((restaurant) => {
    cities.add(restaurant.city);
  });
  cities.add("All");
  return [...cities].sort((a, b) => a.localeCompare(b));
};

const filterRestaurants = (options) => {
  if (!restaurants) return;
  restaurants = [...session.current.restaurants];
  if (options?.company) {
    const {include, exclude} = options.company;
    console.log(include, exclude);
    filterByCompany(include, exclude);
  }
  if (options?.city) {
    filterByCity(options.city);
  }
};

const getNearestRestaurant = (lat, lon) => {
  if (!restaurants) return null;
  let nearestRestaurant = null;
  let nearestDistance = Infinity;

  restaurants.forEach((restaurant) => {
    const restCords = [...restaurant.location.coordinates];
    const distance = calculateDistance(lat, lon, ...restCords.reverse());
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestRestaurant = restaurant;
    }
  });
  return nearestRestaurant;
};

// Filters restaurants based on companies you want to include or exclude
const filterByCompany = (include, exclude) => {
  if (include.length === 0 && exclude.length === 0) return;
  restaurants = restaurants.filter((restaurant) => {
    const company = restaurant.company.toLowerCase();
    const includeMatch = include.some((inc) =>
      company.includes(inc.toLowerCase())
    );
    const excludeMatch = exclude.some((exc) =>
      company.includes(exc.toLowerCase())
    );
    return includeMatch && !excludeMatch;
  });
};

const filterByCity = (city) => {
  if (city === "All") return;
  restaurants = restaurants.filter((restaurant) => {
    return restaurant.city.toLowerCase() === city.toLowerCase();
  });
};

const getRestaurants = () => {
  return restaurants;
};

const getFavorites = async () => {
  const userData = await getUserData();
  if (!userData) return [];
  console.log(restaurants);
  return restaurants.filter((restaurant) => {
    return userData.favorite_restaurants.includes(restaurant._id);
  });
};

const isFavorite = async (restaurantId) => {
  const userData = await getUserData();
  if (!userData) return false;
  return userData.favorite_restaurants.includes(restaurantId);
};

loadRestaurants();
export {
  getRestaurants,
  getCompanies,
  getCities,
  filterRestaurants,
  getNearestRestaurant,
  getFavorites,
  isFavorite,
};

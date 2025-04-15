import {getGeoLocation, calculateDistance} from "../lib/geo.js";
import {session, loadSession} from "./session.js";

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

loadRestaurants();
export {getRestaurants, getCompanies, getCities, filterRestaurants};

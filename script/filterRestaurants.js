import {getGeoLocation, calculateDistance} from "../lib/geo.js";
import {session, loadSession} from "./session.js";

let restaurants = [];

const loadRestaurants = async () => {
  await loadSession();
  restaurants = [...session.current.restaurants];
  console.log(restaurants);
};

// Filters restaurants based on companies you want to include or exclude
const filterByCompany = (include, exclude) => {
  if (include.length === 0 && exclude.length === 0) return restaurants;
  restaurants = [...session.current.restaurants];
  return restaurants.filter((restaurant) => {
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

const getRestaurants = () => {
  return restaurants;
};

loadRestaurants();
export {getRestaurants};

import {baseUrl} from "./variables.js";

const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      try {
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Failed to get response data: " + error);
      }
    } else {
      throw new Error(res.status);
    }
  } catch (error) {
    console.error("Connection failed: " + error);
  }
};

const getAllRestaurants = async () => {
  const data = await fetchData(`${baseUrl}/restaurants`);
  if (data) {
    return data;
  } else {
    return [];
  }
};

const getDailyMeals = async (restaurantId) => {
  const menu = await fetchData(
    `${baseUrl}/restaurants/daily/${selectedRestaurant}/fi`
  );
  if (menu) {
    return menu;
  } else {
    return {};
  }
};

const getWeeklyMeals = async (restaurantId) => {
  const menu = await fetchData(
    `${baseUrl}/restaurants/weekly/${selectedRestaurant}/fi`
  );
  if (menu) {
    return menu;
  } else {
    return {};
  }
};

export {getAllRestaurants, getDailyMeals, getWeeklyMeals};

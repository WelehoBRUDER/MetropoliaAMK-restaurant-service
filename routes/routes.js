import {baseUrl, backendUrl} from "./variables.js";
import {local} from "../script/local.js";

const fetchData = async (url, options, getToken) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      try {
        const data = await res.json();
        if (getToken) {
          console.log(res.body);
          console.log(res.headers);
          console.log(res);
          data.token = res.cookie;
        }
        return data;
      } catch (error) {
        console.error("Failed to get response data: " + error);
      }
    } else {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message, res.status);
    }
  } catch (error) {
    return {error: error.message, status: "fail"};
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
    `${baseUrl}/restaurants/daily/${restaurantId}/${local.lang}`
  );
  if (menu) {
    return menu;
  } else {
    return {};
  }
};

const getWeeklyMeals = async (restaurantId) => {
  const menu = await fetchData(
    `${baseUrl}/restaurants/weekly/${restaurantId}/${local.lang}`
  );
  if (menu) {
    return menu;
  } else {
    return {};
  }
};

const postLogin = async (username, password) => {
  try {
    const data = await fetchData(
      `${backendUrl}users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
      },
      true
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};

export {getAllRestaurants, getDailyMeals, getWeeklyMeals, postLogin};

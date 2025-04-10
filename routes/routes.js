import {baseUrl, backendUrl} from "./variables.js";
import {local} from "../script/local.js";

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
      const errorMessage = await res.json();
      throw new Error(errorMessage.message, res.status);
    }
  } catch (error) {
    return {error: error.message, status: "fail"};
  }
};

const fetchImageData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      try {
        const data = await res.blob();
        console.log(data);
        const imageUrl = URL.createObjectURL(data);
        console.log(imageUrl);
        return imageUrl;
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
    const data = await fetchData(`${backendUrl}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};

const getMeByToken = async (token) => {
  const response = await fetchData(`${backendUrl}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    if (response?.user !== undefined) {
      return response.user;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
};

const getUserByName = async (username) => {
  const response = await fetchData(`${backendUrl}users/one/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    if (response?.user !== undefined) {
      return response.user;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
};

const getDefaultProfilePicture = async () => {
  const response = await fetchImageData(`${backendUrl}public/default.png`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    if (response?.profile_picture !== undefined) {
      return response.profile_picture;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
};

export {
  getAllRestaurants,
  getDailyMeals,
  getWeeklyMeals,
  getMeByToken,
  getUserByName,
  getDefaultProfilePicture,
  postLogin,
};

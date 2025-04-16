import {baseUrl, backendUrl} from "./variables.js";
import {getLanguage} from "../lang/lang.js";
import {navigate} from "../lib/navigate.js";

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
        const imageUrl = URL.createObjectURL(data);
        return imageUrl;
      } catch (error) {
        console.log("Failed to get response data: " + error.message);
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
    console.log(data);
    return data;
  } else {
    return [];
  }
};

const getDailyMeals = async (restaurantId) => {
  const menu = await fetchData(
    `${baseUrl}/restaurants/daily/${restaurantId}/${getLanguage()._id}`
  );
  if (menu) {
    return menu;
  } else {
    return {};
  }
};

const getWeeklyMeals = async (restaurantId) => {
  const menu = await fetchData(
    `${baseUrl}/restaurants/weekly/${restaurantId}/${getLanguage()._id}`
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

const postSignUp = async (username, email, password) => {
  try {
    const data = await fetchData(`${backendUrl}users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, email, password}),
    });
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};

const getLogout = () => {
  fetchData(`${backendUrl}users/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("service-token")}`,
    },
  })
    .then((response) => {
      if (response.status === "success") {
        localStorage.removeItem("service-token");
      } else {
        console.error("Failed to log out: " + response.error);
      }
    })
    .catch((error) => {
      console.error("Error logging out: " + error.message);
    });
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
      throw new Error(response.error);
    }
  } catch (error) {
    console.warn("Error fetching user data: " + error.message);
    // Delete the token if the user is not found
    localStorage.removeItem("service-token");
    // Redirect to the frontpage
    navigate("/");
    return null;
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

const getProfilePicture = async (id) => {
  const response = await fetchImageData(`${backendUrl}uploads/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== "fail") {
    return response;
  } else {
    const defaultImage = await fetchImageData(
      `${backendUrl}uploads/default.png`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (defaultImage.status !== "fail") {
      return defaultImage;
    } else {
      return `${baseUrl}/uploads/default.png`;
    }
  }
};

const postProfilePicture = async (user, picture) => {
  if (!user.token) {
    navigate("/login.html");
  }
  const formData = new FormData();
  formData.append("file", picture);
  const response = await fetchData(
    `${backendUrl}users/picture/${user.username}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    }
  );
  return response;
};

const putUser = async (user, userData) => {
  if (!user.token) {
    navigate("/login.html");
  }
  const response = await fetchData(`${backendUrl}users/edit/${user.username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(userData),
  });
  return response;
};

const postAddFavorite = async (user, restaurantId) => {
  if (!user.token) {
    navigate("/login.html");
  }
  const response = await fetchData(
    `${backendUrl}users/favorite/${restaurantId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response;
};

const postRemoveFavorite = async (user, restaurantId) => {
  if (!user.token) {
    navigate("/login.html");
  }
  const response = await fetchData(
    `${backendUrl}users/remove-favorite/${restaurantId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response;
};

export {
  getAllRestaurants,
  getDailyMeals,
  getWeeklyMeals,
  getMeByToken,
  getUserByName,
  getProfilePicture,
  getLogout,
  postLogin,
  postSignUp,
  postProfilePicture,
  postAddFavorite,
  postRemoveFavorite,
  putUser,
};

import {getUserData} from "../script/userData.js";
import {getUserByName} from "../routes/routes.js";
import {userProfile} from "../components/userProfile.js";
import {editUserProfile} from "../components/editUserProfile.js";
import {getFavorites} from "../script/filterRestaurants.js";
import {createRestaurantsTable} from "../components/restaurantsTable.js";
import createHeader from "../components/header.js";

const createUserProfile = async () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("id");
  const edit = params.get("edit") === "true";
  const userData = await getUserData();
  const ownProfile = username === userData?.username;
  const user = ownProfile ? userData : await getUserByName(username);
  if (!user?._id) {
    // Navigate to 404
    window.location.href = "/404.html";
  }
  if (edit) {
    editUserProfile(user, {detailed: ownProfile, editable: ownProfile});
  } else {
    userProfile(user, {detailed: ownProfile, editable: ownProfile});
  }
  const favorites = await getFavorites();
  const favoritesContainer = document.querySelector(".favorites-container");
  if (favoritesContainer) {
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = `<p>No favorites yet.</p>`;
    } else {
      favoritesContainer.innerHTML = `<h2>Favorite Restaurants</h2>`;
      const table = document.createElement("table");
      table.classList.add("restaurant-list-container");
      createRestaurantsTable(table, favorites, (restaurant) => {
        window.location.href = `restaurant-view.html?id=${restaurant._id}`;
      });
      favoritesContainer.append(table);
    }
  }
};

createHeader();
createUserProfile();

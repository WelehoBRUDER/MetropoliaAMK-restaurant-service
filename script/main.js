import {getAllRestaurants, getDailyMeals} from "../routes/routes.js";
import {session, loadSession, updateSession} from "./session.js";

const addSearch = () => {
  const search = document.querySelector(".search input");
  const searchResults = document.querySelector(".search-results");

  if (search) {
    search.addEventListener("input", () => {
      searchForRestaurants(search.value);
    });

    const searchForRestaurants = (string) => {
      const searchFor = string.toLowerCase();
      if (searchFor.length === 0) {
        searchResults.innerHTML = "";
        return;
      }
      // For now, just find the first restaurant where the name starts with or contains the search string
      const results = session.current.restaurants
        .filter((restaurant) => {
          return restaurant.name.toLowerCase().includes(searchFor);
        })
        .sort((a, b) => {
          if (
            a.name.toLowerCase().indexOf(searchFor) <
            b.name.toLowerCase().indexOf(searchFor)
          )
            return -1;
          if (
            a.name.toLowerCase().indexOf(searchFor) >
            b.name.toLowerCase().indexOf(searchFor)
          )
            return 1;
          return 0;
        });

      searchResults.innerHTML = "";
      results.forEach((result) => {
        const li = document.createElement("li");
        li.innerHTML = result.name;
        console.log(result);
        li.addEventListener("click", () => {
          selectRestaurant(result);
          searchResults.innerHTML = "";
        });
        searchResults.append(li);
      });
    };
  }
};

const createRestaurantPopups = (restaurants) => {
  for (const restaurant of restaurants) {
    const location = restaurant.location.coordinates;
    addMarker(location[1], location[0], restaurant.name, () =>
      selectRestaurant(restaurant)
    );
  }
};

const selectRestaurant = async (restaurant) => {
  updateSession("selected", restaurant._id);
  window.location.href = `restaurant-view.html?id=${restaurant._id}`;
};

const main = async () => {
  loadSession();
  if (session.current.restaurants.length === 0) {
    updateSession("restaurants", await getAllRestaurants());
  }
  //createRestaurantPopups(session.current.restaurants);
};

export {main, addSearch};

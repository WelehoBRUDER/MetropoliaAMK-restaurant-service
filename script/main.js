import {getAllRestaurants, getDailyMeals} from "../routes/routes.js";
import {session, loadSession, updateSession} from "./session.js";
import {addMarker} from "../components/map.js";
import {createMealDisplay} from "../components/meals.js";

const createRestaurantPopups = (restaurants) => {
  for (const restaurant of restaurants) {
    const location = restaurant.location.coordinates;
    addMarker(location[1], location[0], restaurant.name, async () => {
      updateSession("selected", restaurant._id);
      const meals = await getDailyMeals(restaurant._id);
      createMealDisplay(meals);
    });
  }
};

const main = async () => {
  loadSession();
  if (session.current.restaurants.length === 0) {
    updateSession("restaurants", await getAllRestaurants());
  }
  createRestaurantPopups(session.current.restaurants);
};
main();

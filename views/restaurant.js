import createHeader from "../components/header.js";
import {getRestaurantById} from "../script/session.js";
import {createMealDisplay} from "../components/meals.js";
import {getDailyMeals} from "../routes/routes.js";

createHeader();

const restaurantId = new URLSearchParams(window.location.search).get("id");
const restaurant = getRestaurantById(restaurantId);
const restaurantName = document.querySelector("#restaurant-name");

const updateRestaurantName = () => {
  restaurantName.innerText = `${restaurant.company} | ${restaurant.name}`;
};

const initDaySelector = () => {
  const daySelector = document.querySelector(".day-selector");
  Object.values(daySelector.children).forEach((day) => {
    day.addEventListener("click", (e) => {
      const selectedDay = e.currentTarget.getAttribute("data-value");
      console.log(selectedDay);
      getAllMeals();
    });
  });
};

const getAllMeals = async () => {
  const meals = await getDailyMeals(restaurantId);
  console.log(meals);
};

updateRestaurantName();
initDaySelector();

import createHeader from "../components/header.js";
import {getRestaurantById} from "../script/session.js";
import {createMealDisplay} from "../components/meals.js";
import {getWeeklyMeals} from "../routes/routes.js";

createHeader();

const restaurantId = new URLSearchParams(window.location.search).get("id");
const restaurant = getRestaurantById(restaurantId);
const restaurantName = document.querySelector("#restaurant-name");
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
let meals = [];
let currentWeekDay = days[new Date().getDay() - 1]; // Monday is 0, Sunday is 6

const updateRestaurantName = () => {
  restaurantName.innerText = `${restaurant.company} | ${restaurant.name}`;
};

const initDaySelector = () => {
  const daySelector = document.querySelector(".day-selector");
  Object.values(daySelector.children).forEach((day) => {
    if (currentWeekDay === day.getAttribute("data-value")) {
      day.classList.add("selected");
    }
    day.addEventListener("click", (e) => {
      currentWeekDay = e.currentTarget.getAttribute("data-value");
      document.querySelector(".selected").classList.remove("selected");
      e.currentTarget.classList.add("selected");
      getDailyMeals(currentWeekDay);
    });
  });
};

const getDailyMeals = (day) => {
  const index = days.indexOf(day);
  const mealsForDay = meals.days[index];
  if (mealsForDay) {
    createMealDisplay(mealsForDay);
  } else {
    document.querySelector(
      ".current-meals"
    ).innerHTML = `<p class="error-message">No meals available for ${day}</p>`;
  }
};

const getAllMeals = async () => {
  meals = await getWeeklyMeals(restaurantId);
  getDailyMeals(currentWeekDay);
};

updateRestaurantName();
getAllMeals();
initDaySelector();

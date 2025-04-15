import createHeader from "../components/header.js";
import {getRestaurantById} from "../script/session.js";
import {createMealDisplay} from "../components/meals.js";
import {getWeeklyMeals} from "../routes/routes.js";
import {getDateOfWeekday} from "../lib/dates.js";

createHeader();

const restaurantId = new URLSearchParams(window.location.search).get("id");
const restaurant = getRestaurantById(restaurantId);
const restaurantName = document.querySelector("#restaurant-name");
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
let meals = [];
let currentWeekDay = days[new Date().getDay() - 1]; // Monday is 0, Sunday is 6

const updateRestaurantName = () => {
  restaurantName.innerText = `${restaurant.company} | ${restaurant.name}`;
  document.title = `${restaurant.name} Meals | SRS`;
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const initDaySelector = () => {
  const daySelector = document.querySelector(".day-selector");
  days.forEach((day) => {
    const dayButton = document.createElement("button");
    dayButton.classList.add("day-button");
    dayButton.textContent = capitalize(day) + " " + getDateOfWeekday(day);
    if (currentWeekDay === day) {
      dayButton.classList.add("selected");
      dayButton.textContent = "Today";
    }
    dayButton.addEventListener("click", (e) => {
      currentWeekDay = day;
      document.querySelector(".selected").classList.remove("selected");
      dayButton.classList.add("selected");
      displayDailyMeals(currentWeekDay);
    });
    daySelector.appendChild(dayButton);
  });
};

const displayDailyMeals = async (day) => {
  const mealsForDay = await getMealForDay(day);
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
  displayDailyMeals(currentWeekDay);
};

const getMealForDay = async (day) => {
  const index = days.indexOf(day);
  if (meals.days[index]) {
    return meals.days[index];
  } else {
    return null;
  }
};

updateRestaurantName();
getAllMeals();
initDaySelector();

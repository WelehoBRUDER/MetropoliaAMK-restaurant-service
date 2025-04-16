import createHeader from "../components/header.js";
import {getRestaurantById} from "../script/session.js";
import {createMealDisplay} from "../components/meals.js";
import {getWeeklyMeals, getDailyMeals} from "../routes/routes.js";
import {getDateOfWeekday} from "../lib/dates.js";
import {isFavorite} from "../script/filterRestaurants.js";
import {postAddFavorite, postRemoveFavorite} from "../routes/routes.js";
import {getPath} from "../lib/navigate.js";

createHeader();

const starButton = document.querySelector(".star");
const restaurantId = new URLSearchParams(window.location.search).get("id");
const restaurant = getRestaurantById(restaurantId);
const restaurantName = document.querySelector("#restaurant-name");
const restaurantAddress = document.querySelector("#restaurant-address");
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
let dailyMeal = null;
let meals = [];
const today = days[new Date().getDay() - 1];
let currentWeekDay = days[new Date().getDay() - 1]; // Monday is 0, Sunday is 6

const updateRestaurantName = () => {
  restaurantName.innerText = `${restaurant.company} | ${restaurant.name}`;
  restaurantAddress.innerText = restaurant.address ?? "{no_address}";
  document.title = `${restaurant.name} Meals | SRS`;
};

const updateStar = async () => {
  const img = starButton.querySelector("img");
  if (await isFavorite(restaurantId)) {
    img.src = `${getPath()}/icons/star_64dp_EAC452_FILL0_wght400_GRAD0_opsz48.png`;
    starButton.title = "Remove from favorites";
  } else {
    img.src = `${getPath()}/icons/star_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png`;
    starButton.title = "Add to favorites";
  }
};

starButton.addEventListener("click", async () => {
  const isFav = await isFavorite(restaurantId);
  if (isFav) {
    await postRemoveFavorite(restaurantId);
    updateStar();
  } else {
    await postAddFavorite(restaurantId);
    updateStar();
  }
});

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const initDaySelector = () => {
  const daySelector = document.querySelector(".day-selector");
  days.forEach((day) => {
    const dayButton = document.createElement("button");
    dayButton.classList.add("day-button");
    dayButton.textContent = capitalize(day) + " " + getDateOfWeekday(day);
    if (today === day) {
      dayButton.classList.add("selected");
      dayButton.textContent = "Today";
    } else if (meals.length === 0) {
      dayButton.classList.add("disabled");
      dayButton.disabled = true;
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
    ).innerHTML = `<p>{no_meals_available_today}</p>`;
  }
};

const getAllMeals = async () => {
  meals = await getWeeklyMeals(restaurantId);
  if (meals?.status === "fail") {
    meals = [];
  }
};

const getMealForDay = async (day) => {
  if (day === today) {
    if (dailyMeal?.courses?.length > 0) {
      return dailyMeal;
    } else return null;
  }
  const index = days.indexOf(day);
  if (meals?.days?.[index]) {
    return meals.days[index];
  } else {
    return null;
  }
};

const getDailyMeal = async () => {
  dailyMeal = await getDailyMeals(restaurantId);
  displayDailyMeals(currentWeekDay);
};

const init = async () => {
  updateRestaurantName();
  await getDailyMeal();
  await getAllMeals();
  initDaySelector();
  updateStar();
};

init();

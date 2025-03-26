const currentMeals = document.querySelector(".current-meals");

{
  /* <div class="meal-display">
   */
}

const createMealRow = (meal) => {
  const mealRow = document.createElement("div");
  mealRow.classList.add("meal-display");
  const {name, price, diets} = meal;
  mealRow.innerHTML = `
    <div class="name"><h3>${name}</h3></div>
    <div class="price"><p>${price}</p></div>
    <div class="info"><p>${diets}</p></div>
  `;
  return mealRow;
};

const createMealDisplay = (meals) => {
  currentMeals.innerHTML = "";
  console.log(meals);
  meals?.courses.forEach((meal) => {
    currentMeals.appendChild(createMealRow(meal));
  });
};

export {createMealDisplay};

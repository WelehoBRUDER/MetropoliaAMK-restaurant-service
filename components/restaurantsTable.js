const createRestaurantsTable = (table, restaurants, callback) => {
  table.innerHTML = `
    <tr>
      <th>{name}</th>
      <th>{company}</th>
      <th>{city}</th>
    </tr>
  `;
  restaurants.forEach((restaurant) => {
    const restaurantElement = createRestaurant(restaurant, callback);
    table.append(restaurantElement);
  });
};

const createRestaurant = (restaurant, callback) => {
  const restaurantElement = document.createElement("tr");
  restaurantElement.classList.add("restaurant-item");
  restaurantElement.innerHTML = `
    <td class="restaurant-name">${restaurant.name}</td>
    <td>${restaurant.company}</td>
    <td>${restaurant.city}</td>
  `;
  restaurantElement
    .querySelector(".restaurant-name")
    .addEventListener("click", () => {
      if (callback) {
        callback(restaurant);
      }
    });
  return restaurantElement;
};

export {createRestaurantsTable};

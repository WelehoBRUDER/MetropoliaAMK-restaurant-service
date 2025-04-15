const createRestaurantsTable = (table, restaurants, callback) => {
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Company</th>
      <th>City</th>
      <th>Actions</th>
    <th>
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
    <td>
      <button class="favorite-restaurant" data-id="${restaurant._id}">Favorite</button>
    </td>
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

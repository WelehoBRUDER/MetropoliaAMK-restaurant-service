import {getUserData} from "../script/userData.js";

const createHeader = async () => {
  const header = document.querySelector("#header");
  header.classList.add("white-text");
  header.innerHTML = `
      <div class="logo-title">
      <h1><a href="index.html">Student Restaurant Service</a></h1>
    </div>
    <div class="middle-nav">
      <nav class="restaurants">
        <a href="restaurants.html">Find Restaurant</a>
      </nav>
    </div>`;
  const user = await getUserData();
  if (user) {
    header.innerHTML += `
    <nav class="user-profile">
      <a href="favorites.html">Favourite restaurants</a>
      <a href="profile.html?id=${user.username}">${user.fullname}</a>
    </nav>
    `;
  } else {
    header.innerHTML += `
    <nav class="user-profile">
      <a href="login.html">Log in</a>
      <span>|</span>
      <a href="signup.html">Sign up</a>
    </nav>`;
  }
};

export default createHeader;

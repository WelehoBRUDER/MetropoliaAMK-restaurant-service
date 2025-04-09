import {getUserData} from "../script/userData.js";

const createHeader = async () => {
  const header = document.querySelector("#header");
  header.innerHTML = `
      <div class="logo-title">
      <h1><a href="index.html">Student Restaurant Service</a></h1>
    </div>
    <div class="current-restaurant">
      <h3>Sodexo Myllypuro</h3>
    </div>`;
  const user = await getUserData();
  if (user) {
    header.innerHTML += `
    <nav class="user-profile">
      <a href="profile.html">${user.fullname}</a>
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

createHeader();

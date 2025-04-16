import {getUserData} from "../script/userData.js";
import {getProfilePicture} from "../routes/routes.js";
import {main} from "../script/main.js";

const createHeader = async () => {
  const header = document.querySelector("#header");
  header.classList.add("white-text");
  header.innerHTML = `
      <div class="logo-title">
      <h1><a href="index.html">Student Restaurant Service</a></h1>
    </div>
    <div class="middle-nav">
      <nav class="restaurants">
        <a href="restaurants.html">All Restaurants</a>
      </nav>
    </div>`;

  const userProfile = document.createElement("div");
  userProfile.classList.add("user-profile");
  userProfile.classList.add("flex-row");
  header.append(userProfile);
  userProfile.innerHTML = `
    <nav class="user-nav">
      <a href="login.html">Log in</a>
      <span>|</span>
      <a href="signup.html">Sign up</a>
    </nav>
  `;
  const user = await getUserData();
  if (user) {
    const picture = await getProfilePicture(user.profile_picture);
    userProfile.innerHTML = `
      <div class="user-details white-text flex-row">
        <img src="${picture}" alt="Profile picture of ${user.fullname}" class="profile-picture">
        <span class="username">${user.fullname}</span>
      </div>
      <nav class="user-nav">
      <a href="profile.html?id=${user.username}">My profile</a>
      <a href="logout.html">Log out</a>
      </nav>
    `;
  }
};

main();

export default createHeader;

import {getUserData} from "../script/userData.js";
import {getProfilePicture} from "../routes/routes.js";
import {main} from "../script/main.js";
import {languages, setLanguage} from "../lang/lang.js";
import startTranslatingDocument from "../lang/translateDocument.js";

const createHeader = async () => {
  const header = document.querySelector("#header");
  header.classList.add("white-text");
  header.innerHTML = `
      <div class="logo-title flex-row">
      <h1><a href="index.html">{website_title}</a></h1>
      <nav class="restaurants">
        <a href="restaurants.html">{all_restaurants}</a>
      </nav>
    </div>`;

  const userProfile = document.createElement("div");
  userProfile.classList.add("user-profile");
  userProfile.classList.add("flex-row");
  header.append(userProfile);
  userProfile.innerHTML = `
    <nav class="user-nav">
      <a href="login.html">{log_in}</a>
      <a href="signup.html">{sign_up}</a>
    </nav>
  `;
  const user = await getUserData();
  if (user) {
    const picture = await getProfilePicture(user.profile_picture);
    userProfile.innerHTML = `
      <div class="user-details white-text flex-row">
        <img src="${picture}" alt="{profile_picture_belonging_to} ${user.fullname}" class="profile-picture">
        <span class="username">${user.fullname}</span>
      </div>
      <nav class="user-nav">
      <a href="profile.html?id=${user.username}">{my_profile}</a>
      <a href="logout.html">{log_out}</a>
      </nav>
    `;
  }
  const languageSelector = document.createElement("select");
  languageSelector.classList.add("default-select");
  languageSelector.classList.add("dark");
  Object.entries(languages).forEach(([key, lang]) => {
    const option = document.createElement("option");
    option.value = key;
    option.innerText = lang._name;
    languageSelector.append(option);
  });
  languageSelector.value = localStorage.getItem("lang") || "fi";
  languageSelector.addEventListener("change", (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  });
  userProfile.append(languageSelector);
  startTranslatingDocument();
};

main();

export default createHeader;

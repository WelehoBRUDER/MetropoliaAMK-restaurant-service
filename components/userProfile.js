import {getProfilePicture} from "../routes/routes.js";

const userProfile = async (user, options) => {
  const section = document.querySelector("#profile");
  const defaultPic = await getProfilePicture(user.profile_picture);
  section.innerHTML = `
    <h2>${user.fullname}</h2>
    <img src="${
      user.profile_picture !== "default.png" ? user.profile_picture : defaultPic
    }" alt="Profile picture of ${user.fullname}" class="profile-picture">
    <p>Username: ${user.username}</p>
    ${options?.detailed ? `<p>Email address: ${user.email}</p>` : ""}
    <p>Created on: ${new Date(user.date_registered).toLocaleDateString(
      "fi-FI"
    )}</p>
    ${
      options?.editable
        ? `<button id="edit-profile" onclick="window.location.href='${window.location.href}&edit=true'">Edit profile</button>`
        : ""
    }
  `;
};

export {userProfile};

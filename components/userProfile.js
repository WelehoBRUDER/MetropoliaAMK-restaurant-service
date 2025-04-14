import {getDefaultProfilePicture} from "../routes/routes.js";

const userProfile = (user, options) => {
  const section = document.querySelector("#profile");
  getDefaultProfilePicture().then((data) => {
    console.log(data);
  });
  section.innerHTML = `
    <h2>${user.fullname}</h2>
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

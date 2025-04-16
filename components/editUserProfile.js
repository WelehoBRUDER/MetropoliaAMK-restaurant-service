import {putUser, postProfilePicture} from "../routes/routes.js";
import {navigate} from "../lib/navigate.js";

const editUserProfile = (user) => {
  const section = document.querySelector("#profile");

  section.classList.add("dark-text");
  section.innerHTML = `
      <form method="post" id="edit-form">
        <p id="edit-error" class="error-message"></p>
        <label for="picture">{profile_picture}</label>
        <input type="file" class="normal-input" name="picture" id="picture" accept="image/*">
        <label for="fullname">{display_name}</label>
        <input type="text" value="${user.fullname}" class="normal-input" name="fullname" id="fullname">
        <label for="email">{email}</label>
        <input type="email" value="${user.email}" class="normal-input" name="email" id="email">
        <button type="submit">{save_changes}</button>
        <button type="button" onclick="window.location.href = '/profile.html?id=${user.username}'">{cancel}</button>
      </form>`;

  const editForm = document.querySelector("#edit-form");
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(editForm);
    const picture = data.get("picture");
    if (picture.size > 0) {
      if (picture.type !== "image/jpeg" && picture.type !== "image/png") {
        document.querySelector("#edit-error").innerText = "{invalid_file_type}";
        return;
      }
      try {
        const updatedPicture = await postProfilePicture(user, picture);
        if (updatedPicture.user) {
          console.log("Success!");
        }
      } catch (error) {
        document.querySelector("#edit-error").innerText = error.message;
      }
    }

    try {
      const _data = Object.fromEntries(data.entries());
      const response = await putUser(user, _data);
      if (response.user) {
        navigate(`/profile.html?id=${user.username}`);
      } else {
        document.querySelector("#edit-error").innerText = response.error;
      }
    } catch (error) {
      document.querySelector("#edit-error").innerText = error.message;
    }
  });
};

export {editUserProfile};

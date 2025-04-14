import {putUser} from "../routes/routes.js";

const editUserProfile = (user) => {
  const section = document.querySelector("#profile");

  section.innerHTML = `
      <form method="post" id="edit-form">
        <p id="edit-error" class="error-message"></p>
        <label for="fullname">Display name</label>
        <input type="text" value="${user.fullname}" class="normal-input" name="fullname" id="fullname">
        <label for="email">Email</label>
        <input type="email" value="${user.email}" class="normal-input" name="email" id="email">
        <label for="password">New password (keep empty to not change)</label>
        <input type="password" class="normal-input" name="password" id="password">
        <button type="submit">Save changes</button>
        <button type="button" onclick="window.location.href = '/profile.html?id=${user.username}'">Cancel</button>
      </form>`;

  const editForm = document.querySelector("#edit-form");
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const fullname = editForm.fullname.value;
      const email = editForm.email.value;
      const password = editForm.password.value || null;
      const response = await putUser(user, {fullname, email, password});
      console.log(response);
      if (response.user) {
        window.location.href = `/profile.html?id=${user.username}`;
      } else {
        document.querySelector("#edit-error").innerText = response.error;
      }
    } catch (error) {
      document.querySelector("#edit-error").innerText = error.message;
    }
  });
};

export {editUserProfile};

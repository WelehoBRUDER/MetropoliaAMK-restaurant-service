const userProfile = (user, options) => {
  const section = document.querySelector("#profile");
  section.innerHTML = `
    <h2>${user.fullname}</h2>
    <p>Username: ${user.username}</p>
    ${options?.detailed ? `<p>Email address: ${user.email}</p>` : ""}
    <p>Created on: ${new Date(user.date_registered).toLocaleDateString(
      "fi-FI"
    )}</p>
    ${
      options?.editable ? `<button id="edit-profile">Edit profile</button>` : ""
    }
  `;
};

export {userProfile};

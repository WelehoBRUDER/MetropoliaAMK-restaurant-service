import {login} from "../script/user.js";

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  const data = await login(username, password);
  if (data.status === "fail") {
    loginError.innerText = data.error;
  } else {
    if (data.token) {
      localStorage.setItem("service-token", data.token);
    }
    window.location.href = "/";
  }
});
const loginError = document.querySelector("#login-error");

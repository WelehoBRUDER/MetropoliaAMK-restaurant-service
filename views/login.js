import {login, hasToken} from "../script/user.js";
import {navigate} from "../lib/navigate.js";
import createHeader from "../components/header.js";

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
    navigate("/");
  }
});
const loginError = document.querySelector("#login-error");

// Boot the user out if they are already logged in
if (hasToken()) {
  navigate("/");
}

createHeader();

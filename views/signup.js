import createHeader from "../components/header.js";
import {hasToken, signUp} from "../script/user.js";
import {navigate} from "../lib/navigate.js";

const loginError = document.querySelector("#login-error");
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (signUpForm.password.value !== signUpForm.confirm_password.value) {
    loginError.innerText = "Passwords do not match";
    return;
  }
  const username = signUpForm.username.value;
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;
  const data = await signUp(username, email, password);
  if (data.status === "fail") {
    loginError.innerText = data.error;
  } else {
    if (data.token) {
      localStorage.setItem("service-token", data.token);
    }
    navigate("/");
  }
});

// Boot the user out if they are already logged in
if (hasToken()) {
  navigate("/");
}

createHeader();

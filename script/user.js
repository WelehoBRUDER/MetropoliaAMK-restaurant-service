import {postLogin, getMeByToken, postSignUp} from "../routes/routes.js";

const login = async (username, password) => {
  try {
    const data = await postLogin(username, password);
    return data;
  } catch (error) {
    return error.message;
  }
};

const signUp = async (username, email, password) => {
  try {
    const data = await postSignUp(username, email, password);
    return data;
  } catch (error) {
    return error.message;
  }
};

const getMe = async () => {
  const token = localStorage.getItem("service-token");
  if (!token) return null;
  const data = await getMeByToken(token);
  if (data) {
    return {...data, token};
  } else return null;
};

const hasToken = () => {
  const token = localStorage.getItem("service-token");
  if (token) return true;
  return false;
};

export {login, signUp, getMe, hasToken};

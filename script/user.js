import {postLogin, getMeByToken} from "../routes/routes.js";
import {backendUrl} from "../routes/variables.js";

const login = async (username, password) => {
  try {
    const data = await postLogin(username, password);
    return data;
  } catch (error) {
    return error.message;
  }
};

const getMe = async () => {
  const token = localStorage.getItem("service-token");
  if (!token) return null;
  const data = await getMeByToken(token);
  console.log(data);
};

export {login, getMe};

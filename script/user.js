import {postLogin} from "../routes/routes.js";

const login = async (username, password) => {
  try {
    const data = await postLogin(username, password);
    return data;
  } catch (error) {
    return error.message;
  }
};

export {login};

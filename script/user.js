import {postLogin} from "../routes/routes.js";

const login = async (username, password) => {
  try {
    const data = await postLogin(username, password);
  } catch (error) {}
};

export {login};

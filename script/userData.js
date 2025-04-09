import {getMe, hasToken} from "./user.js";
const userData = {};

const loadUserData = async () => {
  const data = await getMe();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      userData[key] = value;
    });
  }
};

const getUserData = async () => {
  if (hasToken() && !userData._id) {
    await loadUserData();
  }
  return userData;
};

export {getUserData};

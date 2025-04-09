import {getMe, hasToken} from "./user.js";
let userData = null;
let loadingPromise = null;

const loadUserData = async () => {
  if (!loadingPromise) {
    loadingPromise = getMe()
      .then((data) => {
        if (data) {
          userData = data;
        }
      })
      .catch((error) => {
        console.error("Error loading user data:", error);
        userData = null; // Reset userData in case of error
      })
      .finally(() => {
        loadingPromise = null; // Reset loading promise
      });
  }
  return loadingPromise; // Return the promise for chaining
};

const getUserData = async (options) => {
  if (hasToken() && (!userData || options?.forceReload)) {
    await loadUserData();
  }
  return userData;
};

export {getUserData};

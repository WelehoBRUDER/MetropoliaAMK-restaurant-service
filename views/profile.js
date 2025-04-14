import {getUserData} from "../script/userData.js";
import {getUserByName} from "../routes/routes.js";
import {userProfile} from "../components/userProfile.js";
import {editUserProfile} from "../components/editUserProfile.js";

const createUserProfile = async () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("id");
  const edit = params.get("edit") === "true";
  const userData = await getUserData();
  const ownProfile = username === userData?.username;
  const user = ownProfile ? userData : await getUserByName(username);
  if (!user) {
    // Navigate to 404
    window.location.href = "/404.html";
  }
  if (edit) {
    editUserProfile(user, {detailed: ownProfile, editable: ownProfile});
  } else {
    userProfile(user, {detailed: ownProfile, editable: ownProfile});
  }
};

createUserProfile();

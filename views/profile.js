import {getUserData} from "../script/userData.js";
import {getUserByName} from "../routes/routes.js";
import {userProfile} from "../components/userProfile.js";

const createUserProfile = async () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("id");
  const userData = await getUserData();
  const ownProfile = username === userData?.username;
  const user = ownProfile ? userData : await getUserByName(username);
  if (!user) {
    // Navigate to 404
    window.location.href = "/404.html";
  }
  userProfile(user, {detailed: ownProfile, editable: ownProfile});
};

createUserProfile();

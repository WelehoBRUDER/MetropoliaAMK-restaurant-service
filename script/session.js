import {getMe} from "./user.js";
const defaultSession = {
  restaurants: [],
  selected: "",
  pos: [],
  user: {},
};

const session = {
  current: defaultSession,
};

const saveSession = () => {
  sessionStorage.setItem(
    "student-restaurant-session",
    JSON.stringify(session.current)
  );
};

const updateSession = (key, value) => {
  session.current[key] = value;
  saveSession();
};

const loadSession = async () => {
  const sessionStr = sessionStorage.getItem("student-restaurant-session");
  if (sessionStr) {
    session.current = JSON.parse(sessionStr);
  } else {
    session.current = defaultSession;
  }
};

const clearSession = () => {
  session.current = defaultSession;
  sessionStorage.removeItem("student-restaurant-session");
};

const getRestaurantById = (id) => {
  const restaurant = session.current.restaurants.find(
    (restaurant) => restaurant._id === id
  );
  return restaurant;
};

export {updateSession, loadSession, clearSession, session, getRestaurantById};

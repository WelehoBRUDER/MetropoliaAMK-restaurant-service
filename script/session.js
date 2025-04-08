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

const loadSession = () => {
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

export {updateSession, loadSession, clearSession, session};

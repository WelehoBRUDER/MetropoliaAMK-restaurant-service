const defaultSession = {
  restaurants: [],
  selected: "",
  pos: [],
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

export {updateSession, loadSession, session};

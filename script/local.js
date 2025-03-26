let local = {
  lang: "en",
};

const changeLocal = (lang) => {
  local.lang = lang;
  localStorage.setItem("local", JSON.stringify(local));
};

const loadLocal = () => {
  const localStr = localStorage.getItem("local");
  if (localStr) {
    local = JSON.parse(localStr);
  }
};

export {changeLocal, loadLocal, local};

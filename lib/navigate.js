import {deployUrl, prodUrl} from "../routes/variables.js";

const getPath = () => {
  return window.location.origin.startsWith("http://") ? prodUrl : deployUrl;
};

const navigate = (to) => {
  const path = getPath();
  window.location.href = `${path}${to}`;
};

export {navigate, getPath};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export {
  setLocalStorage,
  getLocalStorage,
  setSessionStorage,
  getSessionStorage,
};

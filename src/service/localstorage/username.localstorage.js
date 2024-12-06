const userNameInLocalStorage = "userNameInLocalStorage";

export const setUserNameInLocalStorage = (username) => {
  localStorage.setItem(userNameInLocalStorage, username);
};

export const removeUserNameFromLocalStorage = () => {
  localStorage.removeItem(userNameInLocalStorage);
};

export const getUserNameFromLocalStorage = () => {
  return localStorage.getItem(userNameInLocalStorage);
};

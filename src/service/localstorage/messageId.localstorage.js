const messageIdInLocalStorage = "messageIdInLocalStorage";

export const setMessageIdInLocalStorage = (messageId) => {
  localStorage.setItem(messageIdInLocalStorage, messageId);
};

export const removeMessageIdFromLocalStorage = () => {
  localStorage.removeItem(messageIdInLocalStorage);
};

export const getMessageIdFromLocalStorage = () => {
  return localStorage.getItem(messageIdInLocalStorage);
};

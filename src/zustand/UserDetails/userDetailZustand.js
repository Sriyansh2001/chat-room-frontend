import { create } from "zustand";
import { getUserNameFromLocalStorage } from "../../service/localstorage/username.localstorage";
import { getMessageIdFromLocalStorage } from "../../service/localstorage/messageId.localstorage";

const useUserDetail = create((set) => ({
  userDetail: {
    username: getUserNameFromLocalStorage() || "",
    messageId: getMessageIdFromLocalStorage() || "",
  },
  setUserDetails: (userData) => {
    set({
      userDetail: {
        username: userData?.username,
        messageId: userData?.messageId,
      },
    });
  },
}));

export default useUserDetail;

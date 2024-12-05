import { create } from "zustand";

const useUserDetail = create((set) => ({
  userDetail: {
    username: "",
    messageId: "",
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

import { create } from "zustand";

const useUserDetail = create((set) => ({
  userDetail: {
    username: "",
  },
  setUserDetails: (userData) => set({ username: userData?.username }),
}));

export default useUserDetail;

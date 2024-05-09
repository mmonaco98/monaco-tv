import type { StateCreator } from "zustand";

export interface TUserSlice {
  userInfo: string | undefined;
  updateUserInfo: (userInfo: string) => void;
  resetUserInfo: () => void;
}

export const createUserSlice: StateCreator<TUserSlice> = (set, get) => ({
  userInfo: undefined,
  updateUserInfo: (userInfo: string) => set(() => ({ userInfo })),
  resetUserInfo: () => set({ userInfo: undefined }),
});

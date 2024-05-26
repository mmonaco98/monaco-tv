import type { StateCreator } from 'zustand';
import { TUser } from '../types/user';

export interface TUserSlice {
    userInfo: TUser | undefined;
    updateUserInfo: (userInfo: TUser) => void;
    resetUserInfo: () => void;
}

export const createUserSlice: StateCreator<TUserSlice> = (set, get) => ({
    userInfo: undefined,
    updateUserInfo: (userInfo: TUser) => set(() => ({ userInfo })),
    resetUserInfo: () => set({ userInfo: undefined }),
});

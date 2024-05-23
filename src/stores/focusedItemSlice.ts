import type { StateCreator } from 'zustand';
import { TMovie } from '../types/movie';

export interface TFocusedItemSlice {
    focusedItem: TMovie | undefined;
    updateFocusedItem: (userInfo: TMovie) => void;
    resetFocusedItem: () => void;
}

export const createFocusedItemSlice: StateCreator<TFocusedItemSlice> = (
    set,
    get
) => ({
    focusedItem: undefined,
    updateFocusedItem: (focusedItem: TMovie) => set(() => ({ focusedItem })),
    resetFocusedItem: () => set({ focusedItem: undefined }),
});

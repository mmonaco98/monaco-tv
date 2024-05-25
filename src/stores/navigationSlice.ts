import type { StateCreator } from 'zustand';
import { TNavigation } from '../types/navigation';

export interface TNavigationSlice {
    navigation: TNavigation | undefined;
    updateNavigation: (navigation: TNavigation) => void;
    resetNavigation: () => void;
}

export const createNavigationSlice: StateCreator<TNavigationSlice> = (
    set,
    get
) => ({
    navigation: undefined,
    updateNavigation: (navigation: TNavigation) => set(() => ({ navigation })),
    resetNavigation: () => set({ navigation: undefined }),
});

import type { StateCreator } from 'zustand';
import { TMovie } from '../types/movie';
import { TSection } from '../types/section';

export interface TFavouritesSlice {
    favourites: TSection[] | undefined;
    updateFavourites: (favourites: TSection[]) => void;
    resetFavourites: () => void;
}

export const createFavouritesSlice: StateCreator<TFavouritesSlice> = (
    set,
    get
) => ({
    favourites: undefined,
    updateFavourites: (favourites: TSection[]) => set(() => ({ favourites })),
    resetFavourites: () => set({ favourites: undefined }),
});

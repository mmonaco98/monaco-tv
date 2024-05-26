import type { StateCreator } from 'zustand';
import { TMovie } from '../types/movie';
import { TSection } from '../types/section';

export interface THomepageSlice {
    homepage: TSection[] | undefined;
    updateHomepage: (homepage: TSection[]) => void;
    resetHomepage: () => void;
}

export const createHomepageSlice: StateCreator<THomepageSlice> = (
    set,
    get
) => ({
    homepage: undefined,
    updateHomepage: (homepage: TSection[]) => set(() => ({ homepage })),
    resetHomepage: () => set({ homepage: undefined }),
});

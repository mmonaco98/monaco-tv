import type { StateCreator } from 'zustand';

export interface TNextFocusSlice {
    nextFocus: Map<string, React.MutableRefObject<undefined>> | undefined;
    addNextFocus: (nextFocus: {
        name: string;
        ref: React.MutableRefObject<undefined>;
    }) => void;
    resetNextFocus: () => void;
}

export const createNextFocusSlice: StateCreator<TNextFocusSlice> = (
    set,
    get
) => ({
    nextFocus: new Map<string, React.MutableRefObject<undefined>>(),
    addNextFocus: (nextFocusVoice: {
        name: string;
        ref: React.MutableRefObject<undefined>;
    }) => {
        const actualNextFocus = get().nextFocus;
        actualNextFocus.set(nextFocusVoice.name, nextFocusVoice.ref);
        set({ nextFocus: actualNextFocus });
    },
    resetNextFocus: () => set({ nextFocus: undefined }),
});

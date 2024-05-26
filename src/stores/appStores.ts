import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { createUserSlice, TUserSlice } from './userSlice';
import { TNavigationSlice, createNavigationSlice } from './navigationSlice';
import { TFocusedItemSlice, createFocusedItemSlice } from './focusedItemSlice';
import { TNextFocusSlice, createNextFocusSlice } from './nextFocusSlice';
import { THomepageSlice, createHomepageSlice } from './homepageSlice';

export type TAppStore = TUserSlice &
    TNavigationSlice &
    TFocusedItemSlice &
    TNextFocusSlice &
    THomepageSlice;

export const useAppStore = create<TAppStore>()(
    devtools(
        subscribeWithSelector((...a) => ({
            ...createUserSlice(...a),
            ...createNavigationSlice(...a),
            ...createFocusedItemSlice(...a),
            ...createNextFocusSlice(...a),
            ...createHomepageSlice(...a),
        }))
    )
);

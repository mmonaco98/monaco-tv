import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { createUserSlice, TUserSlice } from './userSlice';
import { TFocusedItemSlice, createFocusedItemSlice } from './focusedItemSlice';

export type TAppStore = TUserSlice & TFocusedItemSlice;

export const useStore = create<TAppStore>()(
    devtools(
        subscribeWithSelector((...a) => ({
            ...createUserSlice(...a),
            ...createFocusedItemSlice(...a),
        }))
    )
);

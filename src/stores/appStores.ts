import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createUserSlice, TUserSlice } from "./userSlice";

export type TAppStore = TUserSlice;

export const useStore = create<TUserSlice>()(
	devtools(
		subscribeWithSelector((...a) => ({
			...createUserSlice(...a),
		})),
	),
);
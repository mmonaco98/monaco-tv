import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const GUIDELINE_BASE_WIDTH = 1920;
export const GUIDELINE_BASE_HEIGHT = 1080;


/**
 * The function `vScale` scales a given size value based on the screen height and a guideline base
 * height.
 * @param {number} size - The `size` parameter represents the size value that you want to horizontally
 * scale based on the screen width and guideline base width.
 * @returns The function `hScale` returns the scaled size based on the SCREEN_WIDTH and
 * GUIDELINE_BASE_WIDTH.
 */
export function hScale(size: number): number {
	return (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * (size ?? 0);
}

/**
 * The function `vScale` scales a given size value based on the screen height and a guideline base
 * height.
 * @param {number} size - The `size` parameter represents the size value that you want to vertically
 * scale based on the screen height and guideline base height.
 * @returns The function `vScale` returns the scaled size based on the SCREEN_WIDTH and
 * GUIDELINE_BASE_WIDTH.
 */
export function vScale(size: number): number {
	return (SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT) * (size ?? 0);
}
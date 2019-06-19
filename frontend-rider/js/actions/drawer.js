import type { Action } from './types';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export function openDrawer() {
	// console.log('open drawer ==============');
	return {
		type: OPEN_DRAWER,
	};
}

export function closeDrawer() {
	// console.log('closeeee drawer ==============');
	return {
		type: CLOSE_DRAWER,
	};
}

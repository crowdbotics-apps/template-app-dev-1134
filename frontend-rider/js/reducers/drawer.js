import type { Action } from '../actions/types';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/drawer';

export type State = {
	drawerState: string,
	drawerDisabled: boolean,
};

const initialState = {
	drawerState: 'closed',
	drawerDisabled: true,
};

export default function(state: State = initialState, action: Action): State {
	if (action.type === OPEN_DRAWER) {
		// console.log('openedddddddd');
		return {
			...state,
			drawerState: 'opened',
		};
	}

	if (action.type === CLOSE_DRAWER) {
		// console.log('closedddddddd');
		return {
			...state,
			drawerState: 'closed',
		};
	}
	return state;
}

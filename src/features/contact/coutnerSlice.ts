import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	data: number;
	title: string;
}

export interface CounterAction {
	type: string;
	payload: number; // Optional payload for increment/decrement amount}
}

const initialState: CounterState = {
	data: 42,
	title: 'Contact Page',
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		incrementCounter: (state, action: CounterAction) => {
			state.data += action.payload; // Default increment by 1 if no payload
		},
		decrementCounter: (state, action: CounterAction) => {
			state.data -= action.payload; // Default decrement by 1 if no payload
		},
	},
});

export const { incrementCounter, decrementCounter } = counterSlice.actions;

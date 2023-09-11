import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	registerData: {},
}

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		register: (state, action) => {
			console.log('register', action.payload)
			state.registerData = action.payload
		},
	},
})

export const { register } = registerSlice.actions
export default registerSlice.reducer

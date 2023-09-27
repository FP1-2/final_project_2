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
			const newObj = {
				...state.registerData,
				...action.payload,
			}
			state.registerData = newObj
		},
		resetRegisterData: state => {
			state.registerData = {}
		},
	},
})

export const { register, resetRegisterData } = registerSlice.actions
export default registerSlice.reducer

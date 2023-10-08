import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	registerData: {},
}

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		register: (state, action) => {
			const newObj = {
				...state.registerData,
				...action.payload,
			}
			state.registerData = newObj
			console.log('registerData', state.registerData)
		},
		resetRegisterData: state => {
			state.registerData = {}
		},
	},
})

export const { register, resetRegisterData } = registerSlice.actions
export default registerSlice.reducer

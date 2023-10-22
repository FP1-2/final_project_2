import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	userData: {},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true
			state.userData = action.payload
		},
	},
})

export const { login } = userSlice.actions
export default userSlice.reducer

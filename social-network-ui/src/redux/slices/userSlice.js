import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	userId: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true
			state.userId = action.payload
			localStorage.setItem('userId', action.payload)
		},
		setIsLogin: (state, action) => {
			state.isAuthenticated = action.payload
			if (!action.payload) {
				localStorage.removeItem('userId')
			}
		},
	},
})

export const { login, setIsLogin } = userSlice.actions
export default userSlice.reducer

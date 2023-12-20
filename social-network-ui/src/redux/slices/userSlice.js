import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	userId: null,
	followings: [],
	userData: null,
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
		logOut: state => {
			state.isAuthenticated = false
			state.userData = null
			localStorage.removeItem('userId')
		},
		setUserData: (state, action) => {
			state.userData = {
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				avatar: action.payload.avatar,
				username: action.payload.username,
			}
		},
		setIsLogin: (state, action) => {
			state.isAuthenticated = action.payload
			if (!action.payload) {
				localStorage.removeItem('userId')
			}
		},
		setFollowings: (state, action) => {
			state.followings = action.payload
		},

		addFollowing: (state, action) => {
			state.followings.push(action.payload)
		},

		removeFollowing: (state, action) => {
			state.followings = state.followings.filter(id => id !== action.payload)
		},
	},
})

export const {
	login,
	setIsLogin,
	setFollowings,
	addFollowing,
	removeFollowing,
	setUserData,
	logOut,
} = userSlice.actions
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    setIsLogin: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const { login, setIsLogin } = authSlice.actions
export default authSlice.reducer

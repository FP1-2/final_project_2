import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import HomePage from './pages/HomePage/HomePage.js'
import AuthPage from './pages/AuthPage/AuthPage'
import LoginPage from './pages/LoginPage/LoginPage'

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path='/' element={<AuthPage />} />

			{/* Auth Routes */}
			<Route path='/signIn' element={<LoginPage />} />

			{/* Profile Routes */}

			{/* Error Path */}
			<Route path='*' element={<h1>error</h1>} />
		</Routes>
	)
}

export default AppRoutes

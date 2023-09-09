import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path='/' element={<AuthPage />} />

			{/* Auth Routes */}

			{/* Profile Routes */}

			{/* Error Path */}
			<Route path='*' element={<h1>error</h1>} />
		</Routes>
	)
}

export default AppRoutes

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/header'

const AppRoutes = () => {
	return (
		<>
		<Header/>
		<Routes>
			{/* Public Routes */}
			<Route path='/' element={<HomePage />} />

			{/* Auth Routes */}

			{/* Profile Routes */}

			{/* Error Path */}
			<Route path='*' element={<h1>error</h1>} />
		</Routes>
		</>
	)
}

export default AppRoutes

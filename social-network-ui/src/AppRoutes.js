import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path='/' element={<Navigate to='/home' />} />

      {/* Public Routes */}
      <Route path='/home' element={<HomePage />} />
	  <Route path='/explore' element={<HomePage />} />
	  <Route path='/notifications' element={<HomePage />} />
	  <Route path='/messages' element={<HomePage />} />
	  <Route path='/bookmarks' element={<HomePage />} />
	  <Route path='/profile' element={<HomePage />} />

      {/* Auth Routes */}

      {/* Profile Routes */}

      {/* Error Path */}
      <Route path='*' element={<h1>error</h1>} />
    </Routes>
  )
}

export default AppRoutes

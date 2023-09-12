import React from 'react'
import { Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import LoginPage from './pages/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
    <Route path='/' element={<AuthPage />} />
    <Route path='/home' element={<HomePage />} />
	  <Route path='/explore' element={<HomePage />} />
	  <Route path='/notifications' element={<HomePage />} />
	  <Route path='/messages' element={<HomePage />} />
	  <Route path='/bookmarks' element={<HomePage />} />
	  <Route path='/profile' element={<AuthPage />} />

      {/* Auth Routes */}
			<Route path='/signIn' element={<LoginPage />} />

      {/* Profile Routes */}

      {/* Error Path */}
      <Route path='*' element={<h1>error</h1>} />
    </Routes>
  )
}

export default AppRoutes

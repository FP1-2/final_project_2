import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage'
import FavPage from './pages/FavPage/FavPage'
import MessagePage from './pages/MessagePage/MessagePage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<AuthPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/explore' element={<HomePage />} />

      {/* Auth Routes */}
      <Route path='/signIn' element={<LoginPage />} />
      <Route path='/resetPassword' element={<ResetPasswordPage />} />
      <Route path='/resetPassword/confirm' element={<ResetPasswordConfirmPage/>} />


      {/* Profile Routes */}
      <Route path='/notifications' element={<HomePage />} />
      <Route path='/messages' element={<MessagePage />} />
      <Route path='/favourites' element={<FavPage />} />
      <Route path='/profile' element={<HomePage />} />

      {/* Error Path */}
      <Route path='*' element={<h1>error</h1>} />
    </Routes>
  )
}

export default AppRoutes

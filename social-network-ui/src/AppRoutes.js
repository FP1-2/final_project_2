import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FavPage from './pages/FavPage/FavPage';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path='/' element={<AuthPage />} />
			<Route path='/home' element={<HomePage />} />
			<Route path='/explore' element={<HomePage />} />
			<Route path='/favourites' element={<FavPage />} />


      {/* Auth Routes */}
      <Route path="/signIn" element={<LoginPage />} />

      {/* Profile Routes */}
      <Route path="/profile/:userId" element={<ProfilePage />} />
      {/* Error Path */}
      <Route path="*" element={<h1>error</h1>} />
    </Routes>
  );
};

export default AppRoutes;

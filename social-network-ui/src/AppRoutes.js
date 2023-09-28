import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<HomePage />} />

        {/* Auth Routes */}
        <Route path="/signIn" element={<LoginPage />} />

        {/* Profile Routes */}
        <Route path="/notifications" element={<HomePage />} />
        <Route path="/messages" element={<HomePage />} />
        <Route path="/bookmarks" element={<HomePage />} />
        <Route path="/profile" element={<HomePage />} />

        {/* Error Path */}
        <Route path="*" element={<h1>error</h1>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

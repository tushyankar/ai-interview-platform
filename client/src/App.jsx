import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0f2d16] text-white flex items-center justify-center">Loading Data...</div>;
  return user ? children : <Navigate to="/auth" />;
};

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

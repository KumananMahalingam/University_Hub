import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login      from './pages/Login';
import Register   from './pages/Register';
import Home       from './pages/Home';
import Search     from './pages/Search';
import University from './pages/University';
import Reviews    from './pages/Reviews';
import ReviewForm from './pages/ReviewForm';
import Calculator from './pages/Calculator';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected */}
          <Route path="/"                  element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search"            element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path="/universities/:id"  element={<PrivateRoute><University /></PrivateRoute>} />
          <Route path="/review"            element={<PrivateRoute><Reviews /></PrivateRoute>} />
          <Route path="/review/:id"        element={<PrivateRoute><ReviewForm /></PrivateRoute>} />
          <Route path="/calculator"        element={<PrivateRoute><Calculator /></PrivateRoute>} />

          {/* Legacy URL aliases */}
          <Route path="/uoft"     element={<Navigate to="/universities/4" replace />} />
          <Route path="/uwaterloo" element={<Navigate to="/universities/1" replace />} />
          <Route path="/western"  element={<Navigate to="/universities/2" replace />} />
          <Route path="/queens"   element={<Navigate to="/universities/3" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
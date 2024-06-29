// src/Components/Admin/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/admin/login" replace />}
    />
  );
};

export default ProtectedRoute;

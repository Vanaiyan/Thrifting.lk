import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user.role !== "Admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;

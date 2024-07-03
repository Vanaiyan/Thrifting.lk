import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner
  }

  if (!isAuthenticated || user?.role !== "User") {
    return <Navigate to="/login" />;
  }

  return children;
};

const SellerProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner
  }

  if (!isAuthenticated || user?.role !== "Seller") {
    return <Navigate to="/seller/login" />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner
  }

  if (!isAuthenticated || user?.role !== "Admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export { SellerProtectedRoute, AdminProtectedRoute, UserProtectedRoute };

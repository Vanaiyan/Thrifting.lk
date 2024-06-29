import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user.role !== "Seller") {
    return <Navigate to="/seller/login" />;
  }

  return children;
};

export default SellerProtectedRoute;

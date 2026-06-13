import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const storedRole = localStorage.getItem("role");
  const location = useLocation();

  if (!storedRole) {
    return <Navigate to="/login" replace />;
  }

  if (role && storedRole !== role) {

    if (role === "admin" && storedRole === "client") {
      return <Navigate to="/home" replace />;
    }

    if (role === "client" && storedRole === "admin") {
      return <Navigate to="/admindash" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;


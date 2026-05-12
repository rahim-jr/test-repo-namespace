import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;

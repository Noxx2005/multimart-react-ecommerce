// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem("token");

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

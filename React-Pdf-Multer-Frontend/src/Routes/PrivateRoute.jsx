import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  let location = useLocation();
  if (loading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;

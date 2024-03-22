import { Navigate, createBrowserRouter } from "react-router-dom";

import Print from "../Pages/Print/Print";
import Home from "../Pages/Home";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Redirect from "../Pages/Redirect";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirect />,
  },
  {
    path: "/wp-admin",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
  {
    path: "/print/:id",
    element: <App></App>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

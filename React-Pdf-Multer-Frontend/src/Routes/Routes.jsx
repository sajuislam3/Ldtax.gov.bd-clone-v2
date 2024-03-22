import { Navigate, createBrowserRouter } from "react-router-dom";

import Print from "../Pages/Print/Print";
import Home from "../Pages/Home";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Redirect from "../Pages/Redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirect />,
  },
  {
    path: "/wp-admin",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/print/:id",
    element: <App></App>,
  },
]);

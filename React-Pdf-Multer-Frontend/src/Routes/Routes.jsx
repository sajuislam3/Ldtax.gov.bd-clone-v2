import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Print from "../Pages/Print/Print";
import Home from "../Pages/Home";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/print/:id",
    element: <App></App>,
  },
]);

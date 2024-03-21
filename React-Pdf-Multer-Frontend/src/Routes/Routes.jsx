import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Print from "../Pages/Print";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/print/:id",
    element: <Print></Print>,
  },
]);

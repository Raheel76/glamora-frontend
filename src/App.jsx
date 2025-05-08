import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Home, UserLayout } from "./client";
import { ForgotPassword, Login, Signup } from "./auth";
import { AdminLayout, Dashboard } from "./admin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/signup",
      element: (

        <Signup />
      ),
    },
    {
      path: "/auth/login",
      element: (

        <Login />
      ),
    },
    {
      path: "/auth/forgot",
      element: (

        <ForgotPassword />
      ),
    },
    // -----------user layout-----------
    {
      path: "",
      element: (

        <UserLayout />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    // ----------admin dashboard---------
    {
      path: "/admin",
      element: (

        <AdminLayout />
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <><RouterProvider router={router} /> <ToastContainer position="top-right" draggable theme="light" limit={3} /></>;
}

export default App

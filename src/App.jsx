import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword, Login, ResetPassword, Signup, VerifyOtp } from './auth';
import { Home, UserLayout } from './pages/client';
import { AdminLayout, AdminProfile, Dashboard } from './pages/admin';
import { AuthRoute, ProtectedRoute } from './routes';


function App() {
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <AuthRoute />,
      children: [
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'forgot', element: <ForgotPassword /> },
        { path: 'otp', element: <VerifyOtp /> },
        { path: 'reset', element: <ResetPassword /> },
      ],
    },
    {
      path: '',
      element: <ProtectedRoute role="user" />,
      children: [
        {
          path: '',
          element: <UserLayout />,
          children: [
            { path: '/', element: <Home /> },
          ],
        },
      ],
    },
    {
      path: '/admin',
      element: <ProtectedRoute role="admin" />,
      children: [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            { path: '', element: <Dashboard /> },
            { path: 'profile', element: <AdminProfile /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" draggable theme="light" limit={3} />
    </>
  );
}

export default App;
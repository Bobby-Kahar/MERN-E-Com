import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/login';
import Cart from './pages/cart';
import Dashboard from './pages/dashboard';
import MyOrders from './pages/orders';

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

const Protected = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (!user?.token) return <Navigate to="/login" replace />;
  return children;
};

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Redirect to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />       
        <Route
          path="/orders"
          element={
            <Protected>
              <MyOrders />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;

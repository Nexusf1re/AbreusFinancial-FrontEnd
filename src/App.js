import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import Transactions from './pages/Transactions/Transactions';
import Config from './pages/Config/Config';
import ResetPass from './pages/ResetPass/ResetPass';
import Payment from './pages/Payment/Payment';
import ToastConfig from './components/ToastConfig/ToastConfig';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import LandingPage from './pages/Landing/LandingPage';
import useTheme from './hooks/useTheme';

function App() {
  const { isLoggedIn, handleLogin } = useAuth();
  const { initTheme } = useTheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <Router>
      <SpeedInsights />
      <ToastConfig />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/form"
          element={
            isLoggedIn ? (
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/transactions"
          element={
            isLoggedIn ? (
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/config"
          element={
            isLoggedIn ? (
              <ProtectedRoute>
                <Config />
              </ProtectedRoute>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/payment"
          element={isLoggedIn ? <Payment /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

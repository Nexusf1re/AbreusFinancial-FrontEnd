import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import Transactions from './pages/Transactions/Transactions';
import Config from './pages/Config/Config';
import ToastConfig from './components/ToastConfig/ToastConfig';
import useAuth from './hooks/useAuth';
import ResetPass from './pages/ResetPass/ResetPass';
import Payment from './pages/Payment/Payment';

function App() {
  const { isLoggedIn, hasValidSubscription, handleLogin, handleLogout } = useAuth();

  return (
    <Router>
      <SpeedInsights />
      <ToastConfig />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route 
          path="/home" 
          element={isLoggedIn ? (hasValidSubscription ? <Home onLogout={handleLogout} /> : <Navigate to="/payment" />) : <Navigate to="/" />} 
        />
        <Route 
          path="/form" 
          element={isLoggedIn ? (hasValidSubscription ? <Form /> : <Navigate to="/payment" />) : <Navigate to="/" />} 
        />
        <Route 
          path="/transactions" 
          element={isLoggedIn ? (hasValidSubscription ? <Transactions /> : <Navigate to="/payment" />) : <Navigate to="/" />} 
        />
        <Route 
          path="/config" 
          element={isLoggedIn ? (hasValidSubscription ? <Config /> : <Navigate to="/payment" />) : <Navigate to="/" />} 
        />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route 
          path="/payment" 
          element={isLoggedIn ? <Payment /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

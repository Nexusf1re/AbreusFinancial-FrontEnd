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

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <Router>
      <SpeedInsights />
      <ToastConfig />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/form" element={isLoggedIn ? <Form /> : <Navigate to="/" />} />
        <Route path="/transactions" element={isLoggedIn ? <Transactions /> : <Navigate to="/" />} />
        <Route path="/config" element={isLoggedIn ? <Config /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

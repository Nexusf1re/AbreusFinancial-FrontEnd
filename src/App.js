import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import Transactions from './pages/Transactions/Transactions';
import Config from './pages/Config/Config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth'; // Importando o hook de autenticação

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <Router>
      <SpeedInsights />
      <ToastContainer />
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

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import Transactions from './pages/Transactions/Transactions';
import Config from './pages/Config/Config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/config' element={<Config />} />
      </Routes>
    </Router>
  );
}

export default App;

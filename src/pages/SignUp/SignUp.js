import React, { useState } from 'react';
import Slogan from '../../assets/Slogan.png'; 
import { FaLock } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import './SignUp.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User:', username)
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('ConfirmPassword:', confirmPassword);
  };

  return (
    <div className="wrapper">
      <img src={Slogan} alt="Logo" />
      <h1>Cadastre-se</h1>
     <h3 id='controle'>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>

      <div className="input-box">
         <FaRegUser  className='icon'/>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="input-box">
        <FaRegEnvelope className='icon'/>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">

        <FaLock className='icon'/>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </div>

        <div className="input-box">
        <FaLock className='icon'/>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Senha"
            required
          />
        </div>

        <button type="submit" className="btn">Cadastrar</button>
      </form>
      <div id="cadastrar">
        <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Login;

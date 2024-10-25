import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Slogan from '../../assets/Slogan.png'; 
import { FaLock, FaRegEnvelope } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/home');
  };

  return (
    <div className="wrapper">
      <img src={Slogan} alt="Logo" />
      <h1>Login</h1>
      <h3 id='controle'>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>
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
        <button className="btn" type="submit">Entrar</button>
      </form>
      <div id="cadastrar">
        <a href="/sign-up"><p>Não tem uma conta?</p> Cadastre-se</a>
      </div>
    </div>
  );
};

export default Login;

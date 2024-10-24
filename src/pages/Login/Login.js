// src/pages/Login/Login.js

import React, { useState } from 'react';
import './Login.css'; // Importando o CSS
import Slogan from '../../assets/Slogan.png'; // Ajustando o caminho para a imagem

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados de login
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="wrapper">
      <img src={Slogan} alt="Logo" /> {/* Usando a imagem importada */}
      <h1>Login</h1>
      <h3 id='controle'>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </div>
        <button type="submit" className="btn">Entrar</button>
      </form>
      <div id="cadastrar">
        <a href="/register"><i>Não tem uma conta?</i> Cadastre-se</a> {/* Link para página de cadastro */}
      </div>
    </div>
  );
};

export default Login;

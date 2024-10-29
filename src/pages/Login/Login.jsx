import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import styles from './Login.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope } from "react-icons/fa6";

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(Email, Password); 
      console.log('Login Successful:', response);
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles.loginPage}`}>
      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1>Login</h1>
      <h3 className={styles.controle}>Controle Financeiro</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <FaRegEnvelope className={styles.icon} />
          <input
            type="email"
            id="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            required
          />
        </div>
        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            aria-label="Senha"
            required
          />
        </div>
        <button className={styles.btn} type="submit">Entrar</button>
      </form>
      <div className={styles.cadastrar}>
        <Link to="/sign-up"><p>Não tem uma conta?</p> Cadastre-se</Link>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css'; // Usando CSS Module
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
    <div className={`${styles.wrapper} ${styles.loginPage}`}>
      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1>Login</h1>
      <h3 className={styles.controle}>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <FaRegEnvelope className={styles.icon} />
          <input
            type="email"
            id="email"
            value={email}
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
            value={password}
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

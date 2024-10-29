import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../../services/authService';
import styles from './Login.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verifica se o usuário já está autenticado ao carregar a página de login
  useEffect(() => {
    if (isAuthenticated()) {
      onLogin(); 
      navigate('/home'); 
    }
  }, [navigate, onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login(Email, Password);
      const username = response.Username;
      localStorage.setItem('username', username);
      
      // Exibe o toast de sucesso
      toast.success("Login bem-sucedido!");
  
      // Atrasar a navegação para permitir que o toast apareça
      setTimeout(() => {
        onLogin(); 
        navigate('/home');
      }, 2000); // Ajuste o tempo conforme necessário
    } catch (err) {
      setError('Email ou senha incorretos.');
      toast.error("Email ou senha incorretos.");
    }
  };
  

  return (
    <div className={`${styles.wrapper} ${styles.loginPage}`}>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1>Login</h1>
      <h3 className={styles.controle}>Controle Financeiro</h3>
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

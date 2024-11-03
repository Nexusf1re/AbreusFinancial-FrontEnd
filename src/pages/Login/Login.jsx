import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../../services/authService';
import styles from './Login.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer/Footer'

const Login = ({ onLogin }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

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
      localStorage.setItem('username', response.Username);
      toast.success("Login bem-sucedido!");
      setTimeout(() => {
        onLogin();
        navigate('/home');
      }, 500);
    } catch (err) {
      toast.error("Email ou senha incorretos.");
    }
  };
  

  return (
    <div className={`${styles.wrapper} ${styles.loginPage}`}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="colored"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "300px",
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          borderRadius: "8px",
        }}
      />

      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1 className={styles.h1}>Login</h1>
      <h3 className={styles.controle}>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <FaRegEnvelope className={styles.icon} />
          <input
           className={styles.input}
            type="email"
            id="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            className={styles.input}
            type="password"
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </div>
        <button className={styles.btn} type="submit">Entrar</button>
      </form>
      <div className={styles.cadastrar}>
        <Link className={styles.a} to="/sign-up"><p className={styles.p}>Não tem uma conta?</p> Cadastre-se</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

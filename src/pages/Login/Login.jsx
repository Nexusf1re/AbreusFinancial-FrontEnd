import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../../services/authService';
import styles from './Login.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer/Footer';

const Login = ({ onLogin }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      }, 2500);
    } catch (err) {
      toast.error("Email ou senha incorretos.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    const formattedEmail = e.target.value.replace(/\s+/g, '').toLowerCase().trim();
    setEmail(formattedEmail);
  };

  return (
    <div className={`${styles.wrapper} ${styles.loginPage}`}>
      <ToastConfig />

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
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"} // Altera o tipo de input dependendo do estado
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
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

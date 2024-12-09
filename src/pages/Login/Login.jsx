//src/pages/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../../services/authService';
import { checkSubscriptionStatus } from '../../services/subscriptionService';
import styles from './Login.module.css';
import SloganDark from '../../assets/Slogan.png';
import SloganWhite from '../../assets/Slogan White.png';
import { FaLock, FaRegEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer/Footer';
import ResetPassword from '../../components/ForgotPass/ResetPassword';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

const Login = ({ onLogin }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockWarning, setCapsLockWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlogan, setCurrentSlogan] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? SloganWhite : SloganDark;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      onLogin();
      navigate('/home');
    }
  }, [navigate, onLogin]);

  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkTheme = document.body.classList.contains('dark-theme');
      setCurrentSlogan(isDarkTheme ? SloganWhite : SloganDark);
    };

    // Observador de mudanças na classe do body
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Limpeza do observador
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(Email, Password);
      localStorage.setItem('username', response.Username);

      await onLogin();  // Aguarda o login ser completado

      try {
        const subscriptionStatus = await checkSubscriptionStatus();
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (subscriptionStatus === 'active' || subscriptionStatus === 'trialing') {
          toast.success("Login bem-sucedido!");
          navigate('/home');
        } else {
          navigate('/payment');
        }
      } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
        navigate('/payment');
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
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

  const handleCapsLock = (e) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLockWarning(true);
    } else {
      setCapsLockWarning(false);
    }
  };

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/landing');
  };

  return (
    <>
      <div className={styles.container}>
        <ToastConfig />
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '9999' }}>
          <ThemeToggle />
        </div>
        <img
          src={currentSlogan}
          alt="Logo"
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
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
              autoComplete="email"
            />
          </div>
          <div className={styles.inputBox}>
            <FaLock className={styles.icon} />
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              onKeyDown={handleCapsLock}
              required
              autoComplete="current-password"
            />

            {capsLockWarning && (
              <div className={styles.capsLockWarning}>
                <p style={{ fontSize: '18px' }}>Caps Lock está ativado</p>
              </div>
            )}

            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className={styles.btn} type="submit">Entrar</button>
        </form>

        <div className={styles.forgotPassword}>
          <button onClick={openModal}>Esqueci a senha</button>
        </div>

        <div className={styles.cadastrar}>
          <Link className={styles.a} to="/sign-up"><p className={styles.p}>Não tem uma conta?</p> Cadastre-se</Link>
        </div>

        <ResetPassword isModalOpen={isModalOpen} closeModal={closeModal} />
      </div>
      <Footer />
    </>
  );
};

export default Login;

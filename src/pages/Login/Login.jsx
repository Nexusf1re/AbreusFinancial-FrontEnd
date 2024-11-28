//src/pages/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../../services/authService';
import { checkSubscriptionStatus } from '../../services/subscriptionService';
import styles from './Login.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer/Footer';
import ResetPassword from '../../components/ForgotPass/ResetPassword';

const Login = ({ onLogin }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockWarning, setCapsLockWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

        // Após o login, verifica o status da assinatura
        setTimeout(async () => {
            try {
                await onLogin();

                const subscriptionStatus = await checkSubscriptionStatus();

                if (subscriptionStatus === 'active' || subscriptionStatus === 'trialing') {
                    console.log(`Assinatura com status '${subscriptionStatus}'`);
                    navigate('/home'); // Redireciona para a home
                } else {
                    console.log("Assinatura com status != 'active' e != 'trialing'");
                    navigate('/payment'); // Redireciona para a página de pagamento
                }
            } catch (error) {
                console.error("Erro ao verificar assinatura:", error.message);
                navigate('/payment');
                toast.error("Erro ao verificar assinatura. Redirecionando para pagamento.");
            }
        }, 1500);
    } catch (err) {
        console.error("Erro durante o login:", err.message);
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
            type={showPassword ? "text" : "password"}
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            onKeyDown={handleCapsLock} 
            required
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

      <Footer />
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope, FaUser } from "react-icons/fa6";
import useRegister from '../../hooks/useRegister';
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [capsLockWarning, setCapsLockWarning] = useState(false); 
  const { registerUser, loading, success } = useRegister();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const formattedUsername = e.target.value.replace(/\s+/g, '').toUpperCase().trim();
    setUsername(formattedUsername);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não correspondem.");
      return;
    }

    await registerUser({ username, email, password });
  };

  // Verifica se o registro foi bem-sucedido e redireciona
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/');  
      }, 1500);
    }
  }, [success, navigate]);

  return (
    <div className={`${styles.wrapper} ${styles.signUpPage}`}>
      <ToastConfig />
      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1>Cadastro</h1>
      <h3 className={styles.controle}>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Seu Nome"
            aria-label="Nome"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <FaRegEnvelope className={styles.icon} />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            aria-label="Email"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            aria-label="Senha"
            required
            onKeyDown={handleCapsLock} 
          />
        </div>

        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a Senha"
            aria-label="Confirme a Senha"
            required
            onKeyDown={handleCapsLock}
          />
        </div>

        {capsLockWarning && (
          <div className={styles.capsLockWarning}>
            <p style={{ fontSize: '18px' }}>Caps Lock está ativado</p>
          </div>
        )}

        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <div className={styles.cadastrar}>
        <Link to="/"><p>Já tem uma conta?</p> Faça login</Link>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope, FaUser } from "react-icons/fa6";
import useRegister from '../../hooks/useRegister';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerUser, loading, error, success } = useRegister();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    // Remove espaços e converte para maiúsculas
    const formattedUsername = e.target.value.replace(/\s+/g, '').toUpperCase();
    setUsername(formattedUsername);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não correspondem.");
      return;
    }

    await registerUser({ username, email, password });

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles.signUpPage}`}>
      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1>Cadastro</h1>
      <h3 className={styles.controle}>Controle Financeiro</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange} // Chama a função personalizada
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            aria-label="Senha"
            required
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
          />
        </div>

        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <div className={styles.cadastrar}>
        <Link to="/"><p>Já tem uma conta?</p> Faça login</Link>
      </div>
    </div>
  );
};

export default SignUp;

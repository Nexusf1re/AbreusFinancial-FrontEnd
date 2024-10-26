import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp.module.css'; // Usando CSS Module
import Slogan from '../../assets/Slogan.png';
import { FaLock, FaRegEnvelope } from "react-icons/fa6";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/login'); // Redirecionar para login após registro
  };

  return (
    <div className={`${styles.wrapper} ${styles.signUpPage}`}>
      <img src={Slogan} alt="Logo" className={styles.logo} />
      <h1>Cadastro</h1>
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
        <div className={styles.inputBox}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a Senha"
            aria-label="Confirme a Senha"
            required
          />
        </div>
        <button className={styles.btn} type="submit">Cadastrar</button>
      </form>
      <div className={styles.cadastrar}>
        <Link to="/"><p>Já tem uma conta?</p> Faça login</Link>
      </div>
    </div>
  );
};

export default SignUp;

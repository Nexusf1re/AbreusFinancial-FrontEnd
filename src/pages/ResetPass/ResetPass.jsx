import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ResetPass.module.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Pegando o token da URL
  const token = new URLSearchParams(location.search).get('token');

  // Função para resetar a senha
  const resetPassword = async () => {
    console.log('Token:', token);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword, token }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao redefinir a senha');
      }
    } catch (err) {
      setError('Ocorreu um erro ao redefinir a senha');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para navegar de volta para o login
  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h2 className={styles.h2}>Redefinir Senha</h2>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>Senha redefinida com sucesso! Redirecionando para login...</p>}

      <form onSubmit={(e) => { e.preventDefault(); resetPassword(); }} className={styles.form}>
        <div className={styles.form}>
          <label htmlFor="newPassword" className={styles.label}>Nova Senha</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.form}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? 'Carregando...' : 'Redefinir Senha'}
        </button>
      </form>


      <button onClick={goToLogin} className={`${styles.button} ${styles.buttonLogin}`}>
        Voltar para o Login
      </button>
    </div>
  );
};

export default ResetPassword;
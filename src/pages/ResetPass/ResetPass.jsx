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
        body: JSON.stringify({ newPassword }),
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

  return (
    <div className={styles.resetPasswordContainer}>
      <h2>Redefinir Senha</h2>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>Senha redefinida com sucesso! Redirecionando para login...</p>}
      
      <form onSubmit={(e) => { e.preventDefault(); resetPassword(); }}>
        <div>
          <label htmlFor="newPassword">Nova Senha</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Redefinir Senha'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

// src/hooks/useRegister.js
import { useState } from 'react';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const registerUser = async ({ username, email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Email: email, Password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};

export default useRegister;
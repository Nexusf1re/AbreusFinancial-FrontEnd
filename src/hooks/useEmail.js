import { useState } from 'react';
import axios from 'axios';

const useEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Acessando a variável de ambiente para URL da API
      const apiUrl = process.env.REACT_APP_API_URL;
      
      // Enviando a requisição para o backend para enviar o email
      const response = await axios.post(`${apiUrl}/auth/send-password-reset-email`, {
        email: email
      });

      if (response.status === 200) {
        setSuccess(true);
      } else {
        throw new Error('Falha ao enviar email');
      }
    } catch (err) {
      setError('Ocorreu um erro ao enviar o email');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    success,
    error,
    sendEmail
  };
};

export default useEmail;

import emailjs from 'emailjs-com';
import { useState } from 'react';

const useEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Função para obter o link de redefinição do backend
  const fetchResetLink = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/generate-reset-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar o link de redefinição');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter link de redefinição:', error);
      throw error;
    }
  };

  // Função principal para envio do email
  const sendEmail = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Gera o link de redefinição de senha
      const { resetLink, username } = await fetchResetLink(email);

      // 2. Envia o email com o link gerado usando EmailJS
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { 
          to_email: email,
          name: username,   
          resetLink: resetLink,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      );

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
    sendEmail,
  };
};

export default useEmail;

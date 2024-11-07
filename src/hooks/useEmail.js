import emailjs from 'emailjs-com';
import { useState } from 'react';

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
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { to_email: email }, 
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
    sendEmail
  };
};

export default useEmail;

// src/components/AccessPortalButton/AccessPortalButton.jsx
import React from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';

const AccessPortalButton = () => {
  // Função para acessar o portal do cliente
  const handleAccessPortal = async () => {
    try {
      const token = localStorage.getItem('token'); // Supondo que o token JWT esteja no localStorage
      if (!token) {
        toast.error('Token de autenticação não encontrado!');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/stripe/create-portal-session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho Authorization
          },
        }
      );

      const { url } = response.data;

      if (url) {
        window.location.href = url; // Redireciona para o portal do cliente
      } else {
        toast.error('Erro ao acessar o portal do cliente.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao acessar o portal do cliente. Tente novamente.');
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleAccessPortal}
      style={{ marginBottom: '20px' }}
    >
      Acessar Área de Pagamento
    </Button>
  );
};

export default AccessPortalButton;

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Função para criar a sessão de checkout no backend
export const createCheckoutSession = async () => {
  try {
    const response = await axios.post('/api/create-checkout-session');
    return response.data; // A resposta contém o ID da sessão do Stripe
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    throw new Error('Erro ao criar sessão de checkout');
  }
};

export const getSubscriptionStatus = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/stripe/subscriptions/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.status; // Retorna o status: "active", "trialing", ou "inactive"
  } catch (error) {
    throw new Error('Erro ao obter o status da assinatura');
  }
};

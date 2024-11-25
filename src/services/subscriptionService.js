//src/services/subscriptionService.js
import axios from 'axios';

// Função para verificar o status da assinatura
export const checkSubscriptionStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error('Token não encontrado no localStorage');
        throw new Error('Token não encontrado no localStorage');
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/stripe/check-subscription`, {
            headers: {
                Authorization: `Bearer ${token}`, // Envia o token JWT
            },
        });

        if (response.status === 200) {
            if (response.data.error) {
                console.error('Erro na resposta do servidor:', response.data.error);
                throw new Error(response.data.error);
            }
            return response.data.subscriptionStatus; // 'active', 'inactive', 'trialing'
        } else {
            console.error('Erro ao verificar status da assinatura. Código:', response.status);
            throw new Error('Erro ao verificar o status da assinatura');
        }
    } catch (error) {
        console.error('Erro ao verificar o status da assinatura:', error.message);
        throw new Error('Erro ao verificar o status da assinatura: ' + error.message);
    }
};


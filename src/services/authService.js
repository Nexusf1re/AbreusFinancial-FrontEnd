import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

// Função de login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            Email: email,
            Password: password,
        });

        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            return response.data;
        } else {
            throw new Error('Erro ao autenticar.');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao tentar fazer login.');
    }
};

// Função para obter o username do token
export const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    const decodedToken = jwtDecode(token);
    return decodedToken.username; 
};

// Função para buscar dados financeiros
export const fetchFinancialData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Token não encontrado no localStorage');
    }

  
    const username = getUsernameFromToken();

    try {
        const response = await axios.get(`${API_URL}/transactions/financial`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar dados financeiros: ' + error.message);
    }
};

// Função de logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true se o token existir, false caso contrário
};

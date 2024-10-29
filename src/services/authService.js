import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrigido para importar corretamente

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

// Função de login
// Função de login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      Email: email,
      Password: password,
    });

    // Verifica se a resposta foi bem-sucedida
    if (response.status === 200) {
      // Armazena o token JWT no localStorage
      localStorage.setItem('token', response.data.token);
      
      localStorage.setItem('username', response.data.Username);

      return response.data;
    } else {
      throw new Error('Erro ao autenticar.');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao tentar fazer login.');
  }
};


// Função para obter o username do localStorage
export const getUsername = () => {
  return localStorage.getItem('username');
};

// Função de logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username'); // Remove o username ao fazer logout
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Retorna true se o token existir, false caso contrário
};

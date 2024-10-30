import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

// Função de login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      Email: email,
      Password: password,
    });

    // Verifica se a resposta foi bem-sucedida
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      return response.data; // Retorna os dados do usuário
    } else {
      throw new Error('Erro ao autenticar.');
    }
  } catch (error) {
    // Lança um erro se a autenticação falhar
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
  localStorage.removeItem('username');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Retorna true se o token existir, false caso contrário
};

// Função para verificar se o usuário está autenticado e obter o username
export const getAuthUser = () => {
  const username = getUsername();
  const authenticated = isAuthenticated();
  return { authenticated, username };
};

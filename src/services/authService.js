import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      Email: email,
      Password: password,
    });

    // Verifica se a resposta foi bem-sucedida
    if (response.status === 200) {
      // Armazena o token e o nome de usuário no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.Username);
      localStorage.setItem('userId', response.data.UserId);
      return response.data;
    } else {
      throw new Error('Erro ao autenticar.');
    }
  } catch (error) {
    // Lança um erro com uma mensagem específica
    throw new Error(error.response?.data?.message || 'Erro ao tentar fazer login.');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      Username: username,
      Email: email,
      Password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao tentar registrar.');
  }
};

// Função para remover o token do localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  // Verifica se o token existe no localStorage
  const token = localStorage.getItem('token');
  return !!token; // Retorna true se o token existir, false caso contrário
};

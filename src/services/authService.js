import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      Email: email,
      Password: password,
    });


    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

// Função para remover o token do localStorage
export const logout = () => {
  localStorage.removeItem('token');
};

// src/services/categoryService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCategories = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/categories/list`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error; 
  }
};

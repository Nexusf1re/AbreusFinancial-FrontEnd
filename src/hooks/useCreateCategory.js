// src/hooks/useCreateCategory.js
import { useState } from 'react';

const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (categoryData) => {
    setLoading(true);
    setError(null);

    // Obtém a URL da API do arquivo .env
    const apiUrl = process.env.REACT_APP_API_URL; 
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');  

    try {
      const response = await fetch(`${apiUrl}/category/register`, { // Endpoint para criação de categoria
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adiciona o token de autenticação no cabeçalho
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData), // Envia os dados da categoria como JSON
      });

      // Verifica se a resposta não está ok e lança um erro
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar a categoria');
      }

      // Retorna o resultado da criação da categoria
      const result = await response.json();
      return result; 
    } catch (err) {
      // Define o erro se ocorrer
      setError(err.message);
    } finally {
      // Independentemente do resultado, finaliza o carregamento
      setLoading(false);
    }
  };

  return { createCategory, loading, error }; // Retorna a função e estados
};

export default useCreateCategory;

// src/hooks/useCreateCategory.js
import { useState } from 'react';

const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (categoryData) => {
    setLoading(true);
    setError(null);

   
    const apiUrl = process.env.REACT_APP_API_URL; 
  
    const token = localStorage.getItem('token');  

    try {
      const response = await fetch(`${apiUrl}/category/register`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar a categoria');
      }

      const result = await response.json();
      return result; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading, error }; 
};

export default useCreateCategory;

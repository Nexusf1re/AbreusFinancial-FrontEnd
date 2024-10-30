// src/hooks/useCategories.js
import { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryService';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const fetchedCategories = await fetchCategories(token);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading };
};

export default useCategories;

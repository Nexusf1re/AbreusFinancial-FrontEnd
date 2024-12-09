import { useEffect, useState } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${apiUrl}/category/list`, { headers });

        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Erro:', err);
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error };
};

export default useCategories;

import { useState } from 'react';
import axios from 'axios';

const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCategory = async (categoryId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/category/delete/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir categoria");
      setLoading(false);
      console.error("Erro ao excluir categoria:", err);
    }
  };

  return {
    deleteCategory,
    loading,
    error,
  };
};

export default useDeleteCategory;

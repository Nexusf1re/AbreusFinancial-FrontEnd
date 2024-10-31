import { useState, useEffect } from 'react';

const useConfig = () => {
  const [formValues, setFormValues] = useState({ nome: '', categoria: '', tipo: '' });
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aqui você pode carregar as categorias existentes, se necessário
    // Por exemplo, uma chamada à API
  }, []);

  const updateName = (nome) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      nome,
    }));
  };

  const addCategory = (categoria, tipo) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: categoria, type: tipo }, // Armazena categoria e tipo
    ]);
  };

  const resetForm = () => {
    setFormValues({ nome: '', categoria: '', tipo: '' });
  };

  return {
    formValues,
    categories,
    loading,
    updateName,
    addCategory,
    resetForm,
    setLoading,
  };
};

export default useConfig;

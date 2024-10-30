// src/hooks/useForm.js
import { useState } from 'react';
import useCategories from './useCategories';

const useForm = () => {
  const [formData, setFormData] = useState({
    value: '',
    description: '',
    payment: '',
    type: '',
    category: '',
    date: null,
  });
  
  const { categories, loading } = useCategories(); // Chama o hook de categorias

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (values) => {
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log('Dados enviados:', formData);
  };

  return { formData, handleChange, handleSubmit, categories, loading };
};

export default useForm;

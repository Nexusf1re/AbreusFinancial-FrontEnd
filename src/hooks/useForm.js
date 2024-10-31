import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Big from 'big.js';

const useForm = () => {
  const [formData, setFormData] = useState({
    value: '',
    description: '',
    type: '',
    payment: '',
    category: '',
    date: dayjs(),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }
  
    try {
      setLoading(true);
  
      const value = new Big(formData.value);
      const formattedData = {
        Value: formData.type === 'Saida' ? value.neg() : value.toNumber(), 
        PaymentMethod: formData.payment,
        Type: formData.type,
        Date: formData.date.format('YYYY-MM-DD'),
        Category: formData.category,
        Description: formData.description,
      };
  
      const response = await axios.post(
        `${apiUrl}/transactions/insert`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      
      toast.success('Transação inserida com sucesso!');
      setFormData({
        value: '',
        description: '',
        type: '',
        payment: '',
        category: '',
        date: dayjs(), 
      });
      return response.data;
    } catch (error) {
      toast.error('Erro ao inserir transação. Verifique os dados e tente novamente.');
      console.error("Erro ao inserir transação:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  

  return { formData, handleChange, handleSubmit, loading };
};

export default useForm;

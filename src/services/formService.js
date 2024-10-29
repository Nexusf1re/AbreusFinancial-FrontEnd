import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

export const insertTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions/insert`, transactionData);
    return response.data; 
  } catch (error) {
    console.error("Erro ao inserir transação:", error);
    throw error;
  }
};

const API_URL = process.env.REACT_APP_API_URL;

export const fetchFinancialData = async (username) => {
    try {
        const response = await fetch(`${API_URL}/transactions/financial?Username=${username}`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro na chamada da API:", error);
        throw error;
    }
};

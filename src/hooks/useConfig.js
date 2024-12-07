import { useState, useEffect } from 'react';
import useListCategories from './useListCategories';
import useCreateCategory from './useCreateCategory';
import useDeleteCategory from './useDeleteCategory';

const useConfig = () => {
  const [formNome] = useState(null);
  const [formCategoria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Adicionei o estado aqui

  // Carregue as categorias assim que o hook for montado
  const { categories: fetchedCategories, error: listError } = useListCategories();
  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories); // Atualiza o estado com as categorias buscadas
    }
  }, [fetchedCategories]);

  const { createCategory, loading: creating, error: createError } = useCreateCategory();
  const { deleteCategory, loading: deleting, error: deleteError } = useDeleteCategory();

  const entradas = categories.filter((item) => item.Type === 'Entrada');
  const saidas = categories.filter((item) => item.Type === 'Saida');

  const updateName = async (values) => {
    setLoading(true);
    try {
      console.log('Nome salvo:', values.nome);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao salvar nome:', error);
      setLoading(false);
    }
  };

  const addCategory = async (values) => {
    setLoading(true);
    try {
      const categoryData = {
        Category: values.Category,
        Type: values.Type,
        Id: values.Id,
      };
      const response = await createCategory(categoryData);
      if (response) {
        // Atualiza diretamente o estado local para evitar a necessidade de recarregar
        setCategories((prevCategories) => [
          ...prevCategories,
          { ...categoryData, Id: response.id } // Adiciona a nova categoria ao estado
        ]);
      }
      setLoading(false);
      return response;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      await deleteCategory(categoryId);
      // Remove diretamente a categoria do estado local
      setCategories((prevCategories) =>
        prevCategories.filter(category => category.Id !== categoryId)
      ); // Atualiza o estado local
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishNome = async (values) => {
    await updateName(values);
    formNome?.resetFields();
  };

  const onFinishCategoria = async (values) => {
    const response = await addCategory(values);
    if (response) {
      formCategoria?.resetFields();
    }
  };

  return {
    formNome,
    formCategoria,
    loading: loading || creating || deleting,
    updateName,
    addCategory,
    onFinishNome,
    onFinishCategoria,
    handleDeleteCategory,
    categories,
    entradas,
    saidas,
    createError,
    listError,
    deleteError,
  };
};

export default useConfig;

// src/pages/Config/Config.jsx
import { Form, Input, Select, Button, Typography, Spin, List } from 'antd';
import React, { useState, useMemo } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import useConfig from '../../hooks/useConfig';
import styles from './Config.module.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import Footer from '../../components/Footer/Footer';
import FormModal from '../../components/FormModal/FormModal';
import FormBtn from '../../components/FormModal/FormBtn';
import ToastConfig from '../../components/ToastConfig/ToastConfig';
import AccessPortalButton from '../../components/AccessPortalButton/AccessPortalButton';
import { defaultCategories } from '../../components/DefaultCategories';

const { Title } = Typography;
const { Option } = Select;

const Config = () => {
  const {
    formCategoria,
    loading,
    onFinishCategoria,
    handleDeleteCategory,
    entradas,
    saidas,
    createError,
    listError,
    deleteError,
  } = useConfig();

  const isDefaultCategory = (category, type) => {
    return defaultCategories.some(
      (defaultCat) => defaultCat.Category === category && defaultCat.Type === type
    );
  };

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const handleDeleteClick = (categoryId) => {
    handleDeleteCategory(categoryId);
  };

  const combinedEntradas = useMemo(
    () => [...defaultCategories.filter((cat) => cat.Type === 'Entrada'), ...entradas],
    [entradas]
  );

  const combinedSaidas = useMemo(
    () => [...defaultCategories.filter((cat) => cat.Type === 'Saida'), ...saidas],
    [saidas]
  );

  return (
    <div className={styles.container}>
      <TopBar />
      <ToastConfig />
      
      <div className={styles.content}>
        <Title level={2} className={styles.pageTitle}>Configurações</Title>
        
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin tip="Carregando..." size="large" />
          </div>
        ) : (
          <>
            <div className={styles.topSection}>
              <AccessPortalButton />
              <FormBtn onClick={showModal} className={styles.formButton} />
            </div>

            <div className={styles.categorySection}>
              <Form form={formCategoria} layout="vertical" onFinish={onFinishCategoria}>
                <Form.Item className={styles.newCategoryForm} label="Nova Categoria">
                  <div className={styles.formInputs}>
                    <Form.Item
                      name="Category"
                      noStyle
                      rules={[{ required: true, message: 'Por favor, insira uma nova categoria!' }]}
                    >
                      <Input
                        placeholder="Nome da nova Categoria"
                        className={styles.categoryInput}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Type"
                      noStyle
                      rules={[{ required: true, message: 'Por favor, selecione um tipo!' }]}
                    >
                      <Select placeholder="Tipo" className={styles.typeSelect}>
                        <Option value="Entrada">Entrada</Option>
                        <Option value="Saida">Saída</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <Button type="primary" htmlType="submit" className={styles.submitButton}>
                    Adicionar Categoria
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className={styles.categoriesContainer}>
              <Title level={3} className={styles.sectionTitle}>
                Categorias Cadastradas
              </Title>
              
              <div className={styles.errorMessages}>
                {createError && <p className={styles.errorText}>{createError}</p>}
                {listError && <p className={styles.errorText}>{listError}</p>}
                {deleteError && <p className={styles.errorText}>{deleteError}</p>}
              </div>

              <div className={styles.listsContainer}>
                <div className={styles.categoryList}>
                  <Title level={4} className={styles.listTitle}>Entradas</Title>
                  <List
                    className={styles.list}
                    bordered
                    dataSource={combinedEntradas}
                    renderItem={(item) => (
                      <List.Item className={styles.listItem}>
                        <span className={styles.categoryName}>{item.Category}</span>
                        {isDefaultCategory(item.Category, 'Entrada') ? (
                          <span className={styles.defaultBadge}>Padrão</span>
                        ) : (
                          <DeleteOutlined
                            className={styles.deleteIcon}
                            onClick={() => handleDeleteClick(item.Id)}
                          />
                        )}
                      </List.Item>
                    )}
                  />
                </div>

                <div className={styles.categoryList}>
                  <Title level={4} className={styles.listTitle}>Saídas</Title>
                  <List
                    className={styles.list}
                    bordered
                    dataSource={combinedSaidas}
                    renderItem={(item) => (
                      <List.Item className={styles.listItem}>
                        <span className={styles.categoryName}>{item.Category}</span>
                        {isDefaultCategory(item.Category, 'Saida') ? (
                          <span className={styles.defaultBadge}>Padrão</span>
                        ) : (
                          <DeleteOutlined
                            className={styles.deleteIcon}
                            onClick={() => handleDeleteClick(item.Id)}
                          />
                        )}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <FormModal visible={visible} onCancel={handleCancel} />
      <BottomBar />
      <Footer />
    </div>
  );
};

export default Config;

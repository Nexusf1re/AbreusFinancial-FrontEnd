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
      <div>
        <FormBtn onClick={showModal} />
        <FormModal visible={visible} onCancel={handleCancel} />
      </div>

      <div className={styles.content}>
        <Title level={2}>Configurações</Title>
        {loading ? (
          <Spin tip="Carregando..." />
        ) : (
          <>
            <AccessPortalButton />
            
            <Form form={formCategoria} layout="vertical" onFinish={onFinishCategoria}>
              <Form.Item className={styles.newLabel} label="Nova Categoria">
                <Form.Item
                  name="Category"
                  noStyle
                  rules={[{ required: true, message: 'Por favor, insira uma nova categoria!' }]} >
                  <Input
                    placeholder="Nome da nova Categoria"
                    style={{ width: '65%' }}
                  />
                </Form.Item>
                <Form.Item
                  name="Type"
                  noStyle
                  rules={[{ required: true, message: 'Por favor, selecione um tipo!' }]} >
                  <Select placeholder="Tipo" style={{ width: '30%', marginLeft: '5px' }}>
                    <Option value="Entrada">Entrada</Option>
                    <Option value="Saida">Saida</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginTop: '10px' }}>
                    Salvar
                  </Button>
                </Form.Item>
              </Form.Item>
            </Form>

            <div className={styles.categoriesList}>
              <Title level={3}>Categorias Cadastradas</Title>
              {createError && <p style={{ color: 'red' }}>{createError}</p>}
              {listError && <p style={{ color: 'red' }}>{listError}</p>}
              {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}

              <Title level={4}>Entradas</Title>
              <List
                className={styles.listCategories}
                bordered
                dataSource={combinedEntradas}
                renderItem={(item) => (
                  <List.Item
                    actions={
                      isDefaultCategory(item.Category, 'Entrada')
                        ? [
                            <span style={{ color: 'gray', fontSize: '12px' }}>
                              Padrão
                            </span>,
                          ]
                        : [
                            <DeleteOutlined
                              style={{ color: 'red' }}
                              onClick={() => handleDeleteClick(item.Id)}
                            />,
                          ]
                    }>
                    {item.Category}
                  </List.Item>
                )}
              />

              <Title level={4}>Saidas</Title>
              <List
                className={styles.listCategories}
                bordered
                dataSource={combinedSaidas}
                renderItem={(item) => (
                  <List.Item
                    actions={
                      isDefaultCategory(item.Category, 'Saida')
                        ? [
                            <span style={{ color: 'gray', fontSize: '12px' }}>
                              Padrão
                            </span>,
                          ]
                        : [
                            <DeleteOutlined
                              style={{ color: 'red' }}
                              onClick={() => handleDeleteClick(item.Id)}
                            />,
                          ]
                    }>
                    {item.Category}
                  </List.Item>
                )}
              />
            </div>
          </>
        )}
      </div>
      <BottomBar />
      <Footer />
    </div>
  );
};

export default Config;

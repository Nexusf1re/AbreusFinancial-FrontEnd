import React from 'react';
import { Form, Input, Select, Button, Typography, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import useConfig from '../../hooks/useConfig'; // Importando o hook personalizado
import styles from './Config.module.css'; // Importando os estilos do CSS Module

const { Title } = Typography;
const { Option } = Select;

const Config = () => {
  const {
    formValues,
    categories,
    loading,
    updateName,
    addCategory,
    resetForm,
    setLoading,
  } = useConfig();

  const onFinish = (values) => {
    // Atualiza o nome e cadastra a nova categoria
    console.log('Form values:', values);
    
    updateName(values.nome);
    addCategory(values.categoria, values.tipo);
    resetForm(); // Reseta o formulário após o envio
  };

  return (
    <div className={styles.container}> {/* Aplicando a classe do CSS Module */}
      <TopBar />
      <div className={styles.content}>
        <Title level={2}>Configurações</Title>
        
        {loading ? (
          <Spin tip="Carregando..." />
        ) : (
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={formValues}
          >
            {/* Campo para atualizar o nome */}
            <Form.Item
              name="nome"
              label="Nome"
              rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
            >
              <Input onChange={(e) => updateName(e.target.value)} />
            </Form.Item>

            {/* Botão para salvar o nome */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar Nome
              </Button>
            </Form.Item>

            <hr />

            {/* Seção para cadastrar nova categoria */}
            <Title level={4}>Cadastrar Nova Categoria</Title>
            <Form.Item
              label="Nova Categoria"
              style={{ display: 'flex', alignItems: 'center' }} // Estilo para alinhar lado a lado
            >
              <Form.Item
                name="categoria"
                noStyle
                rules={[{ required: true, message: 'Por favor, insira uma nova categoria!' }]}
              >
                <Input placeholder="Nome da nova categoria" style={{ width: '70%' }} />
              </Form.Item>

              <Form.Item
                name="tipo"
                noStyle
                rules={[{ required: true, message: 'Por favor, selecione um tipo!' }]}
              >
                <Select placeholder="Selecione um tipo" style={{ width: '30%', marginLeft: '8px' }}>
                  <Option value="entrada">Entrada</Option>
                  <Option value="saida">Saída</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
                  Salvar
                </Button>
              </Form.Item>
            </Form.Item>
          </Form>
        )}
      </div>
      <BottomBar />
      <ToastContainer />
    </div>
  );
};

export default Config;

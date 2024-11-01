// src/pages/Config/Config.jsx
import { Form, Input, Select, Button, Typography, Spin, List } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import useListCategories from '../../hooks/useListCategories';
import useCreateCategory from '../../hooks/useCreateCategory';
import styles from './Config.module.css';

const { Title } = Typography;
const { Option } = Select;

const Config = () => {
  const [formNome] = Form.useForm();
  const [formCategoria] = Form.useForm();
  const { categories, error: listError } = useListCategories(); 
  const { createCategory, loading: creating, error: createError } = useCreateCategory()

  const onFinishNome = async (values) => {
    console.log('Nome salvo:', values.nome);
    formNome.resetFields();
  };

  const onFinishCategoria = async (values) => {
    const categoryData = {
      Category: values.Category,
      Type: values.Type,         
    };

    const response = await createCategory(categoryData);
    if (response) {
      formCategoria.resetFields();
    }
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.content}>
        <Title level={2}>Configurações</Title>
        {creating ? (
          <Spin tip="Cadastrando..." />
        ) : (
          <>
            {/* Formulário para o Nome */}
            <Form
              form={formNome}
              layout="vertical"
              onFinish={onFinishNome}
              initialValues={{
                // Defina os valores iniciais do formulário aqui, se necessário
              }}
            >
              <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
                style={{ marginBottom: '10px' }}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Salvar Nome
                </Button>
              </Form.Item>
            </Form>
            <hr />

            {/* Formulário para a Nova Categoria */}
            <Form
              form={formCategoria}
              layout="vertical"
              onFinish={onFinishCategoria}
            >
              <Form.Item
                label="Nova Categoria"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Form.Item
                  name="Category"
                  noStyle
                  rules={[{ required: true, message: 'Por favor, insira uma nova categoria!' }]}
                >
                  <Input placeholder="Nome da nova Categoria" style={{ width: '65%' }} />
                </Form.Item>
                <Form.Item
                  name="Type"
                  noStyle
                  rules={[{ required: true, message: 'Por favor, selecione um tipo!' }]}
                >
                  <Select placeholder="Tipo" style={{ width: '30%', marginLeft: '5px' }}>
                    <Option value="Entrada">Entrada</Option>
                    <Option value="Saida">Saída</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginTop: '10px' }}>
                    Salvar
                  </Button>
                </Form.Item>
              </Form.Item>
            </Form>

            {/* Exibindo categorias cadastradas */}
            <div className={styles.categoriesList}>
              <Title level={3}>Categorias Cadastradas</Title>
              {createError && <p style={{ color: 'red' }}>{createError}</p>}
              {listError && <p style={{ color: 'red' }}>{listError}</p>}
              <List
                bordered
                dataSource={categories}
                renderItem={(item) => (
                  <List.Item>
                    {item.Category} - {item.Type}
                  </List.Item>
                )}
              />
            </div>
          </>
        )}
      </div>
      <BottomBar />
      <ToastContainer />
    </div>
  );
};

export default Config;

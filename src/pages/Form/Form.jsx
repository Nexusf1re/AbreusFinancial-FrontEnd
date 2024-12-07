import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Typography, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import styles from './Form.module.css';
import useForm from '../../hooks/useForm';
import useCategories from '../../hooks/useListCategories';
import Footer from '../../components/Footer/Footer'
import { defaultCategories } from '../../components/DefaultCategories'

const { Title } = Typography;
const { Option } = Select;

const FormComponent = () => {
  const { formData, handleChange, handleSubmit, loading } = useForm();
  const { categories, error } = useCategories();
  const [inputValue, setInputValue] = useState('');

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <div>Erro ao carregar categorias: {error}</div>;
  }

  const paymentOptions = formData.type === 'Entrada'
    ? ['Dinheiro', 'Pix', 'EmConta']
    : ['Dinheiro', 'Pix', 'Debito', 'Credito', 'Boleto', 'EmConta'];

  const filteredCategories = [
    ...defaultCategories.filter(category => category.Type === formData.type),
    ...categories.filter(category => category.Type === formData.type)
  ];


  // Função para formatar o valor em tempo real
  const formatCurrency = (value) => {
    if (!value) return '0,00';

    // Remove tudo que não for número
    let numericValue = value.replace(/\D/g, '');

    // Adiciona zeros à esquerda se necessário
    numericValue = numericValue.padStart(3, '0');

    // Divide o valor em reais e centavos
    const reais = numericValue.slice(0, -2);
    const centavos = numericValue.slice(-2);

    // Formata os reais com pontos para milhares
    let formattedReais = reais;
    if (formattedReais.length > 3) {
      formattedReais = formattedReais.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    // Remove zeros à esquerda desnecessários
    formattedReais = formattedReais.replace(/^0+/, '') || '0';

    return `${formattedReais},${centavos}`;
  };

  // Handler para o campo de valor
  const handleValueChange = (e) => {
    let value = e.target.value;

    // Permite apenas números, vírgula e ponto
    value = value.replace(/[^\d.,]/g, '');

    // Substitui múltiplas vírgulas ou pontos por uma única vírgula
    value = value.replace(/[.,]/g, ',').replace(/,+/g, ',');

    // Garante apenas uma vírgula
    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts[1];
    }

    // Remove pontos existentes para reformatar
    const cleanValue = value.replace(/\./g, '').replace(',', '');
    const formattedValue = formatCurrency(cleanValue);

    setInputValue(formattedValue);

    // Converte para o formato numérico antes de salvar no estado do formulário
    const numericValue = cleanValue ? (parseFloat(cleanValue) / 100).toString() : '0';
    handleChange('value', numericValue);
  };

  return (
    <div className={`${styles.body} ${styles.homePage}`}>
      <TopBar />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="colored"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "300px",
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          borderRadius: "8px",
        }} />
      <Form onFinish={handleSubmit} className={styles.form}>
        <Title level={3}>Lançamento de contas</Title>
        <hr style={{ marginBottom: '15px', marginTop: '-10px' }} />
        <div className={styles.formGroup}>
          <Form.Item
            style={{ marginTop: '-15px' }}
            className={styles.formInput}
            label="Valor"
            name="value"
            rules={[{ required: true, message: 'Por favor insira um valor!' }]}
          >
            <Input
              value={inputValue}
              onChange={handleValueChange}
              style={{ fontSize: '20px', padding: '0 12px', height: '40px' }}
              placeholder="0,00"
              inputMode="numeric"
              pattern="[0-9]*"
              onKeyPress={(e) => {
                if (!/[0-9,.]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Descrição"
            name="description"
            rules={[{ required: false, message: 'Por favor insira uma descrição!' }]}
          >
            <Input
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              style={{ fontSize: '20px', padding: '0 12px', height: '40px' }}
            />
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Tipo de movimentação"
            name="type"
            rules={[{ required: true, message: 'Por favor selecione um tipo!' }]}
          >
            <Select
              style={{ height: '40px' }}
              value={formData.type}
              onChange={(value) => handleChange('type', value)}
              placeholder="Selecione um tipo de movimentação"
            >
              <Option value="Entrada">Entrada</Option>
              <Option value="Saida">Saída</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Método de movimentação"
            name="payment"
            rules={[{ required: true, message: 'Por favor selecione um método!' }]}
          >
            <Select
              value={formData.payment}
              style={{ height: '40px' }}
              onChange={(value) => handleChange('payment', value)}
              placeholder="Selecione um método de movimentação"
            >
              {paymentOptions.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Categoria"
            name="category"
            rules={[{ required: true, message: 'Por favor selecione uma categoria!' }]}
          >
            <Select
              style={{ height: '40px' }}
              value={formData.category}
              onChange={(value) => handleChange('category', value)}
              placeholder="Selecione uma categoria"
            >
              {filteredCategories.map((category, index) => (
                <Option key={`${category.Category}-${index}`} value={category.Category}>
                  {category.Category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Data da movimentação"
            name="date"
            rules={[{ required: true, message: 'Por favor selecione uma data!' }]}
          >
            <DatePicker
              className={styles.formDate}
              style={{ height: '40px' }}
              format="DD-MM-YYYY"
              value={formData.date}
              onChange={(date) => handleChange('date', date)}
              disabled={false}
              allowClear={false}
              inputReadOnly
            />
          </Form.Item>

        </div>
        <Form.Item>
          <Button className={styles.formSubmit} type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
      <BottomBar />
      <Footer />
    </div>
  );
};

export default FormComponent;

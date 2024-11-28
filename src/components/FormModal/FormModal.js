import React from 'react';
import { Modal, Form, Input, Select, Button, DatePicker, Typography, Spin } from 'antd';
import useForm from '../../hooks/useForm';
import useCategories from '../../hooks/useListCategories';
import styles from './FormModal.module.css';
import { defaultCategories } from '../../components/DefaultCategories';

const { Title } = Typography;
const { Option } = Select;

const FormModal = ({ visible, onCancel, onSuccess }) => {
  const { formData, handleChange, handleSubmit, loading } = useForm();
  const { categories, error } = useCategories();

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

  const onFormSubmit = async () => {
    try {
      await handleSubmit();
      onCancel();
      if (onSuccess) {
        onSuccess(); 
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };
  

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className={styles.modal}
    >
      <Form onFinish={onFormSubmit} className={styles.form}>
        <Title className={styles.title} level={3}>Lançamento de contas</Title>
        <hr style={{ marginBottom: '30px', marginTop: '-10px' }} />
        
        <div className={styles.formGroup}>
          <Form.Item
            style={{ marginTop: '-15px' }}
            className={styles.formInput}
            label="Valor"
            name="value"
            rules={[{ required: true, message: 'Por favor insira um valor!' }]}>
            <Input
              type="number"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value)}
              style={{ fontSize: '20px', padding: '0 12px', height: '40px' }}
            />
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Descrição"
            name="description"
            rules={[{ required: false, message: 'Por favor insira uma descrição!' }]}>
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
            rules={[{ required: true, message: 'Por favor selecione um tipo!' }]}>
            <Select
              style={{ height: '40px' }}
              value={formData.type}
              onChange={(value) => handleChange('type', value)}
              placeholder="Selecione um tipo de movimentação">
              <Option value="Entrada">Entrada</Option>
              <Option value="Saida">Saída</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Método de movimentação"
            name="payment"
            rules={[{ required: true, message: 'Por favor selecione um método!' }]}>
            <Select
              value={formData.payment}
              style={{ height: '40px' }}
              onChange={(value) => handleChange('payment', value)}
              placeholder="Selecione um método de movimentação">
              {paymentOptions.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Categoria"
            name="category"
            rules={[{ required: true, message: 'Por favor selecione uma categoria!' }]}>
            <Select
              style={{ height: '40px' }}
              value={formData.category}
              onChange={(value) => handleChange('category', value)}
              placeholder="Selecione uma categoria">
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
            rules={[{ required: true, message: 'Por favor selecione uma data!' }]}>
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
    </Modal>
  );
};

export default FormModal;

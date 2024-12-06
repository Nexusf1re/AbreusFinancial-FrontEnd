import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, DatePicker, Typography, Spin } from 'antd';
import useForm from '../../hooks/useForm';
import useCategories from '../../hooks/useListCategories';
import styles from './FormModal.module.css';
import { defaultCategories } from '../../components/DefaultCategories';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import { NumericFormat } from 'react-number-format';

const { Title } = Typography;
const { Option } = Select;

const FormModal = ({ visible, onCancel, onSuccess }) => {
  const { formData, handleChange, handleSubmit, loading } = useForm();
  const { categories, error } = useCategories();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [visible]);

  const handleClose = () => {
    setIsClosing(true);
    onCancel();
  };

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
  
  const handleValueChange = (values) => {
    const { value } = values;
    // Mantém o valor em centavos
    const numericValue = value || '0';
    handleChange('value', numericValue);
  };

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      className={`${styles.modal} ${isClosing ? styles.modalExit : styles.modalEnter}`}
      maskClosable={true}
      destroyOnClose={true}
      transitionName=""
      maskTransitionName=""
    >
      <Form onFinish={onFormSubmit} className={styles.form}>
        <Title className={styles.title} level={3}>Lançamento de contas</Title>        
        <div className={styles.formGroup}>
          <Form.Item
            style={{ marginTop: '-15px' }}
            className={styles.formInput}
            label="Valor"
            name="value"
            rules={[{ required: true, message: 'Por favor insira um valor!' }]}>
            <NumericFormat
              customInput={Input}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              onValueChange={handleValueChange}
              style={{ fontSize: '20px', padding: '0 12px', height: '40px' }}
              placeholder="0,00"
              prefix="R$ "
              mask="_"
              format={(val) => {
                if (!val) return '';
                // Garante que temos pelo menos 3 dígitos (incluindo zero à esquerda se necessário)
                const number = val.replace(/\D/g, '').padStart(3, '0');
                
                
                const decimalPart = number.slice(-2);
                const integerPart = number.slice(0, -2).replace(/^0+/, '') || '0';
                
                const formattedInteger = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                
                return `R$ ${formattedInteger},${decimalPart}`;
              }}
              value={formData.value ? (parseFloat(formData.value) * 100).toString() : ''}
            />
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            label="Descrição"
            name="description"
            rules={[{ required: false, message: 'Por favor insira uma descrição!' }]}>
            <Input
              placeholder="Descrição"
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
              format="DD/MM/YYYY"
              value={formData.date}
              onChange={(date) => handleChange('date', date)}
              disabled={false}
              allowClear={false}
              inputReadOnly
              locale={locale}
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
import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Typography } from 'antd';
import moment from 'moment';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import styles from './Form.module.css';

const { Title } = Typography;
const { Option } = Select;

const FormComponent = () => {
  const [formData, setFormData] = useState({
    value: '',
    description: '',
    payment: '',
    type: '',
    category: '',
    date: moment().format('DD-MM-YYYY'),
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (values) => {
    console.log('Form Data:', values);
  };

  return (
    <div className={`${styles.body} ${styles.homePage}`}>
      <TopBar />
      <Form onFinish={handleSubmit} className={styles.form}>
        <Title level={3}>Lançamento de contas</Title>
        <hr style={{ marginBottom: '15px', marginTop: '-10px' }}></hr>
        <div className={styles.formGroup}>
        <Form.Item
         style={{marginTop: '-15px'}}
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
          label="Método de movimentação"
          name="payment"
          rules={[{ required: true, message: 'Por favor selecione um método!' }]}>
          <Select
            value={formData.payment}
            style={{height: '40px' }}
            onChange={(value) => handleChange('payment', value)}
            placeholder="Selecione um método de movimentação">
            <Option value="cash">Dinheiro</Option>
            <Option value="pix">Pix</Option>
            <Option value="debit">Débito</Option>
            <Option value="credit">Crédito</Option>
            <Option value="invoice">Boleto</Option>
            <Option value="transfer">Em-Conta</Option>

          </Select>
        </Form.Item>

        <Form.Item
          className={styles.formInput}
          label="Tipo de movimentação"
          name="type"
          rules={[{ required: true, message: 'Por favor selecione um tipo!' }]}>
          <Select
             style={{height: '40px' }}
            value={formData.type}
            onChange={(value) => handleChange('type', value)}
            placeholder="Selecione um tipo de movimentação">
            <Option value="income">Entrada</Option>
            <Option value="expense">Saída</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className={styles.formInput}
          label="Categoria"
          name="category"
          rules={[{ required: true, message: 'Por favor selecione uma categoria!' }]}>
          <Select
            style={{height: '40px' }}
            value={formData.category}
            onChange={(value) => handleChange('category', value)}
            placeholder="Selecione uma categoria">
            <Option value="food">Alimentação</Option>
            <Option value="transport">Transporte</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className={styles.formInput}
          label="Data da movimentação"
          name="date"
          rules={[{ required: true, message: 'Por favor selecione uma data!' }]}>

          <DatePicker
          className={styles.formDate}
          style={{height: '40px' }}
            format="DD-MM-YYYY"
            value={formData.date ? moment(formData.date, 'DD-MM-YYYY') : null}
            onChange={(date) => handleChange('date', date ? moment(date).format('DD-MM-YYYY') : '')}
            onClick={(e) => e.preventDefault()}
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
    </div>
  );
};

export default FormComponent;

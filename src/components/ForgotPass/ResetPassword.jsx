import React from 'react';
import { Modal, Button, Input, Spin, message } from 'antd';
import useEmail from '../../hooks/useEmail';
import styles from './ResetPassword.module.css';

const ResetPassword = ({ isModalOpen, closeModal }) => {
  const { email, setEmail, isLoading, success, error, sendEmail } = useEmail();


  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  React.useEffect(() => {
    if (success) {
      message.success('Email enviado com sucesso!');
      closeModal(); 
    }
    if (error) {
      message.error(error);
    }
  }, [success, error, closeModal]);

  return (
    <Modal
      title="Recuperação de Senha"
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}
      className={styles.modal}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Digite seu email:</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading || !email}
            className={styles.submitButton}
          >
            {isLoading ? <Spin /> : 'Enviar Email'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ResetPassword;

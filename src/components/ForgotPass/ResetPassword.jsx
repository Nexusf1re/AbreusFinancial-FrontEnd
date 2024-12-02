import React, { useEffect } from 'react';
import { Modal, Button, Input, Spin, message } from 'antd';
import useEmail from '../../hooks/useEmail';
import styles from './ResetPassword.module.css';

const ResetPassword = ({ isModalOpen, closeModal }) => {
  const { email, setEmail, isLoading, success, error, sendEmail } = useEmail();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  useEffect(() => {
    if (success) {
      message.success('Email enviado com sucesso!');
      closeModal();
    }
  }, [success, closeModal]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!isModalOpen) {
      setEmail('');
    }
  }, [isModalOpen, setEmail]);

  return (
    <Modal
      title="Recuperação de Senha"
      open={isModalOpen}
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

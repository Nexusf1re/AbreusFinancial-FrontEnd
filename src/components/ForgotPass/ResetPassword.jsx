import React from 'react';
import { Modal, Button, Input, Spin, message } from 'antd';
import useEmail from '../../hooks/useEmail'; // Importando o hook de envio de email
import styles from './ResetPassword.module.css'; // Importando o arquivo de estilo

const ResetPassword = ({ isModalOpen, closeModal }) => {
  const { email, setEmail, isLoading, success, error, sendEmail } = useEmail();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(); // Enviar o email
  };

  React.useEffect(() => {
    if (success) {
      message.success('Email enviado com sucesso!');
      closeModal(); // Fecha o modal quando o email for enviado com sucesso
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

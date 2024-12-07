import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './FormBtn.module.css';

const FormBtn = ({ onClick }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      size="large"
      shape="circle"
      className={styles.floatingButton}
      onClick={onClick}
    />
  );
};

export default FormBtn;

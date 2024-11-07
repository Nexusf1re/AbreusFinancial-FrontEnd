// src/components/ToastConfig.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastConfig = () => {
  return (
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
        padding: "5px",
        top: "3rem",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        borderRadius: "8px",
        zIndex: 9999,
      }}
    />
  );
};

export default ToastConfig;

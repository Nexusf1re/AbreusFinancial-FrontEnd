import React, { useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import styles from './Form.module.css';

const Form = () => {
  const [formData, setFormData] = useState({
    valor: '',
    descricao: '',
    pgto: '',
    tipo: '',
    categoria: '',
    subcategoria: '',
    data: new Date().toISOString().split('T')[0], // Define a data padrão como a data atual
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode fazer a chamada à API para enviar os dados do formulário
    console.log(formData);
  };

  return (
    <div className={`${styles.body} ${styles.formPage}`}>
    <TopBar />
      <form onSubmit={handleSubmit} className={styles.form}>
        <legend className={styles.legend}>
          <b>Lançamento de Contas</b>
        </legend>

        <div className={styles.inputBox}>
          <label className={styles.labelInput}></label>
          <input
            type="number"
            name="valor"
            className={styles.inputUser}
            required
            value={formData.valor}
            onChange={handleChange}
          />
          <label htmlFor="valor" className={styles.labelInput}>Valor:</label>
        </div>

        <div className={styles.inputBox}>
          <input
            type="text"
            name="descricao"
            className={styles.inputUser}
            required
            value={formData.descricao}
            onChange={handleChange}
          />
          <label htmlFor="descricao" className={styles.labelInput}>Descrição:</label>
        </div>

        <div className={styles.inputBox}>
          <label  htmlFor="pgto">Movimentação:</label>
          <select
            name="pgto"
            className={styles.selects}
            required
            value={formData.pgto}
            onChange={handleChange}
          >
            <option disabled selected value="">Selecionar</option>
            {/* Adicione opções aqui */}
          </select>
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="tipo">Tipo:</label>
          <select
            name="tipo"
            className={styles.selects}
            required
            value={formData.tipo}
            onChange={handleChange}
          >
            <option disabled selected value="">Selecionar</option>
            {/* Adicione opções aqui */}
          </select>
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="categoria">Categoria:</label>
          <select
            name="categoria"
            className={styles.selects}
            required
            value={formData.categoria}
            onChange={handleChange}
          >
            <option disabled selected value="">Selecionar</option>
            {/* Adicione opções aqui */}
          </select>
        </div>


        <div className={styles.inputBox}>
          <label htmlFor="data"><b>Data:</b></label>
          <input
            type="date"
            name="data"
            className={styles.selects}
            required
            value={formData.data}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Enviar" className={styles.submit} />
      </form>
      <BottomBar />
    </div>
  );
};

export default Form;

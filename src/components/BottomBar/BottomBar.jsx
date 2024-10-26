import React from 'react';
import { FaHouse, FaBrazilianRealSign, FaFileInvoiceDollar, FaGear } from "react-icons/fa6";
import styles from './BottomBar.module.css';

const BottomBar = () => {
return (
<div className={styles.bottombar}>
    <a href='/home'><span><FaHouse className={styles.home}/></span> Início</a>
    <a href='/form'><span><FaBrazilianRealSign className={styles.lancar}/></span>Lançar</a>
    <a href='/history'><span><FaFileInvoiceDollar className={styles.historico}/></span>Histórico</a>
    <a href='/config'><span><FaGear className={styles.config}/></span>Config</a>
</div>
);
};

export default BottomBar;

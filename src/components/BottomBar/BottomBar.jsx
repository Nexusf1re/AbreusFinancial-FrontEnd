import React from 'react';
import { FaHouse, FaBrazilianRealSign, FaFileInvoiceDollar, FaGear } from "react-icons/fa6";
import styles from './BottomBar.module.css'; // Alterar para CSS Module

const BottomBar = () => {
    return (
        <div className={styles.bottombar}>
            <a><span><FaHouse className={styles.home}/></span> Início</a>
            <a><span><FaBrazilianRealSign className={styles.lancar}/></span>Lançar</a>
            <a><span><FaFileInvoiceDollar className={styles.historico}/></span>Histórico</a>
            <a><span><FaGear className={styles.config}/></span>Config</a>
        </div>
    );
};

export default BottomBar;

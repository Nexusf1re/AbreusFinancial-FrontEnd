import React from 'react';
import { FaHouse, /*FaBrazilianRealSign,*/ FaFileInvoiceDollar, FaGear } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import styles from './BottomBar.module.css';

const BottomBar = () => {
    const location = useLocation();

    return (
        <div className={styles.bottombar}>
            <a className={styles.a} href='/home'>
                <span className={styles.span}>
                    <FaHouse className={`${styles.home} ${location.pathname === '/home' ? styles.activeIcon : ''}`} />
                </span>
                Início
            </a>
            {/*
            <a className={styles.a} href='/form'>
                <span className={styles.span}>
                    <FaBrazilianRealSign className={`${styles.lancar} ${location.pathname === '/form' ? styles.activeIcon : ''}`} />
                </span>
                Lançar
            </a>
            */}
            <a className={styles.a} href='/transactions'>
                <span className={styles.span}>
                    <FaFileInvoiceDollar className={`${styles.historico} ${location.pathname === '/transactions' ? styles.activeIcon : ''}`} />
                </span>
                Histórico
            </a>
            <a className={styles.a} href='/config'>
                <span className={styles.span}>
                    <FaGear className={`${styles.config} ${location.pathname === '/config' ? styles.activeIcon : ''}`} />
                </span>
                Config
            </a>
        </div>
    );
};

export default BottomBar;

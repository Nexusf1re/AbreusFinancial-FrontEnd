import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import styles from "./TopBar.module.css"; // Alterar para CSS Module

const TopBar = () => {
    return (
        <div className={styles.topbar}>
            <FaCircleUser className={styles.usericon}/>
            <p className={styles.welcome}>Olá, nome</p>
            <p className={styles.greeting}>Bom dia</p>
        </div>
    );
};

export default TopBar;

import React from 'react';
import { FaCircleUser, FaArrowRightFromBracket  } from "react-icons/fa6";
import styles from "./TopBar.module.css";
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className={styles.topbar}>
            <FaCircleUser className={styles.usericon}/>
            <p className={styles.welcome}>Olá, nome</p>
            <p className={styles.greeting}>Bom dia</p>
            <Link to="/" className={styles.exit}>
            <FaArrowRightFromBracket className={styles.exiticon} />
                <p>Sair</p>
             </Link>
            
        </div>
    );
};

export default TopBar;

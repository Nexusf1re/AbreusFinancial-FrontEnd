import React from 'react';
import { FaCircleUser, FaArrowRightFromBracket  } from "react-icons/fa6";
import styles from "./TopBar.module.css";
import { Link } from 'react-router-dom';
import greetings from '../../utils/greetings.js';

const TopBar = () => {
    return (
        <div className={styles.topbar}>
            <FaCircleUser className={styles.usericon}/>
            <p className={styles.welcome}>Olá, nome</p>
            <p className={styles.greeting}>{greetings()}</p>
            <Link to="/" className={styles.exit}>
            <FaArrowRightFromBracket className={styles.exiticon} />
                <p>Sair</p>
             </Link>
            
        </div>
    );
};

export default TopBar;

import React from 'react';
import { FaCircleUser, FaArrowRightFromBracket } from "react-icons/fa6";
import styles from "./TopBar.module.css";
import { useNavigate } from 'react-router-dom';
import greetings from '../../utils/greetings.js';
import { getUsernameFromToken, logout } from '../../services/authService';

const TopBar = () => {
    const navigate = useNavigate();
    const username = getUsernameFromToken(); 

    const handleLogout = () => {
        logout(); 
        navigate('/');
    };

    return (
        <div className={styles.topbar}>
            <FaCircleUser className={styles.usericon} />
            <p className={styles.welcome}>Olá {username}</p>
            <p className={styles.greeting}>{greetings()}</p>
            <button className={styles.exit} onClick={handleLogout}>
                <FaArrowRightFromBracket className={styles.exiticon} />
                <p className={styles.p}>Sair</p>
            </button>
        </div>
    );
};

export default TopBar;

import React from 'react';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import styles from "./TopBar.module.css";
import { useNavigate } from 'react-router-dom';
import { saudacao } from '../../utils/greetings.js';
import { getUsernameFromToken, logout } from '../../services/authService';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const TopBar = () => {
    const navigate = useNavigate();
    const username = getUsernameFromToken();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.topbar}>
            <BiUserCircle className={styles.usericon} />
            <p className={styles.welcome}>Olá {username}</p>
            <p className={styles.greeting}>{saudacao()}</p>
            <div className={styles.themeToggleContainer}>
                <ThemeToggle />
            </div>
            <button className={styles.exit} onClick={handleLogout}>
                <FaArrowRightFromBracket className={styles.exiticon} />
                <p className={styles.p}>Sair</p>
            </button>
        </div>
    );
};

export default TopBar;

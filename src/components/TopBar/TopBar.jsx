import React, { useState } from 'react';
import { FaCircleUser, FaArrowRightFromBracket, FaMoon, FaSun } from "react-icons/fa6";
import styles from "./TopBar.module.css";
import { useNavigate } from 'react-router-dom';
import { saudacao }  from '../../utils/greetings.js';
import { getUsernameFromToken, logout } from '../../services/authService';
import useTheme from '../../hooks/useTheme';

const TopBar = () => {
    const navigate = useNavigate();
    const username = getUsernameFromToken();
    const { toggleTheme } = useTheme();
    const [isDark, setIsDark] = useState(() => 
        document.body.classList.contains('dark-theme')
    );

    const handleThemeToggle = () => {
        toggleTheme();
        setIsDark(!isDark);
    };

    const handleLogout = () => {
        logout(); 
        navigate('/');
    };

    return (
        <div className={styles.topbar}>
            <FaCircleUser className={styles.usericon} />
            <p className={styles.welcome}>Olá {username}</p>
            <p className={styles.greeting}>{saudacao()}</p>
            <button className={styles.themeToggle} onClick={handleThemeToggle}>
                {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <button className={styles.exit} onClick={handleLogout}>
                <FaArrowRightFromBracket className={styles.exiticon} />
                <p className={styles.p}>Sair</p>
            </button>
        </div>
    );
};

export default TopBar;

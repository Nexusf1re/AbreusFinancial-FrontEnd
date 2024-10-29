import React from 'react';
import { FaCircleUser, FaArrowRightFromBracket } from "react-icons/fa6";
import styles from "./TopBar.module.css";
import { useNavigate } from 'react-router-dom';
import greetings from '../../utils/greetings.js';
import { logout } from '../../services/authService'; // Importando a função de logout

const TopBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/');
    };

    return (
        <div className={styles.topbar}>
            <FaCircleUser className={styles.usericon} />
            <p className={styles.welcome}>Olá, nome</p>
            <p className={styles.greeting}>{greetings()}</p>
            <button className={styles.exit} onClick={handleLogout}>
                <FaArrowRightFromBracket className={styles.exiticon} />
                <p>Sair</p>
            </button>
        </div>
    );
};

export default TopBar;

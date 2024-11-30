import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Adiciona ou remove a classe dark-theme
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <button 
            className={`${styles.themeToggle} ${theme === 'dark' ? styles.dark : ''}`} 
            onClick={toggleTheme}
            aria-label="Alternar tema"
        >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeToggle;


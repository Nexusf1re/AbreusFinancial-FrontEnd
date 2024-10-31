import React, { useEffect, useState } from 'react';
import styles from './ScrollUp.module.css';

const ScrollUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        isVisible && (
            <button onClick={scrollToTop} className={styles.scrollToTop}>
                ↑
            </button>
        )
    );
};

export default ScrollUp;

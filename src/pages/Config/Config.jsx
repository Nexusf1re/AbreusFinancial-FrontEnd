import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import styles from './Config.module.css';

const Config = () => {
    return(
        <div className={`${styles.body} ${styles.configPage}`}> 
        <TopBar />
        

        <BottomBar />
        </div>
    );
};

export default Config;
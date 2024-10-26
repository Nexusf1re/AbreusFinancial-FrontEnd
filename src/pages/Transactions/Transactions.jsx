import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import styles from './Transactions.module.css';

const History = () => {
    return(
        <div className={`${styles.body} ${styles.transactionsPage}`}> 
        <TopBar />
        

        <BottomBar />
        </div>
    );
};

export default History;
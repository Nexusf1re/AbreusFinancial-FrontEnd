import React from 'react';
import styles from "./Form.module.css";
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';

const Form = ()  => {
    return (
        <div className={`${styles.body} ${styles.formPage}`}>
        <TopBar />

        

        <BottomBar />
        </div>
    );
};


export default Form;
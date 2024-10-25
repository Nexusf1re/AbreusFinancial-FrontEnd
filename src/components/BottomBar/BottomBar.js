import React from 'react';
import { FaHouse, FaBrazilianRealSign, FaFileInvoiceDollar, FaGear } from "react-icons/fa6";
import './BottomBar.css'

const BottomBar = () => {
    return (

        <div id="bottombar">
        <a><span><FaHouse className='home'/></span> Início</a>
        <a><span><FaBrazilianRealSign className='lancar'/></span>Lançar</a>
        <a><span><FaFileInvoiceDollar className='historico'/></span>Histórico</a>
        <a><span><FaGear className='config'/></span>Config</a>
        </div>

    );
};


export default BottomBar;
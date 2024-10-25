import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import "./TopBar.css";

const TopBar = () => {
    return (
        <div id="topbar">
        <FaCircleUser className="usericon"/>
        <p className="welcome">Olá, nome</p>
        <p className="greeting">Bom dia</p>
        </div>
    );
};


export default TopBar;
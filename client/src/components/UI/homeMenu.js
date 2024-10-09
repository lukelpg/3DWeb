// src/components/HomeMenu.js
import React from 'react';

const HomeMenu = ({ onStart, onSettings, onExit }) => {
    const menuStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
    };

    const buttonStyle = {
        margin: '10px 0',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    return (
        <div style={menuStyle}>
            <h2>Home Menu</h2>
            <button style={buttonStyle} onClick={onStart}>Start</button>
            <button style={buttonStyle} onClick={onSettings}>Settings</button>
            <button style={buttonStyle} onClick={onExit}>Exit</button>
        </div>
    );
};

export default HomeMenu;

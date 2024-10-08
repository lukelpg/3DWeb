// src/components/Toolbar.js
import React from 'react';

const Toolbar = ({ onAction1, onAction2 }) => {
    const toolbarStyle = {
        position: 'fixed', // Change to fixed positioning
        top: 0,
        left: 0,
        width: '100%', // Full width
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent for visibility
        padding: '10px 20px', // Add horizontal padding
        display: 'flex', // Use flexbox to align items
        justifyContent: 'flex-left', // Align buttons to the right
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Optional shadow for visual separation
    };

    return (
        <div style={toolbarStyle}>
            <button onClick={onAction1} style={buttonStyle}>Action 1</button>
            <button onClick={onAction2} style={buttonStyle}>Action 2</button>
        </div>
    );
};

// Optional button styling for better visibility
const buttonStyle = {
    marginLeft: '10px', // Space between buttons
};

export default Toolbar;



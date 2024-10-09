// src/components/Toolbar.js
import React from 'react';

const Toolbar = ({ onAction1, onAction2 }) => {
    const toolbarStyle = {
        position: 'fixed', // Keep fixed positioning
        top: 0,
        left: 0,
        width: '100%', // Full width
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly less transparent for visibility
        padding: '20px 30px', // Increased padding for a bigger toolbar
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Optional shadow for visual separation
        textAlign: 'center', // Center contents
    };

    const titleStyle = {
        fontSize: '24px', // Bigger font size for the title
        fontWeight: 'bold', // Make the title bold
        position: 'absolute', // Position the title on the left
        left: '30px', // Align to the left
    };

    const buttonContainerStyle = {
        display: 'inline-block', // Make the container for buttons inline
    };

    return (
        <div style={toolbarStyle}>
            <div style={titleStyle}>3D Web</div> {/* Title on the left */}
            <div style={buttonContainerStyle}>
                <button onClick={onAction1} style={buttonStyle}>Action 1</button>
                <button onClick={onAction2} style={buttonStyle}>Action 2</button>
            </div>
        </div>
    );
};

// Optional button styling for better visibility
const buttonStyle = {
    marginLeft: '10px', // Space between buttons
};

export default Toolbar;

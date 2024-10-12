import React, { useState } from 'react';
import './App.css'; // Optional CSS file for styling

import HomeMenu from './components/UI/homeMenu';
import WorldScene  from './components/world';
// import FetchData from './utils/FetchData';

// import backgroundImage from './assets/images/favicon.jpg'; // Adjust the path accordingly


function App() {
  const [showMenu, setShowMenu] = useState(true);

  const handleStart = () => {
      setShowMenu(false);
  };

  const handleSettings = () => {
      alert("Settings clicked!"); // Placeholder for settings functionality
  };

  const handleExit = () => {
      alert("Exit clicked!"); // Placeholder for exit functionality
  };

  const appStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/favicon.jpg)`, // Use PUBLIC_URL for public folder images
    backgroundSize: '50%', // Adjust the size to your preference (50% will make it smaller)
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    height: '100vh',
    width: '100vw',
    position: 'relative',
  };
  

  return (
    <div className="App" style={appStyle}>
      <main>
        {showMenu ? (
          <HomeMenu 
              onStart={handleStart} 
              onSettings={handleSettings} 
              onExit={handleExit} 
          />
        ) : (
          <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <WorldScene />
          </div>
        )}
      </main>
    </div>
  );
}



export default App;

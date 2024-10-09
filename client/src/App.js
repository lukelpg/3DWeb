import React, { useState } from 'react';
import './App.css'; // Optional CSS file for styling

import HomeMenu from './components/UI/homeMenu';
import Toolbar from './components/toolBar';
import WorldScene  from './components/world';
// import FetchData from './utils/FetchData';

function App() {
  const [showMenu, setShowMenu] = useState(true);

  const handleStart = () => {
      setShowMenu(false);
  };

  const handleSettings = () => {
      alert("Settings clicked!"); // Placeholder for settings functionality
  };

  const handleExit = () => {
      // Handle exit logic, if needed
      alert("Exit clicked!"); // Placeholder for exit functionality
  };


  const handleAction1 = () => {
    console.log('Action 1 triggered');
    // Add your action logic here
  };

  const handleAction2 = () => {
      console.log('Action 2 triggered');
      // Add your action logic here
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>3D Web</h1>
      </header> */}
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
                <Toolbar onAction1={handleAction1} onAction2={handleAction2} />
              </div>
            )}
        {/* <FetchData /> */}
      </main>
    </div>
  );
}

export default App;

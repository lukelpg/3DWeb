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
              </div>
            )}
        {/* <FetchData /> */}
      </main>
    </div>
  );
}

export default App;

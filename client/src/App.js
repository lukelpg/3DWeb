import React from 'react';
import './App.css'; // Optional CSS file for styling

// import Simple3DScene from './components/Simple3DScene'; // Adjust the path as per your directory structure
import Toolbar from './components/toolBar';
import WorldScene  from './components/world';
// import FetchData from './utils/FetchData';

function App() {
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
        <h1>Simple 3D Scene</h1>
      </header> */}
      <main>
        {/* <Simple3DScene /> */}
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <WorldScene />
            <Toolbar onAction1={handleAction1} onAction2={handleAction2} />
        </div>
        
        {/* <FetchData /> */}
      </main>
    </div>
  );
}

export default App;

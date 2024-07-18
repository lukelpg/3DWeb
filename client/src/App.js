import React from 'react';
import './App.css'; // Optional CSS file for styling

import Simple3DScene from './components/Simple3DScene'; // Adjust the path as per your directory structure
// import FetchData from './utils/FetchData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple 3D Scene</h1>
      </header>
      <main>
        <p>This is for debugging</p>
        <Simple3DScene />
        <p>This is for debugging</p>
        {/* <FetchData /> */}
      </main>
    </div>
  );
}

export default App;

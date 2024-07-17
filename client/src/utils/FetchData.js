// src/FetchData.js

import React, { useEffect } from 'react';

function FetchData() {
  useEffect(() => {
    // Fetch message from backend
    fetch('/log-to-frontend')
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error('Error fetching message from backend:', error);
      });
  }, []);

  return (
    <div>
      <h2>Fetch Data Check</h2>
      <p>Check console for messages from backend.</p>
    </div>
  );
}

export default FetchData;
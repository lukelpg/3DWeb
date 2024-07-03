// server.js

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Define a route handler for the root path '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



// Example route to log messages from backend to frontend
app.get('/log-to-frontend', (req, res) => {
  // Message to send to frontend
  const message = 'Backend Connected.';

  // Send message as JSON response
  res.json({ message });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

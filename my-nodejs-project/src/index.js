const express = require('express');
const { setRoutes } = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Set up routes
setRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
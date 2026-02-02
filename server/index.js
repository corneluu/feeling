const express = require('express');
const cors = require('cors');
require('dotenv').config();

const reflectRoutes = require('./routes/reflect');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all CORS for simplicity in development, tighten for prod
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', reflectRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('AI Verse API is running.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

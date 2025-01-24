const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/memes', require('./routes/memes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const express = require('express');
const path = require('path');
const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

app.use(cors());

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Define a catch-all route to serve the React app for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://ealbanca:Slcw7278@jobpostercluster.frhemon.mongodb.net/').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection Failed', err);
});

// Middleware
app.use(bodyParser.json());

module.exports = app;


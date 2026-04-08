const express = require('express');
const path = require ('path');
const router = express.Router();

// Get home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;

//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
//
//// Create Express app
//const app = express();
//
//// Connect to MongoDB
//mongoose.connect('mongodb+srv://ealbanca:Slcw7278@jobpostercluster.frhemon.mongodb.net/').then(() => {
//    console.log('Connected to MongoDB');
//}).catch((err) => {
//    console.error('Connection Failed', err);
//});
//
//// Middleware
//app.use(bodyParser.json());
//
//module.exports = app;


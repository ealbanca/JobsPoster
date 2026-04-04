const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Company = require('../models/company');
const Job = require('../models/job');
const app = express();

mongoose.connect('mongodb+srv://ealbanca:Slcw7278@jobpostercluster.frhemon.mongodb.net/').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection Failed', err);
});

app.use(bodyParser.json());

module.exports = app;


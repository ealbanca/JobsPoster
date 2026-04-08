const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// import the routing file to handle the default (index) route
const index = require('./server/routes/app');

//establish a connection to the MongoDB database
mongoose.connect('mongodb+srv://ealbanca:Slcw7278@jobpostercluster.frhemon.mongodb.net/').then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.error('Connection Failed', err);
}
);

// Import API routes
const companyRoutes = require('./server/routes/companies');
const jobRoutes = require('./server/routes/jobs');

//create an instance of express app

const app = express();
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

//Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Tell express to useMorgan Loger
app.use(logger('dev'));

//Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Tell express to use the specified directory as the root directory for your web site
app.use(express.static(path.join(__dirname, 'public')));

//tell express to map the default route to the index route
app.use('/', index);

//add the company and job routes to the express app
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);

// Tell express to map all other non-defined routes back to the index page (Express 4.x compatible)
app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
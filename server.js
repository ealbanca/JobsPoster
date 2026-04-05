const app = require('./routes/app');
const debug = require('debug')('node-angular');
const http = require('http');

// Normalize a port into a number, string, or false.
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const express = require('express');
const path = require ('path');
const router = express.Router();

// Get home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/JobsPoster/browser/index.html'));
});

module.exports = router;


const express = require('express');
const router = express.Router();

// Example route (replace with your actual company routes)
router.get('/', (req, res) => {
	res.status(200).json({ message: 'Companies route works!' });
});

module.exports = router;

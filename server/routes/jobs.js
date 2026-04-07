const express = require('express');
const router = express.Router();


const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
    Job.find().then((jobs) => {
        res.status(200).json({
            message: 'Jobs fetched successfully',
            jobs: jobs
        );
    }).catch((err) => {        res.status(500).json({ error: 'Failed to fetch jobs' });
    });

});
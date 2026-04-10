const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', (req, res, next) => {
  Job.find()
    .then(jobs => {
      res.status(200).json({
        message: 'Jobs fetched successfully!',
        jobs: jobs
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

//Get a single job by ID
router.get('/:id', (req, res, next) => {
  Job.findOne({ id: req.params.id })
    .then(job => {
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
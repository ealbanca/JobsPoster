const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', (req, res, next) => {
  Job.find()
    .populate('group')
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
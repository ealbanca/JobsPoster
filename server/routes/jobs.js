const express = require('express');
const router = express.Router();


const Job = require('../models/Job');
const sequenceGenerator = require('./seqGenerator');
const Company = require('../models/Company');

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
  .populate('companyId')
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


// Create a new job
router.post('/', (req, res, next) => {
  const maxJobId = sequenceGenerator.nextId('jobs');
  const job = new Job({
    id: maxJobId,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    salary: req.body.salary,
    type: req.body.type,
    companyId: req.body.companyId
  });

  job.save()
    .then(createdJob => {
      res.status(201).json({
        message: 'Job added successfully',
        job: createdJob
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// Update a job
router.put('/:id', (req, res, next) => {
  Job.findOne({ id: req.params.id })
    .then(job => {
      job.title = req.body.title;
      job.description = req.body.description;
      job.location = req.body.location;
      job.salary = req.body.salary;
      job.type = req.body.type;
      job.companyId = req.body.companyId;
      job.updateOne({ id: req.body.params.id }, job)
        .then(result => {
          res.status(204).json({
            message: 'Job updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Job not found',
        error: error
      });
    });
});

module.exports = router;
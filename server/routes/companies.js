const express = require('express');
const router = express.Router();

const Company = require('../models/Company');

// Get all companies
router.get('/', (req, res, next) => {
  Company.find()
    .then(companies => {
      res.status(200).json({
        message: 'Companies fetched successfully!',
        companies: companies
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

//Get a single company by ID
router.get('/:id', (req, res, next) => {
  Company.findOne({ _id: req.params.id })
    .then(company => {
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ message: 'Company not found' });
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

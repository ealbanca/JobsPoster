const express = require('express');
const router = express.Router();

const Company = require('../models/Company');
const sequenceGenerator = require('./seqGenerator');

// Get all companies
router.get('/', (req, res, next) => {
  Company.find()
    .populate('jobs')
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
  Company.findOne({ id: req.params.id.toString() })
    .populate('jobs')
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

//Create a new company
router.post('/', (req, res, next) => {
  const maxCompanyId = sequenceGenerator.nextId('companies');
  const company = new Company({
    id: maxCompanyId,
    name: req.body.name,
    description: req.body.description,
    logoUrl: req.body.logoUrl,
    websiteUrl: req.body.websiteUrl,
    jobs: req.body.jobs
  });

  company.save()
    .then(createdCompany => {
      res.status(201).json({
        message: 'Company added successfully',
        company: createdCompany
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

//update a company

router.put('/:id', (req, res, next) => {
  Company.findOne({ id: req.params.id })
    .then(company => {
      company.name = req.body.name;
      company.description = req.body.description;
      company.logoUrl = req.body.logoUrl;
      company.websiteUrl = req.body.websiteUrl;
      company.jobs = req.body.jobs;
      Company.updateOne({ id: req.params.id }, company)
        .then(result => {
          res.status(204).json({
            message: 'Company updated successfully'
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
        message: 'Company not found',
        error: error
      });
    });
});

//delete a company
router.delete('/:id', (req, res, next) => {
  Company.findOne({ id: req.params.id })
    .then(company => {
      Company.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Company deleted successfully'
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
        message: 'Company not found',
        error: error
      });
    });
});

module.exports = router;

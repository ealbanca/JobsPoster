const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  salary: {
    type: Number,
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  companyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
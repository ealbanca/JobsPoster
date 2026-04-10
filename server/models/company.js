const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
    description: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
    websiteUrl: {
    type: String,
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

module.exports = mongoose.model('Company', companySchema);

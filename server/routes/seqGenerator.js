var Sequence = require('../models/sequence');

var maxCompanyId;
var maxJobId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne().exec()
    .then(sequence => {
      if (!sequence) {
        throw new Error('No sequence found');
      }
      sequenceId = sequence._id;
      maxJobId = sequence.maxJobId;
      maxCompanyId = sequence.maxCompanyId;
    })
    .catch(err => {
      console.error('An error occurred while initializing SequenceGenerator:', err);
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'jobs':
      maxJobId++;
      updateObject = {maxJobId: maxJobId};
      nextId = maxJobId;
      break;
    case 'companies':
      maxCompanyId++;
      updateObject = {maxCompanyId: maxCompanyId};
      nextId = maxCompanyId;
      break;
    default:
      return -1;
  }


  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .then(() => {})
    .catch(err => {
      console.log("nextId error = " + err);
      return null;
    });

  return nextId;
}

module.exports = new SequenceGenerator();
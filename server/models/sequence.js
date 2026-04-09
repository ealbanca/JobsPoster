const mongoose = require('mongoose');
const { max } = require('rxjs');

const sequenceSchema = mongoose.Schema({
    maxCompanyId: { type: Number, required: true },
    maxJobId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
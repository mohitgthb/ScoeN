const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // year: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true }, // Subject belongs to a year
});

module.exports = mongoose.model('Subject', SubjectSchema);

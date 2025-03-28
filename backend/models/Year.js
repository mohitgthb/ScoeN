const mongoose = require('mongoose');

const YearSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Example: FE, SE, TE, BE
});

module.exports = mongoose.model('Year', YearSchema);

const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    name: { type: String, required: true },       // ← Missing in upload route
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }, // ← Missing
    price: { type: Number, required: true },      // ← Missing
    content: { type: String },                    // Optional
    pdfUrl: { type: String, required: true }, 
    pdfDriveId: { type: String, required: true },    // Correctly handled
});

module.exports = mongoose.model('Unit', UnitSchema);

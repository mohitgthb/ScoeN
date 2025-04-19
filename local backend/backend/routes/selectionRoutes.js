const express = require('express');
const Year = require('../models/Year');
const Subject = require('../models/Subject');
const Unit = require('../models/Unit');
const router = express.Router();

router.get('/years', async (req, res) => {
    try {
        const years = await Year.find({});
        res.json(years);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching years' });
    }
});

router.get('/subjects/:yearId', async (req, res) => {
    try {
        const subjects = await Subject.find({ year: req.params.yearId });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects' });
    }
});

router.get('/units/:subjectId', async (req, res) => {
    try {
        const units = await Unit.find({ subject: req.params.subjectId });
        res.json(units);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching units' });
    }
});

module.exports = router;

const express = require("express");
const Subject = require("../models/Subject");

const router = express.Router();

// Fetch all subjects
router.get("/subjects", async (req, res) => {
    try {
        const subjects = await Subject.find({}, "name _id"); // Fetch only name & ID
        res.json(subjects);
    } catch (error) {
        console.error("❌ Error fetching subjects:", error);
        res.status(500).json({ message: "Error fetching subjects" });
    }
});

module.exports = router;

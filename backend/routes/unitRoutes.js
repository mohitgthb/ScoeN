const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Unit = require("../models/Unit");

const router = express.Router();

// 1️⃣ Configure Multer Storage for PDF Uploads
const storage = multer.diskStorage({
  destination: "./uploads", // Store in uploads folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

/**
 * 2️⃣ Upload PDF Route
 * Admin can upload a new unit (PDF)
 */
router.post("/upload", upload.single("pdf"), async (req, res) => {
  const { name, subjectId, price } = req.body;

  if (!name || !subjectId || !price || !req.file) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newUnit = new Unit({
      name,
      subject: subjectId,
      price,
      pdfUrl: `/uploads/${req.file.filename}`,
    });

    await newUnit.save();
    res.status(201).json({ message: "Unit created", unit: newUnit });
  } catch (error) {
    console.error("❌ Error uploading unit:", error);
    res.status(500).json({ message: "Failed to create unit" });
  }
});

/**
 * 3️⃣ Get Units by Subject (with access protection)
 * Shows PDF URL only if user has purchased the unit
 */
router.get("/all", async (req, res) => {
  try {
    const { userId, subjectId } = req.query;

    if (!userId) return res.status(401).json({ message: "User ID required" });
    if (!subjectId) return res.status(400).json({ message: "Subject ID required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const units = await Unit.find({ subject: subjectId }).populate("subject", "name _id");

    if (!units.length) {
      return res.status(404).json({ message: "No units found for this subject" });
    }

    const formattedUnits = units.map((unit) => ({
      _id: unit._id,
      name: unit.name,
      price: unit.price,
      subjectId: unit.subject._id,
      subjectName: unit.subject.name,
      pdfUrl: user.purchasedUnits.includes(unit._id) ? unit.pdfUrl : null,
      purchased: user.purchasedUnits.includes(unit._id),
    }));

    res.json(formattedUnits);
  } catch (error) {
    console.error("❌ Error fetching units:", error);
    res.status(500).json({ message: "Error fetching units" });
  }
});

/**
 * 4️⃣ Serve PDF File if Purchased
 * This endpoint is used by impdf to securely fetch the file
 */
router.get("/pdf/:unitId", async (req, res) => {
  try {
    const userId = req.query.userId;
    const { unitId } = req.params;

    if (!userId) return res.status(401).json({ message: "User ID required" });

    const user = await User.findById(userId);
    if (!user || !user.purchasedUnits.includes(unitId)) {
      return res.status(403).json({ message: "Access denied. Please purchase this unit." });
    }

    const unit = await Unit.findById(unitId);
    if (!unit) return res.status(404).json({ message: "Unit not found" });

    const filePath = path.join(__dirname, "..", unit.pdfUrl); // example: uploads/1234.pdf
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "PDF not found on server" });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error("❌ Error serving PDF:", error);
    res.status(500).json({ message: "Server error while serving PDF" });
  }
});

module.exports = router;




// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const User = require("../models/User");
// const Unit = require("../models/Unit");
// const convertPDFToImages = require("../convertPDF");
// const { google } = require("googleapis");
// const { isAuth } = require('../middlewares/auth');

// const router = express.Router();

// const auth = new google.auth.GoogleAuth({
//     keyFile: "../google-drive-key.json",  // Replace with your service account file
//     scopes: ["https://www.googleapis.com/auth/drive.readonly"]
// });

// const drive = google.drive({ version: "v3", auth });

// // Securely fetch PDF from Google Drive
// router.get("/pdf/:id", async (req, res) => {
//     try {
//         const unit = await Unit.findById(req.params.id);
//         if (!unit) return res.status(404).json({ error: "Unit not found" });

//         // Extract File ID from URL
//         const fileId = unit.pdfUrl.split("/d/")[1]?.split("/")[0];

//         // Get PDF file
//         const file = await drive.files.get(
//             { fileId, alt: "media" },
//             { responseType: "stream" }
//         );

//         res.setHeader("Content-Type", "application/pdf");
//         file.data.pipe(res);
//     } catch (error) {
//         res.status(500).json({ error: "Access denied" });
//     }
// });

// // 1️⃣ Configure Multer Storage for PDF Uploads
// const storage = multer.diskStorage({
//     destination: "./uploads", // PDFs are stored in 'uploads/' folder
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//     },
// });
// const upload = multer({ storage });

// // 2️⃣ Route to Upload PDF & Create Unit (Admin Only)
// // router.post("/upload", upload.single("pdf"), async (req, res) => {
// //     try {
// //         const { title } = req.body;

// //         if (!req.file) {
// //             return res.status(400).json({ message: "No PDF file uploaded" });
// //         }

// //         const newUnit = new Unit({
// //             title,
// //             pdfUrl: `/uploads/${req.file.filename}`, // Save file path
// //         });

// //         await newUnit.save();
// //         res.status(201).json({ message: "Unit created successfully", unit: newUnit });
// //     } catch (error) {
// //         console.error("Error uploading PDF:", error);
// //         res.status(500).json({ message: "Error creating unit" });
// //     }
// // });


// //UNIT ROUTES
// router.post("/upload", upload.single("pdf"), async (req, res) => {
//     const { name, price, title } = req.body; // Require all fields
//     if (!name || !subjectId || !price || !req.file) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }
//     const newUnit = new Unit({
//         name,
//         // subject: subjectId,  // Must be a valid Subject ID
//         price,
//         pdfUrl: `/uploads/${req.file.filename}`,
//     });
//     await newUnit.save();
//     res.status(201).json({ message: "Unit created", unit: newUnit });
// });

// // 3️⃣ Route to Fetch All Units (Only Shows PDFs If Paid)
// // router.get("/all", async (req, res) => {
// //     try {
// //         const userId = req.query.userId; // Get user ID from frontend
// //         const units = await Unit.find();

// //         if (!userId) {
// //             return res.status(401).json({ message: "User ID required" });
// //         }

// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(404).json({ message: "User not found" });
// //         }

// //         // Show "Buy" option if user hasn't purchased, else show PDF URL
// //         const formattedUnits = units.map(unit => ({
// //             _id: unit._id,
// //             name: unit.name,
// //             price: unit.price,
// //             pdfUrl: user.purchasedUnits.includes(unit._id) ? unit.pdfUrl : null,
// //             purchased: user.purchasedUnits.includes(unit._id),
// //         }));

// //         res.json(formattedUnits);
// //     } catch (error) {
// //         console.error(" Error fetching units:", error);
// //         res.status(500).json({ message: "Error fetching units" });
// //     }
// // });

// // GET /api/units/:id - Get unit data with PDF information

// router.get("/all", async (req, res) => {
//     try {
//         const { userId, subjectId } = req.query;

//         // Ensure both userId and subjectId are provided
//         if (!userId) {
//             return res.status(401).json({ message: "User ID required" });
//         }
//         if (!subjectId) {
//             return res.status(400).json({ message: "Subject ID required" });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Find only those units that belong to the given subject.
//         // The Unit schema field 'subject' stores the ObjectId reference to the Subject.
//         const units = await Unit.find({ subject: subjectId }).populate("subject", "name _id");

//         // Check if any units were found; otherwise return a 404.
//         if (!units.length) {
//             return res.status(404).json({ message: "No units found for this subject" });
//         }

//         // Format the response, optionally showing PDF URL if the user has purchased that unit.
//         const formattedUnits = units.map((unit) => ({
//             _id: unit._id,
//             name: unit.name,
//             price: unit.price,
//             // subject details from populated subject field:
//             subjectId: unit.subject._id,
//             subjectName: unit.subject.name,
//             pdfUrl: user.purchasedUnits.includes(unit._id) ? unit.pdfUrl : null,
//             purchased: user.purchasedUnits.includes(unit._id),
//         }));

//         res.json(formattedUnits);
//     } catch (error) {
//         console.error("❌ Error fetching units:", error);
//         res.status(500).json({ message: "Error fetching units" });
//     }
// });

// router.post("/convert-pdf", upload.single("pdf"), async (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     const pdfPath = req.file.path;
//     const outputDir = path.join(__dirname, "../public/pdf_images");

//     try {
//         const imagePaths = await convertPDFToImages(pdfPath, outputDir);
//         const imageUrls = imagePaths.map(img => `/pdf_images/${path.basename(img)}`);
//         res.json({ images: imageUrls });
//     } catch (error) {
//         res.status(500).json({ error: "Conversion failed" });
//     }
// });

// // 4️⃣ Route to Serve PDFs (Restrict Access If Not Purchased)
// // router.get("/pdf/:unitId", async (req, res) => {
// //     try {
// //         const userId = req.query.userId;
// //         if (!userId) {
// //             return res.status(401).json({ message: "User authentication required" });
// //         }

// //         const unit = await Unit.findById(req.params.unitId);
// //         if (!unit) {
// //             return res.status(404).json({ message: "Unit not found" });
// //         }

// //         const filePath = path.join(__dirname, "..", "uploads", unit.pdfUrl);
        
// //         if (!fs.existsSync(filePath)) {
// //             return res.status(404).json({ message: "PDF file not found on server" });
// //         }

// //         res.sendFile(filePath);
// //     } catch (error) {
// //         console.error("❌ Error fetching PDF:", error);
// //         res.status(500).json({ message: "Server error while fetching PDF" });
// //     }
// // });


// router.get("/pdf/:unitId", async (req, res) => {
//     try {
//         const userId = req.query.userId;
//         if (!userId) {
//             return res.status(401).json({ message: "User authentication required" });
//         }

//         const unit = await Unit.findById(req.params.unitId);
//         if (!unit) {
//             return res.status(404).json({ message: "Unit not found" });
//         }

//         // 🔹 Check if the user has purchased the unit
//         const purchase = await Purchase.findOne({ userId, unitId: unit._id });
//         if (!purchase) {
//             return res.status(403).json({ message: "Access denied. You haven't purchased this unit." });
//         }

//         // 🔹 Return Google Drive PDF link
//         if (!unit.pdfUrl) {
//             return res.status(404).json({ message: "PDF link not found" });
//         }

//         return res.json({ success: true, pdfUrl: unit.pdfUrl }); // Send Google Drive link
//     } catch (error) {
//         console.error("❌ Error fetching PDF:", error);
//         res.status(500).json({ message: "Server error while fetching PDF" });
//     }
// });

// module.exports = router;

const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const drive = require("../config/drive");
const Unit = require("../models/Unit");
require("dotenv").config();

// 🔹 Upload a PDF to Google Drive
async function uploadPDF(filePath, unitName, price, subjectId) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("❌ File does not exist:", filePath);
      return;
    }

    const fileMetadata = {
      name: path.basename(filePath),
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Replace with your Google Drive Folder ID
    };

    const media = {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink",
    });

    console.log("✅ PDF uploaded successfully:", response.data.webViewLink);

    // 🔹 Save file details in MongoDB
    const newUnit = new Unit({
      name: unitName,
      price,
      subject: subjectId,
      pdfUrl: response.data.webViewLink, // Google Drive URL
      pdfDriveId: response.data.id, // File ID
      localPath: filePath, // Local path before upload
    });

    await newUnit.save();
    console.log("✅ PDF details saved to MongoDB:", newUnit);
  } catch (error) {
    console.error("❌ Error uploading PDF:", error);
  }
}

// 🔹 Connect to MongoDB and Upload a File
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const filePath = path.join(__dirname, "EGR5[1].pdf"); // Change to your local file
    const unitName = "Sample Unit";
    const price = 99;
    const subjectId = "67e39e2111a9b55d9c0c88a4"; // Replace with actual Subject ID

    await uploadPDF(filePath, unitName, price, subjectId);

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.disconnect();
  }
}

main();

const { google } = require("googleapis");
const path = require("path");
require("dotenv").config();

// Load Google Drive API credentials
const KEY_PATH = path.join(__dirname, "../google-drive-key.json");

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

module.exports = drive;

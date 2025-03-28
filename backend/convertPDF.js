const fs = require("fs-extra");
const path = require("path");
const pdfPoppler = require("pdf-poppler");

async function convertPDFToImages(pdfPath, outputDir) {
    try {
        await fs.ensureDir(outputDir);

        let opts = {
            format: "png",
            out_dir: outputDir,
            out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
            page: null,
        };

        await pdfPoppler.convert(pdfPath, opts);
        console.log("✅ PDF converted to images:", outputDir);
        return fs.readdirSync(outputDir).map(file => path.join(outputDir, file));
    } catch (error) {
        console.error("❌ Error converting PDF:", error);
        return [];
    }
}

module.exports = convertPDFToImages;

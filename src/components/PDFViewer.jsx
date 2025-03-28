import React, { useState } from "react";

const PDFViewer = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", selectedFile);

        try {
            const response = await fetch("http://localhost:5000/api/convert-pdf", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to upload PDF");
            }

            const data = await response.json();
            setImages(data.images);
        } catch (error) {
            console.error("Error uploading PDF:", error);
        }
    };

    return (
        <div>
            <h2>Upload and View PDF</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Convert & View</button>

            <div>
                {images.length > 0 && (
                    <div>
                        <h3>Converted PDF Pages</h3>
                        {images.map((img, index) => (
                            <img key={index} src={`http://localhost:5000${img}`} alt={`Page ${index + 1}`} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFViewer;

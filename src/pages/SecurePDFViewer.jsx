import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000";

const SecurePDFViewer = () => {
  const viewerRef = useRef(null);
  const { unitId } = useParams();
  const navigate = useNavigate();

  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);

  useEffect(() => {
    const loadPDF = async () => {
      const response = await fetch(
        `${API_BASE_URL}/units/pdf/${unitId}?userId=${localStorage.getItem("userId")}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfData(url);
      } else {
        alert("You are not authorized to view this PDF.");
        navigate("/");
      }
    };

    loadPDF();

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (
        key === "f12" ||
        (e.ctrlKey && ["p", "s", "u"].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key))
      ) {
        e.preventDefault();
        alert("This action is blocked.");
      }
      if (key === "printscreen") {
        e.preventDefault();
        document.body.style.filter = "blur(10px)";
        setTimeout(() => {
          document.body.style.filter = "none";
        }, 200);
      }
    };

    const handleContextMenu = (e) => e.preventDefault();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [unitId, navigate]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.8));

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-center select-none">
      <h2 className="text-2xl font-bold mb-4">Protected PDF Viewer</h2>

      <div className="mb-4 flex justify-center gap-4">
        <button onClick={zoomOut} className="bg-gray-200 px-3 py-1 rounded">➖ Zoom Out</button>
        <button onClick={zoomIn} className="bg-gray-200 px-3 py-1 rounded">➕ Zoom In</button>
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          ⬅️ Previous
        </button>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Next ➡️
        </button>
      </div>

      <div
        ref={viewerRef}
        style={{ display: "flex", justifyContent: "center" }}
        className="w-full overflow-auto"
      >
        {pdfData && (
          <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>

      <p className="mt-4 text-gray-600">
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default SecurePDFViewer;








// // src/pages/student/SecurePDFViewer.jsx
// import React, { useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000";

// const SecurePDFViewer = () => {
//   const viewerRef = useRef(null);
//   const { unitId } = useParams(); // From route: /view/:unitId
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadPDF = async () => {
//       const response = await fetch(`${API_BASE_URL}/units/pdf/${unitId}?userId=${localStorage.getItem("userId")}`, {
//         credentials: "include"
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob);

//         if (viewerRef.current && window.impdf) {
//           window.impdf.load({
//             el: viewerRef.current,
//             source: url,
//             disableDownload: true,
//             disablePrint: true,
//             watermark: {
//               text: "ScoeN Notes - Protected",
//               opacity: 0.1,
//               diagonal: true,
//             },
//           });
//         }
//       } else {
//         alert("You are not authorized to view this PDF.");
//         navigate("/"); // Redirect home
//       }
//     };

//     loadPDF();
//   }, [unitId, navigate]);

//   return (
//     <div className="min-h-screen p-4 bg-gray-100">
//       <h2 className="text-xl font-bold text-center mb-4">Protected PDF Viewer</h2>
//       <div ref={viewerRef} style={{ height: "90vh", border: "1px solid #ccc", borderRadius: "8px" }} />
//     </div>
//   );
// };

// export default SecurePDFViewer;

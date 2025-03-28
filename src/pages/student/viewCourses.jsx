import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Studentnav } from "./studentnav";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function CourseViewerPage() {
    const { id } = useParams();
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfLoading, setPdfLoading] = useState(true);

    // This is a direct PDF link (replace with your actual link)
    const pdfUrl = "https://drive.google.com/file/d/1mLOkr5aa8YgYKN2rbWU6TPX69bNIJGbA/preview";

    // Alternative approach: If you want to use react-pdf with a direct download link
    const directPdfUrl = "https://drive.google.com/uc?export=download&id=1mLOkr5aa8YgYKN2rbWU6TPX69bNIJGbA";

    const handleNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Studentnav />

            <div className="flex-1 flex flex-col">
                {/* Course header */}
                <div className="bg-white border-b py-3 px-4">
                    <div className="container flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                            <h1 className="font-bold truncate">{`Course Name`}</h1>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4">
                    {/* Option 1: Using Google Drive embed (simpler) */}
                    <iframe 
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                        loading="lazy"
                    >
                        <p>Your browser does not support iframes.</p>
                    </iframe>

                    {/* Option 2: Using react-pdf with direct download link (more control but needs CORS) */}
                    {/* <Document
                        file={directPdfUrl}
                        onLoadSuccess={({ numPages }) => {
                            setNumPages(numPages);
                            setPdfLoading(false);
                        }}
                        onLoadError={(error) => {
                            console.error("PDF load error:", error);
                            setPdfLoading(false);
                        }}
                        loading={<div>Loading PDF...</div>}
                    >
                        <Page pageNumber={currentPage} />
                    </Document> */}
                </div>

                {/* Navigation controls (only needed for react-pdf option) */}
                {numPages && (
                    <div className="bg-white border-t p-3 flex items-center justify-between">
                        <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>

                        <div className="text-sm text-gray-600">
                            Page {currentPage} of {numPages}
                        </div>

                        <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === numPages}>
                            Next <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}



// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Document, Page, pdfjs } from "react-pdf";
// import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Studentnav } from "./studentnav";

// // Set up PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export function CourseViewerPage() {
//     const { id } = useParams();
//     const [numPages, setNumPages] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pdfLoading, setPdfLoading] = useState(true);

//     // This is a direct PDF link (replace with your actual link)
//     const pdfUrl = "https://drive.google.com/file/d/1mLOkr5aa8YgYKN2rbWU6TPX69bNIJGbA/preview";

//     // Alternative approach: If you want to use react-pdf with a direct download link
//     const directPdfUrl = "https://drive.google.com/uc?export=download&id=1mLOkr5aa8YgYKN2rbWU6TPX69bNIJGbA";

//     const handleNextPage = () => {
//         if (currentPage < numPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="flex min-h-screen flex-col">
//             <Studentnav />

//             <div className="flex-1 flex flex-col">
//                 {/* Course header */}
//                 <div className="bg-white border-b py-3 px-4">
//                     <div className="container flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <Link to="/profile" className="text-gray-600 hover:text-gray-900">
//                                 <ChevronLeft className="h-5 w-5" />
//                             </Link>
//                             <h1 className="font-bold truncate">{`Course Name`}</h1>
//                         </div>
//                     </div>
//                 </div>

//                 {/* PDF Viewer */}
//                 <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4">
//                     {/* Option 1: Using Google Drive embed (simpler) */}
//                     <iframe 
//                         src={pdfUrl}
//                         width="100%"
//                         height="600px"
//                         style={{ border: 'none' }}
//                         loading="lazy"
//                     >
//                         <p>Your browser does not support iframes.</p>
//                     </iframe>

//                     {/* Option 2: Using react-pdf with direct download link (more control but needs CORS) */}
//                     {/* <Document
//                         file={directPdfUrl}
//                         onLoadSuccess={({ numPages }) => {
//                             setNumPages(numPages);
//                             setPdfLoading(false);
//                         }}
//                         onLoadError={(error) => {
//                             console.error("PDF load error:", error);
//                             setPdfLoading(false);
//                         }}
//                         loading={<div>Loading PDF...</div>}
//                     >
//                         <Page pageNumber={currentPage} />
//                     </Document> */}
//                 </div>

//                 {/* Navigation controls (only needed for react-pdf option) */}
//                 {numPages && (
//                     <div className="bg-white border-t p-3 flex items-center justify-between">
//                         <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
//                             <ArrowLeft className="h-4 w-4 mr-1" /> Previous
//                         </Button>

//                         <div className="text-sm text-gray-600">
//                             Page {currentPage} of {numPages}
//                         </div>

//                         <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === numPages}>
//                             Next <ArrowRight className="h-4 w-4 ml-1" />
//                         </Button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



// // // import { useState } from "react"
// // // import { useParams, Link } from "react-router-dom"
// // // import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, Download, List, Maximize2, Minimize2 } from "lucide-react"
// // // import { Button } from "../../components/ui/button"
// // // import { Studentnav } from "./studentnav"

// // // export function CourseViewerPage() {
// // //     const { id } = useParams()

// // //     const [currentPage, setCurrentPage] = useState(1)
// // //     const [totalPages, setTotalPages] = useState(24)


// // //     const handlePrevPage = () => {
// // //         if (currentPage > 1) {
// // //             setCurrentPage(currentPage - 1)
// // //         }
// // //     }

// // //     const handleNextPage = () => {
// // //         if (currentPage < totalPages) {
// // //             setCurrentPage(currentPage + 1)
// // //         }
// // //     }


// // //     return (
// // //         <div className="flex min-h-screen flex-col">
// // //             <Studentnav />

// // //             <div className="flex-1 flex flex-col">
// // //                 {/* Course header */}
// // //                 <div className="bg-white border-b py-3 px-4">
// // //                     <div className="container flex items-center justify-between">
// // //                         <div className="flex items-center gap-3">
// // //                             <Link to="/profile" className="text-gray-600 hover:text-gray-900">
// // //                                 <ChevronLeft className="h-5 w-5"  />
// // //                             </Link>
// // //                             <h1 className="font-bold truncate">{`Courses Name`}</h1>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* PDF viewer */}
// // //                 <div className={`flex-1 bg-gray-100 flex flex-col`}>
// // //                     <div className="flex-1 flex items-center justify-center p-4">
// // //                         {/* This would be replaced with an actual PDF viewer component */}
// // //                         <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl  flex items-center justify-center aspect-[3/4]">
// // //                             <div className="text-center p-8">
// // //                                 <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
// // //                                 <h3 className="text-xl font-bold mb-2">Setting Up Your Development Environment</h3>
// // //                                 <p className="text-gray-600 mb-4">
// // //                                     Page {currentPage} of {totalPages}
// // //                                 </p>
// // //                                 <p className="text-gray-500 max-w-md mx-auto">
// // //                                     This is where the PDF content would be displayed. In a real application, you would integrate a PDF
// // //                                     viewer library like PDF.js or react-pdf.
// // //                                 </p>
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Navigation controls */}
// // //                     <div className="bg-white border-t p-3 flex items-center justify-between">
// // //                         <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
// // //                             <ArrowLeft className="h-4 w-4 mr-1" /> Previous
// // //                         </Button>

// // //                         <div className="flex items-center gap-3">
// // //                             <span className="text-sm text-gray-600">
// // //                                 Page {currentPage} of {totalPages}
// // //                             </span>
// // //                         </div>

// // //                         <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
// // //                             Next <ArrowRight className="h-4 w-4 ml-1" />
// // //                         </Button>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     )
// // // }


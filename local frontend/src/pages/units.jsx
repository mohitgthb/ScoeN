import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Studentnav } from "../../src/pages/student/studentnav";
import { Button } from "../components/ui/button";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000";

export function UnitsPage() {
  const { id: subjectId } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [subjectName, setSubjectName] = useState("");

  // ✅ Authentication check function
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 401) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Authentication check failed:", error);
      return null;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const user = await checkAuth();

      if (!user) {
        console.log("No active session, redirecting to signin");
        navigate("/signin");
        return;
      }

      setAuthChecked(true);
      fetchUnits();
    };

    initialize();
  }, [subjectId, navigate]);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const user = await checkAuth();
      if (!user) return navigate("/signin");

      localStorage.setItem("userId", user._id); // store for viewer access

      const response = await fetch(
        `${API_BASE_URL}/units/all?userId=${user._id}&subjectId=${subjectId}`,
        {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status === 401) return navigate("/signin");

      const data = await response.json();
      setUnits(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching units:", error);
      setUnits([]);
    } finally {
      setLoading(false);
    }
  };

  // const handlePayment = async (unitId, price) => {
  //   try {
  //     const user = await checkAuth();
  //     if (!user) {
  //       alert("Please sign in to make a purchase");
  //       navigate("/signin");
  //       return;
  //     }

  //     if (!window.Razorpay) {
  //       alert("Payment system not loaded. Please refresh.");
  //       return;
  //     }

  //     const response = await fetch(`${API_BASE_URL}/payment/create`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: 'include',
  //       body: JSON.stringify({
  //         unitId,
  //         price,
  //         userId: user._id
  //       }),
  //     });

  //     if (response.status === 401) return navigate("/signin");

  //     const data = await response.json();
  //     if (data.success) {
  //       const options = {
  //         key: import.meta.env.VITE_RAZORPAY_KEY,
  //         amount: price * 100,
  //         currency: "INR",
  //         name: "Notes Purchase",
  //         description: `Access to study materials`,
  //         order_id: data.orderId,
  //         handler: async (paymentData) => {
  //           await verifyPayment(unitId, paymentData);
  //         },
  //         prefill: {
  //           email: user.email || "user@example.com",
  //           name: user.name || "Student"
  //         },
  //         theme: { color: "#3399cc" },
  //       };

  //       new window.Razorpay(options).open();
  //     } else {
  //       alert("Payment initialization failed: " + (data.message || "Unknown error"));
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     alert("Payment processing failed. Please try again.");
  //   }
  // };
  const handlePayment = async (unitId) => {
    const price = 15; // Set fixed price as 15 rupees for each PDF
  
    try {
      const user = await checkAuth();
      if (!user) {
        alert("Please sign in to make a purchase");
        navigate("/signin");
        return;
      }
  
      if (!window.Razorpay) {
        alert("Payment system not loaded. Please refresh.");
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          unitId,
          price,
          userId: user._id
        }),
      });
  
      if (response.status === 401) return navigate("/signin");
  
      const data = await response.json();
      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: price * 100, // Convert to paise (i.e., 15 * 100)
          currency: "INR",
          name: "Notes Purchase",
          description: `Access to study materials`,
          order_id: data.orderId,
          handler: async (paymentData) => {
            await verifyPayment(unitId, paymentData);
          },
          prefill: {
            email: user.email || "user@example.com",
            name: user.name || "Student"
          },
          theme: { color: "#3399cc" },
        };
  
        new window.Razorpay(options).open();
      } else {
        alert("Payment initialization failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing failed. Please try again.");
    }
  };
  

  const verifyPayment = async (unitId, paymentData) => {
    try {
      const user = await checkAuth();
      if (!user) return;

      const response = await fetch(`${API_BASE_URL}/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          unitId,
          userId: user._id,
          ...paymentData
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert("Payment successful! You can now access the notes.");
          fetchUnits();
        } else {
          alert("Payment verification failed: " + (result.message || "Unknown error"));
        }
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred during payment verification");
    }
  };

  // ✅ updated to navigate to protected viewer page
  const viewPDFProtected = (unitId) => {
    navigate(`/view/${unitId}`);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!authChecked) {
    return (
      <div className="flex min-h-screen flex-col">
        <Studentnav />
        <main className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <p className="text-lg animate-pulse">Verifying your session...</p>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Studentnav />
        <main className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <p className="text-lg animate-pulse">Loading course materials...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Studentnav />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{subjectName}</h1>
            <p className="mt-2 text-lg text-gray-600">
              {units.length > 0
                ? `Select a unit to view or purchase materials`
                : `No units available for this subject yet`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <div
                key={unit._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {unit.name}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ₹{unit.price}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {unit.description || "Study materials for this unit"}
                  </p>

                  <div className="mt-4 flex justify-end">
                    {unit.purchased ? (
                      <Button
                        onClick={() => viewPDFProtected(unit._id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View Materials
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePayment(unit._id, unit.price)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Purchase
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {units.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No units available</h3>
              <p className="mt-1 text-gray-500">Check back later or contact your instructor.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Studentnav } from "../../src/pages/student/studentnav";
// import { Button } from "../components/ui/button";

// const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000";

// export function UnitsPage() {
//   const { id: subjectId } = useParams();
//   const navigate = useNavigate();
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [subjectName, setSubjectName] = useState("");1

//   // Authentication check function
//   const checkAuth = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/me`, {
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           return null;
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const userData = await response.json();
//       return userData;
//     } catch (error) {
//       console.error("Authentication check failed:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       const user = await checkAuth();
      
//       if (!user) {
//         console.log("No active session, redirecting to signin");
//         navigate("/signin");
//         return;
//       }

//       setAuthChecked(true);
//       fetchUserData();
//       fetchUnits();
//     };

//     initialize();
//   }, [subjectId, navigate]);

//   const fetchUserData = async () => {
//     const user = await checkAuth();
//     if (user) {
//       setUserIdState(user._id); // Store authenticated userId in state
//     } else {
//       navigate("/signin");
//     }
//   };

//   const fetchUnits = async () => {
//     try {
//       setLoading(true);
      
//       const user = await checkAuth();
//       if (!user) {
//         navigate("/signin");
//         return;
//       }
  
//       const response = await fetch(
//         `${API_BASE_URL}/units/all?userId=${user._id}&subjectId=${subjectId}`,
//         { 
//           credentials: 'include',
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
  
//       if (response.status === 401) {
//         navigate("/signin");
//         return;
//       }
  
//       const data = await response.json();
//       setUnits(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching units:", error);
//       setUnits([]);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // 🔹 Handle Payment with authentication check
//   const handlePayment = async (unitId, price) => {
//     try {
//       const user = await checkAuth();
//       if (!user) {
//         alert("Please sign in to make a purchase");
//         navigate("/signin");
//         return;
//       }

//       if (!window.Razorpay) {
//         alert("Payment system not loaded. Please refresh.");
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/payment/create`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//         },
//         credentials: 'include',
//         body: JSON.stringify({ 
//           unitId, 
//           price,
//           userId: user._id // Send user ID from session
//         }),
//       });

//       if (response.status === 401) {
//         navigate("/signin");
//         return;
//       }

//       const data = await response.json();
//       if (data.success) {
//         const options = {
//           key: import.meta.env.VITE_RAZORPAY_KEY,
//           amount: price * 100,
//           currency: "INR",
//           name: "Notes Purchase",
//           description: `Access to study materials`,
//           order_id: data.orderId,
//           handler: async (paymentData) => {
//             await verifyPayment(unitId, paymentData);
//           },
//           prefill: {
//             email: user.email || "user@example.com",
//             name: user.name || "Student"
//           },
//           theme: { color: "#3399cc" },
//         };

//         new window.Razorpay(options).open();
//       } else {
//         alert("Payment initialization failed: " + (data.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment processing failed. Please try again.");
//     }
//   };

//   // 🔹 Verify Payment with authentication check
//   const verifyPayment = async (unitId, paymentData) => {
//     try {
//       const user = await checkAuth();
//       if (!user) {
//         console.error("User not authenticated during payment verification");
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/payment/verify`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//         },
//         credentials: 'include',
//         body: JSON.stringify({ 
//           unitId, 
//           userId: user._id,
//           ...paymentData 
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           alert("Payment successful! You can now access the notes.");
//           fetchUnits(); // Refresh the unit list
//         } else {
//           alert("Payment verification failed: " + (result.message || "Unknown error"));
//         }
//       } else {
//         alert("Payment verification failed. Please contact support.");
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       alert("An error occurred during payment verification");
//     }
//   };


//   const fetchPDF = async (pdfUrl) => {
//     if (!pdfUrl) {
//             alert("PDF link not found. Please try again.");
//             return;
//           }
//           try {
//             window.open(pdfUrl, "_blank"); // Open Google Drive link directly
//           } catch (error) {
//             console.error(" Error opening PDF:", error);
//           }
//       };

//   // 🔹 Ensure Razorpay SDK is Loaded
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   if (!authChecked) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <Studentnav />
//         <main className="flex items-center justify-center flex-grow">
//           <div className="text-center">
//             <p className="text-lg animate-pulse">Verifying your session...</p>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <Studentnav />
//         <main className="flex items-center justify-center flex-grow">
//           <div className="text-center">
//             <p className="text-lg animate-pulse">Loading course materials...</p>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-gray-50">
//       <Studentnav />
      
//       <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">{subjectName}</h1>
//             <p className="mt-2 text-lg text-gray-600">
//               {units.length > 0 
//                 ? `Select a unit to view or purchase materials`
//                 : `No units available for this subject yet`}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {units.map((unit) => (
//               <div 
//                 key={unit._id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {unit.name}
//                     </h2>
//                     <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
//                       ₹{unit.price}
//                     </span>
//                   </div>
                  
//                   <p className="mt-2 text-gray-600 line-clamp-2">
//                     {unit.description || "Study materials for this unit"}
//                   </p>
                  
//                   <div className="mt-4 flex justify-end">
//                     {unit.purchased ? (
//                       <Button
//                         onClick={() => fetchPDF(unit.pdfUrl)}
//                         className="bg-green-600 hover:bg-green-700"
//                       >
//                         <span className="flex items-center">
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                           View Materials
//                         </span>
//                       </Button>
//                     ) : (
//                       <Button
//                         onClick={() => handlePayment(unit._id, unit.price)}
//                         className="bg-blue-600 hover:bg-blue-700"
//                       >
//                         <span className="flex items-center">
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                           </svg>
//                           Purchase
//                         </span>
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {units.length === 0 && (
//             <div className="text-center py-12">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">No units available</h3>
//               <p className="mt-1 text-gray-500">Check back later or contact your instructor.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       <footer className="bg-white border-t py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }



// // // import React from "react"
// // // import { useParams } from "react-router-dom"
// // // import { Studentnav } from "../../frontend/src/pages/student/studentnav"
// // // import { Link } from "react-router-dom"
// // // import { Button } from "../components/ui/button"
// // // import { useEffect, useState } from "react";

// // // const API_BASE_URL = "http://localhost:5000";


// // // export function UnitsPage() {

// // //   const { id } = useParams()
// // //   const [units, setUnits] = useState([])

// // //   const [loading, setLoading] = useState(true);
// // //   const userId = localStorage.getItem("userId");

// // //   useEffect(() => {
// // //     if (!userId) {
// // //       console.warn("⚠ No user logged in.");
// // //       alert("You must log in first!");
// // //       window.location.href = "/login"; // Redirect to login page
// // //       return;
// // //     }

// // //     fetchUnits();
// // //   }, [userId]); // Runs whenever userId changes

// // //   // 🔹 Fetch all available units (PDFs)
// // //   const fetchUnits = async () => {
// // //     try {
// // //       if (!userId) return;

// // //       const response = await fetch(`${API_BASE_URL}/units/all?userId=${userId}`);
// // //       const data = await response.json();
// // //       console.log("📂 Units received:", data);

// // //       setUnits(data);
      
// // //       console.log(units);

// // //     } catch (error) {
// // //       console.error("❌ Error fetching PDFs:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // 🔹 Ensure Razorpay SDK is Loaded
// // //   useEffect(() => {
// // //     const script = document.createElement("script");
// // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //     script.async = true;
// // //     document.body.appendChild(script);

// // //     return () => {
// // //       document.body.removeChild(script);
// // //     };
// // //   }, []);

// // //   // 🔹 Handle Payment
// // //   const handlePayment = async (unitId, price) => {
// // //     try {
// // //       if (!userId) {
// // //         alert("You must be logged in to buy notes.");
// // //         window.location.href = "/login";
// // //         return;
// // //       }

// // //       // 🔹 Ensure Razorpay SDK is available
// // //       if (!window.Razorpay) {
// // //         alert("Razorpay SDK failed to load. Please refresh and try again.");
// // //         return;
// // //       }

// // //       const response = await fetch(`${API_BASE_URL}/payment/create`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ unitId, userId }),
// // //       });

// // //       const data = await response.json();
// // //       if (data.success) {
// // //         const options = {
// // //           key: import.meta.env.VITE_RAZORPAY_KEY, // Use environment variable
// // //           amount: price * 100, // Convert to paise
// // //           currency: "INR",
// // //           name: "Notes Purchase",
// // //           description: "Get access to study material",
// // //           order_id: data.orderId,
// // //           handler: async function (paymentData) {
// // //             await verifyPayment(unitId, paymentData);
// // //           },
// // //           prefill: { email: "user@example.com" },
// // //           theme: { color: "#3399cc" },
// // //         };

// // //         const rzp = new window.Razorpay(options);
// // //         rzp.open();
// // //       } else {
// // //         alert("Payment failed: " + data.message);
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Error processing payment:", error);
// // //     }
// // //   };

// // //   // 🔹 Verify Payment and Grant PDF Access
// // //   const verifyPayment = async (unitId, paymentDetails) => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/payment/verify`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ unitId, userId, ...paymentDetails }),
// // //       });

// // //       const data = await response.json();
// // //       if (data.success) {
// // //         alert("✅ Payment successful! You can now access the notes.");
// // //         fetchUnits(); // Refresh the unit list to show the "View Notes" button
// // //       } else {
// // //         alert("❌ Payment verification failed!");
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Error verifying payment:", error);
// // //     }
// // //   };

// // //   // 🔹 Fetch & Open PDF After Payment
// // //   const fetchPDF = async (unitId) => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/units/pdf/${unitId}?userId=${userId}`);
// // //       const data = await response.blob();

// // //       if (response.ok) {
// // //         const pdfUrl = URL.createObjectURL(data);
// // //         window.open(pdfUrl, "_blank");
// // //       } else {
// // //         alert("❌ Access denied: " + data.message);
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Error fetching PDF:", error);
// // //     }
// // //   };



// // //   return (
// // //     <div className="flex min-h-screen flex-col">
// // //       <Studentnav />

// // //       <main className=" md:py-24 py-8 lg:px-8 px-4">
// // //         <div className="container">

// // //           <div className="grid md:grid-cols-5 gap-8">


// // //             {units.map((unit) => (
// // //               <div className="flex flex-col items-center p-6 bg-[#F6F5F4] rounded-2xl"  key={unit._id}>
// // //                   <h3 className="text-xl font-bold mb-2">{unit.name} - ₹{unit.price}</h3>
// // //                     {unit.purchased ? (
// // //                       <Button onClick={() => fetchPDF(unit._id)}>📖 View Notes</Button>
// // //                     ) : (
// // //                       <Button onClick={() => handlePayment(unit._id, unit.price)}>💳 Buy Now</Button>
// // //                     )}
// // //               </div>
// // //             ))}


// // //           </div>
// // //         </div>
// // //       </main>

// // //       <footer className="py-6 border-t">
// // //         <div className="container">
// // //           <p className="text-center text-sm text-gray-600">
// // //             © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
// // //           </p>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   )
// // // }


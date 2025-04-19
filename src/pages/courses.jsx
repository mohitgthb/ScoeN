// // import React from 'react'
// // import { Link } from 'react-router-dom'
// // import { Studentnav } from './student/studentnav'
// // import m2 from '../components/images/Subjects/m2.jpg'
// // import chem from '../components/images/Subjects/chem.jpg'
// // import phy from '../components/images/Subjects/phy.jpg'
// // import bee from '../components/images/Subjects/bee.jpg'
// // import bxe from '../components/images/Subjects/bxe.jpg'
// // import graphics from '../components/images/Subjects/graphics.jpg'
// // import mech from '../components/images/Subjects/mech.jpg'
// // import pps from '../components/images/Subjects/pps.jpg'
// // import fpl from '../components/images/Subjects/fpl.jpg'
// // import m1 from '../components/images/Subjects/m1.jpg'


// // const API_BASE_URL = "https://scoen1.onrender.com";

// // export function Courses() {
// //   // Mock courses data
// //   const courses = [
// //     {
// //       id: "1",
// //       title: "Engineering Physics ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: phy,
// //     },
// //     {
// //       id: "2",
// //       title: "Engineering Chemistry ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: chem,
// //     },
// //     {
// //       id: "3",
// //       title: "Engineering Mathematics II",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: m2,
// //     },
// //     {
// //       id: "4",
// //       title: "Basics Electrical Engineering",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: bee
// //     },
// //     {
// //       id: "5",
// //       title: "Engineering Mechanics ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: mech
// //     },
// //     {
// //       id: "6",
// //       title: "Engineering Graphics ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: graphics
// //     },
// //     {
// //       id: "7",
// //       title: "Basics Electronic Engineering ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: bxe
// //     },
// //     {
// //       id: "8",
// //       title: "Programming and Problem Solving ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: pps
// //     },
// //     {
// //       id: "9",
// //       title: "Fundamentals Of Programming Language ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: fpl
// //     },
// //     {
// //       id: "10",
// //       title: "Mathematics 1 ",
// //       price: 49.99,
// //       discountPrice: 10.00,
// //       image: m1
// //     },
// //   ]

// //   return (
// //     <div className="flex min-h-screen flex-col">
// //       <Studentnav />

// //       <main className="flex-1 py-8 lg:px-8 px-4">
// //         <div className="container px-4 md:px-6">
// //           <div className="mb-8">
// //             <h1 className="text-2xl font-bold mb-2">All Subjects</h1>
// //             <p className="text-gray-600">Explore subjects and start learning</p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {courses.map((course) => (
// //               <div
// //                 key={course.id}
// //                 className="border rounded-lg overflow-hidden bg-[#F6F5F4] shadow-sm hover:shadow-md transition-shadow"
// //               >
// //                 <div className="relative">
// //                 <Link to={`/courses/${course.id}`}>
// //                   <img
// //                     src={course.image}
// //                     alt={course.title}
// //                     width={300}
// //                     height={200}
// //                     className="w-full h-40 object-cover"
// //                   />
// //                   </Link>
// //                 </div>

// //                 <div className="p-4">
// //                   <Link to={`/courses/${course.id}`}>
// //                     <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
// //                       {course.title}
// //                     </h2>
// //                   </Link>

// //                   <div>
// //                       <span className="font-bold text-lg">₹{course.discountPrice}</span>
// //                     </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </main>

// //       <footer className="py-6 border-t">
// //         <div className="container">
// //           <p className="text-center text-sm text-gray-600">
// //             © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
// //           </p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default Courses;





// import React, { useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Studentnav } from "./student/studentnav";

// const API_BASE_URL = "https://scoen1.onrender.com";

// export function Courses() {
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   const fetchSubjects = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/subjects`);
//       const data = await response.json();
//       console.log("📂 Subjects received:", data);
//       setSubjects(data);
//     } catch (error) {
//       console.error("❌ Error fetching subjects:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Studentnav />

//       <main className="flex-1 py-8 lg:px-8 px-4">
//         <div className="container px-4 md:px-6">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold mb-2">All Subjects</h1>
//             <p className="text-gray-600">Explore subjects and start learning</p>
//           </div>

//           {loading ? (
//             <p>Loading subjects...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {subjects.map((subject) => (
//                 <div
//                   key={subject._id}
//                   className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <div className="relative">
//                     <Link to={`/units/${subject._id}`}>
//                       <img
//                         src={`/placeholder.svg?height=200&width=300`} // Placeholder image
//                         alt={subject.name}
//                         width={300}
//                         height={200}
//                         className="w-full h-40 object-cover"
//                       />
//                     </Link>
//                   </div>

//                   <div className="p-4">
//                     <Link to={`/units/${subject._id}`}>
//                       <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
//                         {subject.name}
//                       </h2>
//                     </Link>

//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-lg">Subject ID: {subject._id}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <footer className="py-6 border-t">
//         <div className="container">
//           <p className="text-center text-sm text-gray-600">
//             © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Courses;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Studentnav } from "./student/studentnav";

// Subject Images
import m2 from "../components/images/Subjects/m2.jpg";
import chem from "../components/images/Subjects/chem.jpg";
import phy from "../components/images/Subjects/phy.jpg";
import bee from "../components/images/Subjects/bee.jpg";
import bxe from "../components/images/Subjects/bxe.jpg";
import graphics from "../components/images/Subjects/graphics.jpg";
import mech from "../components/images/Subjects/mech.jpg";
import pps from "../components/images/Subjects/pps.jpg";
import fpl from "../components/images/Subjects/fpl.jpg";
import m1 from "../components/images/Subjects/m1.jpg";

const API_BASE_URL = "https://scoen1.onrender.com";

// 📌 Subject name-to-image map
const subjectImageMap = {
  "Engineering Physics": phy,
  "Engineering Chemistry": chem,
  "Engineering Mathematics II": m2,
  "Basics Electrical Engineering": bee,
  "Engineering Mechanics": mech,
  "Engineering Graphics": graphics,
  "Basics Electronic Engineering": bxe,
  "Programming and Problem Solving": pps,
  "Fundamentals Of Programming Language": fpl,
  "Mathematics 1": m1,
};

export function Courses() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subjects`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("❌ Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Studentnav />

      <main className="flex-1 py-8 lg:px-8 px-4">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">All Subjects</h1>
            <p className="text-gray-600">Explore subjects and start learning</p>
          </div>

          {loading ? (
            <p>Loading subjects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => {
                const image = subjectImageMap[subject.name] || "/placeholder.svg";
                return (
                  <div
                    key={subject._id}
                    className="border rounded-lg overflow-hidden bg-[#F6F5F4] shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative">
                      <Link to={`/units/${subject._id}`}>
                        <img
                          src={image}
                          alt={subject.name}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                      </Link>
                    </div>

                    <div className="p-4">
                      <Link to={`/units/${subject._id}`}>
                        <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                          {subject.name}
                        </h2>
                      </Link>

                      <div>
                        <span className="font-bold text-lg text-green-700">
                          ₹10.00 {/* or subject.price if available */}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Courses;



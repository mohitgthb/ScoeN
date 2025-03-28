import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Studentnav } from "./student/studentnav";

const API_BASE_URL = "http://localhost:5000";

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
      console.log("📂 Subjects received:", data);
      setSubjects(data);
    } catch (error) {
      console.error("❌ Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
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
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <Link to={`/units/${subject._id}`}>
                      <img
                        src={`/placeholder.svg?height=200&width=300`} // Placeholder image
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

                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Subject ID: {subject._id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t">
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



// import React from 'react'
// import { Star } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { Studentnav } from './student/studentnav'
// import noteimg from '../components/images/notesimg.png'


// export function Courses() {
//   // Mock courses data
//   const courses = [
//     {
//       id: "1",
//       title: "Complete Web Development Bootcamp",
//       instructor: "Jane Smith",
//       rating: 4.8,
//       reviews: 12453,
//       price: 89.99,
//       discountPrice: 14.99,
//       image: noteimg,
//     },
//     {
//       id: "2",
//       title: "JavaScript Fundamentals: From Zero to Hero",
//       instructor: "John Doe",
//       rating: 4.7,
//       reviews: 8932,
//       price: 94.99,
//       discountPrice: 16.99,
//       image: "/placeholder.svg?height=200&width=300"
//     },
//     {
//       id: "3",
//       title: "UI/UX Design Masterclass",
//       instructor: "Alex Johnson",
//       rating: 4.9,
//       reviews: 5621,
//       price: 79.99,
//       discountPrice: 12.99,
//       image: "/placeholder.svg?height=200&width=300"
//     },
//     {
//       id: "4",
//       title: "Python for Data Science and Machine Learning",
//       instructor: "Sarah Williams",
//       rating: 4.6,
//       reviews: 7845,
//       price: 99.99,
//       discountPrice: 17.99,
//       image: "/placeholder.svg?height=200&width=300"
//     },
//     {
//       id: "5",
//       title: "React.js: Build Modern Web Applications",
//       instructor: "Michael Chen",
//       rating: 4.8,
//       reviews: 6234,
//       price: 84.99,
//       discountPrice: 15.99,
//       image: "/placeholder.svg?height=200&width=300"
//     },
//     {
//       id: "6",
//       title: "Digital Marketing Fundamentals",
//       instructor: "Emily Davis",
//       rating: 4.5,
//       reviews: 4532,
//       price: 69.99,
//       discountPrice: 13.99,
//       image: "/placeholder.svg?height=200&width=300"
//     },
//   ]

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Studentnav />

//       <main className="flex-1 py-8 lg:px-8 px-4">
//         <div className="container px-4 md:px-6">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold mb-2">All Courses</h1>
//             <p className="text-gray-600">Explore our wide range of courses to enhance your skills</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div
//                 key={course.id}
//                 className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="relative">
//                 <Link to={`/units/${course.id}`}>
//                   <img
//                     src={course.image}
//                     alt={course.title}
//                     width={300}
//                     height={200}
//                     className="w-full h-40 object-cover"
//                   />
//                   </Link>
//                 </div>

//                 <div className="p-4">
//                   <Link to={`/units/${course.id}`}>
//                     <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
//                       {course.title}
//                     </h2>
//                   </Link>

//                   <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>

//                   <div className="flex items-center gap-1 mb-2">
//                     <span className="font-bold text-amber-500">{course.rating}</span>
//                     <div className="flex">
//                       {Array(5)
//                         .fill(0)
//                         .map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-amber-500 text-amber-500" : "text-gray-400"}`}
//                           />
//                         ))}
//                     </div>
//                     <span className="text-xs text-gray-500">({course.reviews.toLocaleString()})</span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="font-bold text-lg">${course.discountPrice}</span>
//                       <span className="text-sm text-gray-500 line-through ml-2">${course.price}</span>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
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
//   )
// }


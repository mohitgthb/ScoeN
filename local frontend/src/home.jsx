import React, { useEffect, useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "./navbar";
import Marquee from "../pages/Marquee";
import { Footer } from "./footer";

// Images
import NoBG2 from "../components/images/NoBG2.png";
import phy from "../components/images/Subjects/phy.jpg";
import chem from "../components/images/Subjects/chem.jpg";
import m2 from "../components/images/Subjects/m2.jpg";

// Image map for subject name → image
const subjectImageMap = {
  "engineering physics": phy,
  "engineering chemistry": chem,
  "engineering mathematics ii": m2,
};

const API_BASE_URL = "http://localhost:5000";

export function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    fetchFeaturedSubjects();
  }, []);

  const fetchFeaturedSubjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subjects`);
      const data = await response.json();
      const top3 = data.slice(0, 3); // Show only top 3 subjects
      setFeaturedCourses(top3);
    } catch (error) {
      console.error("Error fetching featured courses:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative py-8 lg:px-16 px-6">
          <div className="container grid gap-6 md:grid-cols-2 items-center">
            <div className="md:space-y-6 space-y-3">
              <p className="text-blue-700 font-semibold mb-4">
                ज्ञानम् परमम् ध्येयम् सर्वत्र विद्या विजयते
              </p>
              <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
                SPPU Expected Questions, Easy Solutions!
              </h1>
              <div className="flex flex-col justify-center items-start gap-8">
                <div className="flex items-center">
                  <p className="text-xl text-zinc-600">
                    Stop Wasting Money, Start Clearing Backlogs, Top your Class - Just at ₹10!
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-t from-blue-700 to-blue-300 hover:bg-blue-700 transition-colors text-white font-semibold"
                >
                  Explore
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={NoBG2}
                alt="Students learning"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="py-8 bg-white border-y">
          <div className="container">
            <p className="text-center text-gray-600 mb-6 px-4 font-semibold">
              ज्ञान की शक्ति से सफलता की ओर, इंजीनियरिंग की दुनिया में उत्कृष्टता की ओर
            </p>
            <Marquee />
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-12 md:py-24 lg:px-16 px-6">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Select Subjects</h2>
              <Link to="/courses">
                <Button variant="div" className="gap-1 text-blue-600 text-md">
                  View all subjects <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((subject) => {
                const image =
                  subjectImageMap[subject.name.toLowerCase().trim()] || "/placeholder.svg";

                return (
                  <Link
                    key={subject._id}
                    to="/courses"
                    className="border rounded-lg overflow-hidden bg-[#F6F5F4] shadow-sm hover:shadow-md transition-shadow duration-300 block"
                  >
                    <div className="relative">
                      <img
                        src={image}
                        alt={subject.name}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                        {subject.name}
                      </h2>

                      <div>
                        <span className="font-bold text-lg text-green-700">₹10.00</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;






// import { ChevronRight, Play, Star, Globe, Award, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Link } from "react-router-dom"
// import { Navbar } from "./navbar"
// import noteimg from "../components/images/notesimg.png"
// import laptop from "../components/images/Laptop.jpg"
// import NoBG1 from "../components/images/NoBG1.png"
// import NoBG2 from "../components/images/NoBG2.png"
// import phy from "../components/images/Subjects/phy.jpg"
// import chem from "../components/images/Subjects/chem.jpg"
// import m2 from "../components/images/Subjects/m2.jpg"
// import Marquee from '../pages/Marquee'
// import { Footer } from "./footer"


// const courses = [
//   {
//     id: "1",
//     title: "Engineering Physics (651254)",
//     instructor: "Jane Smith",
//     price: 10.00,
//     image: phy,
//   },
//   {
//     id: "2",
//     title: "Engineering Mathematics II (124356)",
//     instructor: "John Doe",
//     price: 10.00,
//     image: m2,
//   },
//   {
//     id: "3",
//     title: "Engineering Chemistry ",
//     instructor: "Alex Johnson",
//     price: 10.00,
//     image: chem,
//   },
// ]

// export function HomePage() {
//   return (
//     <div className="flex min-h-screen flex-col ">
//       <Navbar />
//       <main className="flex-1 relative">
//         {/* Hero Section */}
//         <section className="relative py-8 lg:px-16 px-6">
//           <div className="container grid gap-6 md:grid-cols-2 items-center">
//             <div className="md:space-y-6 space-y-3">
//               <p className="text-blue-700 font-semibold mb-4">ज्ञानम् परमम् ध्येयम् सर्वत्र विद्या विजयते</p>
//               <h1 className="text-4xl md:text-4xl font-bold tracking-tight"> SPPU Expected Questions, Easy Solutions!</h1>
//               <div className="flex flex-col justify-center items-start gap-8">
//                 <div className="flex items-center">
//                   <p className="text-xl text-zinc-600">
//                     Stop Wasting Money, Start Clearing Backlogs,Top your Class - Just at ₹10!
//                   </p>
//                 </div>

//                 <Link
//                   to="/courses"
//                   className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-t from-blue-700 to-blue-300 hover:bg-blue-700 transition-colors text-white font-semibold"
//                 >
//                   Explore
//                   <ArrowRight className="w-5 h-5" />
//                 </Link>
//               </div>
//             </div>
//             <div className="relative">
//               <img
//                 src={NoBG2}
//                 alt="Students learning"
//                 className="rounded-lg object-cover"
//               />
//             </div>
//           </div>
//         </section>

//         <section className="py-8 bg-white border-y">
//           <div className="container">
//             <p className="text-center text-gray-600 mb-6 px-4 font-semibold">
//               ज्ञान की शक्ति से सफलता की ओर,
//               इंजीनियरिंग की दुनिया में उत्कृष्टता की ओर
//             </p>
//             <div>
//               <Marquee />
//             </div>
//           </div>
//         </section>




//         {/* Featured Courses Section */}
//         <section className="py-12 md:py-24 lg:px-16 px-6">
//           <div className="container">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-4xl font-bold">Select Subjects</h2>
//               <Link to="/courses">
//                 <Button variant="div" className="gap-1 text-blue-600 text-md">
//                   View all subjects <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="border rounded-lg overflow-hidden bg-[#F6F5F4] shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <div className="relative">
//                     <Link to={`/courses/${course.id}`}>
//                       <img
//                         src={course.image}
//                         alt={course.title}
//                         width={300}
//                         height={200}
//                         className="w-full h-40 object-cover"
//                       />
//                     </Link>
//                   </div>

//                   <div className="p-4">
//                     <Link to={`/courses/${course.id}`}>
//                       <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
//                         {course.title}
//                       </h2>
//                     </Link>


//                     <div>
//                       <span className="font-bold text-lg">₹{course.price}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-12 md:py-24 lg:px-16 px-6">
//           <div className="container">
//             <div className="mb-12">
//               <h2 className="text-4xl font-bold mb-4">Why Learn with ScoeN</h2>
//               <p className="text-gray-600">
//                 Join millions of students around the world learning skills for the future
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-6 ">
//               <div className="flex flex-col items-start p-6 bg-[#F6F5F4] rounded-2xl">
//                 <div className="p-3 mb-4">
//                   <Play className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Learn at Your Own Pace</h3>
//                 <p className="text-gray-600">
//                   Access courses on-demand, learn on your schedule, and set your own deadlines.
//                 </p>
//               </div>

//               <div className="flex flex-col items-start p-6 bg-[#F6F5F4] rounded-2xl">
//                 <div className="p-3 mb-4">
//                   <Globe className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
//                 <p className="text-gray-600">
//                   Learn from industry experts who are passionate about teaching and sharing their knowledge.
//                 </p>
//               </div>

//               <div className="flex flex-col items-start p-6 bg-[#F6F5F4] rounded-2xl">
//                 <div className="p-3 mb-4">
//                   <Award className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Certificates</h3>
//                 <p className="text-gray-600">
//                   Earn certificates upon completion to showcase your newly acquired skills.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="py-12 md:py-24 bg-[#F6F5F4] px-8">
//           <div className="container">
//             <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">What Our Students Say</h2>

//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   name: "Michael Chen",
//                   role: "Software Developer",
//                   content:
//                     "The web development course was exactly what I needed to transition into tech. Within 3 months of completing it, I landed my first developer job.",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//                 {
//                   name: "Priya Sharma",
//                   role: "Marketing Specialist",
//                   content:
//                     "ScoeN's digital marketing courses helped me stay ahead in my field. The instructors are industry professionals who provide real-world insights.",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//                 {
//                   name: "David Wilson",
//                   role: "UX Designer",
//                   content:
//                     "The design courses on ScoeN are comprehensive and practical. I was able to build a portfolio that helped me secure freelance clients.",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//               ].map((testimonial, index) => (
//                 <div key={index} className="bg-white p-6 rounded-lg border">
//                   <div className="flex items-center gap-4 mb-4">
//                     {/* <img
//                       src={testimonial.image || "/placeholder.svg"}
//                       alt={testimonial.name}
//                       width={50}
//                       height={50}
//                       className="rounded-full"
//                     /> */}
//                     <div>
//                       <h4 className="font-bold">{testimonial.name}</h4>
//                       <p className="text-sm text-gray-600">{testimonial.role}</p>
//                     </div>
//                   </div>
//                   <p className="italic text-gray-600">"{testimonial.content}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />

//     </div>
//   )
// }

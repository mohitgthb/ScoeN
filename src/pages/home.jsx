
import { Search, ChevronRight, Play, Star, Globe, Award, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom"
import { Navbar } from "./navbar"
import noteimg from "../components/images/notesimg.png"
import laptop from "../components/images/Laptop.jpg"
import NoBG1 from "../components/images/NoBG1.png"
import NoBG2 from "../components/images/NoBG2.png"
import Book from "../components/images/books.jpg"
import Marquee from '../pages/Marquee'


const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Jane Smith",
    rating: 4.8,
    reviews: 12453,
    price: 89.99,
    discountPrice: 14.99,
    image: noteimg,
  },
  {
    id: "2",
    title: "JavaScript Fundamentals: From Zero to Hero",
    instructor: "John Doe",
    rating: 4.7,
    reviews: 8932,
    price: 94.99,
    discountPrice: 16.99,
    image: noteimg,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    instructor: "Alex Johnson",
    rating: 4.9,
    reviews: 5621,
    price: 79.99,
    discountPrice: 12.99,
    image: noteimg,
  },
]

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative py-8 lg:px-16 px-6">
          <div className="container grid gap-6 md:grid-cols-2 items-center">
            <div className="md:space-y-6 space-y-3">
              <p className="text-blue-700 font-semibold mb-4">ज्ञानम् परमम् ध्येयम् सर्वत्र विद्या विजयते</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight"> Clear your Backlogs With ScoeN !</h1>
              <div className="flex flex-col justify-center items-start gap-8">
                <div className="flex items-center">
                  <p className="text-xl text-zinc-600">
                    Access over 210,000 courses taught by real-world experts. Start learning today.
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-700 transition-colors text-white font-semibold"
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


        <section className="py-8 bg-white border-y">
          <div className="container">
            <p className="text-center text-gray-600 mb-6">
              Trusted by over 100 Colleges and millions of learners around the world
            </p>
            <div>
              <Marquee />
            </div>
          </div>
        </section>




        {/* Featured Courses Section */}
        <section className="py-12 md:py-24 lg:px-16 px-6">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Featured Courses</h2>
              <Button variant="div" className="gap-1 text-blue-600 text-md">
                View all courses <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg overflow-hidden bg-[#F6F5F4] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <Link to={`/courses/${course.id}`}>
                      <img
                        src={course.image}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    </Link>
                  </div>

                  <div className="p-4">
                    <Link to={`/courses/${course.id}`}>
                      <h2 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                        {course.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="font-bold text-amber-500">{course.rating}</span>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-amber-500 text-amber-500" : "text-gray-400"}`}
                            />
                          ))}
                      </div>
                      <span className="text-xs text-gray-500">({course.reviews.toLocaleString()})</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">${course.discountPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${course.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24 lg:px-16 px-6">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Learn with ScoeN</h2>
              <p className="text-gray-600">
                Join millions of students around the world learning skills for the future
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 ">
              <div className="flex flex-col items-start p-6 bg-[#F6F5F4] rounded-2xl">
                <div className="p-3 mb-4">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Learn at Your Own Pace</h3>
                <p className="text-gray-600">
                  Access courses on-demand, learn on your schedule, and set your own deadlines.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-[#F6F5F4] rounded-2xl">
                <div className="p-3 mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from industry experts who are passionate about teaching and sharing their knowledge.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-[#F6F5F4] rounded-2xl">
                <div className="p-3 mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Certificates</h3>
                <p className="text-gray-600">
                  Earn certificates upon completion to showcase your newly acquired skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-24 bg-[#F6F5F4] px-8">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">What Our Students Say</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Michael Chen",
                  role: "Software Developer",
                  content:
                    "The web development course was exactly what I needed to transition into tech. Within 3 months of completing it, I landed my first developer job.",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Priya Sharma",
                  role: "Marketing Specialist",
                  content:
                    "ScoeN's digital marketing courses helped me stay ahead in my field. The instructors are industry professionals who provide real-world insights.",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "David Wilson",
                  role: "UX Designer",
                  content:
                    "The design courses on ScoeN are comprehensive and practical. I was able to build a portfolio that helped me secure freelance clients.",
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center gap-4 mb-4">
                    {/* <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    /> */}
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-[#151515] px-8 rounded-t-3xl text-zinc-300">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                {/* <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="ScoeN Logo"
                  width={32}
                  height={32}
                  className="rounded"
                /> */}
                ScoeN
              </div>
              <p className="text-sm text-gray-400 mb-4">Learn from anywhere, anytime. Access courses on-demand.</p>
              <div className="flex gap-4">
                <div className="text-gray-400 hover:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <div className="text-gray-400 hover:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
                <div className="text-gray-400 hover:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="text-gray-400 hover:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Learn</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Popular Courses
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Categories
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Free Courses
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    ScoeN Pro
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    About Us
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Careers
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Blog
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Partners
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Help Center
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Contact Us
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Privacy Policy
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Terms of Service
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Teach</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Become an Instructor
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Instructor Resources
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Affiliate Program
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} ScoeN, Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              <div className="text-sm text-gray-400 hover:text-gray-100">
                Privacy Policy
              </div>
              <div className="text-sm text-gray-400 hover:text-gray-100">
                Terms of Service
              </div>
              <div className="text-sm text-gray-400 hover:text-gray-100">
                Cookie Settings
              </div>
              <div className="text-sm text-gray-400 hover:text-gray-100">
                Sitemap
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

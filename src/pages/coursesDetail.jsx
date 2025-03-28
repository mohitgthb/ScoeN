import React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Clock, Star } from "lucide-react"

import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Studentnav } from "../pages/student/studentnav"
import noteimg from "../components/images/notesimg.png"

export function CourseDetailsPage() {
  const { id } = useParams()
  const [isInCart, setIsInCart] = useState(false)
  const [units, setUnits] = useState([]);     //
  const [loading, setLoading] = useState(true);   //
  const userId = localStorage.getItem("userId");    //

  // Mock course data - in a real app, you would fetch this based on the ID
  const course = {
    id: id,
    title: "Complete Web Development Bootcamp",
    subtitle:
      "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more!",
    instructor: "Jane Smith",
    rating: 4.8,
    reviews: 12453,
    students: 245789,
    lastUpdated: "March 2023",
    language: "English",
    level: "All Levels",
    price: 89.99,
    discountPrice: 14.99,
    discountEnds: "2 days left at this price!",
    image: noteimg,
    duration: "63 hours",
    lectures: 465,
    description:
      "This course is designed to take you from beginner to professional in web development. You'll learn HTML5, CSS3, modern JavaScript, React.js, Node.js, and more. By the end of this course, you'll be able to build complete web applications from scratch.",
    highlights: [
      "Build 16 web development projects for your portfolio",
      "Learn the latest technologies, including Javascript, React, Node",
      "Master both front and back-end development",
      "Learn professional developer best practices",
    ],
  }

  //new function

  const handleAddToCart = () => {
    setIsInCart(true)
    // In a real app, you would call an API to add the course to the cart
  }

  const handleBuyNow = () => {
    // In a real app, you would redirect to checkout
    console.log("Buying course:", course.id)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Studentnav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Course Image */}
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden">
                <img src={course.image} alt={course.title} fill className="object-cover" />
              </div>
            </div>

            {/* Course Info */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 mb-2">
                  Bestseller
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.subtitle}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="font-bold text-amber-500 mr-1">{course.rating}</span>
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
                    <span className="text-blue-600 ml-2">({course.reviews.toLocaleString()} ratings)</span>
                  </div>
                  <span className="text-gray-600">{course.students.toLocaleString()} students</span>
                </div>

                <p className="mb-2">
                  Created by <span className="text-blue-600">{course.instructor}</span>
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold">${course.discountPrice}</span>
                  <span className="text-lg text-gray-500 line-through">${course.price}</span>
                  <span className="text-red-600 font-medium">83% off</span>
                </div>
                <p className="text-red-600 font-medium mb-4">{course.discountEnds}</p>

                <div className="flex gap-3 mb-4">
                  {!isInCart ? (
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>
                      Add to cart
                    </Button>
                  ) : (
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled>
                      Added to cart
                    </Button>
                  )}

                  
                  <Button variant="outline" className="flex-1 border-black" onClick={() => handlePayment(unit._id, unit.price)}>
                    Buy now
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500">30-Day Money-Back Guarantee</p>
              </div>

              <div className="border-t pt-6">
                <h2 className="font-bold text-lg mb-3">This course includes:</h2>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span>✓</span>
                    <span>{course.duration} on-demand video</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>✓</span>
                    <span>{course.lectures} lectures</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>✓</span>
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>✓</span>
                    <span>Access on mobile and TV</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>✓</span>
                    <span>Certificate of completion</span>
                  </li>
                </ul>
                
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Course Description</h2>
            <p className="mb-6">{course.description}</p>

            <h3 className="font-bold mb-3">What you'll learn</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
              {course.highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
  )
}


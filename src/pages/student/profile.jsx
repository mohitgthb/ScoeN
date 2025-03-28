import { useState } from "react"
import { Camera, Edit } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Link } from "react-router-dom"
import { Studentnav } from "./studentnav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"


export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [availableCourses, setAvailableCourses] = useState(false)

  const [profile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    year: "2nd Year",
    branch: "Information Technology",
    college: "SCOE",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    joinDate: "January 2023",
  })

  const [courses] = useState([
    {
      id: 1,
      title: "Web Development Bootcamp",
      issuer: "LearnHub",
      date: "March 2023",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      issuer: "LearnHub",
      date: "February 2023",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])


  const colleges = [
    "Select",
    "SCOE",
    "SKN",
    "NBN",
    "RMD",
    "Other",
  ]

  const collegeYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year"
  ]

  const branchs = [
    "Computer Science",
    "Information Technology",
    "Electronic and Telecommunicataion",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemistry Engineering",
    "Bio Engineering",
  ]


  return (
    <div>
      <div className="min-h-screen">
        <Studentnav />

        <main className="p-6 lg:px-16 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-gray-600">Manage your profile and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="bg-[#F6F5F4]">
                <CardHeader className="relative pb-0">
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    <CardDescription>{profile.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">College Name</h3>
                      <p className="text-sm">{profile.college}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Year</h3>
                      <p className="text-sm">{profile.year}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Branch</h3>
                      <p className="text-sm">{profile.branch}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
                      <p className="text-sm">{profile.joinDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Social Profiles</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profile Details</TabsTrigger>
                  <TabsTrigger value="courses">My Courses</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your profile information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium">
                              Full Name
                            </label>
                            <Input id="fullName" defaultValue={profile.name} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <Input id="email" type="email" defaultValue={profile.email} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="college" className="text-sm font-medium">
                            College/University
                          </label>
                          <Select defaultValue={profile.college}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your college" />
                            </SelectTrigger>
                            <SelectContent>
                              {colleges.map((college) => (
                                <SelectItem key={college} value={college}>
                                  {college}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="collegeYear" className="text-sm font-medium">
                            Year
                          </label>
                          <Select defaultValue={profile.year}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent>
                              {collegeYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="branch" className="text-sm font-medium">
                            Branch
                          </label>
                          <Select defaultValue={profile.branch}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your branch" />
                            </SelectTrigger>
                            <SelectContent>
                              {branchs.map((branch) => (
                                <SelectItem key={branch} value={branch}>
                                  {branch}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-md font-semibold">Social Profiles</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="linkedin" className="text-sm font-medium">
                                LinkedIn
                              </label>
                              <Input id="linkedin" defaultValue={profile.linkedin} />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="github" className="text-sm font-medium">
                                GitHub
                              </label>
                              <Input id="github" defaultValue={profile.github} />
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="courses" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Courses</CardTitle>
                      <CardDescription>Your courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {courses.map((course) => (
                            <div key={course.id} className="border rounded-lg overflow-hidden">
                              <div className="relative h-40">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  Issued by {course.issuer} • {course.date}
                                </p>
                                <div className="flex gap-2">
                                  <Link to={`/learn/${course.id}`}>
                                    <Button size="sm" variant="outline">
                                      View
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4 py-8">
                          <p className="text-gray-500">No courses found.</p>
                          <Link to="/courses">
                            <Button>Explore Courses</Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

              </Tabs>
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
    </div >
  )
}

import React from 'react'
import { Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <div>
      <footer className="border-t py-12 bg-[#151515] px-8 rounded-t-3xl text-zinc-300">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                {/* <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="ScoeN Logo"
                  width={32}
                  height={32}
                  className="rounded"
                /> */}
                ScoeN
              </div>
              <p className="text-sm text-gray-400 mb-4">SPPU Expected Questions, Easy Solutions!</p>
              <div className="flex gap-4">
                {/* <div className="text-gray-400 hover:text-gray-100">
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
                </div> */}
                {/* <div className="text-gray-400 hover:text-gray-100">
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
                </div> */}
                <a href="https://www.instagram.com/scoe_n1/profilecard/?igsh=bW40eHBvaGp4YTRw">
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
                </a>
                {/* <div className="text-gray-400 hover:text-gray-100">
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
                </div> */}
              </div>
            </div>

            {/* <div>
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
            </div> */}

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    About Us
                  </div>
                </li>
                {/* <li>
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
                </li> */}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Copyright</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Copyright Center
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100">
                    Community Guidlines
                  </div>
                </li>
              </ul>
            </div>


            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100 flex gap-2 items-center">
                    <Phone className="h-4 w-4" />
                    <div>91+ 8956429133</div>
                  </div>
                </li>
                <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100 flex gap-2 items-center">
                    <Mail className="h-4 w-4" />
                    <div>scoen414@gmail.com</div>
                  </div>
                </li>
                {/* <li>
                  <div className="text-sm text-gray-400 hover:text-gray-100 flex gap-2 items-center">
                   <MapPin className="h-4 w-4" />
                   <div></div>
                  </div>
                </li> */}
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


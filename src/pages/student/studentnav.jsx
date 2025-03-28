import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Search, Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

export function Studentnav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b lg:px-16 px-6">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              {/* <img
              src="/placeholder.svg?height=32&width=32"
              alt="ScoeN Logo"
              width={32}
              height={32}
              className="rounded"
            /> */}
              ScoeN
            </Link>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-8 ml-auto">
              <div className="hidden md:block">
                <Link to="/courses">
                  <div className="hidden sm:block text-zinc-950 font-medium hover:bg-gray-200 px-2 py-2 rounded-md ">
                    Expore courses
                  </div>
                </Link>
              </div>
              <div className="hidden md:block">
                <Link to="/cart">
                  <Button variant="outline">
                    <div className='flex gap-1 justify-center'>
                      <ShoppingCart className="h-5 w-5" />
                      <div className=' font-medium'>Cart</div>
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <Link to="/profile">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>

            <div className='md:hidden pr-5'>
              <Link to="/cart">
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4">
              <nav className="flex flex-col gap-4">
                <Link to="/profile">
                  <Button variant="secondary" className="text-sm font-medium w-full">
                    My Profile
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="secondary" className="text-sm font-medium w-full">
                    Explore Courses
                  </Button>
                </Link>

              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/me", {
        credentials: "include", // Include cookies
      });

      console.log("Auth status response:", response); // Debugging log

      if (response.ok) {
        const user = await response.json();
        console.log("User is authenticated:", user); // Debugging log
        setIsLoggedIn(true);
      } else {
        console.log("User is not authenticated"); // Debugging log
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      });

      if (response.ok) {
        setIsLoggedIn(false);
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-8 drop-shadow-lg drop-shadow-blue-600/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            ScoeN
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search for anything" className="w-full pl-8 rounded-full bg-gray-100" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/profile" className="hidden md:block text-sm font-medium">
            About Us
          </Link>
          <Link to="/pdf" className="hidden md:block text-sm font-medium">
            Explore
          </Link>

          {isLoggedIn ? (
            <Button onClick={handleLogout} className="text-sm font-medium">
              Logout
            </Button>
          ) : (
            <>
              <Link to="/signin">
                <Button className="hidden sm:block text-sm font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="hidden sm:block">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search for anything" className="w-full pl-8 bg-gray-100" />
            </div>

            <nav className="flex flex-col gap-4">
              <div className="text-sm font-medium py-2">ScoeN Business</div>
              <div className="text-sm font-medium py-2">Teach on ScoeN</div>

              {isLoggedIn ? (
                <Button onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              ) : (
                <div className="flex gap-2 mt-2">
                  <Link to="/signin" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}


// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { Search, Menu, X } from "lucide-react"

// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"

// export function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   // const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

//   return (
//     <header className="static top-0 z-50 w-full lg:bg-[#F6F5F4] md:bg-[#F6F5F4] lg:px-16 px-6 ">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-6">
//           <Link to="/" className="flex items-center gap-2 font-bold text-3xl">
//             {/* <img
//               src="/placeholder.svg?height=32&width=32"
//               alt="ScoeN Logo"
//               width={32}
//               height={32}
//               className="rounded"
//             /> */}
//             ScoeN
//           </Link>

//           <div className="flex items-center gap-4 pl-4">
//             <Link to="/profile" className="hidden md:block text-zinc-700 font-medium hover:text-blue-700">
//               About Us
//             </Link>
//             <Link to="/" className="hidden md:block text-zinc-700 font-medium hover:text-blue-700">
//               Explore Courses
//             </Link>
//           </div>
//         </div>


//         <div className="flex items-center gap-4">
//           <Link to="/signin">
//             <div className="hidden sm:block text-zinc-700 font-medium hover:text-blue-700 ">
//               Sign In
//             </div>
//           </Link>
//           <Link to="/signup" className="hidden sm:block">
//             <div className="px-4 py-2 rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 transition-colors">
//               Sign Up
//             </div>
//           </Link>

//           {/* Mobile menu button */}
//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t">
//           <div className="container py-4">
//             <nav className="flex flex-col gap-4">
//               <Link to="/profile">
//                 <div className="text-md font-medium py-2">
//                   About Us
//                 </div>
//               </Link>
//               <Link to="/">
//                 <div className="text-md font-medium py-2">
//                   Explore Courses
//                 </div>
//               </Link>

//               <div className="flex gap-2 mt-2">
//                 <Link to="/signin" className="flex-1">
//                   <Button variant="outline" className="w-full">
//                     Sign In
//                   </Button>
//                 </Link>
//                 <Link to="/signup" className="flex-1">
//                   <Button variant="secondary" className="w-full border">Sign Up</Button>
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }

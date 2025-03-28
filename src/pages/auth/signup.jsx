import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Facebook, Github } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { Navbar } from "../navbar";

export function SignUpPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        //     const response = await fetch('http://localhost:5000/auth/signup', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ name: fullName, email, password }),
        //         credentials: 'include',
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log('User created successfully:', data);
        //         navigate('/signin'); // Redirect to sign-in page
        //     } else {
        //         const errorData = await response.json();
        //         console.error('Sign-up failed:', errorData);
        //     }
        // } catch (error) {
        //     console.error('Error during sign-up:', error);
        // }

        try {
            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fullName, email, password }),
                credentials: 'include',
            });
    
            const data = await response.json();
            console.log("Full API Response:", data); 
    
            if (!response.ok) {
                console.error("Sign-up failed:", data);
                alert(`Error: ${data.message || "Sign-up failed"}`);
                return;
            }
    
            console.log('User created successfully:', data);
            navigate('/signin');
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert("An error occurred while signing up.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center py-12">
                <div className="w-full max-w-md px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Create Your Account</h1>
                        <p className="text-gray-600 mt-2">Join millions of learners from around the world</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <Button variant="outline" className="w-full gap-2">
                            <Facebook className="h-5 w-5" />
                            Sign up with Facebook
                        </Button>
                        <Button variant="outline" className="w-full gap-2">
                            <Github className="h-5 w-5" />
                            Sign up with Google
                        </Button>
                    </div>

                    <div className="relative my-6">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                            or
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={agreeTerms}
                                onCheckedChange={(checked) => setAgreeTerms(checked)}
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the{" "}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Sign Up
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-6">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
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


// import React from "react"
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { Eye, EyeOff, Facebook, Github } from "lucide-react"

// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Checkbox } from "../../components/ui/checkbox"
// import { Separator } from "../../components/ui/separator"
// import { Navbar } from "../navbar"

// export function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [fullName, setFullName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [agreeTerms, setAgreeTerms] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-1 flex items-center justify-center py-12">
//         <div className="w-full max-w-md px-4">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold">Create Your Account</h1>
//             <p className="text-gray-600 mt-2">Join millions of learners from around the world</p>
//           </div>

//           <div className="space-y-4 mb-6">
//             <Button variant="outline" className="w-full gap-2">
//               <Facebook className="h-5 w-5" />
//               Sign up with Facebook
//             </Button>
//             <Button variant="outline" className="w-full gap-2">
//               <Github className="h-5 w-5" />
//               Sign up with Google
//             </Button>
//           </div>

//           <div className="relative my-6">
//             <Separator />
//             <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
//               or
//             </span>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 type="text"
//                 placeholder="John Doe"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
//             </div>

//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="terms"
//                 checked={agreeTerms}
//                 onCheckedChange={(checked) => setAgreeTerms(checked)}
//                 required
//               />
//               <label
//                 htmlFor="terms"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 I agree to the{" "}
//                 <Link to="#" className="text-blue-600 hover:underline">
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link to="#" className="text-blue-600 hover:underline">
//                   Privacy Policy
//                 </Link>
//               </label>
//             </div>

//             <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//               Sign Up
//             </Button>
//           </form>

//           <p className="text-center text-sm mt-6">
//             Already have an account?{" "}
//             <Link to="/signin" className="text-blue-600 hover:underline">
//               Log in
//             </Link>
//           </p>
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

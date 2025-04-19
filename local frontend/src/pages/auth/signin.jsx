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

export function SignInPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // For cookies/sessions (if used)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Logged in successfully:', data);
    
                // ✅ Store userId in localStorage
                localStorage.setItem("userId", data.user._id);
    
                navigate('/'); // Redirect to dashboard or home page
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch('http://localhost:5000/auth/signin', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email, password }),
    //             credentials: 'include',
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Logged in successfully:', data);
    //             navigate('/'); // Redirect to dashboard or home page
    //         } else {
    //             const errorData = await response.json();
    //             console.error('Login failed:', errorData);
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //     }
    // };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center py-12">
                <div className="w-full max-w-md px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Log In to Your Account</h1>
                        <p className="text-gray-600 mt-2">Continue your learning journey</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <Button variant="outline" className="w-full gap-2">
                            <Facebook className="h-5 w-5" />
                            Continue with Facebook
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full gap-2"
                            onClick={() => window.location.href = "http://localhost:5000/auth/google"}
                            >
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                                alt="Google Logo" 
                                className="h-5 w-5" 
                            />
                            Continue with Google
                        </Button>

                        {/* <Button variant="outline" className="w-full gap-2">
                            <Github className="h-5 w-5" />
                            Continue with Google
                        </Button> */}
                    </div>

                    <div className="relative my-6">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                            or
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link to="#" className="text-xs text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
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
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked)}
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Log In
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-6">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
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

// export function SignInPage() {
// //   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [rememberMe, setRememberMe] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // In a real app, you would authenticate the user here
//     // console.log({ email, password, rememberMe })
//     // router.push("/dashboard")
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-1 flex items-center justify-center py-12">
//         <div className="w-full max-w-md px-4">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold">Log In to Your Account</h1>
//             <p className="text-gray-600 mt-2">Continue your learning journey</p>
//           </div>

//           <div className="space-y-4 mb-6">
//             <Button variant="outline" className="w-full gap-2">
//               <Facebook className="h-5 w-5" />
//               Continue with Facebook
//             </Button>
//             <Button variant="outline" className="w-full gap-2">
//               <Github className="h-5 w-5" />
//               Continue with Google
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
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 <Link to="#" className="text-xs text-blue-600 hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
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
//             </div>

//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="remember"
//                 checked={rememberMe}
//                 onCheckedChange={(checked) => setRememberMe(checked)}
//               />
//               <label
//                 htmlFor="remember"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Remember me
//               </label>
//             </div>

//             <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//               Log In
//             </Button>
//           </form>

//           <p className="text-center text-sm mt-6">
//             Don&apos;t have an account?{" "}
//             <Link to="/signup" className="text-blue-600 hover:underline">
//               Sign up
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

import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CreditCard, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Studentnav } from "./student/studentnav"

export function CartPage() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "Jane Smith",
      price: 89.99,
      discountPrice: 14.99,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: "3",
      title: "UI/UX Design Masterclass",
      instructor: "Alex Johnson",
      price: 79.99,
      discountPrice: 12.99,
      image: "/placeholder.svg?height=80&width=120",
    },
  ])

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.discountPrice, 0)
  const originalTotal = cartItems.reduce((total, item) => total + item.price, 0)
  const savings = originalTotal - subtotal

  return (
    <div className="flex min-h-screen flex-col">
      <Studentnav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Shopping Cart
          </h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="md:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h2 className="font-bold">
                      {cartItems.length} Course{cartItems.length !== 1 ? "s" : ""} in Cart
                    </h2>
                  </div>

                  <ul className="divide-y">
                    {cartItems.map((item) => (
                      <li key={item.id} className="p-4 flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={120}
                            height={80}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate">
                            <Link to={`/courses/${item.id}`} className="hover:text-blue-600">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600">by {item.instructor}</p>
                        </div>

                        <div className="flex flex-col items-end">
                          <div className="font-bold">${item.discountPrice.toFixed(2)}</div>
                          <div className="text-sm text-gray-500 line-through">${item.price.toFixed(2)}</div>
                          <button
                            className="text-red-600 hover:text-red-800 text-sm mt-2 flex items-center gap-1"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order summary */}
              <div className="md:col-span-1">
                <div className="border rounded-lg overflow-hidden sticky top-20">
                  <div className="bg-gray-50 p-4 border-b">
                    <h2 className="font-bold">Order Summary</h2>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span>${originalTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discounts:</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-1">
                      Checkout <CreditCard className="h-4 w-4" />
                    </Button>

                    <p className="text-xs text-gray-500 text-center">30-Day Money-Back Guarantee</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link to="/courses" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                    <ArrowRight className="h-4 w-4" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any courses to your cart yet.</p>
              <Link to="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse Courses</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} LearnHub, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


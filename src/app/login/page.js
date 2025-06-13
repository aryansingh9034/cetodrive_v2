"use client";

import React from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Apple, PlayCircle , Heart, Star } from "lucide-react"
import { ArrowRight, Check, Menu, X ,  Fuel, Settings, Users , ChevronDown} from "lucide-react"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from 'next/navigation';
import background from "../../../public/View.png"
import Img from "../../../public/ImgKe.png"
import Profile from "../../../public/Profill.png"
export default function LoginPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // initialize router
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handlesignup = () => {
    router.push('/signup'); // navigate to /cardetails
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("http://3.108.23.172:8002/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data.data);
        const userData = data.data;
        // Store both user data and customer ID
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('customerId', userData.id); // Store customer ID separately
        
        router.push('/profile'); 
      } else {
        console.error("Login failed:", data);
        // Show error message
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error:", error);
   
    }
  };

  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:h-full bg-[white] overflow-hidden">
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Image (hidden on small screens) */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative justify-center items-center px-10 py-10">
          <div className="relative w-full h-full p-20 rounded-lg overflow-hidden">
            <Image
              src={login}
              alt="Login Side Image"
              className="object-cover w-full h-full rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="w-full max-w-md">
            <h1 className="text-4xl sm:text-5xl text-center font-bold text-[#FF7A30] mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-center text-base sm:text-lg mb-8">
              We&apos;ve missed you! Please log in to catch up on what you&apos;ve missed
            </p>

            {/* Google login button */}
            <button className="w-full border rounded-xl border-gray-300 py-3 flex items-center justify-center gap-2 mb-6 hover:bg-gray-50 transition-colors">
              {/* Google SVG Icon */}
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8..." />
                <path fill="#FF3D00" d="M6.306,14.691l6.571..." />
                <path fill="#4CAF50" d="M24,44c5.166,0..." />
                <path fill="#1976D2" d="M43.611,20.083H42..." />
              </svg>
              <span className="text-md font-medium text-gray-700">Log in with Google</span>
            </button>

            <div className="flex items-center justify-center mb-2">
              <span className="text-md text-gray-400">or</span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="text-black">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 text-[#FF7A30] border-gray-300 rounded" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember Me</label>
                </div>
                <a href="#" className="text-sm text-[#FF7A30] hover:underline">Forgot Password</a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium"
              >
                Log in
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-md text-gray-600">
                Don&apos;t have an account yet?
                <a href="#" onClick={handlesignup} className="text-[#FF7A30] hover:underline ml-1">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
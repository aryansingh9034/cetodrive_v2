"use client";

import React from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Apple, PlayCircle , Heart, Star } from "lucide-react"
import { ArrowRight, Check, Menu, X ,  Fuel, Settings, Users , ChevronDown} from "lucide-react"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import background from "../../../public/View.png"
import Img from "../../../public/ImgKe.png"
import Profile from "../../../public/Profill.png"
import { useRouter } from "next/navigation";

export default function LoginPage() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
     const router = useRouter(); // initialize router
   const handleLogin = () => {
      router.push('/login'); // navigate to /cardetails
    };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }


   const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
    vehicle_types: "",
    username: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password match check
    if (formData.password !== formData.re_password) {
   
      return;
    }

    try {
      const response = await fetch("http://3.108.23.172:8002/api/customer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          re_password: formData.re_password,
          vehcile_types: formData.vehicle_types,
        }),
      });

      const data = await response.json();
      if (response.ok) {
     
        router.push('/login'); 
        console.log(data);
      } else {
        alert("Error: " + data.message || "Something went wrong");
        console.error(data);
      }
    } catch (error) {
      console.error("Network error:", error);
     
    }
  };

  return (
    <div className="w-full min-h-screen  bg-white">

       <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:h-full bg-[white] overflow-hidden">



      </div>

 <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side Image */}
      <div className="md:w-1/2 w-full relative px-4 py-10 md:px-16 md:py-20 flex justify-center items-center">
        <div className="relative w-full h-64 md:h-full lg:ml-10 rounded-lg overflow-hidden">
          <Image
            src={login}
            alt="Login Side Image"
            className="hidden lg:block object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center mb-10 px-4 md:px-10 lg:px-20">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl md:text-5xl text-center font-bold text-[#FF7A30] mb-8">
            Create New Account
          </h1>

          {/* Google Login Placeholder */}
          <button className="w-full border rounded-xl border-gray-300 py-3 flex items-center justify-center gap-2 mb-6 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8..." />
              <path fill="#FF3D00" d="M6.306,14.691l6.571..." />
              <path fill="#4CAF50" d="M24,44c5.166,0..." />
              <path fill="#1976D2" d="M43.611,20.083H42..." />
            </svg>
            <span className="text-md font-medium text-gray-700">Log in with Google</span>
          </button>

          <div className="flex items-center justify-center mb-4">
            <span className="text-sm text-gray-400">or</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4  py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="re_password" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter Password
              </label>
              <input
                type="password"
                id="re_password"
                value={formData.re_password}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="vehicle_types" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <div className="relative">
                <select
                  id="vehicle_types"
                  value={formData.vehicle_types}
                  onChange={handleChange}
                  className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                  required
                >
                  <option value="" disabled>Choose your vehicle type</option>
                  <option value="Driver">Driver</option>
                  <option value="Owner">Car Owner</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-md text-[#FF7A30]">
              Already have an account?
              <a href="#" onClick={handleLogin} className="text-black hover:underline ml-1">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>





    </div>
  );
}

"use client";

import React from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Apple, PlayCircle, Heart, Star } from "lucide-react";
import { ArrowRight, Check, Menu, X, Fuel, Settings, Users, ChevronDown } from "lucide-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import background from "../../../public/View.png";
import Img from "../../../public/ImgKe.png";
import Profile from "../../../public/Profill.png";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // OTP verification states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = () => {
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

  // Final registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  
  if (!passwordRegex.test(formData.password)) {
    alert('Password must contain at least 8 characters, one uppercase letter, one number, and one special character');
    return;
  }
  
  if (formData.password !== formData.re_password) {
    alert('Passwords do not match');
    return;
  }
  

    if (formData.password !== formData.re_password) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(` ${process.env. NEXT_PUBLIC_API_BASE_URL}api/customer/`, {
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
        // Show OTP modal after successful registration
        setShowOtpModal(true);
      } else {
        setError(data.message || "Already have an account. Please login.");
        console.error(data);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP to email
const sendOtp = async () => {
  setIsLoading(true);
  setError("");
  
  try {
    const response = await fetch(` ${process.env. NEXT_PUBLIC_API_BASE_URL}/api/customer/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        is_registration: true
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      setOtpSent(true); // Set OTP as sent
    } else {
      setError(data.message || "Failed to send OTP");
    }
  } catch (error) {
    setError("Network error. Please try again.");
    console.error("Network error:", error);
  } finally {
    setIsLoading(false);
  }
};

  // Verify OTP
  const verifyOtp = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(` ${process.env. NEXT_PUBLIC_API_BASE_URL}/api/customer/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsVerified(true);
        setShowOtpModal(false);
        router.push('/login');
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:h-full bg-[white] overflow-hidden"></div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
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
    placeholder="Enter your password (min 8 chars, 1 uppercase, 1 number, 1 special char)"
    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
    required
  />
  {formData.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(formData.password) && (
    <p className="mt-1 text-sm text-red-600">
      Password must contain at least 8 characters, one uppercase letter, one number, and one special character
    </p>
  )}
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
  {formData.password && formData.re_password && formData.password !== formData.re_password && (
    <p className="mt-1 text-sm text-red-600">
      Passwords do not match
    </p>
  )}
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
                    {/* <option value="Owner">Car Owner</option> */}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
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

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#FF7A30]">Verify Your Email</h2>
              <button 
                onClick={() => setShowOtpModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="mb-6 text-gray-600">
              We have sent a verification code to <span className="font-semibold">{formData.email}</span>. 
              Please enter the code below to verify your email address.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="modal-otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="modal-otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                  required
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={sendOtp}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : (otpSent ? "Resend OTP" : "Send OTP")}
                </button>
                <button
                  onClick={verifyOtp}
                  className="flex-1 bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

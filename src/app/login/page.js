"use client";

import React, { useState } from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ForgotPasswordModal from "../forgotpassword/page";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handlesignup = () => {
    router.push('/signup');
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://3.108.23.172:8002/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases based on your API response
        if (data.message && data.message.toLowerCase().includes("invalid credentials")) {
          setError("Wrong password. Please try again.");
        } else if (data.message && data.message.toLowerCase().includes("user not found")) {
          setError("Email not registered. Please sign up first.");
        } else {
          // Fallback error message
          setError(data.message || "Login failed. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Login successful
      localStorage.setItem('userData', JSON.stringify(data.data));
      localStorage.setItem('customerId', data.data.id);
      router.push('/profile');
      
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Image */}
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
            
            {/* Error message display */}
            {error && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                error.includes("not registered") ? 
                  "bg-blue-100 border border-blue-400 text-blue-700" : 
                  "bg-red-100 border border-red-400 text-red-700"
              }`}>
                {error}
                {error.includes("not registered") && (
                  <button 
                    onClick={handlesignup}
                    className="ml-2 font-semibold hover:underline"
                  >
                    Sign up now
                  </button>
                )}
              </div>
            )}

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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={isLoading}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-[#FF7A30] border-gray-300 rounded" 
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember Me</label>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#FF7A30] hover:underline"
                  disabled={isLoading}
                >
                  Forgot Password
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Log in'}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-md text-gray-600">
                Dont have an account yet?
                <button 
                  onClick={handlesignup} 
                  className="text-[#FF7A30] hover:underline ml-1"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal 
        show={showForgotPassword} 
        onClose={() => setShowForgotPassword(false)} 
      />
    </div>
  );
}
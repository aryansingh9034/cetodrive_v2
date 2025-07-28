"use client";

import React from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Apple, PlayCircle, Heart, Star } from "lucide-react";
import { ArrowRight, Check, Menu, X, Fuel, Settings, Users, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
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

const handleGoogleAuth = () => {
  try {
    const state = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    sessionStorage.setItem('oauth_state', state);
    
    const callbackUrl = `${window.location.origin}/auth/callback`;
    // const authUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/google/login/`;

    const width = 500;
        const height = 600;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        const authWindow = window.open(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/google/login/`,
            'GoogleLogin',
            `width=${width},height=${height},top=${top},left=${left}`
        );

    conaole.log('Opening Google auth window:', authWindow);
    console.log('event ',event)
    // window.location.href = authUrl;ß
      const receiveMessage = (event) => {
            // ✅ check origin — this will be the backend (3000)
            console.log('Received message:', event.data);
            if (event.origin !== 'http://localhost:3000') return;

            if (event.data === 'authenticated') {
                console.log('User authenticated via Google');
                dispatch(fetchUser());
                console.log('User data updated in context');
                onClose(); // close modal
                console.log('Closing login modal'); // SPA navigation
            }
        };

  } catch (error) {
    console.error('Google auth error:', error);
    setError('Failed to initiate Google sign-in. Please try again.');
  }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  
    if (!passwordRegex.test(formData.password)) {
      setError('Password must contain at least 8 characters, one uppercase letter, one number, and one special character');
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.re_password) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/`, {
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

const sendOtp = async () => {
  setIsLoading(true);
  setError("");
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          is_registration: true,
        }),
      }
    );

    // Special case: If we get 500 but OTP is sent
    if (response.status === 500) {
      console.warn("Backend returned 500 but OTP was sent");
      setOtpSent(true);
      setError("");
      return;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `OTP request failed (Status ${response.status})`
      );
    }

    const data = await response.json();
    setOtpSent(true);
    setError("");
    
  } catch (error) {
    setError(error.message || "Failed to send OTP");
    console.error("OTP send error:", error);
  } finally {
    setIsLoading(false);
  }
};

const verifyOtp = async () => {
  setIsLoading(true);
  setError("");

  try {
    // Debug log before sending
    console.log("Verifying OTP:", {
      email: formData.email,
      otp: otp,
      trimmedOTP: otp.trim()
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/verifyotp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp.trim(), // Ensure whitespace is trimmed
        }),
      }
    );

    // Debug raw response
    const responseText = await response.text();
    console.log("Raw verification response:", responseText);

    try {
      const data = JSON.parse(responseText);
      
      if (!response.ok) {
        throw new Error(
          data.detail || 
          data.message || 
          data.error || 
          `Verification failed (Status ${response.status})`
        );
      }

      // Success case
      setIsVerified(true);
      setShowOtpModal(false);
      router.push('/login');
      
    } catch (jsonError) {
      throw new Error(
        responseText.includes("<!DOCTYPE html>") 
          ? "Server returned HTML instead of JSON" 
          : `Invalid response format: ${responseText.substring(0, 100)}`
      );
    }

  } catch (error) {
    // Special handling for common cases
    let errorMessage = error.message;
    
    if (error.message.includes("400")) {
      errorMessage = "Invalid OTP. Please check the code and try again.";
    } else if (error.message.includes("NetworkError")) {
      errorMessage = "Network issues. Please check your connection.";
    }
    
    setError(errorMessage);
    console.error("Full verification error:", error);
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

            {/* Google Signup Button */}
            <button 
              onClick={handleGoogleAuth}
              className="w-full border rounded-xl border-gray-300 py-3 flex items-center justify-center gap-2 mb-6 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-0.138-2.65-0.389-3.917H43.611z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span className="text-md font-medium text-gray-700">Sign up with Google</span>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                    disabled={isLoading}
                  >
                    <option value="" disabled>Choose your vehicle type</option>
                    <option value="Driver">Driver</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                className={`w-full bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : 'Register'}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-md text-[#FF7A30]">
                Already have an account?
                <button onClick={handleLogin} className="text-black hover:underline ml-1">
                  Login
                </button>
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
                disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={sendOtp}
                  className={`flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : (otpSent ? "Resend OTP" : "Send OTP")}
                </button>
                <button
                  onClick={verifyOtp}
                  className={`flex-1 bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
"use client";

import React, { useState, useEffect } from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ForgotPasswordModal from "../components/forgotpassword";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Phone, Mail, Apple, PlayCircle, Heart, Star } from "lucide-react";
import { ArrowRight, Check, Menu, X, Fuel, Settings, Users, ChevronDown } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSignup = () => {
    router.push('/signup');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    
    if (token && customerId) {
      router.push('/profile');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.msg || `Login failed (HTTP ${response.status})`);
      }

      const responseData = await response.json();
      
      localStorage.setItem('token', responseData.access_token);
      localStorage.setItem('refresh_token', responseData.refresh_token);
      localStorage.setItem('userData', JSON.stringify(responseData.data));
      localStorage.setItem('customerId', responseData.data.id);
      
      window.location.href = '/profile';
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError("");

    try {
      // Send Google credential to your existing login endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          google_credential: credentialResponse.credential
        }),
      });

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response:", responseText);
        throw new Error("Server returned unexpected response");
      }

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Google login failed");
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('userData', JSON.stringify(data.data));
      localStorage.setItem('customerId', data.data.id);
      
      window.location.href = '/profile';

    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
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
              
              {/* Google Login Button */}
             <div className="w-full flex justify-center mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  text="continue_with"
                  shape="rectangular"
                  size="large"
                  width="350"
                />
              </div>

              <div className="flex items-center justify-center mb-4">
                <span className="text-sm text-gray-400">or</span>
              </div>

              {error && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  error.includes("not registered") ? 
                    "bg-blue-100 border border-blue-400 text-blue-700" : 
                    "bg-red-100 border border-red-400 text-red-700"
                }`}>
                  {error}
                  {error.includes("not registered") && (
                    <button 
                      onClick={handleSignup}
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
                  Don&apos;t have an account yet?
                  <button 
                    onClick={handleSignup} 
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
    </GoogleOAuthProvider>
  );
}
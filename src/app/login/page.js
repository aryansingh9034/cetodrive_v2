"use client";

import React, { useState, useEffect } from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ForgotPasswordModal from "../components/forgotpassword";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSignup = () => {
    router.push('/signup');
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    
    if (token && customerId) {
      router.push('/profile');
    }

    // Handle Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      handleGoogleLogin(code);
    } else if (error) {
      setError("Google login failed: " + error);
    }
  }, [router]);

  const handleGoogleLogin = async (code) => {
    setGoogleLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/google/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || "Google login failed");
      }

      const data = await response.json();
      
      // Store tokens and user data
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('customerId', data.user.id);
      
      // Redirect to profile
      window.location.href = '/profile';
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message || "Failed to login with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  const initiateGoogleLogin = () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "489409603071-1173d9hsk8h8o2in6gh7uuo80rni5imu.apps.googleusercontent.com";
      const redirectUri = encodeURIComponent(
        process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "https://www.catodrive.com/"
      );
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code` +
        `&scope=openid%20email%20profile` +
        `&access_type=offline` +
        `&prompt=consent`;
      
      window.location.href = authUrl;
    } catch (error) {
      console.error("Google OAuth failed:", error);
      setError("Couldn't connect to Google. Please try again later.");
    }
  };

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
            
            {/* Google Login Button */}
            <div className="w-full flex justify-center mb-6">
              <button
                onClick={initiateGoogleLogin}
                disabled={googleLoading}
                className={`flex items-center justify-center w-full max-w-[350px] bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A30] ${googleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {googleLoading ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z"/>
                  </svg>
                )}
                Continue with Google
              </button>
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
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
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
  );
}
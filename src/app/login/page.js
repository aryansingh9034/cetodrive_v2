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

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    
    if (token && customerId) {
      router.push('/profile');
    }
  }, [router]);

  // Handle OAuth callback when component loads
  useEffect(() => {
    // If we're not on the login page but have OAuth params, redirect to login
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state === 'google_login' && !window.location.pathname.includes('/login')) {
      console.log('Redirecting to login page with OAuth params');
      window.location.href = '/login' + window.location.search;
      return;
    }
    
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');

    console.log('OAuth Callback - URL params:', { code, error, state });
    console.log('Current pathname:', window.location.pathname);

    // Clean the URL immediately
    if (code || error) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (error) {
      setError('Google login was cancelled or failed');
      setGoogleLoading(false);
      return;
    }

    if (code && state === 'google_login') {
      console.log('Processing Google callback...');
      setGoogleLoading(true);
      await processGoogleCallback(code);
    } else if (code) {
      console.log('Code found but state mismatch:', state);
    }
  };

  const processGoogleCallback = async (code) => {
    try {
      console.log('Processing Google callback with code:', code);
      
      // Try multiple possible endpoints
      const endpoints = [
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/dj-rest-auth/google/`,
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dj-rest-auth/google/`,
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/dj-rest-auth/registration/google/`
      ];
      
      let response;
      let lastError;
      
      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: code,
            }),
          });
          
          if (response.ok) {
            console.log('Success with endpoint:', endpoint);
            break;
          } else {
            console.log(`Failed with endpoint ${endpoint}:`, response.status);
            lastError = `HTTP ${response.status}`;
          }
        } catch (error) {
          console.log(`Error with endpoint ${endpoint}:`, error);
          lastError = error.message;
        }
      }
      
      if (!response || !response.ok) {
        throw new Error(lastError || 'All endpoints failed');
      }

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);
      
      // Store authentication data - handle multiple possible response formats
      const accessToken = data.access_token || data.access || data.key;
      const refreshToken = data.refresh_token || data.refresh;
      
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        
        // Handle user data - dj-rest-auth might return it differently
        const userData = data.user || data.data || data;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        const userId = userData.id || userData.pk || userData.user_id;
        if (userId) {
          localStorage.setItem('customerId', userId);
        }
        
        // Redirect to profile
        router.push('/profile');
      } else {
        throw new Error('No access token received in response');
      }
    } catch (error) {
      console.error('Google callback error:', error);
      setError(`Failed to complete Google login: ${error.message}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  const initiateGoogleLogin = () => {
    setGoogleLoading(true);
    setError("");

    console.log('Initiating Google login...');

    // Your Google Client ID
    const GOOGLE_CLIENT_ID = "489409603071-1173d9hsk8h8o2in6gh7uuo80rni5imu.apps.googleusercontent.com";
    
    if (!GOOGLE_CLIENT_ID) {
      setError('Google Client ID not configured. Please add your Google Client ID.');
      setGoogleLoading(false);
      return;
    }

    // Show development notice
    if (process.env.NODE_ENV !== 'production') {
      console.log('Development mode: Google will redirect to production domain (catodrive.com)');
    }

    // Build Google OAuth URL - always use production redirect URI
    const redirectUri = 'https://catodrive.com/';
      
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state: 'google_login',
      access_type: 'offline',
      prompt: 'select_account',
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    console.log('Redirecting to:', googleAuthUrl);
    
    // Redirect to Google
    window.location.href = googleAuthUrl;
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
      
      router.push('/profile');
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  // Show loading state if processing Google callback
  if (googleLoading && !error) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A30] mx-auto mb-4"></div>
          <p className="text-gray-600">Completing Google login...</p>
        </div>
      </div>
    );
  }

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
                className={`flex items-center justify-center w-full max-w-[350px] bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A30] transition-all duration-200 ${
                  googleLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
                }`}
              >
                {googleLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
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
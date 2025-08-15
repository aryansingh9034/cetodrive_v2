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
  const [error, setError] = useState("");
  const [googleAuthStatus, setGoogleAuthStatus] = useState(null); // null, 'success', 'error'
  
  const router = useRouter();

  const handleSignup = () => {
    router.push('/signup');
  };

  // Function to show debug info (matching HTML example)
  const show = (o, id) => {
    console.log(`📺 show() called for element '${id}' with data:`, o);
    const element = document.getElementById(id);
    if (element) {
      const text = typeof o === 'string' ? o : JSON.stringify(o, null, 2);
      element.textContent = text;
      console.log(`✅ Content set for '${id}':`, text.substring(0, 100) + '...');
    } else {
      console.log(`❌ Element '${id}' not found in DOM`);
    }
  };

  // Call /me endpoint (matching HTML example)
  const callMe = async () => {
    console.log('📞 callMe function called');
    const token = localStorage.getItem('access');
    console.log('🎟️ Token from localStorage:', token ? 'Present (length: ' + token.length + ')' : 'Not found');
    
    if (!token) {
      const msg = 'No access token stored.';
      console.log('❌', msg);
      return show(msg, 'meOut');
    }
    
    console.log('🌐 Making request to /gmail/me/ endpoint...');
    try {
      const res = await fetch('https://backend.catodrive.com/gmail/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('📡 Response status:', res.status);
      console.log('📡 Response headers:', Object.fromEntries(res.headers.entries()));
      
      const data = await res.json();
      console.log('📦 Response data:', data);
      show(data, 'meOut');
    } catch (error) {
      console.error('❌ callMe error:', error);
      show(`Error: ${error.message}`, 'meOut');
    }
  };

  // Refresh token (matching HTML example)
  const refreshToken = async () => {
    console.log('🔄 refreshToken function called');
    const refresh = localStorage.getItem('refresh');
    console.log('🔄 Refresh token from localStorage:', refresh ? 'Present (length: ' + refresh.length + ')' : 'Not found');
    
    if (!refresh) {
      const msg = 'No refresh token stored.';
      console.log('❌', msg);
      return show(msg, 'refreshOut');
    }
    
    console.log('🌐 Making request to /auth/token/refresh/ endpoint...');
    try {
      const res = await fetch('https://backend.catodrive.com/auth/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });
      console.log('📡 Refresh response status:', res.status);
      console.log('📡 Refresh response headers:', Object.fromEntries(res.headers.entries()));
      
      const data = await res.json();
      console.log('📦 Refresh response data:', data);
      
      if (data.access) {
        localStorage.setItem('access', data.access);
        console.log('✅ New access token stored');
      }
      show(data, 'refreshOut');
    } catch (error) {
      console.error('❌ refreshToken error:', error);
      show(`Error: ${error.message}`, 'refreshOut');
    }
  };

  // Handle redirect (exact copy from HTML example with profile redirect)
  const handleRedirect = () => {
    console.log('🔍 handleRedirect called');
    console.log('📍 Current URL:', window.location.href);
    console.log('🔗 Search params:', window.location.search);
    
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const refresh = params.get('refresh');
    const error = params.get('error');
    
    console.log('🎟️ Access token from URL:', access ? 'Present (length: ' + access.length + ')' : 'Not found');
    console.log('🔄 Refresh token from URL:', refresh ? 'Present (length: ' + refresh.length + ')' : 'Not found');
    console.log('❌ Error from URL:', error || 'None');

    if (error) {
      console.log('❌ ERROR CASE: Setting error status');
      setGoogleAuthStatus('error');
      setError(`Google Auth Error: ${error}`);
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('🧹 URL params cleared after error');
      return;
    }

    if (access && refresh) {
      console.log('✅ SUCCESS CASE: Both tokens found, storing...');
      
      // Store Google OAuth tokens (for Gmail API access)
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      
      // For profile redirect, we need to store the same keys as manual login
      // Assuming the access token from Google OAuth can be used as the main auth token
      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // You might need to fetch user data with the Google token and store it
      // For now, setting a minimal structure
      localStorage.setItem('customerId', 'google-user'); // You'll need to get actual user ID
      
      console.log('💾 Tokens stored in localStorage');
      console.log('📦 localStorage access:', localStorage.getItem('access') ? 'Stored successfully' : 'Storage failed');
      console.log('📦 localStorage refresh:', localStorage.getItem('refresh') ? 'Stored successfully' : 'Storage failed');
      console.log('📦 localStorage token:', localStorage.getItem('token') ? 'Stored successfully' : 'Storage failed');
      
      setGoogleAuthStatus('success');
      setError("");
      
      // Clear URL params for cleaner look
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('🧹 URL params cleared after success');
      console.log('📍 New URL after cleanup:', window.location.href);
      
      // Redirect to profile immediately (like manual login)
      console.log('🚀 Redirecting to /profile immediately');
      router.push('/profile');
    } else {
      console.log('🤷‍♂️ NO ACTION: No tokens or error found in URL params');
    }
  };

  useEffect(() => {
    console.log('🔄 useEffect triggered');
    console.log('📍 Current URL:', window.location.href);
    console.log('🔍 Checking existing authentication...');
    
    // Check if user is already logged in with existing tokens (either manual or Google)
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    
    console.log('🎟️ Existing token:', token ? 'Present' : 'None');
    console.log('👤 Existing customerId:', customerId ? 'Present' : 'None');
    
    if (token && customerId) {
      console.log('✅ User already authenticated, redirecting to profile...');
      router.push('/profile');
      return;
    }

    console.log('🔍 No existing auth found, checking for OAuth callback...');
    // Handle Google OAuth redirect (exact same logic as HTML)
    handleRedirect();
  }, [router]);

  const initiateGoogleLogin = () => {
    console.log('🚀 initiateGoogleLogin called');
    console.log('📍 Current URL before redirect:', window.location.href);
    console.log('🎯 Target OAuth URL: https://backend.catodrive.com/gmail/auth/google/');
    console.log('🧳 Current localStorage contents:');
    console.log('  - access:', localStorage.getItem('access') ? 'Present' : 'None');
    console.log('  - refresh:', localStorage.getItem('refresh') ? 'Present' : 'None');
    console.log('  - token:', localStorage.getItem('token') ? 'Present' : 'None');
    console.log('  - customerId:', localStorage.getItem('customerId') ? 'Present' : 'None');
    
    // Direct redirect to backend OAuth endpoint (exact same as HTML)
    console.log('🔄 Initiating redirect...');
    window.location.href = 'https://backend.catodrive.com/gmail/auth/google/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Regular login form submitted');
    console.log('📧 Email:', email);
    console.log('🔒 Password length:', password.length);
    
    setError("");
    setIsLoading(true);

    try {
      console.log('🌐 Making login request to:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/login`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Login response status:', response.status);
      console.log('📡 Login response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('❌ Login failed, error data:', errorData);
        throw new Error(errorData.msg || `Login failed (HTTP ${response.status})`);
      }

      const responseData = await response.json();
      console.log('✅ Login successful, response data:', responseData);
      
      localStorage.setItem('token', responseData.access_token);
      localStorage.setItem('refresh_token', responseData.refresh_token);
      localStorage.setItem('userData', JSON.stringify(responseData.data));
      localStorage.setItem('customerId', responseData.data.id);
      
      console.log('💾 Regular login tokens stored');
      console.log('🚀 Redirecting to /profile...');
      router.push('/profile'); // Changed from window.location.href to router.push for consistency
      
    } catch (error) {
      console.error("❌ Login error:", error);
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
            
            {/* Google Auth Status - Show if OAuth completed (Debug only - remove in production) */}
            {googleAuthStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 font-medium">✓ Google login successful!</div>
                <div className="text-sm text-green-600 mt-1">Redirecting to your profile...</div>
                
                {/* Debug section (matching HTML example - remove in production) */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={callMe}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Test /me Endpoint
                  </button>
                  <pre id="meOut" className="bg-gray-100 p-2 rounded text-xs max-h-20 overflow-auto"></pre>
                  
                  <button
                    onClick={refreshToken}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Test Refresh Token
                  </button>
                  <pre id="refreshOut" className="bg-gray-100 p-2 rounded text-xs max-h-20 overflow-auto"></pre>
                </div>
              </div>
            )}

            {/* Google Login Button */}
            <div className="w-full flex justify-center mb-6">
              <button
                onClick={initiateGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center w-full max-w-[350px] bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A30] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z"/>
                </svg>
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
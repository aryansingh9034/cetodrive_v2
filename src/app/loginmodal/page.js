"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginModal({ show, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://3.108.23.172:8002/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'failure') {
        throw new Error(data.msg || "Login failed");
      }

      if (!data.data?.id) {
        throw new Error("Invalid user data received");
      }

      // Store auth data
      localStorage.setItem('userData', JSON.stringify(data.data));
      localStorage.setItem('customerId', data.data.id);

      // FIRST: Close the modal
      onClose();
      
      // THEN: Trigger success callback
      // Use setTimeout to ensure modal is closed before parent state updates
      setTimeout(() => {
        onLoginSuccess(data.data.id);
      }, 100);

    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#FF7A30]">Login to Continue</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            error.includes("not registered") ? 
              "bg-blue-100 border border-blue-400 text-blue-700" : 
              "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="text-black">
          <div className="mb-4">
            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="modal-email"
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
            <label htmlFor="modal-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="modal-password"
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
            Dont have an account?{' '}
            <button 
              onClick={() => {
                onClose();
                router.push('/signup');
              }} 
              className="text-[#FF7A30] hover:underline"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
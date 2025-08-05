"use client";

import Link from "next/link";
import { Phone, Mail, Apple, PlayCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
    vehicle_types: "",
    username: "",
  });

  const vehicleTypes = [
    "SUV",
    "Sedan",
    "Hatchback",
    "Coupe",
    "Mid-size 4x4 SUV"
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
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
        setShowSignupModal(false);
        setFormData({
          email: "",
          password: "",
          re_password: "",
          vehicle_types: "",
          username: "",
        });
        router.push('/login');
      } else {
        alert("Error: " + data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const closeModal = () => {
    setShowSignupModal(false);
    setFormData({
      email: "",
      password: "",
      re_password: "",
      vehicle_types: "",
      username: "",
    });
  };

  return (
    <>
      <div className="bg-[#0a0c17] text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Left column */}
            <div className="flex flex-col items-start pl-0 -ml-16">
              <img 
                src="/logo1.png" 
                alt="CatoDrive vehicle" 
                className="w-full max-w-md rounded-lg"
              />
              <p className="text-2xl text-center mt-4 font-bold max-w-md w-full">
                Skip the cab, grab the keys!
              </p>
            </div>

            {/* Right column */}
            <div>
              <h2 className="text-xl font-bold mb-2">Join CatoDrive</h2>
              <p className="text-sm mb-6">Wheels when you want em – book now, drive later.</p>

              <div className="space-y-3">
                <div>
                  <label htmlFor="newsletter-email" className="text-xs block mb-1">
                    Your email address
                  </label>
                  <input 
                    type="email" 
                    id="newsletter-email" 
                    className="w-full bg-[#111327] rounded-md p-3 outline-none text-sm" 
                  />
                </div>

                <button 
                  onClick={handleSignupClick}
                  className="w-full bg-[#3b5bf5] hover:bg-[#2a4ae0] text-white py-3 rounded-md transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Footer section */}
          <footer className="mt-12 md:mt-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
              {/* Company */}
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/aboutus" className="hover:text-gray-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-gray-300">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="hover:text-gray-300">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/termsandcondition" className="hover:text-gray-300">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactus" className="hover:text-gray-300">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/getintouch" className="hover:text-gray-300">
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <Link href="/howitwork" className="hover:text-gray-300">
                      How it works
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Brands */}
              <div>
                <h3 className="font-bold mb-4">Our Brands</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <p className="hover:text-gray-300">
                      Toyota
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Porsche
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      BMW
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Ford
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Nissan
                    </p>
                  </li>
                </ul>
              </div>

              {/* Vehicles Type */}
           
<div>
  <h3 className="font-bold mb-4">Vehicles Type</h3>
  <ul className="space-y-2 text-sm">
    {vehicleTypes.map((type) => (
      <li key={type}>
        <Link 
          href={`/availablevehicle?type=${encodeURIComponent(type)}`}
          className="hover:text-gray-300"
        >
          {type}
        </Link>
      </li>
    ))}
  </ul>
</div>

              {/* Our Mobile App */}
              <div>
                <h3 className="font-bold mb-4">Our Mobile App</h3>
                <div className="space-y-3">
                  <Link href="/comingsoon" className="flex items-center gap-2 text-sm hover:text-gray-300">
                    <Apple size={20} />
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="font-medium">Apple Store</div>
                    </div>
                  </Link>
                  <Link href="/comingsoon" className="flex items-center gap-2 text-sm hover:text-gray-300">
                    <PlayCircle size={20} />
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="font-medium">Google Play</div>
                    </div>
                  </Link>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold mb-4">Connect With Us</h3>
                  <div className="flex gap-3">
                    <div className="flex space-x-2">
                      {/* Social media icons remain the same */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 mx-auto justify-between items-center text-xs text-gray-400">
              <div>© 2025 catodrive.com. All rights reserved.</div>
            </div> 
          </footer>
        </div>
      </div>

      {/* Signup Modal */}
{showSignupModal && (
  <div 
    className="fixed inset-0 top-20 bg-black bg-opacity-50 z-1000 flex items-start justify-center p-4 overflow-y-auto pt-[--header-height]"
    onClick={closeModal}
    style={{"--header-height": "64px"}} // Set your actual header height here
  >
    <div 
      className="bg-white rounded-xl w-full max-w-md my-4 max-h-[calc(100vh-var(--header-height)-2rem)] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#FF7A30]">Create New Account</h2>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-xl focus:outline-none"
            aria-label="Close signup modal"
          >
            ×
          </button>
        </div>

        {/* Google Signup Button */}
        <button 
          className="w-full border rounded-xl border-gray-300 py-3 flex items-center justify-center gap-2 mb-4 hover:bg-gray-50 transition-colors"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-.138-2.65-.389-3.917H43.611z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
              required
              minLength={3}
              maxLength={20}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
              required
              minLength={8}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type
            </label>
            <div className="relative">
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:border-transparent"
                required
              >
                <option value="" disabled>Choose your vehicle type</option>
                <option value="Driver">Driver</option>
                <option value="Owner">Car Owner</option>
              </select>
              <div className="absolute right-3 top-3.5 pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF7A30] text-white py-3 rounded-xl hover:bg-[#e86e29] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#FF7A30] focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                closeModal();
                router.push('/login');
              }}
              className="text-[#FF7A30] hover:underline font-medium focus:outline-none"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}
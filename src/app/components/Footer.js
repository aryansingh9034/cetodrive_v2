// components/Footer.js
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
      
        setShowSignupModal(false);
        // Reset form
        setFormData({
          email: "",
          password: "",
          re_password: "",
          vehicle_types: "",
          username: "",
        });
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

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const closeModal = () => {
    setShowSignupModal(false);
    // Reset form when closing
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
           <div>
  <h1 className="text-2xl font-bold mb-2">CatoDrive</h1>
  <p className="text-sm mb-4 max-w-md">
    Skip the cab, grab the keys!
  </p>
  
  {/* Animated car icon */}
  {/* <div className=" w-12 h-12 mx-auto">
    
     <img 
                src="/sport.jpg"
                alt="Download on the App Store"
                className="w-full"
              />
  </div> */}
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
                    <Link href="/blog" className="hover:text-gray-300">
                      Blog
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
                    <Link href="/helpcenter" className="hover:text-gray-300">
                      Help center
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/livechat" className="hover:text-gray-300">
                      Live chat
                    </Link>
                  </li> */}
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
                    <p  className="hover:text-gray-300">
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
                  <li>
                    <p className="hover:text-gray-300">
                      Peugeot
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Volkswagen
                    </p>
                  </li>
                </ul>
              </div>

              {/* Vehicles Type */}
              <div>
                <h3 className="font-bold mb-4">Vehicles Type</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <p className="hover:text-gray-300">
                      Sedan
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Hatchback
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      SUV
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      PHEV
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Electric
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Coupe
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Truck
                    </p>
                  </li>
                  <li>
                    <p className="hover:text-gray-300">
                      Convertible
                    </p>
                  </li>
                </ul>
              </div>

              {/* Our Mobile App */}
              <div>
                <h3 className="font-bold mb-4">Our Mobile App</h3>
                <div className="space-y-3">
                  <Link href="#" className="flex items-center gap-2 text-sm hover:text-gray-300">
                    <Apple size={20} />
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="font-medium">Apple Store</div>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-sm hover:text-gray-300">
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
                      <Link href="#" className="bg-white/10 rounded-md p-2 text-white transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </Link>

                      <Link href="#" className="bg-white/10 rounded-md p-2 text-white transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </Link>

                      <Link href="#" className="bg-white/10 rounded-md p-2 text-white transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </Link>

                      <Link href="#" className="bg-white/10 rounded-md p-2 text-white transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </Link>

                      <Link href="#" className="bg-white/10 rounded-md p-2 text-white transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </Link>

                      <Link href="#" className="bg-white/10 rounded-md p-2 text-white transition">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.162 0h-3.837l-5.504 7.426-5.01-7.426h-4.062l7.596 11.152-7.879 10.848h3.861l5.786-8.027 5.422 8.027h4.038l-7.901-11.176z" />
                        </svg>
                      </Link>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#FF7A30]">Create New Account</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Google Login Placeholder */}
              <button className="w-full border rounded-xl border-gray-300 py-3 flex items-center justify-center gap-2 mb-4 hover:bg-gray-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8..." />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571..." />
                  <path fill="#4CAF50" d="M24,44c5.166,0..." />
                  <path fill="#1976D2" d="M43.611,20.083H42..." />
                </svg>
                <span className="text-sm font-medium text-gray-700">Log in with Google</span>
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

              <div className="text-center mt-4">
                <p className="text-sm text-[#FF7A30]">
                  Already have an account?
                  <button 
                    onClick={() => {
                      closeModal();
                      router.push('/login');
                    }}
                    className="text-black hover:underline ml-1"
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
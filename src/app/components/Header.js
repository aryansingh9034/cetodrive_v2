// components/Header.js
'use client'; // Needed for interactivity

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative z-10 flex flex-wrap items-center justify-between w-full px-4 py-4 sm:px-6 lg:px-20">
      <div className="flex items-center">
        <Link href="/" className="text-white text-2xl sm:text-3xl font-bold">
          CatoDrive
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="items-center flex justify-end space-x-4 lg:space-x-6">
        {/* Mobile menu button */}
        <button className="text-white p-2 rounded-md" onClick={toggleMobileMenu}>
          <Menu className="w-10 h-10" />
        </button>
      </div>

      {/* Enhanced Mobile Menu with Dark Background */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900 backdrop-blur-md">
          {/* Animated Background Pattern - Darker Version */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-900 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-40 h-40 bg-blue-900 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-900 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative flex flex-col max-h-screen overflow-y-auto">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <span className="text-white text-2xl font-bold">CatoDrive</span>
              </div>

              <button
                className="group relative w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                onClick={toggleMobileMenu}
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-900/50 to-red-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
              {/* Logo Section */}
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-4">
                  CatoDrive
                </h1>
                <p className="text-orange-500 text-lg">Drive Your Dreams</p>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full"></div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-6 text-center">
                {[
                  { href: "/", label: "Home" },
                  { href: "/WhyChooseUs", label: "Why Choose Us" },
                  { href: "/contactus", label: "Contact" },
                  { href: "/availablevehicle", label: "Available Vehicle" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block"
                    onClick={toggleMobileMenu}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center space-x-4 py-4 px-8 rounded-2xl bg-gray-800 hover:bg-gray-700 border border-orange-600 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-slide-up">
                      <span className="text-2xl font-semibold text-orange-500 group-hover:text-orange-400 transition-colors duration-300">
                        {item.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-orange-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
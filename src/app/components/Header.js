// components/Header.js
'use client'; // Needed for interactivity

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Car, Zap, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setIsLoggedIn(!!userData);
  }, [pathname]); // Re-run when path changes

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBilling = pathname.includes('/billing');
  const isProfile = pathname.includes('/profile');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('customerId');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <>
           <header className="fixed top-0 z-10000 left-0 right-0  transition-all duration-500 bg-black/80 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl shadow-orange-500/10">
        <div className="flex items-center justify-between w-full px-6 py-4 lg:px-12">
          {/* Logo - left side */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <span className="text-white text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                CatoDrive
              </span>
              <div className="h-0.5 bg-gradient-to-r from-orange-500 to-transparent group-hover:from-orange-400 transition-colors duration-300"></div>
            </div>
          </Link>

          {/* Right side container */}
          <div className="flex items-center gap-4">
            {/* Login/Signup buttons (only on car detail page) */}
            {/* {isCarDetailsClient && (
              <div className="flex items-center gap-4">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm rounded-md font-medium bg-gray-100 text-orange-400  transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )} */}
             {isBilling && !isLoggedIn && (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm rounded-md font-medium bg-gray-100 text-orange-400 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
             {/* {isBilling && isLoggedIn && (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium bg-gray-100 text-orange-400 transition-colors duration-300"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )} */}

            {isLoggedIn && (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/profile" 
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                  title="Profile"
                >
                  <User className="w-5 h-5 text-orange-400" />
                </Link>
              </div>
            )}

            
          
            {/* {isProfile && isLoggedIn && (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium bg-gray-100 text-orange-400 transition-colors duration-300"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )} */}

            {/* Show "Rent Your Car" only on profile page */}
            {isProfile && (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/vehicleform" 
                  className="px-4 py-2 text-sm rounded-md font-medium bg-gray-100 text-orange-400 transition-colors duration-300"
                >
                  Rent Your Car
                </Link>
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button 
              className="group relative p-3 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25" 
              onClick={toggleMobileMenu}
            >
              <Menu className="relative w-6 h-6 text-orange-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Full-Screen Menu Overlay */}
      <div className={`fixed inset-0  transition-all duration-700 z-10000 ${
        mobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Animated Particles */}
          {/* <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div> */}

          {/* Geometric Patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-2xl animate-float-slow"></div>
          </div>
        </div>

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col transition-transform duration-700 ${
          mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          
          {/* Header with Enhanced Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-white text-2xl font-bold">Menu</span>
            </div>

            <button
              className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-110 hover:rotate-3"
              onClick={toggleMobileMenu}
            >
              <X className="w-6 h-6 text-orange-500 group-hover:text-orange-400 group-hover:rotate-90 transition-all duration-300" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Main Menu Content */}
          <div className="flex-1 flex flex-col justify-center px-6 py-8">
            
            {/* Brand Section */}
            <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-3">
                CatoDrive
              </h1>
              <p className="text-orange-400/80 text-lg font-light tracking-wider">Drive Your Dreams</p>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-4"></div>
            </div>

            {/* Navigation Grid */}
             <nav className="grid gap-4 max-w-md mx-auto w-full">
      {[
        { href: "/", label: "Home", delay: 0 },
        { href: "/WhyChooseUs", label: "Why Choose Us", delay: 100 },
        { href: "/contactus", label: "Contact", delay: 200 },
        { href: "/availablevehicle", label: "Available Vehicle", delay: 300 },
        ...(isLoggedIn
          ? [
              { href: "/profile", label: "Profile", delay: 400 },
              { 
                label: "Logout", 
                delay: 500,
                action: handleLogout,
                icon: <LogOut className="w-5 h-5 text-orange-500/70 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
              }
            ]
          : [
              { href: "/login", label: "Login", delay: 400 },
              { href: "/signup", label: "Sign Up", delay: 500 }
            ]
        )
      ].map((item, index) => (
        item.href ? (
          <Link
            key={item.href}
            href={item.href}
            className={`group block transition-all duration-500 ${
              mobileMenuOpen 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: `${item.delay + 200}ms` }}
            onClick={toggleMobileMenu}
          >
            <div className="relative overflow-hidden">
              <div className="flex items-center justify-between py-4 px-8 mx-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 group-hover:border-orange-500/50 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-orange-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-xl font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
                <div className="relative flex items-center">
                  <ArrowRight className="w-5 h-5 text-orange-500/70 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <button
            key={item.label}
            className={`group block transition-all duration-500 ${
              mobileMenuOpen 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: `${item.delay + 200}ms` }}
            onClick={() => {
              item.action();
              toggleMobileMenu();
            }}
          >
            <div className="relative overflow-hidden">
              <div className="flex items-center justify-between py-4 px-8 mx-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 group-hover:border-orange-500/50 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-orange-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-xl font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
                <div className="relative flex items-center">
                  {item.icon || <ArrowRight className="w-5 h-5 text-orange-500/70 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />}
                </div>
              </div>
            </div>
          </button>
        )
      ))}
    </nav>

            {/* Footer Section */}
            <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-gray-500 text-sm">Experience Premium Car Rentals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite 2s;
        }
      `}</style>
    </>
  );
}
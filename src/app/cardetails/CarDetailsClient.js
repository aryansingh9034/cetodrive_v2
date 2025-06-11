"use client"

import Link from "next/link"
import { Phone, Mail, Apple, PlayCircle, Heart, ArrowRight, Menu, X, Fuel, Settings, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import Profile from "../../../public/Profill.png"

export default function Home() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const router = useRouter()

  const [vehicle, setVehicle] = useState({})
  const [reviews, setReviews] = useState([])
  const [selectedimg, setSelectedimg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

 useEffect(() => {
  if (!id) return;

  axios
    .get(`http://3.108.23.172:8002/api/vehicle/vehicle/${id}`)
    .then((response) => {
      console.log("Vehicle API Response:", response.data.data);
      const vehicleData = response.data.data;

      // Remove existing vehicle data
      localStorage.removeItem("vehicle");

      // Save new vehicle data to localStorage
      localStorage.setItem("vehicle", JSON.stringify(vehicleData));

      setVehicle(vehicleData);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Vehicle API Error:", error);
      setLoading(false);
    });
}, [id]);


  // Fetch reviews dynamically
  useEffect(() => {
    axios
      .get("http://3.108.23.172:8002/api/reviews/reviews/")
      .then((response) => {
        const formattedReviews = response.data.data.map((item) => ({
          id: item.id,
          name: item.title || "Anonymous",
          username: item.user_name || "Anonymous",
          date: new Date(item.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          rating: item.rating,
          avatar: "/placeholder.svg?height=40&width=40",
          text: item.context,
        }))
        console.log("Formatted Reviews:", formattedReviews)
        setReviews(formattedReviews)
        setReviewsLoading(false)
      })
      .catch((error) => {
        console.error("Review Fetch Error:", error)
        setReviewsLoading(false)
      })
  }, [])

  // Navigation handlers
  const handleClick1 = () => {
    router.push("/billing")
  }

  const handleRentNow = () => {
    console.log("Rent now clicked")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Process vehicle imgs
  const imgs = vehicle?.images?.map((img) => `http://143.110.242.217:8031${img.image}`) || []
  console.log("keshav", imgs)
  const currentimg = imgs[selectedimg] || "/placeholder.svg?height=350&width=690"

  // Sample vehicles for "Recent Car" section
  const sampleVehicles = [
    { brand: "Mercedes", price: 25, model: "Sedan", type: "Sedan", capacity: 4, fuel: "90L", transmission: "Manual" },
    { brand: "Mercedes", price: 50, model: "Sport", type: "Sport", capacity: 2, fuel: "80L", transmission: "Auto" },
    { brand: "Mercedes", price: 45, model: "SUV", type: "SUV", capacity: 6, fuel: "100L", transmission: "Auto" },
    { brand: "Mercedes", price: 25, model: "Sedan", type: "Sedan", capacity: 4, fuel: "90L", transmission: "Manual" },
    { brand: "Mercedes", price: 50, model: "Sport", type: "Sport", capacity: 2, fuel: "80L", transmission: "Auto" },
    { brand: "Mercedes", price: 45, model: "SUV", type: "SUV", capacity: 6, fuel: "100L", transmission: "Auto" },
  ]

  // Star Rating Component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-orange-400 fill-current" : "text-gray-300"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading vehicle details...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:h-full bg-white overflow-hidden">
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
                  <span className="text-2xl">{item.icon}</span>
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
      </div>

      {/* Main Content */}
      <div className="w-full p-4 bg-gray-50">
        <div className="w-full p-6 bg-gray-50 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Side - Car img Card */}
            {/* Left Side - Car Image Gallery */}
            <div className="w-full max-w-full space-y-4">
              {/* Main Car Image Display */}
              <div className="relative w-full max-w-[690px] h-[60vw] sm:h-[350px] rounded-2xl overflow-hidden mx-auto bg-gray-100">
                <img
                  src={currentimg || "/placeholder.svg"}
                  alt="Selected Car"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=350&width=690"
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto w-full max-w-[690px] h-[28vw] sm:h-[120px] mx-auto pb-2">
                {imgs.length > 0 ? (
                  imgs.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedimg(index)}
                      className={`min-w-[32%] aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedimg === index
                          ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Car view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=120&width=160"
                        }}
                      />
                    </button>
                  ))
                ) : (
                  <div className="w-full flex items-center justify-center h-full text-gray-500">
                    <p>No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Car Details */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-5xl font-bold text-gray-900 mb-2">{vehicle?.name || "N/A"}</h1>
                  <div className="flex items-center gap-2">
                    <StarRating rating={4} />
                    <span className="text-gray-600 text-md">440+ Reviewer</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-6 h-6 text-red-500" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-2xl leading-relaxed">
                {vehicle?.vehicle_model
                  ? `${vehicle.vehicle_model} is a ${vehicle.vehicle_type?.name || "vehicle"} with ${vehicle.gear_box} transmission and ${vehicle.fuel} fuel type.`
                  : "Vehicle description not available."}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-2 text-lg gap-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Type Car</span>
                  <span className="font-semibold text-gray-900">{vehicle?.vehicle_type?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Capacity</span>
                  <span className="font-semibold text-gray-900">{vehicle?.vehicle_seat?.capacity || "N/A"} Person</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Mannual</span>
                  <span className="font-semibold text-gray-900">{vehicle?.gear_box || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Gasoline</span>
                  <span className="font-semibold text-gray-900">{vehicle?.fuel || "N/A"}</span>
                </div>
              </div>

              {/* Pricing and Rent Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">${vehicle?.price || "0"}/</span>
                    <span className="text-gray-500">day</span>
                  </div>
                  <span className="text-gray-400 line-through">${Number.parseInt(vehicle?.price || "0") + 200}</span>
                </div>
                <button
                  onClick={handleClick1}
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white w-full rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-900">Reviews</h3>
                <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">{reviews.length}</span>
              </div>
            </div>

            <div className="space-y-6">
              {reviewsLoading ? (
                <div className="text-center py-8">
                  <div className="text-lg">Loading reviews...</div>
                </div>
              ) : reviews.length > 0 ? (
                reviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <img
                      src={Profile || "/placeholder.svg"}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between -mb-2">
                        <div>
                          <h4 className="font-semibold text-3xl text-gray-900">{review.name}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-md mb-1">{review.date}</p>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-lg text-gray-500">No reviews available</div>
                </div>
              )}
            </div>

            {reviews.length > 2 && (
              <div className="text-center mt-6">
                <button className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 mx-auto transition-colors">
                  Show All ({reviews.length} reviews)
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Recent Car Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Recent Car</h4>
                <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors">View All</button>
              </div>
              <div className="flex-1 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 sm:gap-6">
                {sampleVehicles.map((vehicle, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    {/* Header with title and heart icon */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-2xl text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{vehicle.type}</p>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <Heart className="w-6 h-6 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Car img */}
                    <div className="aspect-[5/3] relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 mb-6 cursor-pointer group">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Specifications */}
                    <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Fuel className="w-7 h-7 text-gray-400" />
                        <span>{vehicle.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-7 h-7 text-gray-400" />
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-7 h-7 text-gray-400" />
                        <span>{vehicle.capacity}</span>
                      </div>
                    </div>

                    {/* Price and button */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-gray-900">${vehicle.price.toFixed(2)}/</span>
                          <span className="text-sm text-gray-500">day</span>
                        </div>
                        <div className="text-sm text-gray-400 line-through">${(vehicle.price + 10).toFixed(2)}</div>
                      </div>
                      <button
                        onClick={handleRentNow}
                        className="bg-[#3563e9] hover:bg-[#2952d3] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Rent Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0a0c17] text-white">
        <main className="container mx-auto px-4 py-12">
          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-22 mb-16">
            {/* Left column */}
            <div>
              <h1 className="text-2xl font-bold mb-2">CatoDrive</h1>
              <p className="text-sm mb-6 max-w-md">
                Exceptional and modern registration non-problem, sunt incidunt qui officia deserunt mollit anim id est.
              </p>

              <div className="space-y-3">
                <div className="flex items-center bg-[#111327] rounded-md p-2 max-w-xs">
                  <div className="bg-transparent p-2 mr-2">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input type="text" placeholder="+XXXXXXXXX" className="bg-transparent outline-none w-full text-sm" />
                </div>

                <div className="flex items-center bg-[#111327] rounded-md p-2 max-w-xs">
                  <div className="bg-transparent p-2 mr-2">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <h2 className="text-xl font-bold mb-2">Join CatoDrive</h2>
              <p className="text-sm mb-6">Receive pricing updates, shopping tips & more!</p>

              <div className="space-y-3">
                <div>
                  <label htmlFor="email" className="text-xs block mb-1">
                    Your email address
                  </label>
                  <input type="email" id="email" className="w-full bg-[#111327] rounded-md p-3 outline-none text-sm" />
                </div>

                <button className="w-full bg-[#3b5bf5] hover:bg-[#2a4ae0] text-white py-3 rounded-md transition-colors">
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
                    <Link href="#" className="hover:text-gray-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
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
                    <Link href="#" className="hover:text-gray-300">
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Help center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Live chat
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
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
                    <Link href="#" className="hover:text-gray-300">
                      Toyota
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Porsche
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      BMW
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Ford
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Nissan
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Peugeot
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Volkswagen
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Vehicles Type */}
              <div>
                <h3 className="font-bold mb-4">Vehicles Type</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Sedan
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Hatchback
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      SUV
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      PHEV
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Electric
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Coupe
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Truck
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Convertible
                    </Link>
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
              <Link href="#" className="bg-white/10 rounded-md p-2 text-white 
 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>

              <Link href="#" className="bg-white/10 rounded-md p-2 text-white 
 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>

              <Link href="#" className="bg-white/10 rounded-md p-2 text-white 
 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              <Link href="#" className="bg-white/10 rounded-md p-2 text-white 
 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </Link>

              <Link href="#" className="bg-white/10 rounded-md p-2 text-white 
 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>

              <Link href="#" className="bg-white/10 rounded-md p-2 text-white 
 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.162 0h-3.837l-5.504 7.426-5.01-7.426h-4.062l7.596 11.152-7.879 10.848h3.861l5.786-8.027 5.422 8.027h4.038l-7.901-11.176z" />
                </svg>
              </Link>
            </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
              <div>© 2024 example.com. All rights reserved.</div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white">
                  Terms & Conditions
                </Link>
                <span>•</span>
                <Link href="#" className="hover:text-white">
                  Privacy Notice
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

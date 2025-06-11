"use client"

import Link from "next/link"
import { Phone, Mail, Apple, PlayCircle, Navigation } from "lucide-react"
import Image from "next/image"
import { ArrowRight, Calendar, Check, MapPin, Menu  , X} from "lucide-react"
import { useState , useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from 'next/navigation';
import background from "../../../public/backgorund.jpg"
import axios from "axios"
export default function Home() {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
  const [location, setLocation] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    axios
      .get("http://3.108.23.172:8002/api/vehicle/vehicle/")
      .then((response) => {
        console.log("keshav",response.data.data);
        setCars(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, []);

  const handleClick = (id) => {
  console.log(id)  
  router.push(`/cardetails?id=${id}`);
};

   const handleClick1 = () => {
    router.push('/vehicle'); // navigate to /cardetails
  };
    const formatDate = (date) => {
    if (!date) return ""
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${dayName} ${day} ${month}, ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const handleSearch = () => {
    console.log("Searching for:", { location, pickupDate, returnDate })
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:h-screen bg-[#0f172a] overflow-hidden">
        <Image src={background || "/placeholder.svg"} alt="Hero background" fill className="object-cover" priority />

        {/* Header/Navigation */}
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

        {/* Hero Content */}
        <div className="relative z-5 w-full flex flex-col h-full justify-center items-center px-4 sm:px-6 lg:px-20 pb-16 md:pb-24 pt-16 md:pt-0">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mt-8 md:mt-16 mb-4 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Drive Your <span className="text-[#ea580c]">Dream Car</span>
          </h1>

          <p className="text-white text-lg sm:text-xl md:text-2xl max-w-4xl mb-8 md:mb-16 text-center">
            Experience luxury and comfort with our premium fleet of vehicles.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col w-full max-w-[1050px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Input */}
              <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-300 p-2">
                <MapPin className="text-gray-400 w-6 h-6 flex-shrink-0" />
                <div className="w-full">
                  <div className="text-xs font-bold text-gray-800">Location</div>
                  <input
                    type="text"
                    placeholder="Search your location"
                    className="w-full outline-none text-gray-700 placeholder:text-gray-300 text-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Pickup Date */}
              <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-300 p-2">
                <Calendar className="text-gray-400 w-6 h-6 flex-shrink-0" />
                <div className="w-full">
                  <div className="text-xs font-bold text-gray-800">Pickup date</div>
                  <DatePicker
                    selected={pickupDate}
                    onChange={(date) => setPickupDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="EEE, MMM d, HH:mm"
                    className="w-full outline-none text-gray-700 cursor-pointer text-sm"
                    customInput={<div className="cursor-pointer">{formatDate(pickupDate)}</div>}
                  />
                </div>
              </div>

              {/* Return Date */}
              <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-300 p-2">
                <Calendar className="text-gray-400 w-6 h-6 flex-shrink-0" />
                <div className="w-full">
                  <div className="text-xs font-bold text-gray-800">Return date</div>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="EEE, MMM d, HH:mm"
                    className="w-full outline-none text-gray-700 cursor-pointer text-sm"
                    customInput={<div className="cursor-pointer">{formatDate(returnDate)}</div>}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center p-2">
                <button
                  className="w-full bg-[#ea580c] hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-200"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Brands Section */}
      {/* <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-20 bg-gray-50 flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-16">
            <Image src="/BMW.png" alt="BMW" width={80} height={50} className="h-16 w-auto object-contain" />
            <img src="/lexus-logo.png" alt="Lexus" width={80} height={40} className="h-16 w-auto object-contain" />
            <img src="/Marcedes.png" alt="Mercedes" width={80} height={40} className="h-16 w-auto object-contain" />
            <img src="/Honda.png" alt="Honda" width={80} height={40} className="h-16 w-auto object-contain" />
            <img src="/Hyundai.png" alt="Hyundai" width={90} height={40} className="h-16 w-auto object-contain" />
            <img src="/Nissan.png" alt="Nissan" width={80} height={40} className="h-16 w-auto object-contain" />
            <img src="/Toyota.png" alt="Toyota" width={80} height={40} className="h-16 w-auto object-contain" />
            <img src="/KIA.png" alt="Kia" width={120} height={40} className="h-16 w-auto object-contain" />
          </div>
        </div>
      </section> */}

      {/* How it Works Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-20 -mt-6 sm:-mt-8 md:-mt-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-gray-500 mt-4 text-xl">How it Works</p>
            <h2
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] mt-2"
            >
              Simple steps to Get the Car
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="flex justify-center">
                <Image
                  src="/Group1.png"
                  alt="Choose a Car"
                  width={200}
                  height={200}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain"
                />
              </div>
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg md:text-xl font-bold text-yellow-500">Choose a Car</h3>
                <p className="text-gray-600 mt-2">Browse top vehicles easily.</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="flex justify-center">
                <Image
                  src="/Group2.png"
                  alt="Pick Your Dates"
                  width={180}
                  height={180}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain"
                />
              </div>
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg md:text-xl font-bold text-orange-500">Pick Your Dates</h3>
                <p className="text-gray-600 mt-2">Select pickup and return dates.</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="flex justify-center">
                <Image
                  src="/Group3.png"
                  alt="Book"
                  width={180}
                  height={180}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain"
                />
              </div>
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg md:text-xl font-bold text-sky-500">Book</h3>
                <p className="text-gray-600 mt-2">Reserve your car online through our App.</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="flex justify-center">
                <Image
                  src="/Group4.png"
                  alt="Drive & Enjoy"
                  width={180}
                  height={180}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain"
                />
              </div>
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg md:text-xl font-bold text-red-500">Drive & Enjoy</h3>
                <p className="text-gray-600 mt-2">Pick up your car and drive.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4"
        >
          Popular Cars
        </h2>
        <p
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-[#0f172a] mb-8 font-montserrat"
        >
          <span className="border-b-2 border-blue-500 pb-1">Browse</span> our top
          selection of vehicles available for rent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white"
            >
              <div className="relative">
                <img
                  src={car.image || "https://via.placeholder.com/300x200"}
                  alt={car.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-md shadow">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 text-black">
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-sm text-gray-600">{car.description}</p>

                <div className="flex justify-between mt-3 border-y border-gray-200 py-3">
                  <Spec icon="👥" label={`${car.seat || "5"} Seats`} />
                  <Spec icon="⛽" label={car.fuel || "Petrol"} />
                  <Spec icon="⚙️" label={car.transmission || "Manual"} />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold">${car.price_per_day || "25"}/day</p>
                  <button
                    onClick={() => handleClick(car.name)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    Book Now!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section> */}

      {/* Popular Cars Section */}
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="text-center mb-8">
      <h2
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
      >
        Popular Cars
      </h2>
      <p
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-slate-600"
      >
        <span className="border-b-2 border-blue-500 pb-1">Browse</span> our top selection of vehicles available for rent.
      </p>
    </div>

    {loading ? (
      <div className="flex justify-center items-center py-12">
        <p className="text-slate-500">Loading cars...</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col h-full group cursor-pointer"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={`http://143.110.242.217:8031${car.images?.[1]?.image || car.images?.[0]?.image || ""}`}
                alt={car.vehicle_model || "Car"}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:shadow-lg hover:scale-110 transition-all duration-300 hover:bg-red-50 group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              {/* Overlay gradient that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Section - Flex grow to fill available space */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Car Name - Top */}
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                  {car.name || "Unknown Model"}
                </h3>
                <p className="text-sm text-gray-600">2023 Model</p>
              </div>

              {/* Car Features - Middle */}
              <div className="flex flex-col gap-2 mb-4 flex-grow">
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">{car.vehicle_seat?.capacity || "5"} seats</span>
                </div>
                
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">{car.fuel || "Petrol"}</span>
                </div>
                
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span className="text-sm text-gray-700">{car.gear_box || "Auto"}</span>
                </div>
              </div>

              {/* Price and Button Section - Always at bottom */}
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="flex justify-between items-center">
                  {/* Price Section */}
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">${car.price || "N/A"}</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <p className="text-xs text-gray-500">Per day (inc. tax)</p>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleClick(car.id)}
                    className="bg-gray-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap transform hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* See All Button */}
    <div className="flex justify-center mt-8">
      <button
        onClick={handleClick1}
        className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-orange-50 group"
      >
        <span>See All</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <p style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-gray-500 uppercase font-medium">
              ADVANTAGES
            </p>
            <h2
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] mt-2"
            >
              Why Choose CatoDrive
            </h2>
            <p style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-gray-700 mt-4 max-w-3xl mx-auto">
              We present many guarantees and advantages when you rent a car with us for your trip. Here are some of the
              advantages that you will get
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20 mt-8 md:mt-12">
            {/* Card 1 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image src="/Vector.png" alt="Easy Rent" width={70} height={70} className="bg-gray-50" />
                </div>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-xl font-bold text-[#0f172a] text-center sm:text-left"
                >
                  Easy Rent
                </h3>
                <p
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-gray-600 mt-2 text-center sm:text-left"
                >
                  Rent a car at our rental with an easy and fast process without disturbing your productivity
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Image src="/Vector1.png" alt="Premium Quality" width={70} height={70} className="bg-white" />
                </div>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-xl font-bold text-[#0f172a] text-center sm:text-left"
                >
                  Premium Quality
                </h3>
                <p
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-gray-600 mt-2 text-center sm:text-left"
                >
                  Our cars are always maintained engine health and cleanliness to provide a more comfortable driving
                  experience
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image src="/Solid.png" alt="Professional Agent" width={80} height={80} className="bg-gray-50" />
                </div>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-xl font-bold text-[#0f172a] text-center sm:text-left"
                >
                  Professional Agent
                </h3>
                <p
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-gray-600 mt-2 text-center sm:text-left"
                >
                  You can ask your travel companion to escort and guide your journey.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image src="/Solid1.png" alt="Car Safety" width={80} height={80} className="bg-gray-50" />
                </div>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-xl font-bold text-[#0f172a] text-center sm:text-left"
                >
                  Car Safety
                </h3>
                <p
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-gray-600 mt-2 text-center sm:text-left"
                >
                  We guarantee the safety of the engine on the car always running well with regular checks on the car
                  engine.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image src="/Solid3.png" alt="Refund" width={80} height={80} className="bg-gray-50" />
                </div>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-xl font-bold text-[#0f172a] text-center sm:text-left"
                >
                  Refund
                </h3>
                <p
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-gray-600 mt-2 text-center sm:text-left"
                >
                  Our service guarantee provides a money back opportunity if the car does not match the information
                  provided.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image src="/Solid2.png" alt="Live Monitoring" width={80} height={80} className="bg-gray-50" />
                </div>
              </div>
              <div>
                <h3
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-xl font-bold text-[#0f172a] text-center sm:text-left"
                >
                  Live Monitoring
                </h3>
                <p
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-gray-600 mt-2 text-center sm:text-left"
                >
                  Our service provides direct customer monitoring to monitor trips in terms of safety and comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Drive Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden flex items-end h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <Image src="/Link(1).png" alt="Luxury car" width={400} height={150} className="w-full object-contain" />
            </div>
            <div className="rounded-2xl overflow-hidden h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <Image src="/h72.png" alt="Luxury car" width={400} height={300} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] text-center md:text-left"
            >
              Ready to Drive Your Dream Car?
            </h2>
            <p style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-gray-700 text-center md:text-left">
              We are committed to providing our customers with exceptional service, competitive pricing, and a wide
              range of.
            </p>

            <div className="space-y-4 mt-6 md:mt-13">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-1 rounded-full">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <p style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-gray-700 font-medium">
                  Wide Selection of Luxury and Economy Vehicles.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-1 rounded-full">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <p style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-gray-700 font-medium">
                  Simple Booking Process with Instant Confirmation.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-1 rounded-full">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <p style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-gray-700 font-medium">
                  Best Prices Guaranteed for Your Perfect Ride.
                </p>
              </div>
            </div>

            <button onClick={handleClick1} className="bg-[#ea580c] cursor-pointer text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 mx-auto md:mx-0">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
     

      {/* Rent/Host Section */}
      <section className="bg-gray-50 py-8">
        <div className="w-full flex justify-center items-center px-4">
          <Image
            src="/host.png"
            height={900}
            width={1050}
            className="mb-10 mt-10 max-w-full h-auto"
            alt="Host your car"
          />
        </div>
      </section>

      {/* Footer */}
      <div className="bg-[#0a0c17] text-white">
        <main className="container mx-auto px-4 py-12">
          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
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

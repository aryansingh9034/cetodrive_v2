"use client"

import  React from "react"

import { useState , useEffect} from "react"
import { Phone, Mail, Apple, PlayCircle , Heart, Star, ArrowRight, Check, Menu,   Fuel, Users , ChevronDown, Upload, X, Car, Settings, ImageIcon, CheckCircle, AlertCircle, Plus, BarChart3 } from "lucide-react"
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function VehicleForm() {
 const router = useRouter() // initialize router
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])

  const [user, setUser] = useState(null)

  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    vehicle_model: "",
    vehicle_share: "No",
    vehicle_number: "",
    zip_code: "",
    availability: "Available",
    gear_box: "Automatic",
    fuel: "Petrol",
    air_conditioner: "Yes",
    vehicle_seat: 2,
    distance: "",
    vehicle_type: 1,
    equipment: [],
    price: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "vehicle_seat" || name === "vehicle_type") {
      setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEquipmentChange = (equipmentId) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equipmentId)
        ? prev.equipment.filter((id) => id !== equipmentId)
        : [...prev.equipment, equipmentId],
    }))
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return <div>Loading...</div>

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");
  setShowSuccess(false);

  try {
    const data = new FormData();

    // Append all form fields
    data.append("name", formData.name);
    data.append("vehicle_model", formData.vehicle_model);
    data.append("vehicle_share", formData.vehicle_share);
    data.append("vehicle_number", formData.vehicle_number);
    data.append("zip_code", formData.zip_code);
    data.append("availability", formData.availability);
    data.append("gear_box", formData.gear_box);
    data.append("fuel", formData.fuel);
    data.append("air_conditioner", formData.air_conditioner);
    data.append("vehicle_seat", formData.vehicle_seat);
    data.append("distance", formData.distance);
    data.append("vehicle_type", formData.vehicle_type);
    data.append("price", formData.price);

    // Append array of equipment (as JSON string or individual fields, depends on backend)
    formData.equipment.forEach((id) => data.append("equipment[]", id));

    // Append images
    images.forEach((image, index) => {
      data.append(`images`, image); // adjust field name as needed
    });

    // Send FormData using fetch (or use axios with `headers: { 'Content-Type': 'multipart/form-data' }`)
    const response = await fetch("http://3.108.23.172:8002/api/vehicle/vehicle/", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Failed to add vehicle");
    }

    setShowSuccess(true);
    setFormData({
      name: "",
      vehicle_model: "",
      vehicle_share: "No",
      vehicle_number: "",
      zip_code: "",
      availability: "Available",
      gear_box: "Automatic",
      fuel: "Petrol",
      air_conditioner: "Yes",
      vehicle_seat: 2,
      distance: "",
      vehicle_type: 1,
      equipment: [],
      price: "",
    });
    setImages([]);
  } catch (err) {
    setError(err.message || "Something went wrong.");
  } finally {
    setIsLoading(false);
  }
};


  const tabs = [
    { id: "basic", label: "Basic Information", icon: Car },
    { id: "specs", label: "Specifications", icon: Settings },
    { id: "images", label: "Images", icon: ImageIcon },
  ]

  const stats = [
    { label: "Total Vehicles", value: "24", change: "+2 this month", color: "text-orange-600" },
    { label: "Active Bookings", value: "18", change: "+5 today", color: "text-green-600" },
    { label: "Revenue", value: "$12,450", change: "+15% this month", color: "text-blue-600" },
  ]

  const equipmentOptions = [
    { id: 1, name: "GPS Navigation" },
    { id: 2, name: "Bluetooth" },
    { id: 3, name: "Backup Camera" },
    { id: 4, name: "Sunroof" },
    { id: 5, name: "Leather Seats" },
    { id: 6, name: "Heated Seats" },
  ]

  return (

      <div className="min-h-screen bg-gray-50">
       
        <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:h-full bg-[white] overflow-hidden">

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

      </div>




      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back , {user.username} 👋</h1>
            <p className="text-orange-100 text-lg">Ready to add a new vehicle to your fleet?</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 rounded-full p-4">
              <Car className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border-l-4 border-green-400 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
              <div>
                <p className="text-green-800 font-semibold">Success!</p>
                <p className="text-green-700">Vehicle has been added to your fleet successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Header */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-8 py-6 border-b border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Vehicle</h2>
          <p className="text-gray-600 mt-1">Fill in the details below to add a new vehicle to your fleet</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex space-x-8 px-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 py-4 px-2 border-b-2 font-medium text-md transition-all ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600 bg-white"
                      : "border-transparent  hover:text-gray-700 hover:border-gray-300 text-black"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Basic Information Tab */}
          {activeTab === "basic" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Vehicle Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Toyota Camry"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Vehicle Model <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicle_model"
                    value={formData.vehicle_model}
                    onChange={handleChange}
                    placeholder="e.g. 2021"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Vehicle Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value={1}>SUV</option>
                    <option value={2}>Sedan</option>
                    <option value={3}>Hatchback</option>
                    <option value={4}>Truck</option>
                    <option value={5}>Coupe</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Seat Capacity <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="vehicle_seat"
                    value={formData.vehicle_seat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value={5}>5 Seats</option>
                    <option value={7}>7 Seats</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Vehicle Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicle_number"
                    value={formData.vehicle_number}
                    onChange={handleChange}
                    placeholder="e.g. AB123CD"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Zip Code <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    placeholder="e.g. 12345"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Availability <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Maintenance">Under Maintenance</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Price per Day ($) <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 2000.00"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <label className="block text-md font-semibold text-gray-700 mb-4">Vehicle Sharing</label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="vehicle_share"
                      value="Yes"
                      checked={formData.vehicle_share === "Yes"}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 text-black"
                    />
                    <span className="ml-3 text-md font-medium text-gray-700">Yes, available for sharing</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="vehicle_share"
                      value="No"
                      checked={formData.vehicle_share === "No"}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 text-black"
                    />
                    <span className="ml-3 text-md font-medium text-gray-700">No, private use only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === "specs" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Gear Box <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="gear_box"
                    value={formData.gear_box}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Fuel Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">
                    Distance (KM) <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    placeholder="e.g. 10000"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-semibold text-gray-700 mb-2">Air Conditioner</label>
                  <select
                    name="air_conditioner"
                    value={formData.air_conditioner}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <label className="block text-md font-semibold text-gray-700 mb-4">Equipment</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {equipmentOptions.map((equipment) => (
                    <label key={equipment.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.equipment.includes(equipment.id)}
                        onChange={() => handleEquipmentChange(equipment.id)}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 text-black rounded"
                      />
                      <span className="ml-3 text-md font-medium text-gray-700">{equipment.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="space-y-8">
              <div className="bg-orange-50 rounded-xl p-8 text-center">
                <ImageIcon className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => setImages(Array.from(e.target.files))}
/>

              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <div className="flex space-x-4">
              {activeTab !== "basic" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1].id)
                    }
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-black text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  ← Previous
                </button>
              )}

              {activeTab !== "images" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id)
                    }
                  }}
                  className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
                >
                  Next →
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center space-x-3 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding Vehicle...</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>Add Vehicle to Fleet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>


       <div className="bg-[#0a0c17] text-white">
        <main className="container mx-auto px-4 py-12">
          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-22 mb-16">
            {/* Left column */}
            <div>
              <h1 className="text-2xl font-bold mb-2">CatoDrive</h1>
              <p className="text-md mb-6 max-w-md">
                Exceptional and modern registration non-problem, sunt incidunt qui officia deserunt mollit anim id est.
              </p>

              <div className="space-y-3">
                <div className="flex items-center bg-[#111327] rounded-xl p-2 max-w-xs">
                  <div className="bg-transparent p-2 mr-2">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input type="text" placeholder="+XXXXXXXXX" className="bg-transparent outline-none w-full text-md" />
                </div>

                <div className="flex items-center bg-[#111327] rounded-xl p-2 max-w-xs">
                  <div className="bg-transparent p-2 mr-2">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="bg-transparent outline-none w-full text-md"
                  />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <h2 className="text-xl font-bold mb-2">Join CatoDrive</h2>
              <p className="text-md mb-6">Receive pricing updates, shopping tips & more!</p>

              <div className="space-y-3">
                <div>
                  <label htmlFor="email" className="text-xs block mb-1">
                    Your email address
                  </label>
                  <input type="email" id="email" className="w-full bg-[#111327] rounded-xl p-3 outline-none text-md" />
                </div>

                <button className="w-full bg-[#3b5bf5] hover:bg-[#2a4ae0] text-white py-3 rounded-xl transition-colors">
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
                <ul className="space-y-2 text-md">
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
                <ul className="space-y-2 text-md">
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
                <ul className="space-y-2 text-md">
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
                <ul className="space-y-2 text-md">
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
                  <Link href="#" className="flex items-center gap-2 text-md hover:text-gray-300">
                    <Apple size={20} />
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="font-medium">Apple Store</div>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-md hover:text-gray-300">
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

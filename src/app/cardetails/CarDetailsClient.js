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

  
    </div>
  )
}

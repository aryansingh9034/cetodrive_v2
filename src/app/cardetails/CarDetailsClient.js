"use client"

import Link from "next/link"
import { Phone, Mail, Apple, PlayCircle, Heart, ArrowRight, Menu, X, Fuel, Settings, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import Profile from "../../../public/Profill.png"
import Image from "next/image"

export default function Home() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const router = useRouter()

  const [vehicle, setVehicle] = useState({})
  const [reviews, setReviews] = useState([])
  const [selectedImg, setSelectedImg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://3.108.23.172:8002/api/vehicle/vehicle/${id}`)
      .then((response) => {
        const vehicleData = response.data.data;
        localStorage.removeItem("vehicle");
        localStorage.setItem("vehicle", JSON.stringify(vehicleData));
        setVehicle(vehicleData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Vehicle API Error:", error);
        setLoading(false);
      });
  }, [id]);

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
        setReviews(formattedReviews)
        setReviewsLoading(false)
      })
      .catch((error) => {
        console.error("Review Fetch Error:", error)
        setReviewsLoading(false)
      })
  }, [])
  

  const handleClick1 = () => router.push("/billing")
  const handleRentNow = () => console.log("Rent now clicked")
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const images = vehicle?.images?.map((img) => `http://143.110.242.217:8031${img.image}`) || []
  const currentImage = images[selectedImg] || "/placeholder.svg?height=350&width=690"

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
        <div className="animate-pulse text-xl text-gray-600">Loading vehicle details...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20" >
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vehicle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
              <img
                src={currentImage}
                alt="Selected Car"
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=350&width=690"
                }}
              />
              <button 
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
                onClick={() => {
                  const newFav = !vehicle.isFavorite;
                  setVehicle({...vehicle, isFavorite: newFav});
                }}
              >
                <Heart className={`w-5 h-5 ${vehicle.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImg(index)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                      selectedImg === index
                        ? "ring-2 ring-blue-500"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=120&width=160"
                      }}
                    />
                  </button>
                ))
              ) : (
                <div className="col-span-3 flex items-center justify-center h-full text-gray-500 py-8">
                  <p>No images available</p>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-xl md:text-3xl font-semibold text-gray-800 mt-2">{vehicle?.name || "N/A"}</h1>
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={4} />
                <span className="text-gray-500 text-sm">440+ reviews</span>
              </div>
            </div>

            <p className="text-4xl sm:text-xl md:text-3xl font-medium text-gray-700 mt-2">
              {vehicle?.vehicle_model
                ? `${vehicle.vehicle_model} is a premium ${vehicle.vehicle_type?.name || "vehicle"} with ${vehicle.gear_box} transmission and ${vehicle.fuel} fuel type.`
                : "Vehicle description not available."}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
              <div className="space-y-1">
                <span className="text-gray-500 text-sm">Type</span>
                <p className="font-semibold text-gray-700">{vehicle?.vehicle_type?.name || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 text-sm">Capacity</span>
                <p className="font-semibold text-gray-700">{vehicle?.vehicle_seat?.capacity || "N/A"} Person</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 text-sm">Transmission</span>
                <p className="font-semibold text-gray-700">{vehicle?.gear_box || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 text-sm">Fuel</span>
                <p className="font-semibold text-gray-700">{vehicle?.fuel || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-2xl font-bold text-gray-900">${vehicle?.price || "0"}<span className="text-gray-500 text-lg font-normal">/day</span></p>
                <p className="text-gray-400 text-sm">${Number.parseInt(vehicle?.price || "0") + 200}</p>
              </div>
              <button
                onClick={handleClick1}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
            {reviews.length > 0 && (
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all {reviews.length} reviews
              </button>
            )}
          </div>

          {reviewsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-gray-600">Loading reviews...</div>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        width={48}
                        height={48}
                        src= '/man.png'

                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-gray-500 text-sm">@{review.username}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">{review.date}</p>
                          <div className="mt-1">
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-600">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No reviews available yet</p>
            </div>
          )}
        </section>

        {/* Similar Vehicles */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Similar Vehicles</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Mercedes Sedan</h3>
                      <p className="text-gray-500 text-sm">Luxury Sedan</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="aspect-[5/3] bg-gray-100 flex items-center justify-center">
                  <img
                    src="/placeholder.svg"
                    alt="Car"
                    className="object-contain w-full h-full p-6"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      <span>90L</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="w-4 h-4" />
                      <span>Manual</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>4</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">$25<span className="text-gray-500 text-sm font-normal">/day</span></p>
                    </div>
                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
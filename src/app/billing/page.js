"use client"

import Link from "next/link"
import { Phone, Mail, Apple, PlayCircle , Heart, Star } from "lucide-react"
import Image from "next/image"
import { ArrowRight, Check, Menu, X ,  Fuel, Settings, Users , ChevronDown} from "lucide-react"
import { useState , useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import background from "../../../public/View.png"
import Img from "../../../public/ImgKe.png"
import Profile from "../../../public/Look.png"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function Component() {
   const router = useRouter();
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   const [bookingId, setBookingId] = useState(null)
   const [amount ,setamount] = useState(null)
   const [vehicle, setVehicle] = useState(null);

useEffect(() => {
  const storedVehicle = localStorage.getItem("vehicle");
  console.log(storedVehicle);
  if (storedVehicle) {
    setVehicle(JSON.parse(storedVehicle));
  }
}, []);
  const handleLogin = () => {
      router.push('/login'); // navigate to /cardetails
    };

    const handlesignup = () => {
      router.push('/signup'); // navigate to /cardetails
    };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }


  const [billingData, setBillingData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  })

  const [rentalData, setRentalData] = useState({
    rentalType: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffLocation: "",
    dropoffDate: "",
    dropoffTime: "",
    documents: null,
  })

  // UI state
  const [selectedPickupOption, setSelectedPickupOption] = useState("pickup")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  // Handle billing form changes
  const handleBillingChange = (field, value) => {
    setBillingData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle rental form changes
  const handleRentalChange = (field, value) => {
    setRentalData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }



const handlePayment = async () => {
  window.alert("✅ Payment was successful!");
  // if (!bookingId || isNaN(bookingId)) {
  //   setSubmitMessage("Booking ID is missing or invalid. Please try again.");
  //   return;
  // }

  // const numericBookingId = Number(bookingId); // Ensures it's a number

  // console.log("Sending booking ID:", numericBookingId);

  // try {
  //   const response = await axios.post(
  //     "http://3.108.23.172:8002/api/payment/create-order/",
  //     {
  //       booking_id: 21,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (response.status === 201) {
  //     setSubmitMessage("Payment successful!");
  //     window.alert("✅ Payment was successful!");
  //   } else {
  //     setSubmitMessage("Payment failed. Please try again.");
  //   }
  // } catch (error) {
  //   console.error("Payment error:", error);

  //   const backendError =
  //     error.response?.data?.error || "Error during payment. Please try again.";

  //   setSubmitMessage(backendError);
  // }
};






const handleSubmit = async () => {
  setIsSubmitting(true)
  setSubmitMessage("")

  try {
    const formData = new FormData()

    // Static values
    formData.append("customer", "1")
    formData.append("vehicle", "11")

    // Billing fields
    formData.append("name", billingData.name)
    formData.append("Phone_number", billingData.phone)
    formData.append("Address", billingData.address)
    formData.append("Town", billingData.city)

    // Rental fields
    formData.append("pick_up_location", rentalData.pickupLocation)
    formData.append("pick_up_Date", rentalData.pickupDate)
    formData.append("pick_up_time", rentalData.pickupTime)
    formData.append("Drop_off_location", rentalData.dropoffLocation)
    formData.append("drop_of_Date", rentalData.dropoffDate)
    formData.append("drop_of_time", rentalData.dropoffTime)

    // Multiple images
    if (rentalData.documents) {
      Array.from(rentalData.documents).forEach((file) => {
        formData.append("images", file) // repeated key for multiple files
      })
    }

console.log(formData)
    const response = await axios.post("http://3.108.23.172:8002/api/booking/booking/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    // Success
    setIsFormSubmitted(true)
    setSubmitMessage("Form submitted successfully! You can now proceed with payment.")
    const bookingIdFromResponse = response.data?.data?.id
    const pay = response.data?.data?.total_payment
    if (bookingIdFromResponse) {
    setBookingId(bookingIdFromResponse)
    }
    if(pay){
      setamount(pay);
    }
    console.log("Response:", response.data.data)
  } catch (error) {
    // Error handling
    console.error("Submission error:", error)
    setSubmitMessage("Error: " + (error.response?.data?.detail || "Something went wrong."))
  } finally {
    setIsSubmitting(false)
  }
}


  // Validate if form can be submitted
  const canSubmit =
    billingData.name &&
    billingData.phone &&
    billingData.address &&
    billingData.city &&
    rentalData.pickupLocation &&
    rentalData.pickupDate &&
    rentalData.pickupTime


  return (
    
    <div className="min-h-screen bg-gray-50 ">
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

      
    <div className="max-w-8xl p-12 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Billing Info */}
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Billing Info</h2>
                <p className="text-gray-500 text-sm">Please enter your billing info</p>
              </div>
              <span className="text-gray-400 text-sm">Step 1 of 4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={billingData.name}
                  onChange={(e) => handleBillingChange("name", e.target.value)}
                  disabled={isFormSubmitted}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={billingData.phone}
                  onChange={(e) => handleBillingChange("phone", e.target.value)}
                  disabled={isFormSubmitted}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={billingData.address}
                  onChange={(e) => handleBillingChange("address", e.target.value)}
                  disabled={isFormSubmitted}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Town / City</label>
                <input
                  type="text"
                  placeholder="Town or city"
                  value={billingData.city}
                  onChange={(e) => handleBillingChange("city", e.target.value)}
                  disabled={isFormSubmitted}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Rental Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Rental Info</h2>
                <p className="text-gray-500 text-sm">Please select your rental date</p>
              </div>
              <span className="text-gray-400 text-sm">Step 2 of 4</span>
            </div>

            {/* Pick-Up Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="pickup"
                  name="rental-type"
                  value="pickup"
                  checked={selectedPickupOption === "pickup"}
                  onChange={(e) => {
                    setSelectedPickupOption(e.target.value)
                    handleRentalChange("rentalType", e.target.value)
                  }}
                  disabled={isFormSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                />
                <label htmlFor="pickup" className="ml-2 text-sm font-medium text-gray-900">
                  Pick - Up
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
                  <select
                    onChange={(e) => handleRentalChange("pickupLocation", e.target.value)}
                    disabled={isFormSubmitted}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 disabled:opacity-50"
                  >
                    <option value="">Select your city</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    onChange={(e) => handleRentalChange("pickupDate", e.target.value)}
                    disabled={isFormSubmitted}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    onChange={(e) => handleRentalChange("pickupTime", e.target.value)}
                    disabled={isFormSubmitted}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Drop-Off Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="dropoff"
                  name="rental-type"
                  value="dropoff"
                  checked={selectedPickupOption === "dropoff"}
                  onChange={(e) => {
                    setSelectedPickupOption(e.target.value)
                    handleRentalChange("rentalType", e.target.value)
                  }}
                  disabled={isFormSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                />
                <label htmlFor="dropoff" className="ml-2 text-sm font-medium text-gray-900">
                  Drop - Off
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
                  <select
                    onChange={(e) => handleRentalChange("dropoffLocation", e.target.value)}
                    disabled={isFormSubmitted}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 disabled:opacity-50"
                  >
                    <option value="">Select your city</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    onChange={(e) => handleRentalChange("dropoffDate", e.target.value)}
                    disabled={isFormSubmitted}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    onChange={(e) => handleRentalChange("dropoffTime", e.target.value)}
                    disabled={isFormSubmitted}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents / ID</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleRentalChange("documents", e.target.files)}
                disabled={isFormSubmitted}
                className="block w-full text-md p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <p className="text-sm text-gray-500 mt-1">You can upload multiple images (JPG, PNG).</p>
            </div>
          </div>

          <div className="text-center">
            {submitMessage && (
              <div
                className={`mb-4 p-3 rounded-lg ${isFormSubmitted ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {submitMessage}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting || isFormSubmitted}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : isFormSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>

          {/* Payment Method */}
          <div
            className={`bg-white text-black rounded-lg p-6 shadow-sm ${!isFormSubmitted ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                <p className="text-gray-500 text-sm">Please enter your payment method</p>
                {!isFormSubmitted && (
                  <p className="text-orange-500 text-sm mt-1">Complete the form above to enable payment options</p>
                )}
              </div>
              <span className="text-gray-400 text-sm">Step 3 of 4</span>
            </div>

            {/* Credit Card Option */}
            {/* <div className="mb-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-method"
                    value="credit-card"
                    checked={selectedPaymentMethod === "credit-card"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    disabled={!isFormSubmitted}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <label htmlFor="credit-card" className="ml-2 text-sm font-medium text-gray-900">
                    Credit Card
                  </label>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                </div>
              </div>

              {selectedPaymentMethod === "credit-card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="Card number"
                      disabled={!isFormSubmitted}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                    <input
                      type="text"
                      placeholder="DD / MM / YY"
                      disabled={!isFormSubmitted}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
                    <input
                      type="text"
                      placeholder="Card holder"
                      disabled={!isFormSubmitted}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      placeholder="CVC"
                      disabled={!isFormSubmitted}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>
              )}
            </div> */}

            {/* PayPal Option */}
            {/* <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="payment-method"
                  value="paypal"
                  checked={selectedPaymentMethod === "paypal"}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  disabled={!isFormSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                />
                <label htmlFor="paypal" className="ml-2 text-sm font-medium text-gray-900">
                  PayPal
                </label>
              </div>
              <div className="text-blue-600 font-bold text-lg">PayPal</div>
            </div> */}

           <div className="flex items-center w-full justify-center p-4 border border-gray-200 rounded-lg">
  <div className="flex items-center gap-2">
    <label>Amount to be paid</label>:
<input
  type="number"
  value={amount ?? ""}
  className="border border-gray-300 rounded px-2 py-1"
/>
  </div>
</div>

            <div className="text-center mt-6">

               <button
              onClick={handlePayment}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : isFormSubmitted ? "Submitted" : "Submit"}
            </button>
            </div>
            
          </div>

          {/* Confirmation */}
          <div
            className={`bg-white rounded-lg p-6 shadow-sm ${!isFormSubmitted ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Confirmation</h2>
                <p className="text-gray-500 text-sm">
                  We are getting to the end. Just few clicks and your rental is ready!
                </p>
              </div>
              <span className="text-gray-400 text-sm">Step 4 of 4</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="marketing"
                  disabled={!isFormSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 disabled:opacity-50"
                />
                <label htmlFor="marketing" className="ml-3 text-sm text-gray-700">
                  I agree with sending an Marketing and newsletter emails. No spam, promised!
                </label>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  disabled={!isFormSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 disabled:opacity-50"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I agree with our terms and conditions and privacy policy.
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={!isFormSubmitted}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rent Now
              </button>
              <button
                disabled={!isFormSubmitted}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rent as a Guest
              </button>
            </div>

            <div className="mt-6 flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <div>
                <div className="font-medium">All your data are safe</div>
                <div className="text-xs text-gray-500">
                  We are using the most advanced security to provide you the best experience ever.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Summary Sidebar */}
       <div className="lg:col-span-1">
  <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Rental Summary</h3>
    <p className="text-gray-500 text-sm mb-6">
      Prices may change depending on the length of the rental and the price of your rental car.
    </p>

    {/* Car Info */}
    {vehicle && (
      <div className="flex items-center mb-6">
        <div className="w-24 h-16 rounded-lg mr-4 flex items-center justify-center">
          <img
            src={`http://143.110.242.217:8031${vehicle.images?.[0]?.image || "/placeholder.svg"}`}
            alt={vehicle.name}
            width={88}
            height={48}
            className="rounded"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">
              <span>★★★★</span>
              <span className="text-gray-300">★</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">440+ Reviewer</span>
          </div>
        </div>
      </div>
    )}

    <div className="border-t pt-4 space-y-3">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${vehicle?.price || '0'}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Tax</span>
        <span>$0</span>
      </div>
    </div>

    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <input
        type="text"
        placeholder="Apply promo code"
        className="w-full bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400"
      />
      <button className="text-sm font-medium text-gray-900 mt-2">Apply now</button>
    </div>

    <div className="mt-6 pt-4 border-t">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-gray-900">Total Rental Price</div>
          <div className="text-sm text-gray-500">Overall price and includes rental discount</div>
        </div>
        <div className="text-2xl font-bold text-gray-900">${vehicle?.price || '0'}</div>
      </div>
    </div>
  </div>
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

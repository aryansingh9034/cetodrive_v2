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

            
             <div className="mb-6">
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
            </div> 

           
             <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
            </div> 

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


    </div>
  )
}

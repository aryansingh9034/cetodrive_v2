"use client"

import { Phone, Mail, Apple, PlayCircle, Heart, Star, ArrowRight, Check, Menu, X, Fuel, Settings, Users, ChevronDown, ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingId, setBookingId] = useState(null)
  const [amount, setAmount] = useState(null)
  const [vehicle, setVehicle] = useState({
  })
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

  const [paymentData, setPaymentData] = useState({
    method: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    cvc: "",
  })

  const [confirmationData, setConfirmationData] = useState({
    marketing: false,
    terms: false,
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
    window.alert("✅ Payment was successful!")
    setIsFormSubmitted(true)
    setCurrentStep(4)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsFormSubmitted(true)
      setSubmitMessage("Form submitted successfully! You can now proceed with payment.")
      setBookingId(12345)
      setAmount(vehicle.price)
      setCurrentStep(3)
    } catch (error) {
      setSubmitMessage("Error: Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step validation
  const isStep1Valid = billingData.name && billingData.phone && billingData.address && billingData.city
  const isStep2Valid = rentalData.pickupLocation && rentalData.pickupDate && rentalData.pickupTime
  const isStep3Valid = selectedPaymentMethod === "paypal" || (paymentData.cardNumber && paymentData.expiryDate && paymentData.cardHolder && paymentData.cvc)
  const isStep4Valid = confirmationData.terms

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return isStep1Valid
      case 2: return isStep2Valid
      case 3: return isStep3Valid
      case 4: return isStep4Valid
      default: return false
    }
  }

  const nextStep = () => {
    if (currentStep < 4 && canProceedToNext()) {
      if (currentStep === 2) {
        handleSubmit()
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Billing Info"
      case 2: return "Rental Info"
      case 3: return "Payment Method"
      case 4: return "Confirmation"
      default: return ""
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Please enter your billing info"
      case 2: return "Please select your rental date"
      case 3: return "Please enter your payment method"
      case 4: return "We are getting to the end. Just few clicks and your rental is ready!"
      default: return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-8xl p-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step Progress Indicator */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === currentStep ? 'bg-blue-600 text-white' :
                      step < currentStep ? 'bg-green-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {step < currentStep ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
                <p className="text-gray-500 text-sm">{getStepDescription()}</p>
                <span className="text-gray-400 text-sm">Step {currentStep} of 4</span>
              </div>
            </div>

            {/* Step 1: Billing Info */}
            {currentStep === 1 && (
              <div className="bg-white text-black rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={billingData.name}
                      onChange={(e) => handleBillingChange("name", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={billingData.phone}
                      onChange={(e) => handleBillingChange("phone", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      value={billingData.address}
                      onChange={(e) => handleBillingChange("address", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Town / City</label>
                    <input
                      type="text"
                      placeholder="Town or city"
                      value={billingData.city}
                      onChange={(e) => handleBillingChange("city", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Rental Info */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
                {/* Pick-Up Section */}
                <div>
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
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        onChange={(e) => handleRentalChange("pickupTime", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Drop-Off Section */}
                <div>
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
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        onChange={(e) => handleRentalChange("dropoffTime", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents / ID</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleRentalChange("documents", e.target.files)}
                    className="block w-full text-md p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">You can upload multiple images (JPG, PNG).</p>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-white text-black rounded-lg p-6 shadow-sm">
                {submitMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
                    {submitMessage}
                  </div>
                )}

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
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="Card number"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                        <input
                          type="text"
                          placeholder="DD / MM / YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
                        <input
                          type="text"
                          placeholder="Card holder"
                          value={paymentData.cardHolder}
                          onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="CVC"
                          value={paymentData.cvc}
                          onChange={(e) => setPaymentData({...paymentData, cvc: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment-method"
                        value="paypal"
                        checked={selectedPaymentMethod === "paypal"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                </div>

                <div className="text-center">
                  <button
                    onClick={handlePayment}
                    disabled={!isStep3Valid}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Process Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
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

            </div>

                <div className="flex items-center text-sm text-gray-600">
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
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              {currentStep < 4 && (
                <button
                  onClick={nextStep}
                  disabled={!canProceedToNext() || isSubmitting}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  {isSubmitting ? "Processing..." : "Next"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </button>
              )}
            </div>
          </div>

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

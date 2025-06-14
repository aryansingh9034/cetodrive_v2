"use client"

import { Phone, Mail, Apple, PlayCircle, Heart, Star, ArrowRight, Check, Menu, X, Fuel, Settings, Users, ChevronDown, ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"

export default function Billing() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingId, setBookingId] = useState(null)
  const [amount, setAmount] = useState(null)
  const [vehicle, setVehicle] = useState({})
  const [showPopup, setShowPopup] = useState(false);
  const [showIdUploadPopup, setShowIdUploadPopup] = useState(false);
  const [idFiles, setIdFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleRentNowClick = () => {
    if (isFormSubmitted && confirmationData.terms) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // After closing confirmation popup, show ID upload popup
    setShowIdUploadPopup(true);
  };

  const handleIdUpload = (e) => {
    const files = Array.from(e.target.files);
    setIdFiles(files);
  };

  const removeIdFile = (index) => {
    const newFiles = [...idFiles];
    newFiles.splice(index, 1);
    setIdFiles(newFiles);
  };

  const submitIdFiles = () => {
    // Handle ID file submission here
    console.log("ID files submitted:", idFiles);
    setShowIdUploadPopup(false);
    // You might want to add a success message or redirect here
  };

  const closeIdUploadPopup = () => {
    setShowIdUploadPopup(false);
  };
  
  useEffect(() => {
    const storedVehicle = localStorage.getItem("vehicle");
    console.log(storedVehicle);
    if (storedVehicle) {
      setVehicle(JSON.parse(storedVehicle));
    }
  }, []);

  const [billingData, setBillingData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  })

  const [rentalData, setRentalData] = useState({
    rentalType: "",
    pickupCity: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffCity: "",
    dropoffLocation: "",
    dropoffDate: "",
    dropoffTime: "",
    flightNumber: "",
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
  const [pickupCompleted, setPickupCompleted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  

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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles(files)
    handleRentalChange("documents", files)
  }

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)
    handleRentalChange("documents", newFiles)
  }

  const completePickup = () => {
    if (rentalData.pickupLocation && rentalData.pickupDate && rentalData.pickupTime) {
      setPickupCompleted(true)
    }
  }

  // Step validation
  const isStep1Valid = billingData.name && billingData.phone && billingData.email && billingData.address && billingData.city
  const isStep2Valid = pickupCompleted && (
    rentalData.dropoffCity && rentalData.dropoffLocation && 
    rentalData.dropoffDate && rentalData.dropoffTime
  )
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
  // Helper function to add minutes to a time string (format "HH:MM")
const addMinutesToTime = (timeString, minutesToAdd) => {
  if (!timeString) return "00:00";
  
  let [hours, minutes] = timeString.split(':').map(Number);
  minutes += minutesToAdd;
  hours += Math.floor(minutes / 60);
  minutes = minutes % 60;
  hours = hours % 24;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={billingData.email}
                      onChange={(e) => handleBillingChange("email", e.target.value)}
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Pick-Up Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select
            value={rentalData.pickupCity || ""}
            onChange={(e) => {
              handleRentalChange("pickupCity", e.target.value);
              handleRentalChange("pickupLocation", "");
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            required
          >
            <option value="">Select city</option>
            <option value="dallas">Dallas</option>
          </select>
        </div>
        
        {/* Location Selector */}
        {rentalData.pickupCity && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location in {rentalData.pickupCity}</label>
            <select
              value={rentalData.pickupLocation}
              onChange={(e) => handleRentalChange("pickupLocation", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
              required
            >
              <option value="">Select location</option>
              <option value="dfw-airport">DFW International Airport</option>
              <option value="love-field">Dallas Love Field Airport</option>
            </select>
          </div>
        )}
        
        {/* Pickup Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
          <input
            type="date"
            value={rentalData.pickupDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              const today = new Date().toISOString().split('T')[0];
              const currentTime = new Date().toTimeString().substring(0, 5);
              const isToday = e.target.value === today;
              
              handleRentalChange("pickupDate", e.target.value);
              
              // Reset time if switching to today and current time is later
              if (isToday && rentalData.pickupTime && rentalData.pickupTime < currentTime) {
                handleRentalChange("pickupTime", currentTime);
              }
              
              // Adjust dropoff if same day
              if (rentalData.dropoffDate === e.target.value) {
                const pickupTime = rentalData.pickupTime || (isToday ? currentTime : "12:00");
                const minDropoffTime = addMinutesToTime(pickupTime, 15);
                
                if (!rentalData.dropoffTime || rentalData.dropoffTime <= pickupTime) {
                  handleRentalChange("dropoffTime", minDropoffTime);
                }
              }
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            required
          />
        </div>
        
        {/* Pickup Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
          <input
            type="time"
            value={rentalData.pickupTime}
            min={
              rentalData.pickupDate === new Date().toISOString().split('T')[0]
                ? new Date().toTimeString().substring(0, 5)
                : "00:00"
            }
            onChange={(e) => {
              const today = new Date().toISOString().split('T')[0];
              const currentTime = new Date().toTimeString().substring(0, 5);
              const isToday = rentalData.pickupDate === today;
              const newTime = isToday && e.target.value < currentTime ? currentTime : e.target.value;
              
              handleRentalChange("pickupTime", newTime);
              
              // Adjust dropoff if same day
              if (rentalData.pickupDate === rentalData.dropoffDate) {
                const minDropoffTime = addMinutesToTime(newTime, 15);
                if (!rentalData.dropoffTime || rentalData.dropoffTime <= newTime) {
                  handleRentalChange("dropoffTime", minDropoffTime);
                }
              }
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            required
          />
        </div>
      </div>
      
      {!pickupCompleted && (
        <div className="flex justify-end">
          <button
            onClick={completePickup}
            disabled={!rentalData.pickupCity || !rentalData.pickupLocation || !rentalData.pickupDate || !rentalData.pickupTime}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Pickup
          </button>
        </div>
      )}
    </div>

    {/* Drop-Off Section */}
    {pickupCompleted && (
      <>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Drop-Off Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dropoff City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={rentalData.dropoffCity || ""}
                onChange={(e) => {
                  handleRentalChange("dropoffCity", e.target.value);
                  handleRentalChange("dropoffLocation", "");
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                required
              >
                <option value="">Select city</option>
                <option value="dallas">Dallas</option>
              </select>
            </div>
            
            {/* Dropoff Location */}
            {rentalData.dropoffCity && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location in {rentalData.dropoffCity}</label>
                <select
                  value={rentalData.dropoffLocation}
                  onChange={(e) => handleRentalChange("dropoffLocation", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                  required
                >
                  <option value="">Select location</option>
                  <option value="dfw-airport">DFW International Airport</option>
                  <option value="love-field">Dallas Love Field Airport</option>
                  <option value="dallas-downtown">Downtown Dallas</option>
                  <option value="uptown">Uptown Dallas</option>
                </select>
              </div>
            )}
            
            {/* Dropoff Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dropoff Date</label>
              <input
                type="date"
                min={rentalData.pickupDate}
                value={rentalData.dropoffDate}
                onChange={(e) => {
                  const isSameDay = e.target.value === rentalData.pickupDate;
                  handleRentalChange("dropoffDate", e.target.value);
                  
                  if (isSameDay) {
                    const pickupTime = rentalData.pickupTime || "12:00";
                    const minDropoffTime = addMinutesToTime(pickupTime, 15);
                    
                    if (!rentalData.dropoffTime || rentalData.dropoffTime <= pickupTime) {
                      handleRentalChange("dropoffTime", minDropoffTime);
                    }
                  }
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                required
              />
            </div>
            
            {/* Dropoff Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dropoff Time</label>
              <input
                type="time"
                value={rentalData.dropoffTime}
                min={
                  rentalData.dropoffDate === rentalData.pickupDate
                    ? addMinutesToTime(rentalData.pickupTime || "12:00", 15)
                    : "00:00"
                }
                onChange={(e) => {
                  const newTime = e.target.value;
                  const isSameDay = rentalData.dropoffDate === rentalData.pickupDate;
                  
                  if (isSameDay) {
                    const pickupTime = rentalData.pickupTime || "12:00";
                    const minDropoffTime = addMinutesToTime(pickupTime, 15);
                    
                    if (newTime <= pickupTime) {
                      handleRentalChange("dropoffTime", minDropoffTime);
                    } else {
                      handleRentalChange("dropoffTime", newTime);
                    }
                  } else {
                    handleRentalChange("dropoffTime", newTime);
                  }
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Flight Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Flight Information (Optional)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number</label>
            <input
              type="text"
              placeholder="Enter your flight number (optional)"
              value={rentalData.flightNumber || ""}
              onChange={(e) => handleRentalChange("flightNumber", e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </>
    )}
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

    {errorMessage && (
      <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
        {errorMessage}
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
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setErrorMessage(''); // Clear error when switching methods
            }}
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
              onChange={(e) => {
                // Remove all non-digit characters and limit to 16 digits
                const value = e.target.value.replace(/\D/g, '').substr(0, 16);
                setPaymentData({...paymentData, cardNumber: value});
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {paymentData.cardNumber && paymentData.cardNumber.length !== 16 && (
              <p className="text-red-500 text-xs mt-1">Card number must be 16 digits</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                  value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                setPaymentData({ ...paymentData, expiryDate: value });
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {paymentData.expiryDate && !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate) && (
              <p className="text-red-500 text-xs mt-1">Format: MM/YY</p>
            )}
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
            {paymentData.cardHolder && paymentData.cardHolder.trim().length < 2 && (
              <p className="text-red-500 text-xs mt-1">Enter valid name</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
            <input
              type="text"
              placeholder="CVC"
              value={paymentData.cvc}
              onChange={(e) => {
                // Remove all non-digit characters and limit to 3 or 4 digits
                const value = e.target.value.replace(/\D/g, '').substr(0, 4);
                setPaymentData({...paymentData, cvc: value});
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {paymentData.cvc && (paymentData.cvc.length < 3 || paymentData.cvc.length > 4) && (
              <p className="text-red-500 text-xs mt-1">CVC must be 3-4 digits</p>
            )}
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
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
              setErrorMessage(''); // Clear error when switching methods
            }}
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
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value > 0) {
                setAmount(value);
              } else {
                setAmount(0);
              }
            }}
            min="0.01"
            step="0.01"
            className="border border-gray-300 rounded px-2 py-1 w-24"
          />
        </div>
      </div>
    </div>

    <div className="text-center">
      <button
        onClick={() => {
          // Validate based on payment method
          if (selectedPaymentMethod === "credit-card") {
            // Validate credit card details
            if (!paymentData.cardNumber || paymentData.cardNumber.length !== 16) {
              setErrorMessage('Please enter a valid 16-digit card number');
              return;
            }
            if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
              setErrorMessage('Please enter a valid expiration date (MM/YY)');
              return;
            }
            if (!paymentData.cardHolder || paymentData.cardHolder.trim().length < 2) {
              setErrorMessage('Please enter the card holder name');
              return;
            }
            if (!paymentData.cvc || paymentData.cvc.length < 3 || paymentData.cvc.length > 4) {
              setErrorMessage('Please enter a valid CVC (3-4 digits)');
              return;
            }
          }
          
          // Validate amount for both methods
          if (!amount || amount <= 0) {
            setErrorMessage('Please enter a valid payment amount');
            return;
          }

          // If all validations pass, proceed with payment
          handlePayment();
        }}
        className="px-6 py-3 bg-orange-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600"
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
                      checked={confirmationData.marketing}
                      onChange={(e) => setConfirmationData({...confirmationData, marketing: e.target.checked})}
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
                      checked={confirmationData.terms}
                      onChange={(e) => setConfirmationData({...confirmationData, terms: e.target.checked})}
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
                    disabled={!isFormSubmitted || !confirmationData.terms}
                    onClick={handleRentNowClick}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Rent Now
                  </button>
                </div>

                {/* Confirmation Popup */}
                {showPopup && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-xl max-w-md w-full text-center">
                      <div className="mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Confirmed!</h2>
                      
                      <p className="text-gray-600 mb-5">
                        Thank you for your booking! We have sent the confirmation details to your email address. 
                        Get ready to enjoy your ride - we hope you have an amazing experience!
                      </p>
                      
                      <p className="text-sm text-gray-500 mb-6">
                        Need help? Contact our support team at support@catodrive.com
                      </p>
                      
                      <button 
                        onClick={closePopup}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
                      >
                        Got it!
                      </button>
                      
                      <div className="mt-4 text-xs text-gray-400">
                        <p>Your booking reference: #{(Math.random() * 1000000).toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ID Upload Popup */}
                {showIdUploadPopup && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-xl max-w-md w-full">
                      <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your ID</h2>
                        <p className="text-gray-600">Please upload a clear photo of your drivers license or government-issued ID</p>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Upload ID Document
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 5MB)</p>
                            </div>
                            <input 
                              id="dropzone-file" 
                              type="file" 
                              className="hidden" 
                              onChange={handleIdUpload}
                              accept="image/*,.pdf"
                              multiple
                            />
                          </label>
                        </div>
                      </div>
                      
                      {/* Display uploaded files */}
                      {idFiles.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h3>
                          <ul className="space-y-2">
                            {idFiles.map((file, index) => (
                              <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm text-gray-600 truncate max-w-xs">{file.name}</span>
                                <button 
                                  onClick={() => removeIdFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-4">
                        <button
                          onClick={closeIdUploadPopup}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Skip for Now
                        </button>
                        <button
                          onClick={submitIdFiles}
                          disabled={idFiles.length === 0}
                          className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                            idFiles.length > 0 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-blue-400 cursor-not-allowed'
                          }`}
                        >
                          Submit ID
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600 mt-6">
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

          {/* Summary Sidebar */}
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

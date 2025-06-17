"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Phone, Mail, Star } from "lucide-react"
import Modal from 'react-modal'
import { useSession } from "next-auth/react" 
import LoginModal from '@/app/loginmodal/page'



// Add these styles for the modal
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: '0 auto',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    maxHeight: '90vh',
    overflow: 'auto',
  }
};

// City to locations mapping
const cityLocations = {
  "Dallas": {
    pickup: [
      "Dallas/Fort Worth International Airport (DFW)",
      "Dallas Love Field (DAL)"
    ],
    dropoff: [
      // Major commercial airports
      "Dallas/Fort Worth International Airport (DFW)",
      "Dallas Love Field (DAL)",
      // Reliever & municipal airports
      "Addison Airport (ADS)",
      "Dallas Executive Airport (RBD)",
      "Arlington Municipal Airport (GKY)",
      "Grand Prairie Municipal Airport (GPM)",
      "Lancaster Regional Airport (LNC)",
      "Mesquite Metro Airport (HQZ)",
      "Fort Worth Alliance Airport (AFW)",
      "Fort Worth Meacham International Airport (FTW)",
      "Denton Enterprise Airport (DTO)",
      "Mid‑Way Regional Airport (JWY)",
      "Caddo Mills Municipal Airport (7F3)",
      "Commerce Municipal Airport (2F7)",
      "Ennis Municipal Airport (F41)",
      "Ferris Red Oak Municipal Heliport (12T)",
      "Garland/DFW Heloplex (T57)",
      "DeSoto Heliport (73T)",
      "Dallas CBD Vertiport (JDB)",
      // Smaller public-use airports
      "Majors Airport – Greenville (GVT)",
      "McKinney National Airport (TKI)",
      "Northwest Regional Airport (52F)",
      "Parker County Airport (WEA)",
      "Rhome Meadows Airport (T76)",
      "Bourland Field (50F)",
      "Air Park–Dallas (F69)"
    ]
  },
  // Add other cities similarly if needed
};


export default function CarRentalForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [vehicle, setVehicle] = useState(null)
  const [bookingId, setBookingId] = useState(null)
  const [amount, setAmount] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isDocUploadOpen, setIsDocUploadOpen] = useState(false)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState(null)
  const [availableLocations, setAvailableLocations] = useState([])
    const [customerId, setCustomerId] = useState(
  // Initialize with value from localStorage
  typeof window !== 'undefined' ? localStorage.getItem('customerId') : null
);
    const [showLoginModal, setShowLoginModal] = useState(false);
const [pendingBookingData, setPendingBookingData] = useState(null);
    const { data: session } = useSession()
 useEffect(() => {
    // This ensures the DOM is loaded before setting the app element
    Modal.setAppElement('#root');
  }, []);

  // Form data states
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })

  const [rentalData, setRentalData] = useState({
    rentalType: "pickup",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
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
    cvc: ""
  })

  // UI states
  const [agreements, setAgreements] = useState({
    marketing: false,
    terms: false
  })

  const [availablePickupLocations, setAvailablePickupLocations] = useState([]);
const [availableDropoffLocations, setAvailableDropoffLocations] = useState([]);

const handleLoginSuccess = () => {
  // After successful login, customerId will be available in localStorage
  const storedCustomerId = localStorage.getItem('customerId');
  setCustomerId(storedCustomerId);
  
  // If there was pending booking data, submit it
  if (pendingBookingData) {
    // You might want to restore the form state here
    setBillingData(pendingBookingData.billingData);
    setRentalData(pendingBookingData.rentalData);
    setVehicle(pendingBookingData.vehicle);
    
    // Then trigger the submission again
    // You might want to add a slight delay to ensure state updates
    setTimeout(() => {
      handleSubmit();
    }, 100);
  }
  
  setPendingBookingData(null);
};

// Update available locations when city changes
useEffect(() => {
  if (billingData.city && cityLocations[billingData.city]) {
    setAvailablePickupLocations(cityLocations[billingData.city].pickup);
    setAvailableDropoffLocations(cityLocations[billingData.city].dropoff);
  } else {
    setAvailablePickupLocations([]);
    setAvailableDropoffLocations([]);
  }
}, [billingData.city]);

  useEffect(() => {
    // Load vehicle from localStorage
    const storedVehicle = localStorage.getItem("vehicle")
    if (storedVehicle) {
      setVehicle(JSON.parse(storedVehicle))
    }

    // Get customer ID from NextAuth session
    if (session?.user?.id) {
      setCustomerId(session.user.id)
    } else {
      // Fallback to localStorage if not using NextAuth
      const storedCustomerId = localStorage.getItem('customerId')
      if (storedCustomerId) {
        setCustomerId(storedCustomerId)
      }
    }
  }, [session])

  // Update available locations when city changes
  useEffect(() => {
    if (billingData.city && cityLocations[billingData.city]) {
      setAvailableLocations(cityLocations[billingData.city])
    } else {
      setAvailableLocations([])
    }
  }, [billingData.city])

  // Handle form field changes
const handleBillingChange = (field, value) => {
  setBillingData(prev => ({ ...prev, [field]: value }));
  
  // Reset locations when city changes
  if (field === "city") {
    setRentalData(prev => ({
      ...prev,
      pickupLocation: "",
      dropoffLocation: ""
    }));
  }
}

  const handleRentalChange = (field, value) => {
    setRentalData(prev => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
  }

  // Step validation functions
  const validateStep1 = () => {
    return billingData.name && billingData.email && billingData.phone && billingData.address && billingData.city
  }

  const validateStep2 = () => {
    return rentalData.pickupLocation && rentalData.pickupDate && rentalData.pickupTime
  }

  const validateStep3 = () => {
    if (paymentData.method === "credit-card") {
      return paymentData.cardNumber && paymentData.expiryDate && paymentData.cardHolder && paymentData.cvc
    }
    return true
  }

  useEffect(() => {
    // Method 1: From localStorage (temporary solution)
    const storedCustomerId = localStorage.getItem('customerId')
    if (storedCustomerId) {
      setCustomerId(storedCustomerId)
    }

    // // Method 2: From your auth system (recommended)
    //  const user = authService.getCurrentUser()
    //  if (user) setCustomerId(user.id)
  }, [])

  // Form submission
  const handleSubmit = async () => {
      if (!customerId) {
    // Save form state before showing login modal
    setPendingBookingData({
      billingData,
      rentalData,
      vehicle
    });
    setShowLoginModal(true);
    return;
  }
    if (currentStep === 1 && !validateStep1()) {
      setSubmitMessage("Please fill all billing information")
      return
    }

    if (currentStep === 2 && !validateStep2()) {
      setSubmitMessage("Please fill all rental information")
      return
    }

    if (currentStep === 2) {
      setIsSubmitting(true)
      try {
 const formData = new FormData()
        formData.append("customer", customerId) // Use the dynamic customerId
        formData.append("vehicle", vehicle?.id || "") // Use actual vehicle ID
        formData.append("total_payment", calculateTotalPrice().toString());
        // Append billing data
        formData.append("name", billingData.name)
        formData.append("email", billingData.email)
        formData.append("Phone_number", billingData.phone)
        formData.append("Address", billingData.address)
        formData.append("Town", billingData.city)
        
        // Append rental data
        formData.append("pick_up_location", rentalData.pickupLocation)
        formData.append("pick_up_Date", rentalData.pickupDate)
        formData.append("pick_up_time", rentalData.pickupTime)
        formData.append("Drop_off_location", rentalData.dropoffLocation)
        formData.append("drop_of_Date", rentalData.dropoffDate)
        formData.append("drop_of_time", rentalData.dropoffTime)
        formData.append("flight_number", rentalData.flightNumber)

        const response = await axios.post(
          "http://3.108.23.172:8002/api/booking/booking/", 
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        
        setBookingId(response.data?.data?.id)
        setAmount(response.data?.data?.total_payment)
        setCurrentStep(3)
        setSubmitMessage("Form submitted successfully! Proceed to payment.")
      }catch (error) {
        console.error("Submission error:", error)
        setSubmitMessage("Error: " + (error.response?.data?.detail || "Something went wrong."))
      } finally {
        setIsSubmitting(false)
      }
    } else if (currentStep === 3) {
      // Handle payment submission
      setIsSubmitting(true)
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500))
        setCurrentStep(4)
        setSubmitMessage("Payment successful! Complete your rental.")
      } catch (error) {
        setSubmitMessage("Payment failed. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  // Navigation
  const goToPreviousStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1))
  }

  // Complete rental
  const completeRental = () => {
    setIsDocUploadOpen(true)
  }

  // Handle document upload
const handleDocUpload = async () => {
  if (!uploadedDocs || uploadedDocs.length === 0) {
    setSubmitMessage("Please upload at least one document");
    return;
  }

  setIsSubmitting(true);
  try {
    const formData = new FormData();
    
    // Required fields from API response
    formData.append("customer", customerId) // Replace with actual customer ID from your auth system
    formData.append("payment", "1"); // Replace with payment ID from booking response
    formData.append("booking", bookingId.toString());
    
    // Add customer email to ensure notification
    formData.append("customer_email", billingData.email);
    
    // Add document files - field name must match API expectations
    Array.from(uploadedDocs).forEach((file) => {
      formData.append("licence_images", file); // Using plural form as per API
    });

    // Debug: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(
      "http://3.108.23.172:8002/api/licence/licence/", 
      formData,
      { 
        headers: { 
          "Content-Type": "multipart/form-data",
        } 
      }
    );

    console.log("Full API response:", response.data);
    
    if (response.data.email_sent) {
      console.log("Email notification was sent successfully");
    } else {
      console.warn("API didn't send email despite successful upload");
    }

    setIsDocUploadOpen(false);
    setIsThankYouOpen(true);
    
  } catch (error) {
    console.error("Upload error details:", {
      error: error,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });

    let errorMessage = "Document upload failed";
    if (error.response?.data?.message) {
      errorMessage += `: ${error.response.data.message}`;
    } else if (error.response?.data) {
      errorMessage += `: ${JSON.stringify(error.response.data)}`;
    } else {
      errorMessage += `: ${error.message}`;
    }

    setSubmitMessage(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  // Close thank you modal and redirect
  const closeThankYouModal = () => {
    setIsThankYouOpen(false)
    console.log("Redirecting to confirmation with booking ID:", bookingId);
router.push(`/confirmation/${bookingId}`);// Use backticks for template literal
  }

  // Add these helper functions at the top of your component
const isFutureDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day
  const selectedDate = new Date(dateString);
  return selectedDate >= today;
};

const calculateRentalDays = () => {
  if (!rentalData.pickupDate || !rentalData.dropoffDate) return 0;
  
  const startDate = new Date(rentalData.pickupDate);
  const endDate = new Date(rentalData.dropoffDate);
  
  // Calculate difference in milliseconds
  const diffTime = endDate - startDate;
  
  // Convert to days and round up (to count partial days as full days)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Minimum rental period is 1 day
  return Math.max(1, diffDays);
};

// Add this function to calculate the total price
const calculateTotalPrice = () => {
  if (!vehicle?.price) return 0;
  
  const rentalDays = calculateRentalDays();
  return vehicle.price * rentalDays;
};

const isFutureDateTime = (dateString, timeString) => {
  const now = new Date();
  const selectedDate = new Date(dateString);
  
  // If date is today, check time
  if (selectedDate.toDateString() === now.toDateString()) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);
    return selectedTime >= now;
  }
  
  return isFutureDate(dateString);
};

  return (
    <div className="min-h-screen bg-gray-50 py-24" id="root">
      <div className="max-w-8xl p-4 md:p-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Indicator */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4].map(step => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                      {step}
                    </div>
                    <span className="text-xs mt-1 text-gray-500">
                      {step === 1 ? "Billing" : step === 2 ? "Rental" : step === 3 ? "Payment" : "Confirm"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Billing Info */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
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
                      className="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={billingData.email}
                      onChange={(e) => handleBillingChange("email", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={billingData.phone}
                      onChange={(e) => handleBillingChange("phone", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      value={billingData.address}
                      onChange={(e) => handleBillingChange("address", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={billingData.city}
                      onChange={(e) => handleBillingChange("city", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      list="cityOptions"
                    />
                    <datalist id="cityOptions">
                      {Object.keys(cityLocations).map(city => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>
            )}
    <LoginModal
      show={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      onLoginSuccess={handleLoginSuccess}
    />
            {/* Step 2: Rental Info */}
{currentStep === 2 && (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Rental Info</h2>
        <p className="text-gray-500 text-sm">Please select your rental details</p>
      </div>
      <span className="text-gray-400 text-sm">Step 2 of 4</span>
    </div>

    {/* Pickup Section - Always Visible */}
    <div className="mb-8">
      <div className="flex items-center mb-4">
       
        <label htmlFor="pickup" className="ml-2 text-lg font-bold text-gray-900">
          Pick - Up
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pickup Location */}
        {/* Pickup Location Select */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
  <select
    value={rentalData.pickupLocation}
    onChange={(e) => handleRentalChange("pickupLocation", e.target.value)}
    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={!billingData.city}
  >
    <option value="">Select pickup location</option>
    {availablePickupLocations.map(location => (
      <option key={location} value={location}>{location}</option>
    ))}
  </select>
  {!billingData.city && (
    <p className="text-xs text-red-500 mt-1">Please select a city first</p>
  )}
</div>
        
        {/* Pickup Date */}
      {/* Pickup Date Input */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
  <input
    type="date"
    value={rentalData.pickupDate}
    onChange={(e) => {
      if (isFutureDate(e.target.value)) {
        handleRentalChange("pickupDate", e.target.value);
      }
    }}
    min={new Date().toISOString().split('T')[0]} // Set min to today
    className="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {rentalData.pickupDate && !isFutureDate(rentalData.pickupDate) && (
    <p className="text-xs text-red-500 mt-1">Please select a future date</p>
  )}
</div>

{/* Pickup Time Input */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
  <input
    type="time"
    value={rentalData.pickupTime}
    onChange={(e) => {
      if (rentalData.pickupDate) {
        if (isFutureDateTime(rentalData.pickupDate, e.target.value)) {
          handleRentalChange("pickupTime", e.target.value);
        }
      } else {
        handleRentalChange("pickupTime", e.target.value);
      }
    }}
    className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {rentalData.pickupTime && rentalData.pickupDate && 
   !isFutureDateTime(rentalData.pickupDate, rentalData.pickupTime) && (
    <p className="text-xs text-red-500 mt-1">Please select a future time</p>
  )}
</div>
      </div>
    </div>

    {/* Dropoff Section - Only shows after pickup is complete */}
    {rentalData.pickupLocation && rentalData.pickupDate && rentalData.pickupTime && (
      <div className="mb-8 fade-in">
        <div className="flex items-center mb-4">
      
          <label htmlFor="dropoff" className="ml-2 text-lg font-bold text-gray-900">
            Drop - Off
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dropoff Location */}
         {/* Dropoff Location Select */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
  <select
    value={rentalData.dropoffLocation}
    onChange={(e) => handleRentalChange("dropoffLocation", e.target.value)}
    className="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={!billingData.city}
  >
    <option value="">Select dropoff location</option>
    {availableDropoffLocations.map(location => (
      <option key={location} value={location}>{location}</option>
    ))}
  </select>
</div>
          
{/* Dropoff Date Input */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
  <input
    type="date"
    value={rentalData.dropoffDate}
    onChange={(e) => {
      // Ensure dropoff is after pickup
      if (isFutureDate(e.target.value) && 
          (!rentalData.pickupDate || e.target.value >= rentalData.pickupDate)) {
        handleRentalChange("dropoffDate", e.target.value);
      }
    }}
    min={rentalData.pickupDate || new Date().toISOString().split('T')[0]}
    className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {rentalData.dropoffDate && 
   (!isFutureDate(rentalData.dropoffDate) || 
    (rentalData.pickupDate && rentalData.dropoffDate < rentalData.pickupDate)) && (
    <p className="text-xs text-red-500 mt-1">
      {!isFutureDate(rentalData.dropoffDate) 
        ? "Please select a future date" 
        : "Dropoff must be after pickup"}
    </p>
  )}
</div>

{/* Dropoff Time Input */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
  <input
    type="time"
    value={rentalData.dropoffTime}
    onChange={(e) => {
      if (rentalData.dropoffDate) {
        // If same date as pickup, ensure time is later
        if (rentalData.dropoffDate === rentalData.pickupDate) {
          if (e.target.value > rentalData.pickupTime) {
            handleRentalChange("dropoffTime", e.target.value);
          }
        } else if (isFutureDateTime(rentalData.dropoffDate, e.target.value)) {
          handleRentalChange("dropoffTime", e.target.value);
        }
      } else {
        handleRentalChange("dropoffTime", e.target.value);
      }
    }}
    className="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {rentalData.dropoffTime && rentalData.dropoffDate && 
   ((rentalData.dropoffDate === rentalData.pickupDate && 
     rentalData.dropoffTime <= rentalData.pickupTime) ||
    !isFutureDateTime(rentalData.dropoffDate, rentalData.dropoffTime)) && (
    <p className="text-xs text-red-500 mt-1">
      {rentalData.dropoffDate === rentalData.pickupDate && 
       rentalData.dropoffTime <= rentalData.pickupTime
        ? "Dropoff time must be after pickup time"
        : "Please select a future time"}
    </p>
  )}
</div>
        </div>
      </div>
    )}

    {/* Flight Number (Optional) */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number (Optional)</label>
      <input
        type="text"
        placeholder="Enter your flight number"
        value={rentalData.flightNumber}
        onChange={(e) => handleRentalChange("flightNumber", e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
)}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                    <p className="text-gray-500 text-sm">Complete your payment details</p>
                  </div>
                  <span className="text-gray-400 text-sm">Step 3 of 4</span>
                </div>

                <div className="mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit-card"
                          name="payment-method"
                          value="credit-card"
                          checked={paymentData.method === "credit-card"}
                          onChange={() => handlePaymentChange("method", "credit-card")}
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

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="paypal"
                          name="payment-method"
                          value="paypal"
                          checked={paymentData.method === "paypal"}
                          onChange={() => handlePaymentChange("method", "paypal")}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="paypal" className="ml-2 text-sm font-medium text-gray-900">
                          PayPal
                        </label>
                      </div>
                      <div className="w-8 h-5 bg-blue-900 rounded text-white text-xs flex items-center justify-center font-bold">
                        PP
                      </div>
                    </div>
                  </div>

                  {paymentData.method === "credit-card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
                        <input
                          type="text"
                          placeholder="Name on card"
                          value={paymentData.cardHolder}
                          onChange={(e) => handlePaymentChange("cardHolder", e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="CVC"
                          value={paymentData.cvc}
                          onChange={(e) => handlePaymentChange("cvc", e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {paymentData.method === "paypal" && (
                    <div className="pl-6 mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">You will be redirected to PayPal to complete your payment</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <label className="font-medium text-black">Amount to Pay:</label>
                    <span className="text-lg text-black font-bold">${ calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Confirmation</h2>
                    <p className="text-gray-500 text-sm">Review and confirm your rental</p>
                  </div>
                  <span className="text-gray-400 text-sm">Step 4 of 4</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={agreements.marketing}
                      onChange={(e) => setAgreements(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="marketing" className="ml-3 text-sm text-gray-700">
                      I agree to receive marketing emails
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreements.terms}
                      onChange={(e) => setAgreements(prev => ({ ...prev, terms: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <div className="font-medium">Your rental is confirmed!</div>
                    <div className="text-xs text-gray-500">Booking ID: {bookingId || "N/A"}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation and Status */}
            <div className="mt-8 flex flex-col space-y-4">
              {submitMessage && (
                <div className={`p-3 rounded-lg ${
                  submitMessage.toLowerCase().includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {submitMessage}
                </div>
              )}

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={goToPreviousStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                )}

                <button
                  onClick={currentStep === 4 ? completeRental : handleSubmit}
                  disabled={
                    (currentStep === 1 && !validateStep1()) ||
                    (currentStep === 2 && !validateStep2()) ||
                    (currentStep === 3 && !validateStep3()) ||
                    (currentStep === 4 && (!agreements.terms)) ||
                    isSubmitting
                  }
                  className={`px-6 py-3 rounded-lg text-white ${
                    currentStep === 4 ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto`}
                >
                  {isSubmitting ? "Processing..." : 
                   currentStep === 4 ? "Confirm Booking" : 
                   currentStep === 3 ? "Make Payment" : "Next"}
                </button>
              </div>
            </div>
          </div>

          {/* Rental Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rental Summary</h3>
              <p className="text-gray-500 text-sm mb-6">
                Prices may change depending on rental duration and vehicle type.
              </p>

              {vehicle && (
                <div className="flex items-center mb-6">
                  <div className="w-24 h-16 rounded-lg mr-4 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {vehicle.images?.[0]?.image ? (
                      <img 
                        src={`http://143.110.242.217:8031${vehicle.images[0].image}`}
                        alt={vehicle.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current text-gray-300" />
                      </div>
                      <span className="text-sm text-gray-500 ml-2">440+ Reviews</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Insurance</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">Total Rental Price</div>
                    <div className="text-sm text-gray-500">Includes all fees and taxes</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">${  calculateTotalPrice()}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500">
                <Phone className="w-4 h-4 mr-2" />
                <span>Need help? Call +1 (234) 567-8900</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Modal */}
      <Modal
        isOpen={isDocUploadOpen}
        onRequestClose={() => setIsDocUploadOpen(false)}
        style={customStyles}
        contentLabel="Upload Documents Modal"
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">Upload Documents</h2>
          <p className="text-gray-600 mb-4">Please upload your ID or drivers license for verification</p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => setUploadedDocs(e.target.files)}
              className="block w-full text-md p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDocUploadOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleDocUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Thank You Modal */}
      <Modal
        isOpen={isThankYouOpen}
        onRequestClose={closeThankYouModal}
        style={customStyles}
        contentLabel="Thank You Modal"
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your booking is now complete. We have sent a confirmation to your email.</p>
          <button
            onClick={closeThankYouModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
          >
            Close
          </button>
        </div>
      </Modal> 
    </div>
  )
}

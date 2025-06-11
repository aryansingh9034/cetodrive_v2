"use client"

import Link from "next/link"
import { Phone, Mail, Apple, PlayCircle } from "lucide-react"
import Image from "next/image"
import { ArrowRight, Check, Menu, X , ChevronDown , MapPin , Clock} from "lucide-react"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import background from "../../../public/image 62.png"
import Img from "../../../public/ImgKe.png"
import Toyota from "../../../public/Logo.png"
import Ford from "../../../public/Logo(1).png"
import Mercedes from "../../../public/Logo(2).png"
import Jeep from "../../../public/Logo(3).png"
import BMW from "../../../public/Logo(4).png"
import Audi from "../../../public/Logo(5).png"



export default function Home() {

 const handleImageClick = () => {
    navigate('/Blogarticles');
  };

  

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section with Background */}
       <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:h-screen bg-[#0f172a] overflow-hidden">
        <Image src={background || "/placeholder.svg"} alt="Hero background" fill className="object-cover" priority />



        {/* Hero Content */}
        <div className="relative z-5 w-full flex flex-col h-full mt-20 lg:mt-0 justify-center items-center px-4 sm:px-6 lg:px-20 pb-16 md:pb-24 pt-16 md:pt-0">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mt-8 md:mt-16 mb-4 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Premium Support for 
          </h1>

          <p className="text-[#ea580c] text-4xl sm:text-4xl font-bold md:text-6xl lg:text-8xl max-w-4xl mb-8 md:mb-16 text-center">
Premium Travellers       </p>


        </div>
      </div>

      {/* Why Choose CatoDrive Section */}
<div className="max-w-[88rem] mx-auto px-4 mt-20">
  <div className="grid lg:grid-cols-[2fr_5fr] gap-8">
    {/* Booking Form */}
    <div
      className="p-6 rounded-lg shadow"
      style={{ backgroundColor: '#78aae5' }}
    >
      <h2 className="text-2xl sm:text-3xl flex justify-center font-semibold text-white mb-2">
        Book your car
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Type of Vehicle</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="luxury">Luxury</option>
        </select>
        <input
          type="date"
          placeholder="Pickup date"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Pickup time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Book now
        </button>
      </form>
    </div>

    {/* Map/Image */}
    <div className="rounded-3xl min-h-[200px] flex justify-center items-center">
      <Image
        src={Img}
        alt="Map"
        className="w-full h-auto max-h-[400px] object-cover rounded-3xl"
      />
    </div>
  </div>
</div>

<div className="max-w-[88rem] mx-auto px-4 mt-24 mb-16">
 

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
    {/* Phone */}
    <div className="flex items-center gap-4">
      <div className="bg-blue-100 p-4 rounded-full">
        <Phone className="w-7 h-7 text-blue-600" />
      </div>
      <div>
        <p className="text-lg font-semibold text-black">Phone</p>
        <p className="text-base text-gray-700">+1234-567-8900</p>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center gap-4">
      <div className="bg-blue-100 p-4 rounded-full">
        <Mail className="w-7 h-7 text-blue-600" />
      </div>
      <div>
        <p className="text-lg font-semibold text-black">Email</p>
        <p className="text-base text-gray-700">info@example.com</p>
      </div>
    </div>

    {/* Location */}
    <div className="flex items-center gap-4">
      <div className="bg-blue-100 p-4 rounded-full">
        <MapPin className="w-7 h-7 text-blue-600" />
      </div>
      <div>
        <p className="text-lg font-semibold text-black">Location</p>
        <p className="text-base text-gray-700">123 Street, City</p>
      </div>
    </div>

    {/* Working Hours */}
    <div className="flex items-center gap-4">
      <div className="bg-blue-100 p-4 rounded-full">
        <Clock className="w-7 h-7 text-blue-600" />
      </div>
      <div>
        <p className="text-lg font-semibold text-black">Working Hours</p>
        <p className="text-base text-gray-700">Mon–Sun: 9am - 9pm</p>
      </div>
    </div>
  </div>
</div>

<div className="max-w-[90rem] mx-auto mt-16 sm:mt-10 px-4">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-16 text-black">
    Latest blog posts & news
  </h2>

  {/* BLOG CARDS START */}
  {[1, 2, 3].map((_, index) => (
    <div key={index} className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 mt-8 sm:mt-24 mb-8 sm:mb-16">
      <div className="rounded-lg overflow-hidden shadow">
        <Image 
          src={Img}
          alt="How to choose the right car"
          className="w-full h-48 sm:h-60 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-xl mb-2 text-black">How To Choose The Right Car</h3>
          <p className="text-sm text-gray-600">Posted: 7 Dec 2023</p>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow">
        <Image 
          src={Img}
          alt="Which plan is right for me"
          className="w-full h-48 sm:h-60 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-xl mb-2 text-black">Which plan is right for me?</h3>
          <p className="text-sm text-gray-600">Posted: 5 Dec 2023</p>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow sm:col-span-2 md:col-span-1">
        <Image 
          src={Img}
          alt="Enjoy speed and control"
          className="w-full h-48 sm:h-60 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-xl mb-2 text-black">Enjoy Speed, Choose & Total Control</h3>
          <p className="text-sm text-gray-600">Posted: 3 Dec 2023</p>
        </div>
      </div>
    </div>
  ))}
  {/* BLOG CARDS END */}

  {/* Car Manufacturer Logos */}
  <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 mb-20 pt-10">
    <Image src={Toyota} alt="Toyota" className="h-6 sm:h-8 md:h-10 opacity-50 hover:opacity-100 transition-opacity" />
    <Image src={Ford} alt="Ford" className="h-6 sm:h-8 md:h-10 opacity-50 hover:opacity-100 transition-opacity" />
    <Image src={Mercedes} alt="Mercedes" className="h-6 sm:h-8 md:h-10 opacity-50 hover:opacity-100 transition-opacity" />
    <Image src={Jeep} alt="Jeep" className="h-6 sm:h-8 md:h-10 opacity-50 hover:opacity-100 transition-opacity" />
    <Image src={BMW} alt="BMW" className="h-6 sm:h-8 md:h-10 opacity-50 hover:opacity-100 transition-opacity" />
    <Image src={Audi} alt="Audi" className="h-6 sm:h-8 md:h-10 opacity-50 hover:opacity-100 transition-opacity" />
  </div>
</div>



      {/* Rent/Host Section */}

      {/* Footer */}

    </div>
  )
}

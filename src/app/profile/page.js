"use client";

import React from "react";
import login from "../../../public/Group 1(4).png";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Apple, PlayCircle , Heart, Star } from "lucide-react"
import { ArrowRight, Check, Menu, X ,  Fuel, Settings, Users , ChevronDown} from "lucide-react"
import { useState , useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import background from "../../../public/View.png"
import Img from "../../../public/ImgKe.png"
import Profile from "../../../public/Profill.png"
import { useRouter } from 'next/navigation';
export default function LoginPage() {
        const router = useRouter(); // initialize router

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

    

  const rentcar = () =>{
       router.push("./vehicleform")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("http://3.108.23.172:8002/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        Alert.alert("Loggin Successfully")
      } else {
        console.error("Login failed:", data);
        // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="w-full min-h-screen  bg-white py-24">

       <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:h-full bg-[white] overflow-hidden">



      </div>

    <div className="min-h-screen bg-white p-8 font-sans">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={Profile}
            alt="User"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-lg text-gray-500">{user.email}</p>
          </div>
        </div>
        {/* <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
          Edit
        </button> */}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-lg text-gray-600 mb-1">Full Name</label>
          <input
            className="w-full border-amber-50 rounded px-4 py-2 text-black bg-gray-100"
            value={user.username}
            readOnly
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">User Name</label>
          <input
            className="w-full border-amber-50 rounded px-4 py-2 text-black bg-gray-100"
            value={user.username}
            readOnly
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Address</label>
          <input
            className="w-full border-amber-50 rounded px-4 py-2 text-black bg-gray-100"
            value="N/A"
            readOnly
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Password</label>
          <input
            className="w-full rounded px-4 py-2 border-amber-50 text-black bg-gray-100"
            type="password"
            value={user.re_password}
            readOnly
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">User Type</label>
          <input
            className="w-full border rounded px-4 py-2 border-amber-50 text-black bg-gray-100"
            value={user.vehcile_types}
            readOnly
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Phone Number</label>
          <input
            className="w-full border rounded px-4 py-2 border-amber-50 text-black bg-gray-100"
            value="N/A"
            readOnly
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-6">
        <p className="text-gray-800 font-semibold mb-2">My email Address</p>
        <div className="flex items-center gap-4 bg-gray-100 rounded p-4 max-w-md">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">✉️</div>
          <div>
            <p className="text-lg text-black font-medium">{user.email}</p>
            <p className="text-xs text-gray-800">Just now</p>
          </div>
        </div>
       
      </div>

      {/* Save Button */}
      
    </div>



       
    </div>
  );
}

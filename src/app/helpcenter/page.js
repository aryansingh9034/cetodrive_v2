"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Book, Users, Car, CreditCard, Shield, Phone, HelpCircle } from "lucide-react"
import background from "../../../public/6.jpg"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const helpCategories = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Vehicle Information",
      description: "Learn about our fleet, vehicle features, and specifications",
      articles: 15
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "Booking & Reservations",
      description: "How to book, modify, or cancel your rental reservation",
      articles: 12
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Billing & Payments",
      description: "Payment methods, billing questions, and refund policies",
      articles: 8
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance & Protection",
      description: "Coverage options, claims process, and protection plans",
      articles: 10
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Account Management",
      description: "Manage your profile, preferences, and rental history",
      articles: 6
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Support & Contact",
      description: "Get help, report issues, and contact customer service",
      articles: 9
    }
  ]

  const popularArticles = [
    {
      title: "How to extend my rental period",
      category: "Booking & Reservations",
      views: "1,234 views"
    },
    {
      title: "What documents do I need to rent a car",
      category: "Vehicle Information", 
      views: "2,156 views"
    },
    {
      title: "Understanding fuel policies and charges",
      category: "Billing & Payments",
      views: "987 views"
    },
    {
      title: "How to add an additional driver",
      category: "Booking & Reservations",
      views: "1,543 views"
    },
    {
      title: "What's covered under basic insurance",
      category: "Insurance & Protection",
      views: "2,087 views"
    },
    {
      title: "Roadside assistance and emergency support",
      category: "Support & Contact",
      views: "756 views"
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full  h-screen bg-[#0f172a] overflow-hidden">
        <Image src={background || "/placeholder.svg"} alt="Hero background" fill className="object-cover" priority />

        <div className="relative z-5 w-full flex flex-col h-full mt-20 lg:mt-0 justify-center items-center px-4 sm:px-6 lg:px-20 pb-16 md:pb-24 pt-16 md:pt-0">
  <h1
    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mt-8 md:mt-16 mb-4 text-center"
    style={{
      textShadow: `
        0 0 6px rgba(234,88,12,0.6),
        0 0 12px rgba(234,88,12,0.4),
        1px 1px 0 black,
        -1px -1px 0 black,
        1px -1px 0 black,
        -1px 1px 0 black
      `,
    }}
  >
    Help
  </h1>

  <p
    className="text-[#ea580c] text-4xl sm:text-4xl font-bold md:text-6xl lg:text-8xl max-w-4xl mb-8 md:mb-16 text-center"
    style={{
      textShadow: `
        0 0 8px rgba(234,88,12,0.8),
        0 0 16px rgba(234,88,12,0.6),
        0 0 32px rgba(234,88,12,0.5),
        1px 1px 0 black,
        -1px -1px 0 black,
        1px -1px 0 black,
        -1px 1px 0 black
      `,
      WebkitTextStroke: '0.5px black',
    }}
  >
    Center
  </p>
</div>

      </div>

      {/* Help Center Content */}
      <div className="max-w-[88rem] mx-auto px-4 mt-20 mb-24">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-8">How can we help you?</h2>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Browse by Category</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="text-[#ea580c] mr-4">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-black">{category.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{category.articles} articles</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Articles →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">Popular Articles</h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-black mb-2 hover:text-blue-600">
                        {article.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{article.category}</span>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <HelpCircle className="w-5 h-5 text-gray-400 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
            <p className="mb-6">Speak with our customer service team available 24/7</p>
            <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Call Support: +1 (555) 123-4567
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Report an Issue</h3>
            <p className="mb-6">Having problems with your rental? Let us know right away</p>
            <button className="bg-white text-green-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Report Issue
            </button>
          </div>
        </div>

        {/* Still need help */}
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">Still need help?</h3>
            <p className="text-gray-600 mb-6">Cant find what youre looking for? Our support team is here to help you with any questions or concerns.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                Contact Support
              </button>
              <button className="border border-blue-600 text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

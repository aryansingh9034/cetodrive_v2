"use client"

import Link from "next/link"
import { Phone, Mail, Apple, PlayCircle } from "lucide-react"
import Image from "next/image"
import { ArrowRight, Check, Menu, X , ChevronDown} from "lucide-react"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import background from "../../../public/image 61.png"
import img from "../../../public/Img+ button.png"
import GFR from "../../../public/GFR.png"
import Frame from "../../../public/Frame.png"




function Feature({ title, description }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xl sm:text-2xl text-gray-900 font-semibold">{title}</h4>
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}






function CarBanner() {
  return (
    <div className="min-h-screen flex items-center lg:-mt-24 lg:-mb-24 justify-center px-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl overflow-hidden relative justify-center max-w-7xl flex flex-col md:flex-row items-center w-full ">
        <div className="px-8 py-6 flex justify-center relative z-10 w-full md:w-1/2">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Looking for a car?
            </h2>
            <p className="text-white/90 mb-2">+XXX-XXX-XXXX</p>
            <p className="text-white/80 text-sm mb-4">
              Amet vero hac eros massa. Faucibus ipsum arcu lectus nisl sapien bibendum ullamcorper in...
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-400 transition-colors">
              Book now
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-96">
          <Image
            src={Frame}
            alt="BMW 2-Series Coupe"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function Review({ quote, author }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-6 space-y-6 flex-grow">
        <div className="text-4xl sm:text-5xl text-[#2c6aa0]">&#34;</div>
        <blockquote className="text-base flex text-center sm:text-lg text-gray-900">
          Et aliquet netus at sapien pellentesque mollis nec dignissim maecenas. Amet erat volutpat quisque odio purus feugiat.
        </blockquote>
      </div>
      <div className="bg-[#2c6aa0] p-4">
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="text-white">
            <div className="font-medium">{author}</div>
            <div className="text-sm text-white/80">Medical LLC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Accordion({ items, openAccordion, toggleAccordion }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg  text-gray-900  overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-4 h-20 text-xl text-left font-semibold"
            onClick={() => toggleAccordion(index)}
          >
            {item.question}
            <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === index ? 'transform rotate-180' : ''}`} />
          </button>
          {openAccordion === index && (
            <div className="p-4 text-gray-900 bg-gray-50">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}






function Statistic({ number, label }) {
  return (
    <div className="space-y-2">
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-blue-600">{number}</div>
      <div className="text-base sm:text-lg text-gray-600">{label}</div>
    </div>
  );
}

function MemoryItem({ text }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-1">
        <Check className="h-5 w-5 text-blue-600" />
      </div>
      <p className="text-md text-gray-600">{text}</p>
    </div>
  );
}

export default function Home() {
    const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:h-screen bg-[#0f172a] overflow-hidden">
        <Image src={background || "/placeholder.svg"} alt="Hero background" fill className="object-cover" priority />

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

        {/* Hero Content */}
        <div className="relative z-5 w-full flex flex-col h-full mt-20 sm:mt-0 justify-center items-center px-4 sm:px-6 lg:px-20 pb-16 md:pb-24 pt-16 md:pt-0">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mt-8 md:mt-16 mb-4 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Where Elegance Meets 
          </h1>

          <p className="text-[#ea580c] text-4xl sm:text-4xl font-bold md:text-8xl max-w-4xl mb-8 md:mb-16 text-center">
the Road          </p>


        </div>
      </div>

      {/* Why Choose CatoDrive Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose CatoDrive?</h2>
          </div>

          {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
  {[
    {
      title: "Unmatched Reliability",
      desc: "Our fleet undergoes rigorous maintenance to ensure your safety and comfort on every journey.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      title: "Exceptional Service",
      desc: "Experience premium service with professional drivers and personalized attention to detail.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      ),
    },
    {
      title: "Competitive Pricing",
      desc: "Transparent pricing with no hidden fees. Get the best value for premium transportation services.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: "24/7 Customer Support",
      desc: "Round-the-clock assistance whenever you need it. We're here to help at any time of day.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
    },
  ].map(({ title, desc, icon }, i) => (
    <div key={i} className="bg-white border border-white rounded-2xl p-6 shadow-md text-left">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
      <p className="text-gray-600 text-sm  mt-2 font-medium mb-1">Solution to save you money</p>

    </div>
  ))}
</div>


      

<div className="max-w-6xl mx-auto  px-4">
  <div className="grid gap-8 lg:grid-cols-2 mb-8 sm:mb-12 lg:mb-32 lg:mt-32">
    {/* Left Column: Heading */}
    <div className="flex items-start">
      <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-6xl">
        Where every <br />
        drive feels <br />
        extraordinary
      </h3>
    </div>

    {/* Right Column: Features */}
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      <div>
        <h4 className="font-bold text-xl text-gray-900 mb-2">Variety Brands</h4>
        <p className="text-md text-gray-700">
          Platea non auctor fermentum sollicitudin. Eget adipiscing augue sit quam natoque ornare cursus viverra odio
        </p>
      </div>
      <div>
        <h4 className="font-bold text-xl text-gray-900 mb-2">Awesome Support</h4>
        <p className="text-md text-gray-700">
          Eget adipiscing augue sit quam natoque ornare cursus viverra odio. Diam quam gravida ultricies velit
        </p>
      </div>
      <div>
        <h4 className="font-bold text-xl text-gray-900 mb-2">Maximum Freedom</h4>
        <p className="text-md text-gray-700">
          Diam quam gravida ultricies velit duis consequat integer. Est aliquam posuere vel rhoncus massa volutpat in
        </p>
      </div>
      <div>
        <h4 className="font-bold text-xl text-gray-900 mb-2">Flexibility On The Go</h4>
        <p className="text-md text-gray-700">
          Vitae pretium nulla sed quam id nisl semper. Vel non in proin egestas dis faucibus rhoncus. Iaculis dignissim aenean pellentesque nisl
        </p>
      </div>
    </div>
  </div>
</div>



      {/* Statistics Section */}
      <div className="space-y-8 sm:space-y-12 mb-8 sm:mb-12 lg:mb-16">
  <div className="relative w-full  mx-auto rounded-lg overflow-hidden bg-gray-100" style={{ height: '550px', maxHeight: '800px' }}>
    <div className="absolute inset-0 bg-blue-100 rounded-lg overflow-hidden">
      <Image
        src={img}
        alt="Luxury car on the road"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 lg:mt-36 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto text-center">
    <Statistic number="20k+" label="Happy customers" />
    <Statistic number="540+" label="Expert of cars" />
    <Statistic number="25+" label="Years of experience" />
  </div>
</div>



      {/* Memories Section */}
      <div className="max-w-7xl mx-auto px-4 lg:mt-36 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 my-16">
        
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
            Unlock unforgettable memories on the road
          </h2>
          <p className="text-gray-500 text-md">
            Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor
            tristique et gravida. Quis nunc interdum gravida ullamcorper
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MemoryItem text="Velit semper morbi. Purus non eu cursus porttitor tristique et gravida..." />
            <MemoryItem text="Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum" />
            <MemoryItem text="Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor" />
            <MemoryItem text="Quis nunc interdum gravida ullamcorper" />
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative aspect-[4/3] w-full lg:w-1/2">
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-md">
            <Image
              src={GFR}
              alt="Man in car smiling with thumbs up"
              className="w-full h-full object-cover"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </div>

      {/* Download App Section */}
      <div className="bg-[#4B96F8] min-h-[400px] flex items-center justify-center mt-40 sm:mt-40 md:mt-60 lg:mt-100 px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Phone Mockup */}
        <div className="w-64 md:w-80 -mt-32 sm:-mt-48 md:-mt-72 relative">
          <div className="bg-black rounded-[3rem] p-3 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>
            <div className="bg-white w-full aspect-[10/19.5] rounded-[2.3rem]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="text-white text-center md:text-left max-w-lg">
          <p className="text-sm font-medium tracking-wide uppercase mb-2">
            Download our app
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Download our app
          </h2>
          <p className="text-white/90 mb-8 text-base sm:text-lg">
            Turpis morbi enim nisi pulvinar leo dui tellus. Faucibus egestas semper
            diam rutrum dictumst ut donec. Nisi nisi morbi vel in vulputate. Nulla nam
            eget urna fusce vulputate at risus.
          </p>
          
          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a 
              href="#" 
              className="block w-48 sm:ml-0 md:ml-10"
              aria-label="Download on the App Store"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="w-full"
              />
            </a>
            <a 
              href="#" 
              className="block w-48"
              aria-label="Get it on Google Play"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="w-full"
              />
            </a>
          </div>
        </div>
      </div>
    </div>



      {/* Reviews Section */}
      <div className="py-8 sm:py-12 mt-10 md:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-5xl text-gray-900 font-bold text-center mb-8 sm:mb-12 lg:mb-16 lg:mt-18">Reviews from our customers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Review 
            quote="Et aliquet nunc et system perfectionist nulla tare dignissim neque. Nulla quis sagittis neque in dapibus Nulla quis tellus sit."
            author="Emmanuel "
          />
          <Review 
            quote="Porta consectetur tellus duis urna placerat purus nulla. Nam tincidunt nunc id dapibus. Lorem ipsum dolor sit amet adipiscing."
            author="Rose Greene"
          />
          <Review 
            quote="Quam neque ultricra autpretium felis. Sed egestas magna in dapibus Nulla quis tellus sit amet consectetur adipiscing. Lorem ipsum dolor sit amet adipiscing."
            author="Ryker Nelson"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold text-center mb-8 sm:mb-12 lg:mb-16">Top Asked Questions</h2>
        <div className="max-w-8xl mx-auto">
          <Accordion
            items={[
              {
                question: "How does it work?",
                answer: "Imperdiet et tristique euismod nunc. Ultricies arcu vel accumsan cursus turpis ultricies neque. Pernullamper urna ut ac in. Proin nunc nunc mattis interdum et. Sed nunc id dapibus Nulla quis tellus sit amet consectetur adipiscing elit. Sed egestas magna in dapibus Nulla quis tellus sit."
              },
              {
                question: "Can I rent a car without a credit card?",
                answer: "Yes, you can rent a car without a credit card. We accept various payment methods including debit cards and digital payments. However, additional documentation may be required."
              },
              {
                question: "What are the requirements for renting a car?",
                answer: "To rent a car, you must be at least 21 years old, have a valid driver's license, provide proof of insurance, and meet our credit requirements. Additional requirements may apply for luxury vehicles."
              },
              {
                question: "Does Car+ drive allow me to tow with or attach a hitch to the rental vehicle?",
                answer: "Towing capabilities vary by vehicle. Please contact our customer service team to discuss specific towing requirements and available vehicles that meet your needs."
              },
              {
                question: "Does Car+ drive offer coverage products for purchase with my rental?",
                answer: "Yes, we offer various coverage options including collision damage waiver, personal accident insurance, and supplemental liability protection. Our team can help you choose the right coverage for your needs."
              }
            ]}
            openAccordion={openAccordion}
            toggleAccordion={toggleAccordion}
          />
        </div>
      </div>
          
        </div>
              <CarBanner/>

      </section>

      {/* <CarBanner/> */}

      {/* Rent/Host Section */}

      {/* Footer */}
      <div className="bg-[#0a0c17] text-white">
        <main className="container mx-auto px-4 py-12">
          {/* Main content section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
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

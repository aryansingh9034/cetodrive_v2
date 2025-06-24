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
      <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden">
        <Image src={background || "/placeholder.svg"} alt="Hero background" fill className="object-cover" priority />



        {/* Hero Content */}
        <div className="relative z-5 w-full py-16 flex flex-col h-full mt-20 sm:mt-0 justify-center items-center px-4 sm:px-6 lg:px-20 pb-16 md:pb-24 pt-16 md:pt-0">
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

 
    </div>
  )
}

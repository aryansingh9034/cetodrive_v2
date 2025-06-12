'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder, EcoTech Solutions',
    feedback: 'Working with The Creative Hub transformed our digital presence completely. Their innovative approach to social media marketing helped us reach 50,000+ new customers and increase our conversion rate by 65% in just four months.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Michael Chen',
    role: 'Director of Growth, FoodieApp',
    feedback: 'The team at The Creative Hub delivered exceptional results for our mobile app launch. Their comprehensive marketing strategy and creative content helped us achieve 100k downloads in our first month, exceeding all expectations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Lifestyle Blogger & Influencer',
    feedback: 'Collaborating with The Creative Hub has been incredible for my personal brand. Their content creation team perfectly captures my aesthetic and voice, resulting in a 200% increase in engagement and several brand partnership opportunities.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'David Thompson',
    role: 'Event Producer & Creative Director',
    feedback: 'The Creative Hub videography team exceeded every expectation for our luxury brand event. Their cinematic storytelling and attention to detail created a stunning promotional video that has become our most successful marketing asset.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Lisa Park',
    role: 'Senior Real Estate Agent',
    feedback: 'The Creative Hub photography services revolutionized how we showcase properties. Their artistic eye and professional techniques have made our listings stand out, resulting in 40% faster sales and higher closing prices.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO, Wellness Brand Co.',
    feedback: 'Our brand identity transformation with The Creative Hub was phenomenal. The new logo and visual identity they created perfectly represents our values and has helped us establish a premium market position.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Zoe Williams',
    role: 'Digital Marketing Manager',
    feedback: 'The Creative Hub comprehensive digital strategy transformed our online presence across all platforms. From SEO to social media, their expertise delivered measurable results with a 300% increase in qualified leads.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Alex Rivera',
    role: 'Brand Strategy Consultant',
    feedback: 'Thanks to The Creative Hub strategic insights, our client collaborations have reached new heights. Their deep understanding of market dynamics and consumer behavior has made every campaign more effective and authentic.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face'
  }
];

const TestimonialsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        if (!userInteractedRef.current) {
          moveCarousel('next', false);
        }
        userInteractedRef.current = false;
      }, 2000);
    }
  
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay]);

  const moveCarousel = (direction, userInitiated = true) => {
    if (isAnimating) return;
    
    if (userInitiated) {
      userInteractedRef.current = true;
    }

    setIsAnimating(true);
    setActiveIndex(prev => {
      if (direction === 'next') {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
    });
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleCardClick = (clickedIndex) => {
    if (isAnimating || clickedIndex === activeIndex) return;
    
    userInteractedRef.current = true;
    setIsAnimating(true);
    setActiveIndex(clickedIndex);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const getCardStyle = (index) => {
    const diff = (index - activeIndex + testimonials.length) % testimonials.length;
    const center = 0;
    
    let translateX = 0;
    let translateZ = 0;
    let opacity = 1;
    let scale = 1;
    let cursor = 'pointer';

    if (isMobile) {
      // Mobile styles
      if (diff === center) {
        translateX = 0;
        opacity = 1;
        scale = 1;
      } else {
        translateX = diff > 0 ? 100 : -100;
        opacity = 0;
        scale = 0.8;
      }
      translateZ = 0;
    } else {
      // Desktop styles
      if (diff === center) {
        translateZ = 0;
        scale = 1;
        cursor = 'default';
      } else if (diff === 1 || diff === testimonials.length - 1) {
        translateX = diff === 1 ? 150 : -150;
        translateZ = -100;
        scale = 0.8;
        opacity = 0.8;
      } else if (diff === 2 || diff === testimonials.length - 2) {
        translateX = diff === 2 ? 300 : -300;
        translateZ = -200;
        scale = 0.6;
        opacity = 0.6;
      } else {
        translateX = diff > center ? 450 : -450;
        translateZ = -300;
        scale = 0.4;
        opacity = 0;
      }
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex: 1000 - Math.abs(diff),
      transition: 'all 0.4s ease-out',
      cursor
    };
  };

  return (
    <div className="pt-12 md:pt-16 lg:pt-20  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="text-center">
          <h2 className="text-4xl sm:text-xl mb-16 md:text-4xl font-semibold text-gray-800 mt-2">What Our Clients Say</h2>
          
        </div>

        <div 
          className="relative h-[280px] md:h-[400px] flex justify-center items-center"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          onTouchStart={() => setAutoPlay(false)}
          onTouchEnd={() => {
            setTimeout(() => setAutoPlay(true), 5000);
          }}
        >
          <div className="absolute inset-0 flex justify-center items-center transform-style-3d">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="absolute flex justify-center items-center w-[300px] md:w-[400px] h-[330px] md:h-[340px]"
                style={getCardStyle(index)}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(index);
                  }
                }}
                aria-label={`View testimonial from ${testimonial.name}`}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow h-full">
                  <div className="p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 border-b border-gray-100">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-lg md:text-xl text-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <h3 className=" text-gray-600">
                        {testimonial.role}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <p className="text-sm md:text-base text-justify text-gray-500 pb-6 max-w-lg mx-auto">
                      {testimonial.feedback}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12 md:mt-12">
          <button
            onClick={() => moveCarousel('prev')}
            className="p-2 rounded-full bg-pineGreen/10 hover:bg-pineGreen/20 transition-colors"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            onClick={() => moveCarousel('next')}
            className="p-2 rounded-full bg-pineGreen/10 hover:bg-pineGreen/20 transition-colors"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
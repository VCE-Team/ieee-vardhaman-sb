import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/UI/ProfessionalComponents';

export const HeroSection = ({ heroImages, onScrollToSection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${heroImages[currentSlide].image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:transform hover:scale-110 ${
              currentSlide === index 
                ? 'bg-white shadow-professional-sm' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-all duration-300 hover:transform hover:-translate-x-1 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-all duration-300 hover:transform hover:translate-x-1 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </section>
  );
};

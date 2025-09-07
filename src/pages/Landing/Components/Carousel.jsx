import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({
  children,
  itemsPerPage = 1,
  infiniteLoop = true,
  autoPlay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? itemsPerPage : 0);
  const carouselRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  // Duplicate items for infinite loop
  const extendedChildren = infiniteLoop
    ? [...childrenArray.slice(-itemsPerPage), ...childrenArray, ...childrenArray.slice(0, itemsPerPage)]
    : childrenArray;

  const handleTransitionEnd = () => {
    if (infiniteLoop) {
      if (currentIndex >= totalItems + itemsPerPage) {
        carouselRef.current.style.transition = 'none';
        setCurrentIndex(itemsPerPage);
      } else if (currentIndex < itemsPerPage) {
        carouselRef.current.style.transition = 'none';
        setCurrentIndex(totalItems + currentIndex);
      }
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${(currentIndex / extendedChildren.length) * 100}%)`;
    }
  }, [currentIndex, extendedChildren.length]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex"
        style={{
          width: `${extendedChildren.length * (100 / itemsPerPage)}%`,
          transform: `translateX(-${(currentIndex / extendedChildren.length) * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedChildren.map((child, index) => (
          <div key={index} style={{ width: `${100 / extendedChildren.length}%` }}>
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full z-20"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel; 

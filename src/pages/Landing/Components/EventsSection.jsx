import React, { useState, useEffect } from 'react';
import { Calendar, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import EmblaCarousel from './EmblaCarousel'; // <-- changed from InfiniteCarousel

export const EventsSection = ({ pastEvents, upcomingEvents }) => {
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []); 

  const CarouselNavButton = ({ direction, onClick, className }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? '-left-16 lg:-left-20' : '-right-16 lg:-right-20'} 
        hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200
        text-gray-600 hover:text-green-600 hover:border-green-600 transition-all duration-200 group ${className}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      ) : (
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      )}
    </button>
  );

  const EventCard = ({ event, isUpcoming = false }) => (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-300 transition-colors duration-300 group flex flex-col hover:bg-gray-50 my-2 sm:my-0 w-full min-w-[260px] max-w-[350px]">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
        <div>
          <h3 className="truncate text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
            {event.title}
          </h3>
          {isUpcoming && (
            <p className="text-gray-600 mb-2 text-xs sm:text-sm md:text-base line-clamp-1">{event.description}</p>
          )}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mt-2 mb-3">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{event.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span>
                {isUpcoming
                  ? `${event.registrations} Registrations`
                  : event.participants}
              </span>
            </span>
          </div>
          <div className="border-b border-gray-200 mb-4"></div>
          <div className="flex items-center space-x-3">
            {event.hostingBranchLogo && (
              <img
                src={event.hostingBranchLogo}
                alt={event.hostingBranchName + ' logo'}
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain rounded-full"
              />
            )}
            {event.hostingBranchName && (
              <p className="text-xs sm:text-sm text-gray-700 font-medium">{event.hostingBranchName}</p>
            )}
          </div>
        </div>
        {isUpcoming && (
          <div className="flex justify-center mt-4 pt-2 sm:mt-6">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-xs sm:text-sm md:text-base">
              Register Now
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="events" className="">
      <section id="events" className="w-full">
  {/* Past Events */}
  <section id="past-events" className="py-8 sm:py-16 lg:py-20 bg-white">
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Past Events
        </h2>
        <div className="w-16 h-1 bg-green-400 mx-auto mb-1"></div>
        <div className="w-8 h-1 bg-blue-800 mx-auto"></div>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-4">
          Celebrating our successful technical events and community gatherings
        </p>
      </div>

      <div className="relative px-0 sm:px-4 md:px-8">
        <EmblaCarousel
          items={pastEvents}
          renderItem={(event) => <EventCard event={event} />}
        />
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => window.location.href = '/past-events'}
          className="group relative inline-flex items-center px-8 py-3 text-base font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-green-500"></span>
          <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
            Show More Events
            <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  </section>

  {/* Upcoming Events */}
  <section id="upcoming-events" className="py-8 sm:py-16 lg:py-20">
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Upcoming Events
        </h2>
        <div className="w-16 h-1 bg-green-400 mx-auto mb-1"></div>
        <div className="w-8 h-1 bg-blue-800 mx-auto"></div>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-4">
          Join us for these exciting technical events and networking opportunities
        </p>
      </div>

      <div className="relative px-0 sm:px-4 md:px-8">
        <EmblaCarousel
          items={upcomingEvents}
          renderItem={(event) => <EventCard event={event} isUpcoming />}
        />
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => window.location.href = '/upcoming-events'}
          className="group relative inline-flex items-center px-8 py-3 text-base font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-blue-500"></span>
          <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
            Explore More Events
            <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  </section>
</section>


    </section>
  );
};

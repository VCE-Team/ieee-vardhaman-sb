import React, { useState, useEffect } from 'react';
import { Calendar, Users, ChevronLeft, ChevronRight, Award, Camera } from 'lucide-react';
import Masonry from './reactcom/Masonry';
import { Stats } from '../pages/Landing/Components/Stats';

// Clean EmblaCarousel
function EmblaCarousel({ items, renderItem }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, items.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % Math.max(1, items.length));
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No items to display</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}

function EventCard({ event, isUpcoming = false }) {
  return (
    <div className="bg-white rounded-lg border p-4 max-w-xs w-full text-center">
      <div className="mb-4">
        <img
          src={event.image || 'https://via.placeholder.com/400x240?text=Event+Image'}
          alt={event.title}
          className="w-full h-48 object-cover rounded"
        />
      </div>
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      {isUpcoming && event.description && (
        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
      )}
      <div className="flex justify-center space-x-4 text-sm text-gray-700">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>
            {isUpcoming
              ? `${event.registrations || 0} Reg.`
              : event.participants || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DetailLayout({ data = {} }) {
  // Mock data for demonstration
  const mockData = {
    name: "Environmental Club",
    description: "Dedicated to promoting environmental awareness and sustainable practices in our community.",
    vision: "To create a sustainable future where environmental consciousness is at the forefront of every decision.",
    mission: "To educate, inspire, and empower individuals to take action for environmental protection through innovative programs and community engagement.",
    carouselImages: [
      'https://via.placeholder.com/1200x600/22c55e/ffffff?text=Environmental+Action',
      'https://via.placeholder.com/1200x600/16a34a/ffffff?text=Sustainability+Drive',
      'https://via.placeholder.com/1200x600/15803d/ffffff?text=Green+Future'
    ],
    slate: [
      { name: "Sarah Johnson", role: "President", photo: "https://via.placeholder.com/120x120/22c55e/ffffff?text=SJ" },
      { name: "Michael Chen", role: "Vice President", photo: "https://via.placeholder.com/120x120/16a34a/ffffff?text=MC" },
      { name: "Emily Davis", role: "Secretary", photo: "https://via.placeholder.com/120x120/15803d/ffffff?text=ED" },
      { name: "David Wilson", role: "Treasurer", photo: "https://via.placeholder.com/120x120/22c55e/ffffff?text=DW" }
    ],
    events: {
      past: [
        { title: "Earth Day Cleanup", date: "Apr 22, 2024", participants: "150 people", image: "https://via.placeholder.com/400x240/22c55e/ffffff?text=Earth+Day" },
        { title: "Sustainability Workshop", date: "Mar 15, 2024", participants: "80 people", image: "https://via.placeholder.com/400x240/16a34a/ffffff?text=Workshop" }
      ],
      upcoming: [
        { title: "Green Energy Summit", date: "Aug 10, 2025", registrations: 45, description: "Learn about renewable energy solutions", image: "https://via.placeholder.com/400x240/15803d/ffffff?text=Summit" },
        { title: "Tree Planting Drive", date: "Sep 5, 2025", registrations: 120, description: "Community tree planting initiative", image: "https://via.placeholder.com/400x240/22c55e/ffffff?text=Tree+Plant" }
      ]
    },
    achievements: [
      { title: "Best Environmental Club", year: "2024", description: "Awarded for outstanding environmental initiatives", image: "https://via.placeholder.com/200x120/22c55e/ffffff?text=Award" },
      { title: "Community Impact Award", year: "2023", description: "Recognized for significant community contributions", image: "https://via.placeholder.com/200x120/16a34a/ffffff?text=Impact" }
    ],
    gallery: [
      { img: "https://via.placeholder.com/300x200/22c55e/ffffff?text=Gallery+1", caption: "Beach cleanup event" },
      { img: "https://via.placeholder.com/300x200/16a34a/ffffff?text=Gallery+2", caption: "Recycling workshop" },
      { img: "https://via.placeholder.com/300x200/15803d/ffffff?text=Gallery+3", caption: "Solar panel installation" },
      { img: "https://via.placeholder.com/300x200/22c55e/ffffff?text=Gallery+4", caption: "Community garden" }
    ]
  };

  const combinedData = { ...mockData, ...data };
  const heroImages = combinedData.carouselImages || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroImages.length]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero */}
      {heroImages.length > 0 && (
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{combinedData.name}</h1>
              {combinedData.description && (
                <p className="text-lg md:text-xl max-w-xl mx-auto">{combinedData.description}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* See All Buttons */}
      {/* REMOVE the group of buttons from the top */}

      {/* Content */}
      <div className="max-w-full mx-auto px-4 py-12 space-y-12">

        <section className="py-12 px-4 max-w-6xl mx-auto">
          {/* Heading */}
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
              Our Vision, Mission and Objectives
            </h2>
            <div className="w-16 h-1 bg-green-400 mb-1 mx-auto"></div>
            <div className="w-8 h-1 bg-blue-800 mx-auto"></div>
          </div>

          {/* Vision & Mission Cards (Landing Page Style) */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Vision Card */}
            <div className="bg-gray-100 bg-opacity-70 py-8 px-6 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.05),_-10px_10px_5px_rgba(0,0,0,0.15),_10px_10px_5px_rgba(0,0,0,0.15)] flex flex-col">
              <div className="border-l-4 border-blue-600 rounded-l-xl pl-4 mb-4"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed flex-grow" dangerouslySetInnerHTML={{ __html: combinedData.vision }} />
            </div>

            {/* Mission Card */}
            <div className="bg-gray-100 bg-opacity-70 py-8 px-6 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.05),_-10px_10px_5px_rgba(0,0,0,0.15),_10px_10px_5px_rgba(0,0,0,0.15)] flex flex-col">
              <div className="border-l-4 border-purple-600 rounded-l-xl pl-4 mb-4"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed flex-grow" dangerouslySetInnerHTML={{ __html: combinedData.mission }} />
            </div>

            {/* Objectives Card */}
            <div className="bg-gray-100 bg-opacity-70 py-8 px-6 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.05),_-10px_10px_5px_rgba(0,0,0,0.15),_10px_10px_5px_rgba(0,0,0,0.15)] flex flex-col">
              <div className="border-l-4 border-green-600 rounded-l-xl pl-4 mb-4"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Objectives</h3>
              <p className="text-gray-700 leading-relaxed flex-grow" dangerouslySetInnerHTML={{ __html: combinedData.objectives || 'Objectives will be updated soon.' }} />
            </div>
          </div>
        </section>

        {/* Numbers/Stats Section */}
        <Stats 
          members={data.stats?.members || 0}
          events={data.stats?.events || 0}
          awards={data.stats?.awards || 0}
        />

        {/* Leadership Team */}
        {combinedData.slate && combinedData.slate.length > 0 && (
          <section id="leadership-team" className="mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Meet Our <span className="text-blue-600">Leadership Team</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our dedicated team of leaders working together to advance technology and foster innovation within this society.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {combinedData.slate.map((member, idx) => {
                  // Color helpers (copied from SBSlate)
                  const getPositionColor = (position) => {
                    switch ((position || '').toLowerCase()) {
                      case 'chair':
                        return 'bg-gradient-to-r from-blue-600 to-blue-800';
                      case 'vice chair':
                        return 'bg-gradient-to-r from-green-600 to-green-800';
                      case 'treasurer':
                        return 'bg-gradient-to-r from-purple-600 to-purple-800';
                      case 'advisor':
                        return 'bg-gradient-to-r from-orange-600 to-orange-800';
                      default:
                        return 'bg-gradient-to-r from-gray-600 to-gray-800';
                    }
                  };
                  const getBorderColor = (position) => {
                    switch ((position || '').toLowerCase()) {
                      case 'chair':
                        return 'hover:border-blue-600';
                      case 'vice chair':
                        return 'hover:border-green-600';
                      case 'treasurer':
                        return 'hover:border-purple-600';
                      case 'advisor':
                        return 'hover:border-orange-600';
                      default:
                        return 'hover:border-gray-600';
                    }
                  };
                  return (
                    <div key={idx} className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-200 ${getBorderColor(member.role)} flex flex-col`}>
                      <div className={`absolute inset-0 ${getPositionColor(member.role)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={member.photo || `https://via.placeholder.com/120?text=${member.name?.charAt(0)}`}
                          alt={member.name}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                      </div>
                      <div className="p-6 relative flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-3">
                          <div className={`w-max px-2 py-1 rounded-full text-white text-sm font-semibold ${getPositionColor(member.role)}`}>
                            {member.role}
                          </div>
                          <div className="flex space-x-2">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                                aria-label={`Email ${member.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg>
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                                aria-label={`LinkedIn profile of ${member.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 01-12 0V8a6 6 0 0112 0zm0 0v8m0-8V8" /></svg>
                              </a>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-center">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Events */}
        {combinedData.events && (
          <>
            {/* Past Events Section */}
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
                    items={combinedData.events.past || []}
                    renderItem={(event) => (
                      <div className="flex justify-center">
                        <EventCard event={event} />
                      </div>
                    )}
                  />
                </div>
                <div className="mt-8 text-center">
                  <a href={`/societies/${data.id}/past-events`}>
                    <button className="group relative inline-flex items-center px-8 py-3 text-base font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent">
                      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-blue-500"></span>
                      <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
                        See All Past Events
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </section>

            {/* Upcoming Events Section */}
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
                    items={combinedData.events.upcoming || []}
                    renderItem={(event) => (
                      <div className="flex justify-center">
                        <EventCard event={event} isUpcoming />
                      </div>
                    )}
                  />
                </div>
                <div className="mt-8 text-center">
                  <a href={`/societies/${data.id}/upcoming-events`}>
                    <button className="group relative inline-flex items-center px-8 py-3 text-base font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent">
                      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-blue-500"></span>
                      <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
                        See All Upcoming Events
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Achievements */}
        {combinedData.achievements && combinedData.achievements.length > 0 && (
          <section id="achievements" className="bg-white mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
                <p className="text-xl text-gray-600">
                  Recognition and awards that reflect our commitment to excellence
                </p>
              </div>
              <AchievementsCarousel achievements={combinedData.achievements} />
              <div className="mt-8 text-center">
                <a href={`/societies/${data.id}/achievements`}>
                  <button className="group relative inline-flex items-center px-8 py-3 text-base font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent">
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-blue-500"></span>
                    <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
                      See All Achievements
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {combinedData.gallery && combinedData.gallery.length > 0 && (
          <section id="gallery" className="w-full ">
            <div className="px-4 sm:px-6 lg:px-8 max-w-full">
              <div className="text-center py-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
                <p className="text-xl text-gray-600">
                  A visual journey through our events and activities
                </p>
              </div>
              {/* Fixed Height and Full Width Gallery */}
              <div className="relative h-[500px] w-full overflow-hidden">
                {/* Top Light Dim Overlay */}
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none" />
                {/* Masonry Content Container */}
                <div className="relative z-0 w-full h-full">
                  <Masonry
                    items={combinedData.gallery.map((item, idx) => ({
                      ...item,
                      id: idx,
                      height: 200 + (idx % 3) * 60 // simple varied height for demo
                    }))}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                  />
                </div>
                {/* Bottom Light Dim Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
              </div>
              <div className="mt-8 text-center">
                <a href={`/societies/${data.id}/gallery`}>
                  <button className="group relative inline-flex items-center px-8 py-3 text-base font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent">
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-blue-500"></span>
                    <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
                      See Full Gallery
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function AchievementsCarousel({ achievements }) {
  const [currentFrontIndex, setCurrentFrontIndex] = React.useState(0);

  React.useEffect(() => {
    if (achievements.length > 0) {
      setCurrentFrontIndex(0);
    }
  }, [achievements]);

  React.useEffect(() => {
    if (achievements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentFrontIndex((prevIndex) => (prevIndex + 1) % achievements.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [achievements.length]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto gap-8 lg:gap-12">
      {/* Main Achievement Display - Left Side */}
      <div className="w-full lg:w-1/2">
        <div className="aspect-square relative rounded-xl overflow-hidden">
          <img
            src={achievements[currentFrontIndex]?.image || ""}
            alt={achievements[currentFrontIndex]?.title || "Achievement"}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      {/* Right Side Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-between space-y-6">
        {/* Achievement Details */}
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {achievements[currentFrontIndex]?.title}
          </h3>
          <p className="text-gray-600 mb-1">{achievements[currentFrontIndex]?.year}</p>
          <p className="text-gray-700">{achievements[currentFrontIndex]?.description}</p>
        </div>
        {/* Thumbnail Carousel */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full py-2">
          {achievements.map((achievement, index) => (
            <button
              key={achievement.title}
              onClick={() => setCurrentFrontIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 
                ${currentFrontIndex === index 
                  ? 'ring-2 ring-green-500 ring-offset-2' 
                  : 'ring-1 ring-gray-200 opacity-70 hover:opacity-100'}`}
            >
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
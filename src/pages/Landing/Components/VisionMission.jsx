import React from 'react';

export const VisionMission = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vision, Mission and Objectives</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Vision Card */}
          <div className="bg-gray-100 bg-opacity-70 py-8 px-6 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.05),_-10px_10px_5px_rgba(0,0,0,0.15),_10px_10px_5px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="border-l-4 border-blue-600 rounded-l-xl pl-4 mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed flex-grow">
              To quest for new technologies in all relative engineering fields by creating a new professional platform for networking and exploring career opportunities.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-gray-100 bg-opacity-70 py-8 px-6 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.05),_-10px_10px_5px_rgba(0,0,0,0.15),_10px_10px_5px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="border-l-4 border-purple-600 rounded-l-xl pl-4 mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed flex-grow">
              To make the students aware about the latest technical advancements.
              <br /><br />
              To inculcate a sense of team work and responsibility by encouraging them to organize events.
            </p>
          </div>

          {/* Objectives Card */}
          <div className="bg-gray-100 bg-opacity-70 py-8 px-6 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.05),_-10px_10px_5px_rgba(0,0,0,0.15),_10px_10px_5px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="border-l-4 border-green-600 rounded-l-xl pl-4 mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Objectives</h3>
            <p className="text-gray-700 leading-relaxed flex-grow">
              Objectives will be updated soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

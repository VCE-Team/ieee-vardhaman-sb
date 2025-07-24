import React from 'react';
import SpotlightCard from '../../../components/reactcom/SpotlightCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CouncilsSection = ({ councils }) => {
  // Show only the first 5 councils, or adjust as needed
  const visibleCouncils = councils.slice(0, 5);

  const handleMoreClick = () => {
    window.location.href = '/councils';
  };

  return (
    <section id="councils" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">IEEE Councils</h2>
          <p className="text-xl text-gray-600">
            Coordinating bodies that bring together multiple societies and technical communities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCouncils.map((council, index) => (
            <Link
              key={index}
              to={`/councils/${council.id}`}
              style={{ textDecoration: 'none' }}
            >
              <SpotlightCard 
                className="cursor-pointer text-left w-full min-h-[220px] h-[220px] focus:outline-none border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                spotlightColor="rgba(0, 200, 255, 0.2)"
              >
                <div className="flex justify-center mb-4">
                  {typeof council.image === 'function' ? (
                    React.createElement(council.image, { className: 'h-16 w-16 object-contain rounded-lg text-blue-600' })
                  ) : (
                    <img src={council.image} alt={council.name + ' logo'} className="h-24 w-24 object-contain rounded-lg" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200 text-center">
                    {council.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-2 min-h-[40px]">
                    {council.objectives || 'Objectives will be updated soon.'}
                  </p>
                  {/* {council.stats && (
                    <div className="flex justify-around mt-4 text-xs text-gray-600">
                      <div><b>{council.stats.members}</b> Members</div>
                      <div><b>{council.stats.events}</b> Events</div>
                      <div><b>{council.stats.awards}</b> Awards</div>
                    </div>
                  )} */}
                </div>
              </SpotlightCard>
            </Link>
          ))}
          {/* + More Card */}
          <div
            onClick={handleMoreClick}
            className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors duration-200 hover:bg-gray-50 cursor-pointer min-h-[180px] hover:border-green-500 group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 group-hover:bg-green-50">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-green-500" />
            </div>
            <span className="text-lg font-semibold text-gray-500 group-hover:text-green-600">More Councils</span>
          </div>
        </div>
      </div>
    </section>
  );
};

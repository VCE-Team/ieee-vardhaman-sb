import React from 'react';
import SpotlightCard from '../../../components/reactcom/SpotlightCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SocietiesSection = ({ societies }) => {
  // Show only the first 5 societies
  const visibleSocieties = societies.slice(0, 5);

  const handleMoreClick = () => {
    window.location.href = '/societies';
  };

  return (
    <section id="societies" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">IEEE Societies</h2>
          <p className="text-xl text-gray-600">
            Specialized technical communities driving innovation in their respective fields
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleSocieties.map((society, index) => (
            <Link
              key={index}
              to={`/societies/${society.id}`}
              style={{ textDecoration: 'none' }}
            >
              <SpotlightCard
                id={`society-${society.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')}`}
                className="cursor-pointer text-left w-full focus:outline-none border border-gray-300 hover:bg-gray-50 transition-colors duration-200 min-h-[220px] h-[220px]"
                spotlightColor="rgba(0, 200, 255, 0.2)"
              >
                <div className="flex justify-center mb-4">
                  {typeof society.image === 'function' ? (
                    React.createElement(society.image, { className: 'h-16 w-16 object-contain rounded-lg text-blue-600' })
                  ) : (
                    <img src={society.image} alt={society.name + ' logo'} className="h-24 w-24 object-contain rounded-lg" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200 text-center">
                  {society.name}
                </h3>
                <p className="text-gray-600 text-sm text-center mb-2 min-h-[40px]">
                  {society.objectives || 'Objectives will be updated soon.'}
                </p>
                {/* {society.stats && (
                  <div className="flex justify-around mt-4 text-xs text-gray-600">
                    <div><b>{society.stats.members}</b> Members</div>
                    <div><b>{society.stats.events}</b> Events</div>
                    <div><b>{society.stats.awards}</b> Awards</div>
                  </div>
                )} */}
              </SpotlightCard>
            </Link>
          ))}
          {/* + More Card */}
          <div
            onClick={handleMoreClick}
            className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors duration-200 hover:bg-gray-50 cursor-pointer min-h-[200px] h-[200px] hover:border-green-500 group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 group-hover:bg-green-50">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-green-500" />
            </div>
            <span className="text-lg font-semibold text-gray-500 group-hover:text-green-600">More Societies</span>
          </div>
        </div>
      </div>
    </section>
  );
};

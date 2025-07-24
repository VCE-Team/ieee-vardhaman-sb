import React from 'react';
import { Header } from '../../components/Essentials/Header';
import { Footer } from '../../components/Essentials/Footer';
import { societiesData } from '../Landing/data/societiesData';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/reactcom/SpotlightCard';

export default function Societies() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IEEE Societies</h1>
          <p className="text-xl text-gray-600">
            Specialized technical communities driving innovation in their respective fields
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {societiesData.map((society, index) => (
            <Link
              key={society.id}
              to={`/societies/${society.id}`}
              style={{ textDecoration: 'none' }}
            >
              <SpotlightCard
                id={`society-${society.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')}`}
                className="cursor-pointer w-full h-full min-h-[240px] flex flex-col justify-center items-center focus:outline-none border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                spotlightColor="rgba(0, 200, 255, 0.2)"
              >
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <img src={society.image} alt={society.name + ' logo'} className="h-24 w-24 object-contain rounded-lg mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 text-center">
                    {society.name}
                  </h3>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

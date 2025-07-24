import React from 'react';
import { Header } from '../../components/Essentials/Header';
import { ContactUs } from '../../components/Essentials/ContactUs';
import { Footer } from '../../components/Essentials/Footer';
import { councilsData } from '../Landing/data/councilsData';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/reactcom/SpotlightCard';

export default function Councils() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IEEE Councils</h1>
          <p className="text-xl text-gray-600">
            Coordinating bodies that bring together multiple societies and technical communities
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {councilsData.map((council, index) => (
            <Link
              key={council.id}
              to={`/councils/${council.id}`}
              style={{ textDecoration: 'none' }}
            >
              <SpotlightCard
                id={`council-${council.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')}`}
                className="cursor-pointer text-left w-full min-h-[240px] h-[240px] min-w-0 focus:outline-none border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                spotlightColor="rgba(0, 200, 255, 0.2)"
              >
                <div className="flex justify-center mb-4">
                  <img src={council.image} alt={council.name + ' logo'} className="h-24 w-24 object-contain rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200 text-center">
                  {council.name}
                </h3>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

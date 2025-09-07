import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnderConstruction from '../../components/Essentials/UnderConstruction';
import { ContactUs } from '../../components/Essentials/ContactUs';
import { Footer } from '../../components/Essentials/Footer';

const Team = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="flex items-center h-16 px-4 sm:px-8 bg-white shadow-md">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => navigate('/')}
        >
          <img
            src="https://res.cloudinary.com/doyh3fqr5/image/upload/c_crop,w_1000,h_780/v1750524389/IEEE_VCE_SB_-_TBG_j8tonl.png"
            alt="IEEE VCE SB Logo"
            className="h-10 w-auto sm:h-12"
          />
          <span className="hidden sm:inline text-lg font-bold text-gray-900">IEEE Vardhaman</span>
        </button>
      </header>
      <UnderConstruction />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Team; 

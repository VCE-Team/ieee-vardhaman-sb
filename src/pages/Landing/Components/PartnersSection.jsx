import React from 'react';
import Marquee from 'react-fast-marquee';

export const PartnersSection = () => {
  const ieeePartners = [
    { 
      link: 'https://hkn.ieee.org/hkn-chapters/all-chapters/vardhaman-college-of-engineering-shamshabad-nu-kappa', 
      text: 'IEEE-HKN Nu Kappa Chapter', 
      image: 'https://res.cloudinary.com/doyh3fqr5/image/upload/v1750923054/d20ae199-4700-4fa6-89bd-0ec6651287dd.png' 
    },
    { 
      link: 'https://ieee-ceda.org/chapter/vardhaman-college-engineering-shamshabad', 
      text: 'IEEE CEDA Chapter', 
      image: 'https://res.cloudinary.com/doyh3fqr5/image/upload/v1750923080/e926d2f7-f07a-4f8e-96f7-85e1ccb13a6e.png' 
    },
    { 
      link: 'https://ieeesystemscouncil.org/chapter/vardhaman-college-engineering-shamshabad', 
      text: 'IEEE Systems Council', 
      image: 'https://res.cloudinary.com/doyh3fqr5/image/upload/v1750923195/73d448ab-9209-4081-9405-018d062f6d91.png' 
    },
    { 
      link: 'https://ieeevardhaman.org/', 
      text: 'IEEE Student Branch', 
      image: 'https://res.cloudinary.com/doyh3fqr5/image/upload/v1750524389/IEEE_VCE_SB_-_TBG_j8tonl.png' 
    }
  ];

  return (
    <section>
      <div className="w-full mb-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our IEEE Partners</h2>
          <p className="text-xl text-gray-600">
            Collaborating with IEEE societies and technical organizations for excellence in engineering education
          </p>
        </div>

        <div style={{ height: '180px', position: 'relative' }}>
          <Marquee gradient={false} speed={40} pauseOnHover={true} className="w-full">
            {ieeePartners.concat(ieeePartners).map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center mx-8"
                style={{ width: 200 }}
              >
                <div className="w-[200px] h-[17vh] flex items-center justify-center mb-2">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-900 text-lg font-medium text-center whitespace-nowrap">
                  {item.text}
                </span>
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from './Components/Header';
import { HeroSection } from './Components/HeroSection';
import { VisionMission } from './Components/VisionMission';
import { Stats } from './Components/Stats';
import { SocietiesSection } from './Components/SocietiesSection';
import { CouncilsSection } from './Components/CouncilsSection';
import { EventsSection } from './Components/EventsSection';
import { AchievementsSection } from './Components/AchievementsSection';
import { PartnersSection } from './Components/PartnersSection';
import { GallerySection } from './Components/GallerySection';
import SBSlate from './Components/SBSlate';
import { FAQsSection } from './Components/FAQsSection';
import { ContactUs } from '../../components/Essentials/ContactUs';
import { Footer } from '../../components/Essentials/Footer';
import { heroImages, pastEvents, upcomingEvents, achievements } from './data/content';
import { societiesData } from './data/societiesData';
import { councilsData } from './data/councilsData';

function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const navigate = useNavigate();
  
  const sectionIds = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Societies', id: 'societies' },
    { name: 'Councils', id: 'councils' },
    { name: 'Events', id: 'events' },
    { name: 'Achievements', id: 'achievements' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80) { // header height
            setActiveSection(sectionIds[i].name);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveSection('Home');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { name: 'Home', action: () => scrollToSection('hero') },
    { name: 'About', action: () => scrollToSection('about') },
    { 
      name: 'Societies', 
      action: () => scrollToSection('societies'),
      dropdown: [
        { name: 'All Societies', action: () => navigate('/societies') },
        ...societiesData.map(s => ({ name: s.name, action: () => navigate(`/societies/${s.id}`) }))
      ]
    },
    { 
      name: 'Councils', 
      action: () => scrollToSection('councils'),
      dropdown: [
        { name: 'All Councils', action: () => navigate('/councils') },
        ...councilsData.map(c => ({ name: c.name, action: () => navigate(`/councils/${c.id}`) }))
      ]
    },
    { 
      name: 'Events', 
      action: () => scrollToSection('events'),
      dropdown: [
        { name: 'Past Events', action: () => navigate('/past-events') },
        { name: 'Upcoming Events', action: () => navigate('/upcoming-events') }
      ]
    },
    { 
      name: 'Achievements', 
      action: () => scrollToSection('achievements'),
      dropdown: [
        { name: 'All Achievements', action: () => navigate('/achievements') }
      ]
    },
    { 
      name: 'Gallery',
      action: () => scrollToSection('gallery'),
      dropdown: [
        { name: 'View Full Gallery', action: () => navigate('/gallery') }
      ]
    },
    { name: 'FAQs', action: () => scrollToSection('faqs') }
  ];

  return (
    <div className="min-h-screen bg-professional-surface">
      <Header navigationItems={navigationItems} activeSection={activeSection} />
      <HeroSection heroImages={heroImages} onScrollToSection={scrollToSection} />
      <VisionMission />
      <Stats 
        members={societiesData.reduce((sum, s) => sum + (s.stats?.members || 0), 0)}
        events={societiesData.reduce((sum, s) => sum + (s.stats?.events || 0), 0)}
        awards={societiesData.reduce((sum, s) => sum + (s.stats?.awards || 0), 0)}
      />
      <SocietiesSection societies={societiesData} />
      <CouncilsSection councils={councilsData} />
      <EventsSection pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
      <AchievementsSection achievements={achievements} />
      <PartnersSection />
      <GallerySection />
      <SBSlate />
      <FAQsSection />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Header } from '../../components/Essentials/Header';
import { Footer } from '../../components/Essentials/Footer';
import DetailLayout from '../../components/DetailLayout';

export default function SocietyDetail() {
  const { societyId } = useParams();
  const { getSociety, getAllSocieties, isInitialized } = useData();
  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSociety = async () => {
      if (!isInitialized) return;
      
      try {
        setLoading(true);
        
        // Try to get society by ID (numeric)
        let societyData;
        if (!isNaN(societyId)) {
          // If societyId is numeric, fetch directly
          societyData = await getSociety(societyId);
        } else {
          // If societyId is a string slug, search all societies to find a match
          const allSocieties = await getAllSocieties();
          
          // Convert slug to potential society name matches
          const slugToNameMap = {
            'ieee-hkn-society': ['IEEE HKN Society', 'HKN Society'],
            'ieee-circuits-society': ['IEEE Circuits and Systems Society', 'Circuits Society'],
            'ieee-signal-processing': ['IEEE Signal Processing Society', 'Signal Processing Society'],
            'ieee-communication': ['IEEE Communication Society', 'Communication Society'],
            'ieee-computer-society': ['IEEE Computer Society', 'Computer Society'],
            'ieee-robotics': ['IEEE Robotics and Automation Society', 'Robotics Society']
          };
          
          const possibleNames = slugToNameMap[societyId] || [
            societyId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          ];
          
          societyData = allSocieties?.find(s => 
            possibleNames.some(name => 
              s.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(s.name.toLowerCase())
            )
          );
        }
        
        setSociety(societyData);
        setError(null);
      } catch (err) {
        setError('Failed to load society details');
        setSociety(null);
      } finally {
        setLoading(false);
      }
    };

    loadSociety();
  }, [societyId, getSociety, isInitialized]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !society) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Society Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error || 'The society you are looking for does not exist.'}
            </p>
            <a 
              href="/societies" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              View All Societies
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <DetailLayout data={{
        ...society,
        stats: {
          ...society.stats,
          members: society.studentMemberCount || 0, // Use studentMemberCount for public display
          events: society.stats?.events || 0,
          awards: society.stats?.awards || 0
        }
      }} />
      <Footer />
    </>
  );
} 

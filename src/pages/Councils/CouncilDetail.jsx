import React from 'react';
import { useParams } from 'react-router-dom';
import { councilsData } from '../Landing/data/councilsData';
import { Header } from '../../components/Essentials/Header';
import { Footer } from '../../components/Essentials/Footer';
import DetailLayout from '../../components/DetailLayout';

export default function CouncilDetail() {
  const { councilId } = useParams();
  const council = councilsData.find(c => c.id === councilId);

  if (!council) return <div className="p-8">Council not found.</div>;

  return (
    <>
      <Header />
      <DetailLayout data={council} />
      <Footer />
    </>
  );
} 

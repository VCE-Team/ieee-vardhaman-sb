import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('Dashboard - User object:', user); // Debug log
      console.log('Dashboard - User role:', user.role); // Debug log
      console.log('Dashboard - User entityId:', user.entityId); // Debug log
      
      // Use the user's role and entityId to navigate to the correct dashboard
      if (user.role === 'SOCIETY_ADMIN' && user.entityId) {
        console.log('Redirecting society admin to society:', user.entityId);
        navigate(`/societies/${user.entityId}/dashboard`);
      } else if (user.role === 'COUNCIL_ADMIN' && user.entityId) {
        console.log('Redirecting council admin to council:', user.entityId);
        navigate(`/councils/${user.entityId}/dashboard`);
      } else {
        console.log('User role not recognized or missing entityId, redirecting to unauthorized');
        navigate('/unauthorized');
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default Dashboard;

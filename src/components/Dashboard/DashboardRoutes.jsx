import React from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Import all dashboard management components
import DashboardOverview from './DashboardOverview';
import PastEventsManagement from './PastEventsManagement';
import UpcomingEventsManagement from './UpcomingEventsManagement';
import AchievementsManagement from './AchievementsManagement';
import GalleryManagement from './GalleryManagement';
import Settings from './Settings';

const DashboardRoutes = () => {
  const { user } = useAuth();
  const { entityId } = useParams();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has appropriate role for dashboard access
  if (!user.role || (user.role !== 'SOCIETY_ADMIN' && user.role !== 'COUNCIL_ADMIN' && user.role !== 'ADMIN')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If no entityId in URL, redirect to user's appropriate dashboard
  if (!entityId) {
    // Since we're using the simplified routing approach, redirect back to /dashboard
    // which will handle the proper redirection based on role
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/past-events" element={<PastEventsManagement />} />
          <Route path="/upcoming-events" element={<UpcomingEventsManagement />} />
          <Route path="/achievements" element={<AchievementsManagement />} />
          <Route path="/gallery" element={<GalleryManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardRoutes;

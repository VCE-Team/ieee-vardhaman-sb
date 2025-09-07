import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, type = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  const params = useParams();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access with entity verification
  if (type) {
    const entityId = params.societyId || params.councilId;
    
    if (type === 'society') {
      // Check if user is a society admin
      if (user.role !== 'SOCIETY_ADMIN') {
        return <Navigate to="/unauthorized" replace />;
      }
      
      // Check if user has access to this specific society
      if (entityId && user.entityId && user.entityId.toString() !== entityId) {
        return <Navigate to="/unauthorized" replace />;
      }
    } else if (type === 'council') {
      // Check if user is a council admin
      if (user.role !== 'COUNCIL_ADMIN') {
        return <Navigate to="/unauthorized" replace />;
      }
      
      // Check if user has access to this specific council
      if (entityId && user.entityId && user.entityId.toString() !== entityId) {
        return <Navigate to="/unauthorized" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;

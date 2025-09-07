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
    
    console.log('ProtectedRoute - Checking access:', { 
      type, 
      userRole: user.role, 
      userEntityId: user.entityId, 
      requestedEntityId: entityId 
    });
    
    if (type === 'society') {
      // Check if user is a society admin
      if (user.role !== 'SOCIETY_ADMIN') {
        console.log('Access denied: User is not a society admin, role:', user.role);
        return <Navigate to="/unauthorized" replace />;
      }
      
      // Check if user has access to this specific society
      if (entityId && user.entityId && user.entityId.toString() !== entityId) {
        console.log(`Access denied: User entityId (${user.entityId}) doesn't match society ID (${entityId})`);
        return <Navigate to="/unauthorized" replace />;
      }
    } else if (type === 'council') {
      // Check if user is a council admin
      if (user.role !== 'COUNCIL_ADMIN') {
        console.log('Access denied: User is not a council admin, role:', user.role);
        return <Navigate to="/unauthorized" replace />;
      }
      
      // Check if user has access to this specific council
      if (entityId && user.entityId && user.entityId.toString() !== entityId) {
        console.log(`Access denied: User entityId (${user.entityId}) doesn't match council ID (${entityId})`);
        return <Navigate to="/unauthorized" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;

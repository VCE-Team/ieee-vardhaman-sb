import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, User, LogOut } from 'lucide-react';

const AuthButton = ({ className = '' }) => {
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated) {
    // Determine the correct dashboard URL based on user role
    const dashboardUrl = user?.role === 'SOCIETY_ADMIN' 
      ? `/dashboard/${user.societyId}` 
      : user?.role === 'COUNCIL_ADMIN'
      ? `/dashboard/${user.councilId}`
      : '/dashboard';

    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <Link
          to={dashboardUrl}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <User className="w-4 h-4 mr-2" />
          Dashboard
        </Link>
        <button
          onClick={logout}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className={`inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors ${className}`}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Login
    </Link>
  );
};

export default AuthButton;

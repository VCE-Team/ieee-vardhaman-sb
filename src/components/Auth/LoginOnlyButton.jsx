import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginOnlyButton = ({ className = '' }) => {
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

export default LoginOnlyButton;

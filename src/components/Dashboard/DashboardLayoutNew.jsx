import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { entityId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getEntityType = () => {
    return user?.role === 'SOCIETY_ADMIN' ? 'Society' : 'Council';
  };

  const getNavigation = () => {
    const basePath = `/dashboard/${entityId}`;
    
    return [
      {
        name: 'Overview',
        href: basePath,
        icon: LayoutDashboard,
        current: location.pathname === basePath
      },
      {
        name: 'Past Events',
        href: `${basePath}/past-events`,
        icon: Calendar,
        current: location.pathname.includes('/past-events')
      },
      {
        name: 'Upcoming Events',
        href: `${basePath}/upcoming-events`,
        icon: Calendar,
        current: location.pathname.includes('/upcoming-events')
      },
      {
        name: 'Achievements',
        href: `${basePath}/achievements`,
        icon: Trophy,
        current: location.pathname.includes('/achievements')
      },
      {
        name: 'Gallery',
        href: `${basePath}/gallery`,
        icon: ImageIcon,
        current: location.pathname.includes('/gallery')
      },
      {
        name: 'Settings',
        href: `${basePath}/settings`,
        icon: Settings,
        current: location.pathname.includes('/settings')
      }
    ];
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed inset-y-0 left-0 w-80 z-50 md:hidden"
          >
            <Sidebar
              navigation={navigation}
              user={user}
              entityType={getEntityType()}
              onLogout={handleLogout}
              onClose={() => setSidebarOpen(false)}
              mobile={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar
          navigation={navigation}
          user={user}
          entityType={getEntityType()}
          onLogout={handleLogout}
          mobile={false}
        />
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 ml-4 md:ml-0">
                {getEntityType()} Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({ navigation, user, entityType, onLogout, onClose, mobile }) => {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    navigate(href);
    if (mobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">IEEE</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{entityType}</h2>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
        {mobile && (
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                item.current
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;

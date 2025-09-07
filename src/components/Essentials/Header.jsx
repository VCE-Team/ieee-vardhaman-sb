import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Bell } from 'lucide-react';
import { notifications } from '../../pages/Landing/data/notifications';
import { societies, councils } from '../../pages/Landing/data/content';
import AuthButton from '../Auth/AuthButton';
import { Button } from '../UI/ProfessionalComponents';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const navigationItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Societies', 
      path: '/societies',
      dropdown: [
        { name: 'All Societies', path: '/societies' },
        ...societies.map(s => ({ 
          name: s.name, 
          path: `/societies/${s.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase()}` 
        }))
      ]
    },
    { 
      name: 'Councils', 
      path: '/councils',
      dropdown: [
        { name: 'All Councils', path: '/councils' },
        ...councils.map(c => ({ 
          name: c.name, 
          path: `/councils/${c.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase()}` 
        }))
      ]
    },
    {
      name: 'Events',
      dropdown: [
        { name: 'Past Events', path: '/past-events' },
        { name: 'Upcoming Events', path: '/upcoming-events' },
      ]
    },
    {
      name: 'Achievements',
      dropdown: [
        { name: 'All Achievements', path: '/achievements' },
      ]
    },
    {
      name: 'Gallery',
      dropdown: [
        { name: 'View Full Gallery', path: '/gallery' },
      ]
    },
    { name: 'Contact', path: '/contact' },
    { name: 'Journey', path: '/journey' },
    { name: 'Newsletters', path: '/newsletters' }
  ];

  // Determine which nav item should be active based on the current path
  const pathname = location.pathname;
  let activeSection = 'Home';
  let notificationsActive = false;
  if (pathname.startsWith('/societies')) activeSection = 'Societies';
  else if (pathname.startsWith('/councils')) activeSection = 'Councils';
  else if (pathname === '/past-events' || pathname === '/upcoming-events') activeSection = 'Events';
  else if (pathname.startsWith('/achievements')) activeSection = 'Achievements';
  else if (pathname.startsWith('/gallery')) activeSection = 'Gallery';
  else if (pathname.startsWith('/newsletters')) activeSection = 'Newsletters';
  else if (pathname.startsWith('/journey')) activeSection = 'Journey';
  else if (pathname.startsWith('/contact')) activeSection = 'Contact';
  else if (pathname === '/notifications') {
    notificationsActive = true;
    activeSection = '';
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-panel') && !event.target.closest('.notifications-container')) {
        setMobileMenuOpen(false);
        setOpenDropdowns({});
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
        setOpenDropdowns({});
        setNotificationsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleNavigationClick = (item, index) => {
    if (item.dropdown) {
      // If item has dropdown, just toggle the dropdown
      toggleDropdown(index);
    } else {
      // If item doesn't have dropdown, execute action and close menu
      if (item.action) {
        item.action();
      } else {
        navigate(item.path);
      }
      setMobileMenuOpen(false);
      setOpenDropdowns({});
    }
  };

  const handleDropdownItemClick = (dropdownItem) => {
    // Execute the action and close everything
    if (dropdownItem.action) {
      dropdownItem.action();
    } else {
      navigate(dropdownItem.path);
    }
    setTimeout(() => {
      setMobileMenuOpen(false);
      setOpenDropdowns({});
    }, 150);
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event': return '📅';
      case 'achievement': return '🏆';
      case 'reminder': return '⏰';
      case 'membership': return '👥';
      case 'newsletter': return '📰';
      default: return '📢';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-professional-lg z-50 border-b border-professional-border">
      <div className="flex items-center justify-between h-16 w-full px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <img
            className="h-10 w-auto sm:h-12"
            src="https://res.cloudinary.com/doyh3fqr5/image/upload/c_crop,w_1000,h_780/v1750524389/IEEE_VCE_SB_-_TBG_j8tonl.png"
            alt="IEEE VCE SB Logo"
          />
          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-professional-bold text-professional-primary leading-tight">IEEE Vardhaman</h1>
            <span className="text-xs sm:text-sm text-professional-secondary leading-tight">Student Branch</span>
          </div>
        </div>
        {/* Right: Nav + Notifications + Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleNavigationClick(item, index)}
                  className={`px-3 xl:px-4 py-2 text-sm xl:text-base font-medium flex items-center space-x-1 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-0.5
                    ${activeSection === item.name 
                      ? 'text-professional-blue font-professional-bold bg-professional-blue/5 border border-professional-blue/20' 
                      : 'text-professional-secondary'
                    }
                    hover:text-professional-blue hover:bg-professional-blue/10 hover:shadow-professional-sm`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </button>
                                 {item.dropdown && (
                   <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-professional-lg border border-professional-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 ${item.name === 'Societies' || item.name === 'Councils' ? 'max-h-64 overflow-y-auto' : ''}`}>
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <button
                        key={dropdownIndex}
                        onClick={() => handleDropdownItemClick(dropdownItem)}
                        className="block w-full text-left px-4 py-3 text-sm text-professional-secondary hover:bg-professional-blue/5 hover:text-professional-blue transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Notifications */}
          <div className="relative notifications-container">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`relative p-2 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-0.5
                text-professional-secondary hover:text-professional-blue hover:bg-professional-blue/10 hover:shadow-professional-sm
                ${notificationsActive ? 'text-professional-blue ring-2 ring-professional-blue/20 bg-professional-blue/5' : ''}`}
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-professional-error text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-professional-semibold animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-professional-xl border border-professional-border py-2 max-h-96 overflow-y-auto z-50">
                <div className="px-4 py-3 border-b border-professional-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-professional-semibold text-professional-primary">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-professional-blue/10 text-professional-blue text-xs px-3 py-1 rounded-full font-professional-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-professional-surface cursor-pointer border-l-4 transition-all duration-300 hover:transform hover:translate-x-1 ${
                        notification.unread 
                          ? 'border-l-professional-blue bg-professional-blue/5' 
                          : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              notification.unread ? 'text-professional-primary' : 'text-professional-secondary'
                            }`}>
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-professional-blue rounded-full flex-shrink-0 animate-pulse"></div>
                            )}
                          </div>
                          <p className="text-sm text-professional-secondary mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-professional-muted mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-professional-border">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/notifications');
                    }}
                    className="w-full"
                  >
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Auth Button */}
          <AuthButton className="hidden xl:flex" />

          {/* Mobile/Tablet Menu Button */}
          <div className="mobile-menu-container xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-professional-secondary hover:text-professional-blue hover:bg-professional-blue/10 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-professional-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile/Tablet Menu Panel */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm">
          <div className="mobile-menu-panel absolute top-0 right-0 w-80 h-full bg-white shadow-professional-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="px-6 py-6 bg-professional-gradient-primary text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div>
                    <h2 className="text-xl font-professional-bold">IEEE Vardhaman</h2>
                  </div>
                </div>
              </div>
              
              {/* Scrollable Menu Content */}
              <div className="flex-1 overflow-y-auto bg-professional-surface">
                <nav className="py-4">
                  {navigationItems.map((item, index) => (
                    <div key={index} className="mb-1">
                      <button
                        onClick={() => handleNavigationClick(item, index)}
                        className={`w-full text-left px-6 py-4 text-professional-secondary hover:text-professional-blue hover:bg-professional-blue/10 transition-all duration-300 flex items-center justify-between group ${
                          openDropdowns[index] ? 'bg-professional-blue/5 text-professional-blue' : ''
                        }`}
                      >
                        <span className={`font-medium ${
                          openDropdowns[index] || activeSection === item.name 
                            ? 'text-professional-blue font-professional-bold' 
                            : 'text-professional-primary'
                        } group-hover:text-professional-blue`}>
                          {item.name}
                        </span>
                        {item.dropdown && (
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              openDropdowns[index] ? 'rotate-90 text-professional-blue' : 'text-professional-muted'
                            }`} 
                          />
                        )}
                      </button>
                                             {item.dropdown && openDropdowns[index] && (
                         <div className={`bg-white border-l-4 border-professional-blue ml-6 mr-2 rounded-r-lg shadow-professional-sm ${item.name === 'Societies' || item.name === 'Councils' ? 'max-h-64 overflow-y-auto' : ''}`}>
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <button
                              key={dropdownIndex}
                              onClick={() => handleDropdownItemClick(dropdownItem)}
                              className="block w-full text-left px-6 py-3 text-sm text-professional-secondary hover:text-professional-blue hover:bg-professional-blue/5 transition-all duration-200 border-b border-professional-border last:border-b-0"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              
              {/* Menu Footer */}
              <div className="px-6 py-4 bg-white border-t border-professional-border space-y-3">
                <AuthButton className="w-full justify-center" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpenDropdowns({});
                  }}
                  className="w-full"
                >
                  Close Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
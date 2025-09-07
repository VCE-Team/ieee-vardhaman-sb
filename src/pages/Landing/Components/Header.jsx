import React, { useState, useEffect } from 'react';
import { ChevronDown, Bell, Menu, X, ChevronRight } from 'lucide-react';
import { notifications } from '../data/notifications';
import LoginOnlyButton from '../../../components/Auth/LoginOnlyButton';

export function Header({ navigationItems, activeSection }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.notifications-container')) {
        setNotificationsOpen(false);
      }
      if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-panel')) {
        setMobileMenuOpen(false);
        setOpenDropdowns({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint is 1280px
        setMobileMenuOpen(false);
        setOpenDropdowns({});
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigationClick = (item, index) => {
    if (item.dropdown) {
      // If item has dropdown, just toggle the dropdown
      toggleDropdown(index);
    } else {
      // If item doesn't have dropdown, execute action and close menu
      item.action();
      setMobileMenuOpen(false);
      setOpenDropdowns({});
    }
  };

  const handleDropdownItemClick = (action) => {
    // Execute the action and close everything
    action();
    setMobileMenuOpen(false);
    setOpenDropdowns({});
  };

  const toggleDropdown = (index) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between h-16 w-full px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Left: Logo & Title - Remove extra spacing and containers */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <img
            className="h-10 w-auto sm:h-12"
            src="https://res.cloudinary.com/doyh3fqr5/image/upload/c_crop,w_1000,h_780/v1750524389/IEEE_VCE_SB_-_TBG_j8tonl.png"
            alt="IEEE VCE SB Logo"
          />
          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">IEEE Vardhaman</h1>
            <span className="text-xs sm:text-sm text-gray-600 leading-tight">Student Branch</span>
          </div>
        </div>

        {/* Right: Nav + Notifications + Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          {/* Desktop Navigation - Show only on screens larger than 1024px (xl and above) */}
          <nav className="hidden xl:flex space-x-1">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={item.action}
                  className={`px-3 xl:px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1 text-sm xl:text-base
                    ${activeSection === item.name ? 'text-green-600 font-bold  ' : 'text-gray-700'}
                    hover:text-blue-900 hover:bg-gray-50`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </button>
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out ${item.name === 'Societies' ? 'max-h-80 overflow-y-auto' : ''}`}>
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <button
                        key={dropdownIndex}
                        onClick={dropdownItem.action}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-900 transition-colors duration-200"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Button - Desktop */}
          <div className="hidden xl:flex">
            <LoginOnlyButton />
          </div>

          {/* Notifications */}
          <div className="relative notifications-container">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-semibold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors duration-200 ${
                        notification.unread 
                          ? 'border-l-blue-500 bg-blue-50' 
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
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <button 
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    onClick={() => {
                      setNotificationsOpen(false);
                      window.location.href = '/notifications';
                    }}
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile/Tablet Menu Button - Show on screens smaller than xl (up to 1024px) */}
          <div className="mobile-menu-container xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
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

      {/* Floating Mobile/Tablet Menu Panel - Show for screens up to 1024px */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40">
          <div className="mobile-menu-panel absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="px-6 py-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div>
                    <h2 className="text-xl font-bold">IEEE Vardhaman</h2>
                  </div>
                </div>
              </div>
              
              {/* Scrollable Menu Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50">
                <nav className="py-4">
                  {navigationItems.map((item, index) => (
                    <div key={index} className="mb-1">
                      <button
                        onClick={() => handleNavigationClick(item, index)}
                        className={`w-full text-left px-6 py-4 text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 flex items-center justify-between group ${
                          openDropdowns[index] ? 'bg-green-50 text-green-700' : ''
                        }`}
                      >
                        <span className={`font-medium ${
                          openDropdowns[index] || activeSection === item.name ? 'text-green-700 font-bold underline underline-offset-4' : 'text-gray-800'
                        } group-hover:text-green-700`}>
                          {item.name}
                        </span>
                        {item.dropdown && (
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openDropdowns[index] ? 'rotate-90 text-green-600' : 'text-gray-400'
                            }`} 
                          />
                        )}
                      </button>
                      {item.dropdown && openDropdowns[index] && (
                        <div className={`bg-white border-l-4 border-green-500 ml-6 mr-2 rounded-r-lg shadow-sm ${item.name === 'Societies' ? 'max-h-80 overflow-y-auto' : ''}`}>
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <button
                              key={dropdownIndex}
                              onClick={() => handleDropdownItemClick(dropdownItem.action)}
                              className="block w-full text-left px-6 py-3 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
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
              <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-3">
                {/* Auth Button - Mobile */}
                <div className="w-full">
                  <LoginOnlyButton className="w-full justify-center" />
                </div>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpenDropdowns({});
                  }}
                  className="w-full px-4 py-3 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

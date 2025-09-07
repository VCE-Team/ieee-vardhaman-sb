import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useParams, Link } from 'react-router-dom';
import MemberModal from '../../components/Modals/MemberModal';
import EventModal from '../../components/Modals/EventModal';
import AchievementModal from '../../components/Modals/AchievementModal';
import GalleryModal from '../../components/Modals/GalleryModal';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Camera, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  BarChart3,
  Settings,
  Bell,
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const SocietyDashboard = () => {
  const { user, logout } = useAuth();
  const { getSociety, autoCategorizeSocietyEvents, isInitialized } = useData();
  const { societyId } = useParams();
  const [societyData, setSocietyData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const loadSocietyData = async () => {
    console.log('SocietyDashboard - societyId:', societyId);
    try {
      // First, auto-categorize events based on dates
      await autoCategorizeSocietyEvents(societyId);
      
      const society = await getSociety(societyId);
      console.log('SocietyDashboard - found society:', society);
      setSocietyData(society);
    } catch (error) {
      console.error('Error loading society data:', error);
      setSocietyData(null);
    }
  };

  useEffect(() => {
    if (!isInitialized) return;
    loadSocietyData();
  }, [societyId, getSociety, isInitialized]);

  if (!isInitialized || !societyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isInitialized ? 'Initializing...' : 'Loading society data...'}
          </p>
          <p className="text-sm text-gray-400 mt-2">Society ID: {societyId}</p>
        </div>
      </div>
    );
  }

  const tabContent = {
    overview: <OverviewTab societyData={societyData} />,
    events: <EventsTab societyData={societyData} societyId={societyId} onRefresh={loadSocietyData} />,
    members: <MembersTab societyData={societyData} societyId={societyId} onRefresh={loadSocietyData} />,
    gallery: <GalleryTab societyData={societyData} societyId={societyId} onRefresh={loadSocietyData} />,
    achievements: <AchievementsTab societyData={societyData} societyId={societyId} onRefresh={loadSocietyData} />,
    settings: <SettingsTab societyData={societyData} societyId={societyId} onRefresh={loadSocietyData} />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={societyData.image}
                alt={societyData.name}
                className="w-12 h-12 rounded-lg object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{societyData.name}</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to={`/societies/${societyId}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Public Page
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="bg-white rounded-lg shadow p-6">
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'events', label: 'Events', icon: Calendar },
                  { id: 'members', label: 'Slate Members', icon: Users },
                  { id: 'gallery', label: 'Gallery', icon: Camera },
                  { id: 'achievements', label: 'Achievements', icon: Trophy },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              {tabContent[activeTab]}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ societyData }) => {
  // Calculate counts from actual data
  const slateCount = societyData.slate?.length || 0;
  const studentMemberCount = societyData.studentMemberCount || 0;
  const pastEventsCount = societyData.events?.past?.length || 0;
  const upcomingEventsCount = societyData.events?.upcoming?.length || 0;
  const totalEventsCount = pastEventsCount + upcomingEventsCount;
  const achievementsCount = societyData.achievements?.length || 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{slateCount}</h3>
              <p className="text-sm text-gray-600">Slate Members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{studentMemberCount}</h3>
              <p className="text-sm text-gray-600">Student Members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{pastEventsCount}</h3>
              <p className="text-sm text-gray-600">Events Conducted</p>
              <p className="text-xs text-gray-500">{upcomingEventsCount} upcoming</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{achievementsCount}</h3>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events ({pastEventsCount} conducted)</h3>
          <div className="space-y-3">
            {(societyData.events?.past?.length > 0) ? (
              societyData.events.past
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent first
                .slice(0, 3)
                .map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    {event.location && <p className="text-xs text-gray-500">📍 {event.location}</p>}
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No events conducted yet</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events ({upcomingEventsCount} planned)</h3>
          <div className="space-y-3">
            {(societyData.events?.upcoming?.length > 0) ? (
              societyData.events.upcoming
                .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by earliest first
                .slice(0, 3)
                .map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    {event.location && <p className="text-xs text-gray-500">📍 {event.location}</p>}
                    {event.time && <p className="text-xs text-gray-500">⏰ {event.time}</p>}
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No upcoming events planned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Events Tab Component
const EventsTab = ({ societyData, societyId, onRefresh }) => {
  const { addSocietyEvent, updateSocietyEvent, deleteSocietyEvent, moveEventToPast } = useData();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingEventType, setEditingEventType] = useState('upcoming');
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [showAddPastEvent, setShowAddPastEvent] = useState(false);

  const handleAddEvent = (type = 'upcoming') => {
    setEditingEvent(null);
    setEditingEventType(type);
    setShowAddPastEvent(type === 'past');
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event, index, type) => {
    setEditingEvent(event);
    setEditingEventIndex(index);
    setEditingEventType(type);
    setShowAddPastEvent(type === 'past');
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        await updateSocietyEvent(societyId, editingEventIndex, eventData, editingEventType);
      } else {
        // Add event type for manual past event addition
        if (showAddPastEvent) {
          eventData.date = eventData.date || new Date().toISOString().split('T')[0];
        }
        await addSocietyEvent(societyId, eventData);
      }
      setEditingEvent(null);
      setEditingEventIndex(null);
      setShowAddPastEvent(false);
      setIsEventModalOpen(false);
      // Refresh the society data to show updated events
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error('Error saving event:', error);
      // Handle error (show toast/alert)
    }
  };

  const handleDeleteEvent = async (index, type) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteSocietyEvent(societyId, index, type);
        // Refresh the society data to show updated events
        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        // Handle error (show toast/alert)
      }
    }
  };

  const handleMoveToPast = async (index) => {
    if (window.confirm('Are you sure you want to move this event to past events?')) {
      try {
        await moveEventToPast(societyId, index);
        // Refresh the society data to show updated events
        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error('Error moving event to past:', error);
        // Handle error (show toast/alert)
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleAddEvent('upcoming')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Upcoming Event
          </button>
          <button 
            onClick={() => handleAddEvent('past')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Past Event
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {(societyData.events?.upcoming?.length > 0) ? (
              societyData.events.upcoming.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} {event.time && `at ${event.time}`}</p>
                    {event.location && <p className="text-sm text-gray-500">📍 {event.location}</p>}
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    {event.organizer && <p className="text-xs text-gray-400 mt-1">Organized by: {event.organizer}</p>}
                    {event.capacity && <p className="text-xs text-gray-400">Capacity: {event.capacity}</p>}
                    {event.registrationLink && (
                      <a 
                        href={event.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Registration Link
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleMoveToPast(index)}
                      className="text-orange-600 hover:text-orange-800"
                      title="Move to Past Events"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditEvent(event, index, 'upcoming')}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Event"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(index, 'upcoming')}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No upcoming events. Add your first event!</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Events</h3>
          <div className="space-y-3">
            {(societyData.events?.past?.length > 0) ? (
              societyData.events.past.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} {event.time && `at ${event.time}`}</p>
                    {event.location && <p className="text-sm text-gray-500">📍 {event.location}</p>}
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    {event.organizer && <p className="text-xs text-gray-400 mt-1">Organized by: {event.organizer}</p>}
                    {event.capacity && <p className="text-xs text-gray-400">Capacity: {event.capacity}</p>}
                    {event.image && (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-20 h-20 object-cover rounded mt-2"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleEditEvent(event, index, 'past')}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Event"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(index, 'past')}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No past events recorded.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setShowAddPastEvent(false);
        }}
        onSave={handleSaveEvent}
        event={editingEvent}
        title={editingEvent ? 'Edit Event' : (showAddPastEvent ? 'Add Past Event' : 'Add New Event')}
        isPastEvent={showAddPastEvent}
      />
    </div>
  );
};

// Members Tab Component
const MembersTab = ({ societyData, societyId, onRefresh }) => {
  const { addSocietyMember, updateSocietyMember, deleteSocietyMember } = useData();
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editingMemberIndex, setEditingMemberIndex] = useState(null);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsMemberModalOpen(true);
  };

  const handleEditMember = (member, index) => {
    setEditingMember(member);
    setEditingMemberIndex(index);
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = async (memberData) => {
    try {
      if (editingMember) {
        await updateSocietyMember(societyId, editingMemberIndex, memberData);
      } else {
        await addSocietyMember(societyId, memberData);
      }
      setEditingMember(null);
      setEditingMemberIndex(null);
      setIsMemberModalOpen(false);
      // Refresh the society data to show updated members
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error('Error saving member:', error);
      // Handle error (show toast/alert)
    }
  };

  const handleDeleteMember = async (index) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        await deleteSocietyMember(societyId, index);
        // Refresh the society data to show updated members
        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error('Error deleting member:', error);
        // Handle error (show toast/alert)
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Slate Members Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage organizational positions like Chair, Vice Chair, Advisor, etc.</p>
        </div>
        <button 
          onClick={handleAddMember}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Slate Member
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(societyData.slate?.length > 0) ? (
          societyData.slate.map((member, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x64?text=' + (member.name ? member.name.charAt(0) : '?');
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-semibold text-lg">
                      {member.name ? member.name.charAt(0) : '?'}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{member.name || 'TBA'}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  {member.email && <p className="text-xs text-gray-500">{member.email}</p>}
                </div>
              </div>
              {member.bio && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{member.bio}</p>
              )}
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => handleEditMember(member, index)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit Member"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteMember(index)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg mb-2">No slate members added yet</p>
            <p className="text-sm">Add your first organizational member (Chair, Vice Chair, Advisor, etc.)!</p>
          </div>
        )}
      </div>

      <MemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onSave={handleSaveMember}
        member={editingMember}
        title={editingMember ? 'Edit Member' : 'Add New Member'}
      />
    </div>
  );
};

// Gallery Tab Component
const GalleryTab = ({ societyData, societyId }) => {
  const { addSocietyGalleryItem, updateSocietyGalleryItem, deleteSocietyGalleryItem } = useData();
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [editingGalleryIndex, setEditingGalleryIndex] = useState(null);

  const handleAddGalleryItem = () => {
    setEditingGalleryItem(null);
    setIsGalleryModalOpen(true);
  };

  const handleEditGalleryItem = (item, index) => {
    setEditingGalleryItem(item);
    setEditingGalleryIndex(index);
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = (itemData) => {
    if (editingGalleryItem) {
      updateSocietyGalleryItem(societyId, editingGalleryIndex, itemData);
    } else {
      addSocietyGalleryItem(societyId, itemData);
    }
    setEditingGalleryItem(null);
    setEditingGalleryIndex(null);
  };

  const handleDeleteGalleryItem = (index) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      deleteSocietyGalleryItem(societyId, index);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
        <button 
          onClick={handleAddGalleryItem}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Photo
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(societyData.gallery?.length > 0) ? (
          societyData.gallery.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                }}
              />
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-1">{item.caption}</h4>
                {item.event && <p className="text-sm text-gray-600 mb-1">📅 {item.event}</p>}
                {item.date && <p className="text-xs text-gray-500 mb-2">{item.date}</p>}
                {item.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>}
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => handleEditGalleryItem(item, index)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Photo"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteGalleryItem(index)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg mb-2">No photos added yet</p>
            <p className="text-sm">Upload your first photo to showcase your society's activities!</p>
          </div>
        )}
      </div>

      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        onSave={handleSaveGalleryItem}
        galleryItem={editingGalleryItem}
        title={editingGalleryItem ? 'Edit Photo' : 'Add New Photo'}
      />
    </div>
  );
};

// Achievements Tab Component
const AchievementsTab = ({ societyData, societyId, onRefresh }) => {
  const { addSocietyAchievement, updateSocietyAchievement, deleteSocietyAchievement } = useData();
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [editingAchievementIndex, setEditingAchievementIndex] = useState(null);

  const handleAddAchievement = () => {
    setEditingAchievement(null);
    setIsAchievementModalOpen(true);
  };

  const handleEditAchievement = (achievement, index) => {
    setEditingAchievement(achievement);
    setEditingAchievementIndex(index);
    setIsAchievementModalOpen(true);
  };

  const handleSaveAchievement = async (achievementData) => {
    try {
      if (editingAchievement) {
        await updateSocietyAchievement(societyId, editingAchievementIndex, achievementData);
      } else {
        await addSocietyAchievement(societyId, achievementData);
      }
      setEditingAchievement(null);
      setEditingAchievementIndex(null);
      setIsAchievementModalOpen(false);
      // Refresh the society data to show updated achievements
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      // Handle error (show toast/alert)
    }
  };

  const handleDeleteAchievement = async (index) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteSocietyAchievement(societyId, index);
        // Refresh the society data to show updated achievements
        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error('Error deleting achievement:', error);
        // Handle error (show toast/alert)
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Achievements Management</h2>
        <button 
          onClick={handleAddAchievement}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </button>
      </div>
      
      <div className="space-y-4">
        {(societyData.achievements?.length > 0) ? (
          societyData.achievements.map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start flex-1">
                  {achievement.image && (
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-20 h-20 rounded-lg object-cover mr-4 flex-shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=🏆';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium text-gray-900 text-lg">{achievement.title}</h3>
                      <span className="ml-3 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                        {achievement.year}
                      </span>
                    </div>
                    {achievement.category && (
                      <p className="text-sm text-blue-600 mb-1">📂 {achievement.category}</p>
                    )}
                    {achievement.awardedBy && (
                      <p className="text-sm text-gray-600 mb-1">🏛️ Awarded by: {achievement.awardedBy}</p>
                    )}
                    {achievement.recipient && (
                      <p className="text-sm text-gray-600 mb-1">👤 Recipient: {achievement.recipient}</p>
                    )}
                    {achievement.value && (
                      <p className="text-sm text-gray-600 mb-1">💰 {achievement.value}</p>
                    )}
                    <p className="text-sm text-gray-700 mt-2">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-2">📅 {achievement.date}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleEditAchievement(achievement, index)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Achievement"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteAchievement(index)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Achievement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg mb-2">No achievements added yet</p>
            <p className="text-sm">Record your society's first achievement!</p>
          </div>
        )}
      </div>

      <AchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
        onSave={handleSaveAchievement}
        achievement={editingAchievement}
        title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
        societyName={societyData.name}
      />
    </div>
  );
};

// Settings Tab Component
const SettingsTab = ({ societyData, societyId, onRefresh }) => {
  const { updateSocietyInfo } = useData();
  const [formData, setFormData] = useState({
    name: societyData.name || '',
    description: societyData.description || '',
    vision: societyData.vision || '',
    mission: societyData.mission || '',
    objectives: societyData.objectives || '',
    image: societyData.image || '',
    studentMemberCount: societyData.studentMemberCount || 0
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      await updateSocietyInfo(societyId, formData);
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      // Refresh the society data to show updated information
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Society Settings</h2>
      
      {saveMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          saveMessage.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          <div className="flex items-center">
            {saveMessage.includes('Error') ? (
              <AlertCircle className="w-5 h-5 mr-2" />
            ) : (
              <Trophy className="w-5 h-5 mr-2" />
            )}
            {saveMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Society Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter society name"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Society Logo/Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter logo/image URL"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter society description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Member Count</label>
              <input
                type="number"
                name="studentMemberCount"
                value={formData.studentMemberCount}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter total student members"
              />
              <p className="text-xs text-gray-500 mt-1">Total number of registered student members</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision & Mission</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter society vision"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter society mission"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objectives</label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter society objectives"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocietyDashboard;

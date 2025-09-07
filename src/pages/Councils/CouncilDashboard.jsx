import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useParams, Link } from 'react-router-dom';
import MemberModal from '../../components/Modals/MemberModal';
import EventModal from '../../components/Modals/EventModal';
import AchievementModal from '../../components/Modals/AchievementModal';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  BarChart3,
  Settings,
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const CouncilDashboard = () => {
  const { user, logout } = useAuth();
  const { getCouncil, isInitialized } = useData();
  const { councilId } = useParams();
  const [councilData, setCouncilData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isInitialized) return;
    
    const loadCouncilData = async () => {
      try {
        const council = await getCouncil(councilId);
        setCouncilData(council);
      } catch (error) {
        setCouncilData(null);
      }
    };

    loadCouncilData();
  }, [councilId, getCouncil, isInitialized]);

  if (!isInitialized || !councilData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isInitialized ? 'Initializing...' : 'Loading council data...'}
          </p>
          <p className="text-sm text-gray-400 mt-2">Council ID: {councilId}</p>
        </div>
      </div>
    );
  }

  const tabContent = {
    overview: <OverviewTab councilData={councilData} />,
    events: <EventsTab councilData={councilData} councilId={councilId} />,
    members: <MembersTab councilData={councilData} councilId={councilId} />,
    achievements: <AchievementsTab councilData={councilData} councilId={councilId} />,
    settings: <SettingsTab councilData={councilData} councilId={councilId} />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={councilData.image}
                alt={councilData.name}
                className="w-12 h-12 rounded-lg object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{councilData.name}</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to={`/councils/${councilId}`}
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
                  { id: 'members', label: 'Members', icon: Users },
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
const OverviewTab = ({ councilData }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
    
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-blue-600" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{councilData.stats.members}</h3>
            <p className="text-sm text-gray-600">Total Members</p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-green-600" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{councilData.stats.events}</h3>
            <p className="text-sm text-gray-600">Events Hosted</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-6">
        <div className="flex items-center">
          <Trophy className="w-8 h-8 text-yellow-600" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{councilData.stats.awards}</h3>
            <p className="text-sm text-gray-600">Awards Won</p>
          </div>
        </div>
      </div>
    </div>

    {/* Council Information */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision</h3>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{councilData.vision}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission</h3>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{councilData.mission}</p>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
        <div className="space-y-3">
          {councilData.events.past.slice(0, 3).map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {councilData.events.upcoming.slice(0, 3).map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Events Tab Component
const EventsTab = ({ councilData, councilId }) => {
  const { addCouncilEvent, updateCouncilEvent, deleteCouncilEvent } = useData();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingEventType, setEditingEventType] = useState('upcoming');
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setEditingEventType('upcoming');
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event, index, type) => {
    setEditingEvent(event);
    setEditingEventIndex(index);
    setEditingEventType(type);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      updateCouncilEvent(councilId, editingEventIndex, eventData, editingEventType);
    } else {
      addCouncilEvent(councilId, eventData, editingEventType);
    }
    setEditingEvent(null);
    setEditingEventIndex(null);
  };

  const handleDeleteEvent = (index, type) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteCouncilEvent(councilId, index, type);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
        <button 
          onClick={handleAddEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Event
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {councilData.events.upcoming.length > 0 ? (
              councilData.events.upcoming.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} {event.time && `at ${event.time}`}</p>
                    {event.location && <p className="text-sm text-gray-500">📍 {event.location}</p>}
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    {event.organizer && <p className="text-xs text-gray-400 mt-1">Organized by: {event.organizer}</p>}
                  </div>
                  <div className="flex space-x-2 ml-4">
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
            {councilData.events.past.length > 0 ? (
              councilData.events.past.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} {event.time && `at ${event.time}`}</p>
                    {event.location && <p className="text-sm text-gray-500">📍 {event.location}</p>}
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    {event.organizer && <p className="text-xs text-gray-400 mt-1">Organized by: {event.organizer}</p>}
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
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
      />
    </div>
  );
};

// Members Tab Component
const MembersTab = ({ councilData, councilId }) => {
  const { addCouncilMember, updateCouncilMember, deleteCouncilMember } = useData();
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

  const handleSaveMember = (memberData) => {
    if (editingMember) {
      updateCouncilMember(councilId, editingMemberIndex, memberData);
    } else {
      addCouncilMember(councilId, memberData);
    }
    setEditingMember(null);
    setEditingMemberIndex(null);
  };

  const handleDeleteMember = (index) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      deleteCouncilMember(councilId, index);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Members Management</h2>
        <button 
          onClick={handleAddMember}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {councilData.slate.length > 0 ? (
          councilData.slate.map((member, index) => (
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
            <p className="text-lg mb-2">No members added yet</p>
            <p className="text-sm">Add your first team member to get started!</p>
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

// Achievements Tab Component
const AchievementsTab = ({ councilData, councilId }) => {
  const { addCouncilAchievement, updateCouncilAchievement, deleteCouncilAchievement } = useData();
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

  const handleSaveAchievement = (achievementData) => {
    if (editingAchievement) {
      updateCouncilAchievement(councilId, editingAchievementIndex, achievementData);
    } else {
      addCouncilAchievement(councilId, achievementData);
    }
    setEditingAchievement(null);
    setEditingAchievementIndex(null);
  };

  const handleDeleteAchievement = (index) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      deleteCouncilAchievement(councilId, index);
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
        {councilData.achievements.length > 0 ? (
          councilData.achievements.map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start flex-1">
                  {achievement.image ? (
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-20 h-20 rounded-lg object-cover mr-4 flex-shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=🏆';
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Trophy className="w-10 h-10 text-yellow-600" />
                    </div>
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
            <p className="text-sm">Record your council's first achievement!</p>
          </div>
        )}
      </div>

      <AchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
        onSave={handleSaveAchievement}
        achievement={editingAchievement}
        title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
      />
    </div>
  );
};

// Settings Tab Component
const SettingsTab = ({ councilData, councilId }) => {
  const { updateCouncilInfo } = useData();
  const [editingInfo, setEditingInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: councilData.name || '',
    vision: councilData.vision || '',
    mission: councilData.mission || '',
    email: councilData.email || '',
    phone: councilData.phone || '',
    website: councilData.website || '',
    location: councilData.location || '',
    founded: councilData.founded || '',
    logo: councilData.logo || ''
  });

  const handleEditToggle = () => {
    if (editingInfo) {
      // Reset form data to original values
      setFormData({
        name: councilData.name || '',
        vision: councilData.vision || '',
        mission: councilData.mission || '',
        email: councilData.email || '',
        phone: councilData.phone || '',
        website: councilData.website || '',
        location: councilData.location || '',
        founded: councilData.founded || '',
        logo: councilData.logo || ''
      });
    }
    setEditingInfo(!editingInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateCouncilInfo(councilId, formData);
    setEditingInfo(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Council Settings</h2>
        <div className="space-x-2">
          {editingInfo ? (
            <>
              <button 
                onClick={handleEditToggle}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={handleEditToggle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Information
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Council Information</h3>
          
          {/* Logo Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Council Logo</label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {(editingInfo ? formData.logo : councilData.logo) ? (
                  <img
                    src={editingInfo ? formData.logo : councilData.logo}
                    alt="Council Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/96x96?text=Logo';
                    }}
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-400" />
                )}
              </div>
              {editingInfo && (
                <div className="flex-1">
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    placeholder="Enter logo URL..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Council Name</label>
              {editingInfo ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{councilData.name || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              {editingInfo ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{councilData.email || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {editingInfo ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{councilData.phone || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              {editingInfo ? (
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">
                  {councilData.website ? (
                    <a href={councilData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {councilData.website}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              {editingInfo ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{councilData.location || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
              {editingInfo ? (
                <input
                  type="text"
                  name="founded"
                  value={formData.founded}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{councilData.founded || 'Not specified'}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
            {editingInfo ? (
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2 whitespace-pre-wrap">
                {councilData.vision || 'No vision statement available'}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
            {editingInfo ? (
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2 whitespace-pre-wrap">
                {councilData.mission || 'No mission statement available'}
              </p>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{councilData.members?.length || 0}</p>
            <p className="text-sm text-gray-600">Total Members</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{councilData.events?.length || 0}</p>
            <p className="text-sm text-gray-600">Events</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{councilData.achievements?.length || 0}</p>
            <p className="text-sm text-gray-600">Achievements</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{councilData.gallery?.length || 0}</p>
            <p className="text-sm text-gray-600">Gallery Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouncilDashboard;

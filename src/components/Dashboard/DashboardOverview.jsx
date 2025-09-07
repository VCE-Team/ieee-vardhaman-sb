import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { 
  Calendar, 
  Trophy, 
  ImageIcon, 
  Users, 
  TrendingUp,
  Edit,
  Save,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardOverview = () => {
  const { user } = useAuth();
  const { entityId } = useParams();
  const [entityData, setEntityData] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const isCouncil = user?.role === 'COUNCIL_ADMIN';
  const isSociety = user?.role === 'SOCIETY_ADMIN';

  useEffect(() => {
    loadData();
  }, [entityId]);

  const loadData = async () => {
    try {
      setLoading(true);
      let data;
      
      if (isSociety) {
        data = await apiService.getSocietyDetails(entityId);
        // Load stats
        const [pastEvents, upcomingEvents, achievements, gallery] = await Promise.all([
          apiService.getSocietyPastEvents(entityId),
          apiService.getSocietyUpcomingEvents(entityId),
          apiService.getSocietyAchievements(entityId),
          apiService.getSocietyGallery(entityId)
        ]);
        
        setStats({
          pastEvents: pastEvents.length,
          upcomingEvents: upcomingEvents.length,
          achievements: achievements.length,
          galleryItems: gallery.length
        });
      } else if (isCouncil) {
        data = await apiService.getCouncilDetails(entityId);
        // Load stats
        const [pastEvents, upcomingEvents, achievements, gallery] = await Promise.all([
          apiService.getCouncilPastEvents(entityId),
          apiService.getCouncilUpcomingEvents(entityId),
          apiService.getCouncilAchievements(entityId),
          apiService.getCouncilGallery(entityId)
        ]);
        
        setStats({
          pastEvents: pastEvents.length,
          upcomingEvents: upcomingEvents.length,
          achievements: achievements.length,
          galleryItems: gallery.length
        });
      }
      
      setEntityData(data);
      setEditForm(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let updatedData;
      
      if (isSociety) {
        updatedData = await apiService.updateSociety(entityId, editForm);
      } else if (isCouncil) {
        updatedData = await apiService.updateCouncil(entityId, editForm);
      }
      
      setEntityData(updatedData);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditForm(entityData);
    setEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading && !entityData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Past Events',
      value: stats.pastEvents || 0,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents || 0,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Achievements',
      value: stats.achievements || 0,
      icon: Trophy,
      color: 'bg-yellow-500',
      change: '+15%'
    },
    {
      title: 'Gallery Items',
      value: stats.galleryItems || 0,
      icon: ImageIcon,
      color: 'bg-purple-500',
      change: '+23%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {isCouncil ? 'Council' : 'Society'} Overview
          </h1>
          {!editing && (
            <button
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </button>
          )}
          {editing && (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            {editing ? (
              <input
                type="text"
                value={editForm.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">{entityData?.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Established Year
            </label>
            {editing ? (
              <input
                type="number"
                value={editForm.establishedYear || ''}
                onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{entityData?.establishedYear}</p>
            )}
          </div>

          {isSociety && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Count
              </label>
              {editing ? (
                <input
                  type="number"
                  value={editForm.memberCount || ''}
                  onChange={(e) => handleInputChange('memberCount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{entityData?.memberCount}</p>
              )}
            </div>
          )}

          {isCouncil && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chair Person
              </label>
              {editing ? (
                <input
                  type="text"
                  value={editForm.chairPerson || ''}
                  onChange={(e) => handleInputChange('chairPerson', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{entityData?.chairPerson}</p>
              )}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            {editing ? (
              <textarea
                rows={4}
                value={editForm.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{entityData?.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            {editing ? (
              <input
                type="url"
                value={editForm.imageUrl || ''}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700 break-all">{entityData?.imageUrl}</p>
            )}
          </div>

          {isCouncil && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              {editing ? (
                <input
                  type="url"
                  value={editForm.websiteUrl || ''}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700 break-all">{entityData?.websiteUrl}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">{card.change}</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Create Event
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            Add Achievement
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
            Upload to Gallery
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            Manage Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

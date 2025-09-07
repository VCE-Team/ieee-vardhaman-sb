import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Trophy,
  Calendar,
  ExternalLink,
  Award,
  Medal,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementsManagement = () => {
  const { user } = useAuth();
  const { entityId } = useParams();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    achievedBy: '',
    achievedDate: '',
    category: '',
    competition: '',
    position: '',
    certificate: '',
    image: ''
  });

  const isCouncil = user?.role === 'COUNCIL_ADMIN';
  const isSociety = user?.role === 'SOCIETY_ADMIN';

  const categories = [
    'TECHNICAL',
    'RESEARCH',
    'INNOVATION',
    'LEADERSHIP',
    'COMPETITION',
    'PROJECT',
    'PUBLICATION',
    'COMMUNITY_SERVICE',
    'OTHER'
  ];

  const positions = [
    'FIRST',
    'SECOND',
    'THIRD',
    'WINNER',
    'RUNNER_UP',
    'FINALIST',
    'PARTICIPANT',
    'RECOGNITION'
  ];

  useEffect(() => {
    loadAchievements();
  }, [entityId]);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      let data;
      
      if (isSociety) {
        data = await apiService.getSocietyAchievements(entityId);
      } else if (isCouncil) {
        data = await apiService.getCouncilAchievements(entityId);
      }
      
      setAchievements(data || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAchievement(null);
    setFormData({
      title: '',
      description: '',
      achievedBy: '',
      achievedDate: '',
      category: '',
      competition: '',
      position: '',
      certificate: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      achievedBy: achievement.achievedBy,
      achievedDate: achievement.achievedDate ? achievement.achievedDate.split('T')[0] : '',
      category: achievement.category,
      competition: achievement.competition,
      position: achievement.position,
      certificate: achievement.certificate,
      image: achievement.image
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const achievementData = {
        ...formData,
        achievedDate: formData.achievedDate ? new Date(formData.achievedDate).toISOString() : null
      };

      if (editingAchievement) {
        if (isSociety) {
          await apiService.updateSocietyAchievement(entityId, editingAchievement.id, achievementData);
        } else if (isCouncil) {
          await apiService.updateCouncilAchievement(entityId, editingAchievement.id, achievementData);
        }
      } else {
        if (isSociety) {
          await apiService.createSocietyAchievement(entityId, achievementData);
        } else if (isCouncil) {
          await apiService.createCouncilAchievement(entityId, achievementData);
        }
      }
      
      setShowModal(false);
      loadAchievements();
    } catch (error) {
      alert('Failed to save achievement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (achievementId) => {
    if (!confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    try {
      setLoading(true);
      
      if (isSociety) {
        await apiService.deleteSocietyAchievement(entityId, achievementId);
      } else if (isCouncil) {
        await apiService.deleteCouncilAchievement(entityId, achievementId);
      }
      
      loadAchievements();
    } catch (error) {
      alert('Failed to delete achievement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPositionIcon = (position) => {
    switch (position) {
      case 'FIRST':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'SECOND':
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 'THIRD':
        return <Award className="h-5 w-5 text-orange-500" />;
      case 'WINNER':
        return <Trophy className="h-5 w-5 text-green-500" />;
      default:
        return <Star className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 'FIRST':
        return 'bg-yellow-100 text-yellow-800';
      case 'SECOND':
        return 'bg-gray-100 text-gray-800';
      case 'THIRD':
        return 'bg-orange-100 text-orange-800';
      case 'WINNER':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading && achievements.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Achievement
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              {achievement.image && (
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {achievement.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Position and Category Badges */}
                <div className="flex items-center space-x-2 mb-3">
                  {achievement.position && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(achievement.position)}`}>
                      {getPositionIcon(achievement.position)}
                      <span className="ml-1">{achievement.position}</span>
                    </span>
                  )}
                  {achievement.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {achievement.category}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {achievement.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  {achievement.achievedBy && (
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      <span className="font-medium">Achieved by:</span> {achievement.achievedBy}
                    </div>
                  )}
                  {achievement.achievedDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(achievement.achievedDate)}
                    </div>
                  )}
                  {achievement.competition && (
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-2" />
                      <span className="font-medium">Competition:</span> {achievement.competition}
                    </div>
                  )}
                  {achievement.certificate && (
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <a
                        href={achievement.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {achievements.length === 0 && !loading && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first achievement.</p>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAchievement ? 'Edit Achievement' : 'Create Achievement'}
                </h2>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Achieved By
                    </label>
                    <input
                      type="text"
                      value={formData.achievedBy}
                      onChange={(e) => handleInputChange('achievedBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Achievement Date
                    </label>
                    <input
                      type="date"
                      value={formData.achievedDate}
                      onChange={(e) => handleInputChange('achievedDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Competition/Event
                    </label>
                    <input
                      type="text"
                      value={formData.competition}
                      onChange={(e) => handleInputChange('competition', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position/Rank
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select position</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>
                          {position.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate URL
                  </label>
                  <input
                    type="url"
                    value={formData.certificate}
                    onChange={(e) => handleInputChange('certificate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/certificate.pdf"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/achievement-image.jpg"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading || !formData.title}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsManagement;

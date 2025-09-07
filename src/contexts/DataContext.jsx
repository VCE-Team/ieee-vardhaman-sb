import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../services/apiService';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Since we're using backend API, we don't need to initialize with static data
    // The data will be fetched when needed by the dashboard components
    setIsInitialized(true);
  }, []);

  // Society functions
  // Utility function to create complete society update data
  const createCompleteSocietyUpdateData = useCallback((society, updates = {}) => {
    return {
      id: society.id,
      name: society.name,
      image: society.image,
      description: society.description,
      vision: society.vision,
      mission: society.mission,
      objectives: society.objectives,
      slateMembers: society.slateMembers,
      events: society.events,
      achievements: society.achievements,
      isActive: society.isActive,
      memberCount: society.memberCount,
      studentMemberCount: society.studentMemberCount,
      establishedYear: society.establishedYear,
      // Override with the provided updates
      ...updates
    };
  }, []);

  const getAllSocieties = useCallback(async () => {
    try {
      const societies = await apiService.getAllSocieties();
      return societies;
    } catch (error) {
      return [];
    }
  }, []);

  const getSociety = useCallback(async (societyId) => {
    try {
      const societyData = await apiService.getSocietyDetails(societyId);
      
      // Parse slateMembers JSON if it exists
      if (societyData && societyData.slateMembers) {
        try {
          societyData.slate = JSON.parse(societyData.slateMembers);
        } catch (e) {
          societyData.slate = [];
        }
      } else {
        societyData.slate = [];
      }
      
      // Parse events JSON if it exists
      if (societyData && societyData.events) {
        try {
          societyData.events = JSON.parse(societyData.events);
        } catch (e) {
          societyData.events = { upcoming: [], past: [] };
        }
      } else {
        societyData.events = { upcoming: [], past: [] };
      }
      
      // Get achievements from dedicated endpoint instead of parsing JSON
      try {
        societyData.achievements = await apiService.getSocietyAchievements(societyId);
      } catch (e) {
        // Fallback to parsing JSON if the dedicated endpoint fails
        if (societyData && societyData.achievements) {
          try {
            societyData.achievements = JSON.parse(societyData.achievements);
          } catch (parseError) {
            societyData.achievements = [];
          }
        } else {
          societyData.achievements = [];
        }
      }
      
      return societyData;
    } catch (error) {
      return null;
    }
  }, []);

  const updateSocietyInfo = useCallback(async (societyId, updates) => {
    try {
      // Get current society data
      const society = await apiService.getSocietyDetails(societyId);
      
      // Create complete update data with all required fields
      const updateData = createCompleteSocietyUpdateData(society, updates);
      
      const updatedSociety = await apiService.updateSociety(societyId, updateData);
      return updatedSociety;
    } catch (error) {
      throw error;
    }
  }, [createCompleteSocietyUpdateData]);

  // Society Slate Member functions (using JSON storage in society entity)
  const addSocietyMember = useCallback(async (societyId, member) => {
    try {
      // Get current society data
      const society = await apiService.getSocietyDetails(societyId);
      const currentSlateMembers = society.slateMembers ? JSON.parse(society.slateMembers) : [];
      
      // Add new member to slate
      currentSlateMembers.push(member);
      
      // Update society with new slate members
      const updateData = {
        ...society,
        slateMembers: JSON.stringify(currentSlateMembers),
        memberCount: currentSlateMembers.length
      };
      
      await apiService.updateSociety(societyId, updateData);
      
      return member;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateSocietyMember = useCallback(async (societyId, memberIndex, updates) => {
    try {
      // Get current society data
      const society = await apiService.getSocietyDetails(societyId);
      const currentSlateMembers = society.slateMembers ? JSON.parse(society.slateMembers) : [];
      
      // Update member at index
      if (memberIndex >= 0 && memberIndex < currentSlateMembers.length) {
        currentSlateMembers[memberIndex] = { ...currentSlateMembers[memberIndex], ...updates };
      }
      
      // Update society with modified slate members
      const updateData = {
        ...society,
        slateMembers: JSON.stringify(currentSlateMembers)
      };
      
      await apiService.updateSociety(societyId, updateData);
      
      return currentSlateMembers[memberIndex];
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteSocietyMember = useCallback(async (societyId, memberIndex) => {
    try {
      // Get current society data
      const society = await apiService.getSocietyDetails(societyId);
      const currentSlateMembers = society.slateMembers ? JSON.parse(society.slateMembers) : [];
      
      // Remove member at index
      if (memberIndex >= 0 && memberIndex < currentSlateMembers.length) {
        currentSlateMembers.splice(memberIndex, 1);
      }
      
      // Update society with modified slate members
      const updateData = {
        ...society,
        slateMembers: JSON.stringify(currentSlateMembers),
        memberCount: currentSlateMembers.length
      };
      
      await apiService.updateSociety(societyId, updateData);
      
    } catch (error) {
      throw error;
    }
  }, []);

  // Society Event functions
  const addSocietyEvent = useCallback(async (societyId, event) => {
    try {
      const society = await apiService.getSocietyDetails(societyId);
      const currentEvents = society.events ? JSON.parse(society.events) : { upcoming: [], past: [] };
      
      // Automatically categorize based on date
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const eventWithId = { ...event, id: Date.now() };
      
      if (eventDate < today) {
        currentEvents.past.push(eventWithId);
      } else {
        currentEvents.upcoming.push(eventWithId);
      }
      
      // Create complete update data with all required fields
      const updateData = createCompleteSocietyUpdateData(society, {
        events: JSON.stringify(currentEvents)
      });
      
      return await apiService.updateSociety(societyId, updateData);
    } catch (error) {
      throw error;
    }
  }, [createCompleteSocietyUpdateData]);

  const updateSocietyEvent = useCallback(async (societyId, eventIndex, updates, eventType) => {
    try {
      const society = await apiService.getSocietyDetails(societyId);
      const currentEvents = society.events ? JSON.parse(society.events) : { upcoming: [], past: [] };
      
      // Remove from current category
      if (eventType === 'past') {
        currentEvents.past.splice(eventIndex, 1);
      } else {
        currentEvents.upcoming.splice(eventIndex, 1);
      }
      
      // Re-categorize based on updated date
      const eventDate = new Date(updates.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const updatedEvent = { ...updates, id: updates.id || Date.now() };
      
      if (eventDate < today) {
        currentEvents.past.push(updatedEvent);
      } else {
        currentEvents.upcoming.push(updatedEvent);
      }
      
      // Create complete update data with all required fields
      const updateData = createCompleteSocietyUpdateData(society, {
        events: JSON.stringify(currentEvents)
      });
      
      return await apiService.updateSociety(societyId, updateData);
    } catch (error) {
      throw error;
    }
  }, [createCompleteSocietyUpdateData]);

  const deleteSocietyEvent = useCallback(async (societyId, eventIndex, eventType) => {
    try {
      const society = await apiService.getSocietyDetails(societyId);
      const currentEvents = society.events ? JSON.parse(society.events) : { upcoming: [], past: [] };
      
      if (eventType === 'past') {
        currentEvents.past.splice(eventIndex, 1);
      } else {
        currentEvents.upcoming.splice(eventIndex, 1);
      }
      
      // Create complete update data with all required fields
      const updateData = createCompleteSocietyUpdateData(society, {
        events: JSON.stringify(currentEvents)
      });
      
      return await apiService.updateSociety(societyId, updateData);
    } catch (error) {
      throw error;
    }
  }, [createCompleteSocietyUpdateData]);

  const moveEventToPast = useCallback(async (societyId, eventIndex) => {
    try {
      const society = await apiService.getSocietyDetails(societyId);
      const currentEvents = society.events ? JSON.parse(society.events) : { upcoming: [], past: [] };
      
      // Move event from upcoming to past
      const eventToMove = currentEvents.upcoming.splice(eventIndex, 1)[0];
      if (eventToMove) {
        currentEvents.past.push(eventToMove);
        
        // Create complete update data with all required fields
        const updateData = createCompleteSocietyUpdateData(society, {
          events: JSON.stringify(currentEvents)
        });
        
        return await apiService.updateSociety(societyId, updateData);
      }
    } catch (error) {
      throw error;
    }
  }, [createCompleteSocietyUpdateData]);

  const autoCategorizeSocietyEvents = useCallback(async (societyId) => {
    try {
      const society = await apiService.getSocietyDetails(societyId);
      const currentEvents = society.events ? JSON.parse(society.events) : { upcoming: [], past: [] };
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let hasChanges = false;
      
      // Move expired upcoming events to past
      const stillUpcoming = [];
      for (const event of currentEvents.upcoming) {
        const eventDate = new Date(event.date);
        if (eventDate < today) {
          currentEvents.past.push(event);
          hasChanges = true;
        } else {
          stillUpcoming.push(event);
        }
      }
      currentEvents.upcoming = stillUpcoming;
      
      // Move future past events back to upcoming (in case of data errors)
      const stillPast = [];
      for (const event of currentEvents.past) {
        const eventDate = new Date(event.date);
        if (eventDate >= today) {
          currentEvents.upcoming.push(event);
          hasChanges = true;
        } else {
          stillPast.push(event);
        }
      }
      currentEvents.past = stillPast;
      
      // Update if there were changes
      if (hasChanges) {
        // Create complete update data with all required fields
        const updateData = createCompleteSocietyUpdateData(society, {
          events: JSON.stringify(currentEvents)
        });
        
        await apiService.updateSociety(societyId, updateData);
        return true; // Indicates data was updated
      }
      
      return false; // No changes needed
    } catch (error) {
      return false;
    }
  }, [createCompleteSocietyUpdateData]);

  // Society Achievement functions
  const addSocietyAchievement = useCallback(async (societyId, achievement) => {
    try {
      
      // Use the dedicated createSocietyAchievement API method
      const result = await apiService.createSocietyAchievement(societyId, achievement);
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [user]);

  const updateSocietyAchievement = useCallback(async (societyId, achievementIndex, updates) => {
    try {
      
      // Get the current achievements to find the achievement ID
      const achievements = await apiService.getSocietyAchievements(societyId);
      
      if (achievementIndex >= 0 && achievementIndex < achievements.length) {
        const achievementToUpdate = achievements[achievementIndex];
        const achievementId = achievementToUpdate.id;
        
        // Use the dedicated updateSocietyAchievement API method
        const result = await apiService.updateSocietyAchievement(societyId, achievementId, updates);
        
        return result;
      } else {
        throw new Error(`Invalid achievement index: ${achievementIndex}`);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteSocietyAchievement = useCallback(async (societyId, achievementIndex) => {
    try {
      
      // Get the current achievements to find the achievement ID
      const achievements = await apiService.getSocietyAchievements(societyId);
      
      if (achievementIndex >= 0 && achievementIndex < achievements.length) {
        const achievementToDelete = achievements[achievementIndex];
        const achievementId = achievementToDelete.id;
        
        // Use the dedicated deleteSocietyAchievement API method
        await apiService.deleteSocietyAchievement(societyId, achievementId);
      } else {
        throw new Error(`Invalid achievement index: ${achievementIndex}`);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Society Gallery functions
  const addSocietyGalleryItem = useCallback(async (societyId, item) => {
    try {
      return await apiService.createSocietyGalleryItem(societyId, item);
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteSocietyGalleryItem = useCallback(async (societyId, itemId) => {
    try {
      await apiService.deleteSocietyGalleryItem(societyId, itemId);
    } catch (error) {
      throw error;
    }
  }, []);

  // Council functions
  const getCouncil = useCallback(async (councilId) => {
    try {
      const councilData = await apiService.getCouncilDetails(councilId);
      return councilData;
    } catch (error) {
      return null;
    }
  }, []);

  const updateCouncilInfo = useCallback(async (councilId, updates) => {
    try {
      const updatedCouncil = await apiService.updateCouncil(councilId, updates);
      return updatedCouncil;
    } catch (error) {
      throw error;
    }
  }, []);

  // Council Member functions
  const addCouncilMember = useCallback(async (councilId, member) => {
    try {
      const newMember = await apiService.createCouncilMember(councilId, member);
      return newMember;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateCouncilMember = useCallback(async (councilId, memberId, updates) => {
    try {
      const updatedMember = await apiService.updateCouncilMember(councilId, memberId, updates);
      return updatedMember;
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteCouncilMember = useCallback(async (councilId, memberId) => {
    try {
      await apiService.deleteCouncilMember(councilId, memberId);
    } catch (error) {
      throw error;
    }
  }, []);

  // Council Event functions
  const addCouncilEvent = useCallback(async (councilId, event) => {
    try {
      if (event.type === 'past') {
        return await apiService.createCouncilPastEvent(councilId, event);
      } else {
        return await apiService.createCouncilUpcomingEvent(councilId, event);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const updateCouncilEvent = useCallback(async (councilId, eventId, updates) => {
    try {
      if (updates.type === 'past') {
        return await apiService.updateCouncilPastEvent(councilId, eventId, updates);
      } else {
        return await apiService.updateCouncilUpcomingEvent(councilId, eventId, updates);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteCouncilEvent = useCallback(async (councilId, eventId, eventType) => {
    try {
      if (eventType === 'past') {
        await apiService.deleteCouncilPastEvent(councilId, eventId);
      } else {
        await apiService.deleteCouncilUpcomingEvent(councilId, eventId);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Council Achievement functions
  const addCouncilAchievement = useCallback(async (councilId, achievement) => {
    try {
      return await apiService.createCouncilAchievement(councilId, achievement);
    } catch (error) {
      throw error;
    }
  }, []);

  const updateCouncilAchievement = useCallback(async (councilId, achievementId, updates) => {
    try {
      return await apiService.updateCouncilAchievement(councilId, achievementId, updates);
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteCouncilAchievement = useCallback(async (councilId, achievementId) => {
    try {
      await apiService.deleteCouncilAchievement(councilId, achievementId);
    } catch (error) {
      throw error;
    }
  }, []);

  // Council Gallery functions
  const addCouncilGalleryItem = useCallback(async (councilId, item) => {
    try {
      return await apiService.createCouncilGalleryItem(councilId, item);
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteCouncilGalleryItem = useCallback(async (councilId, itemId) => {
    try {
      await apiService.deleteCouncilGalleryItem(councilId, itemId);
    } catch (error) {
      throw error;
    }
  }, []);

  const value = {
    isInitialized,
    
    // Society functions
    getAllSocieties,
    getSociety,
    updateSocietyInfo,
    addSocietyMember,
    updateSocietyMember,
    deleteSocietyMember,
    addSocietyEvent,
    updateSocietyEvent,
    deleteSocietyEvent,
    moveEventToPast,
    autoCategorizeSocietyEvents,
    addSocietyAchievement,
    updateSocietyAchievement,
    deleteSocietyAchievement,
    addSocietyGalleryItem,
    deleteSocietyGalleryItem,
    
    // Council functions
    getCouncil,
    updateCouncilInfo,
    addCouncilMember,
    updateCouncilMember,
    deleteCouncilMember,
    addCouncilEvent,
    updateCouncilEvent,
    deleteCouncilEvent,
    addCouncilAchievement,
    updateCouncilAchievement,
    deleteCouncilAchievement,
    addCouncilGalleryItem,
    deleteCouncilGalleryItem,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

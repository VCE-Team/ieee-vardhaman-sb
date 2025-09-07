import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    // Since we're using backend API, we don't need to initialize with static data
    // The data will be fetched when needed by the dashboard components
    setIsInitialized(true);
  }, []);

  // Society functions
  const getSociety = useCallback(async (societyId) => {
    try {
      const societyData = await apiService.getSocietyDetails(societyId);
      return societyData;
    } catch (error) {
      return null;
    }
  }, []);

  const updateSocietyInfo = useCallback(async (societyId, updates) => {
    try {
      const updatedSociety = await apiService.updateSociety(societyId, updates);
      return updatedSociety;
    } catch (error) {
      throw error;
    }
  }, []);

  // Society Member functions
  const addSocietyMember = useCallback(async (societyId, member) => {
    try {
      const newMember = await apiService.createSocietyMember(societyId, member);
      return newMember;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateSocietyMember = useCallback(async (societyId, memberId, updates) => {
    try {
      const updatedMember = await apiService.updateSocietyMember(societyId, memberId, updates);
      return updatedMember;
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteSocietyMember = useCallback(async (societyId, memberId) => {
    try {
      await apiService.deleteSocietyMember(societyId, memberId);
    } catch (error) {
      throw error;
    }
  }, []);

  // Society Event functions
  const addSocietyEvent = useCallback(async (societyId, event) => {
    try {
      if (event.type === 'past') {
        return await apiService.createSocietyPastEvent(societyId, event);
      } else {
        return await apiService.createSocietyUpcomingEvent(societyId, event);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const updateSocietyEvent = useCallback(async (societyId, eventId, updates) => {
    try {
      if (updates.type === 'past') {
        return await apiService.updateSocietyPastEvent(societyId, eventId, updates);
      } else {
        return await apiService.updateSocietyUpcomingEvent(societyId, eventId, updates);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteSocietyEvent = useCallback(async (societyId, eventId, eventType) => {
    try {
      if (eventType === 'past') {
        await apiService.deleteSocietyPastEvent(societyId, eventId);
      } else {
        await apiService.deleteSocietyUpcomingEvent(societyId, eventId);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Society Achievement functions
  const addSocietyAchievement = useCallback(async (societyId, achievement) => {
    try {
      return await apiService.createSocietyAchievement(societyId, achievement);
    } catch (error) {
      throw error;
    }
  }, []);

  const updateSocietyAchievement = useCallback(async (societyId, achievementId, updates) => {
    try {
      return await apiService.updateSocietyAchievement(societyId, achievementId, updates);
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteSocietyAchievement = useCallback(async (societyId, achievementId) => {
    try {
      await apiService.deleteSocietyAchievement(societyId, achievementId);
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
    getSociety,
    updateSocietyInfo,
    addSocietyMember,
    updateSocietyMember,
    deleteSocietyMember,
    addSocietyEvent,
    updateSocietyEvent,
    deleteSocietyEvent,
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

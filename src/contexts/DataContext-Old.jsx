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
  const [societies, setSocieties] = useState(societiesData);
  const [councils, setCouncils] = useState(councilsData);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize data from localStorage or use default data
    const savedSocieties = localStorage.getItem('ieee_societies');
    const savedCouncils = localStorage.getItem('ieee_councils');
    
    if (savedSocieties) {
      try {
        const parsedSocieties = JSON.parse(savedSocieties);
        setSocieties(parsedSocieties);
      } catch (e) {
        setSocieties(societiesData);
      }
    } else {
      setSocieties([...societiesData]);
      localStorage.setItem('ieee_societies', JSON.stringify(societiesData));
    }
    
    if (savedCouncils) {
      try {
        const parsedCouncils = JSON.parse(savedCouncils);
        setCouncils(parsedCouncils);
      } catch (e) {
        setCouncils(councilsData);
      }
    } else {
      setCouncils([...councilsData]);
      localStorage.setItem('ieee_councils', JSON.stringify(councilsData));
    }
    
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (societies.length > 0) {
      localStorage.setItem('ieee_societies', JSON.stringify(societies));
    }
  }, [societies]);

  useEffect(() => {
    if (councils.length > 0) {
      localStorage.setItem('ieee_councils', JSON.stringify(councils));
    }
  }, [councils]);

  // Society functions
  const getSociety = useCallback((societyId) => {
    return societies.find(s => s.id === societyId);
  }, [societies]);

  const updateSociety = (societyId, updates) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { ...society, ...updates }
        : society
    ));
  };

  // Member functions for societies
  const addSocietyMember = (societyId, member) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            slate: [...society.slate, { ...member, id: Date.now().toString() }],
            stats: { ...society.stats, members: society.stats.members + 1 }
          }
        : society
    ));
  };

  const updateSocietyMember = (societyId, memberIndex, updates) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            slate: society.slate.map((member, index) => 
              index === memberIndex ? { ...member, ...updates } : member
            )
          }
        : society
    ));
  };

  const deleteSocietyMember = (societyId, memberIndex) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            slate: society.slate.filter((_, index) => index !== memberIndex),
            stats: { ...society.stats, members: Math.max(0, society.stats.members - 1) }
          }
        : society
    ));
  };

  // Event functions for societies
  const addSocietyEvent = (societyId, event, type = 'upcoming') => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            events: {
              ...society.events,
              [type]: [...society.events[type], { ...event, id: Date.now().toString() }]
            },
            stats: { ...society.stats, events: society.stats.events + 1 }
          }
        : society
    ));
  };

  const updateSocietyEvent = (societyId, eventIndex, updates, type = 'upcoming') => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            events: {
              ...society.events,
              [type]: society.events[type].map((event, index) => 
                index === eventIndex ? { ...event, ...updates } : event
              )
            }
          }
        : society
    ));
  };

  const deleteSocietyEvent = (societyId, eventIndex, type = 'upcoming') => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            events: {
              ...society.events,
              [type]: society.events[type].filter((_, index) => index !== eventIndex)
            },
            stats: { ...society.stats, events: Math.max(0, society.stats.events - 1) }
          }
        : society
    ));
  };

  // Achievement functions for societies
  const addSocietyAchievement = (societyId, achievement) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            achievements: [...society.achievements, { ...achievement, id: Date.now().toString() }],
            stats: { ...society.stats, awards: society.stats.awards + 1 }
          }
        : society
    ));
  };

  const updateSocietyAchievement = (societyId, achievementIndex, updates) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            achievements: society.achievements.map((achievement, index) => 
              index === achievementIndex ? { ...achievement, ...updates } : achievement
            )
          }
        : society
    ));
  };

  const deleteSocietyAchievement = (societyId, achievementIndex) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            achievements: society.achievements.filter((_, index) => index !== achievementIndex),
            stats: { ...society.stats, awards: Math.max(0, society.stats.awards - 1) }
          }
        : society
    ));
  };

  // Gallery functions for societies
  const addSocietyGalleryItem = (societyId, galleryItem) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            gallery: [...society.gallery, { ...galleryItem, id: Date.now().toString() }]
          }
        : society
    ));
  };

  const updateSocietyGalleryItem = (societyId, itemIndex, updates) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            gallery: society.gallery.map((item, index) => 
              index === itemIndex ? { ...item, ...updates } : item
            )
          }
        : society
    ));
  };

  const deleteSocietyGalleryItem = (societyId, itemIndex) => {
    setSocieties(prev => prev.map(society => 
      society.id === societyId 
        ? { 
            ...society, 
            gallery: society.gallery.filter((_, index) => index !== itemIndex)
          }
        : society
    ));
  };

  // Council functions (similar structure to societies)
  const getCouncil = useCallback((councilId) => {
    return councils.find(c => c.id === councilId);
  }, [councils]);

  const updateCouncil = (councilId, updates) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { ...council, ...updates }
        : council
    ));
  };

  // Member functions for councils
  const addCouncilMember = (councilId, member) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            slate: [...council.slate, { ...member, id: Date.now().toString() }],
            stats: { ...council.stats, members: council.stats.members + 1 }
          }
        : council
    ));
  };

  const updateCouncilMember = (councilId, memberIndex, updates) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            slate: council.slate.map((member, index) => 
              index === memberIndex ? { ...member, ...updates } : member
            )
          }
        : council
    ));
  };

  const deleteCouncilMember = (councilId, memberIndex) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            slate: council.slate.filter((_, index) => index !== memberIndex),
            stats: { ...council.stats, members: Math.max(0, council.stats.members - 1) }
          }
        : council
    ));
  };

  // Event functions for councils
  const addCouncilEvent = (councilId, event, type = 'upcoming') => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            events: {
              ...council.events,
              [type]: [...council.events[type], { ...event, id: Date.now().toString() }]
            },
            stats: { ...council.stats, events: council.stats.events + 1 }
          }
        : council
    ));
  };

  const updateCouncilEvent = (councilId, eventIndex, updates, type = 'upcoming') => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            events: {
              ...council.events,
              [type]: council.events[type].map((event, index) => 
                index === eventIndex ? { ...event, ...updates } : event
              )
            }
          }
        : council
    ));
  };

  const deleteCouncilEvent = (councilId, eventIndex, type = 'upcoming') => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            events: {
              ...council.events,
              [type]: council.events[type].filter((_, index) => index !== eventIndex)
            },
            stats: { ...council.stats, events: Math.max(0, council.stats.events - 1) }
          }
        : council
    ));
  };

  // Achievement functions for councils
  const addCouncilAchievement = (councilId, achievement) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            achievements: [...council.achievements, { ...achievement, id: Date.now().toString() }],
            stats: { ...council.stats, awards: council.stats.awards + 1 }
          }
        : council
    ));
  };

  const updateCouncilAchievement = (councilId, achievementIndex, updates) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            achievements: council.achievements.map((achievement, index) => 
              index === achievementIndex ? { ...achievement, ...updates } : achievement
            )
          }
        : council
    ));
  };

  const deleteCouncilAchievement = (councilId, achievementIndex) => {
    setCouncils(prev => prev.map(council => 
      council.id === councilId 
        ? { 
            ...council, 
            achievements: council.achievements.filter((_, index) => index !== achievementIndex),
            stats: { ...council.stats, awards: Math.max(0, council.stats.awards - 1) }
          }
        : council
    ));
  };

  const value = {
    societies,
    councils,
    isInitialized,
    
    // Society functions
    getSociety,
    updateSociety,
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
    updateSocietyGalleryItem,
    deleteSocietyGalleryItem,
    
    // Council functions
    getCouncil,
    updateCouncil,
    addCouncilMember,
    updateCouncilMember,
    deleteCouncilMember,
    addCouncilEvent,
    updateCouncilEvent,
    deleteCouncilEvent,
    addCouncilAchievement,
    updateCouncilAchievement,
    deleteCouncilAchievement,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

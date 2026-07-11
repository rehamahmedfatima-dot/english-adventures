import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Adventurer',
    level: 12,
    xp: 4120,
    streak: 22,
    totalWords: 1247,
    totalStories: 435,
    totalSpoken: 47,
    totalBadges: 8,
    avatar: '😎',
  });

  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [showToast, setShowToast] = useState(null);

  const addXP = useCallback((amount) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
    setShowToast(`+${amount} XP!`);
    setTimeout(() => setShowToast(null), 2000);
  }, []);

  const value = {
    user,
    setUser,
    currentScreen,
    setCurrentScreen,
    showToast,
    setShowToast,
    addXP,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

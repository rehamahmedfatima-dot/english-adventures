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
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [userLevel, setUserLevel] = useState('B1');
  const [darkMode, setDarkMode] = useState(true);

  const addXP = useCallback((amount) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
    showToastMessage(`⭐ +${amount} XP!`);
  }, []);

  const showToastMessage = useCallback((message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 2500);
  }, []);

  const value = {
    user,
    setUser,
    currentScreen,
    setCurrentScreen,
    showToast,
    showToastMessage,
    isOnboarding,
    setIsOnboarding,
    userLevel,
    setUserLevel,
    darkMode,
    setDarkMode,
    addXP,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {showToast && (
        <div className="xp-toast show">
          <span>⭐</span>
          <span>{showToast}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export default AppContext;

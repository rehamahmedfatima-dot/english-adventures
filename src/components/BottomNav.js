import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Mic, BookMarked, User } from 'lucide-react';

const BottomNav = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'pronunciation', label: 'Speak', icon: Mic },
    { id: 'vocabulary', label: 'Words', icon: BookMarked },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} className="nav-icon" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;

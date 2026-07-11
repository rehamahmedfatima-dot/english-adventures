import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Zap } from 'lucide-react';

const Header = ({ title, icon }) => {
  const { user } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-ea-dark/95 backdrop-blur-lg border-b border-ea-gold/20">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h1 className="text-lg font-bold text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-ea-card rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-ea-orange" />
            <span className="text-ea-orange font-bold text-sm">{user.streak}</span>
          </div>
          <div className="flex items-center gap-1 bg-ea-card rounded-full px-3 py-1.5">
            <Zap className="w-4 h-4 text-ea-gold" />
            <span className="text-ea-gold font-bold text-sm">{user.xp}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

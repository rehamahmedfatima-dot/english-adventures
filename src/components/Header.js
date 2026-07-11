import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Star } from 'lucide-react';

const Header = ({ title, icon }) => {
  const { user } = useApp();

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-ea-card to-[#1e1e3a] border-b border-ea-border px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h1 className="text-lg font-bold text-ea-text">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-ea-gold">
          <Flame size={16} />
          <span className="text-sm font-bold">{user.streak}</span>
        </div>
        <div className="bg-gradient-to-r from-ea-orange to-orange-600 px-3 py-1 rounded-full flex items-center gap-1 text-white text-xs font-bold shadow-lg shadow-orange-500/30">
          <Star size={12} fill="white" />
          <span>{user.xp.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

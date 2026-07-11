import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Mic, Award, Clock, TrendingUp } from 'lucide-react';

const Profile = () => {
  const { user } = useApp();

  const stats = [
    { icon: BookOpen, label: 'Stories Read', value: user.totalStories, color: 'text-blue-400' },
    { icon: Mic, label: 'Minutes Spoken', value: user.totalSpoken, color: 'text-purple-400' },
    { icon: Award, label: 'Badges Earned', value: user.totalBadges, color: 'text-amber-400' },
    { icon: Clock, label: 'Study Hours', value: '48', color: 'text-emerald-400' },
  ];

  const weeklyActivity = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 20 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 75 },
    { day: 'Sun', minutes: 40 },
  ];

  return (
    <div className="screen-container px-5 py-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-ea-orange to-ea-gold flex items-center justify-center text-4xl mb-3">
          {user.avatar}
        </div>
        <h2 className="text-white font-bold text-xl">{user.name}</h2>
        <p className="text-ea-text-secondary text-sm">Level {user.level} • {user.xp} XP</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="bg-ea-gold/20 text-ea-gold text-xs px-3 py-1 rounded-full">{user.streak} day streak 🔥</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-ea-card rounded-xl p-4">
              <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-ea-gray text-xs">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-ea-card rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-ea-gold" />
          <h3 className="text-white font-bold">Weekly Activity</h3>
        </div>
        <div className="flex items-end justify-between h-32 gap-2">
          {weeklyActivity.map((day, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-ea-gold to-ea-orange rounded-t-lg"
                style={{ height: `${(day.minutes / 75) * 100}%` }}
              />
              <span className="text-ea-gray text-xs">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-white font-bold text-lg mb-3">Settings</h3>
      <div className="space-y-2">
        {['Notifications', 'Dark Mode', 'Sound Effects', 'Daily Reminder'].map((setting) => (
          <div key={setting} className="bg-ea-card rounded-xl p-4 flex items-center justify-between">
            <span className="text-white text-sm">{setting}</span>
            <div className="w-10 h-6 bg-ea-gold rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

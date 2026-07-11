import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, BookMarked, Mic, Award, Flame, TrendingUp, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useApp();

  const stats = [
    { icon: BookOpen, label: 'Stories Read', value: user.totalStories, color: 'text-ea-blue' },
    { icon: BookMarked, label: 'Words Learned', value: user.totalWords, color: 'text-ea-green' },
    { icon: Mic, label: 'Words Spoken', value: user.totalSpoken, color: 'text-ea-purple' },
    { icon: Award, label: 'Badges Earned', value: user.totalBadges, color: 'text-ea-gold' },
  ];

  const recentActivity = [
    { icon: '📖', title: 'Completed "The Lost Cat"', xp: 50, time: '2 hours ago' },
    { icon: '📚', title: 'Mastered 5 new words', xp: 25, time: '4 hours ago' },
    { icon: '🎙️', title: 'Practiced pronunciation', xp: 30, time: '6 hours ago' },
    { icon: '🏆', title: 'Earned "First Story" badge', xp: 100, time: '1 day ago' },
  ];

  return (
    <div className="screen-container">
      {/* Profile Header */}
      <div className="px-5 pt-6 pb-4 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-ea-orange to-ea-gold flex items-center justify-center text-5xl mb-3 shadow-lg shadow-orange-500/30">
          {user.avatar}
        </div>
        <h2 className="text-ea-text font-bold text-xl mb-1">{user.name}</h2>
        <p className="text-ea-text-secondary text-sm">Level {user.level} Adventurer</p>

        {/* XP Progress */}
        <div className="mt-4 bg-ea-card rounded-xl p-3 border border-ea-border">
          <div className="flex justify-between text-xs text-ea-text-secondary mb-1">
            <span>XP Progress</span>
            <span>{user.xp} / 5,000</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-ea-orange to-ea-gold rounded-full transition-all"
              style={{ width: `${(user.xp / 5000) * 100}%` }}
            />
          </div>
          <p className="text-ea-text-secondary text-xs mt-1">{5000 - user.xp} XP to Level {user.level + 1}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 px-5 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="ea-card text-center py-4">
              <Icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-ea-text">{stat.value}</div>
              <div className="text-ea-text-secondary text-xs">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Streak */}
      <div className="px-5 mb-6">
        <div className="ea-card flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-ea-orange to-red-500 flex items-center justify-center">
            <Flame size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-ea-text font-bold text-lg">{user.streak} Day Streak</div>
            <div className="text-ea-text-secondary text-sm">Keep it up! You're on fire! 🔥</div>
          </div>
          <div className="text-ea-gold font-bold text-xl">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-5 mb-6">
        <h3 className="text-ea-text font-bold mb-3 flex items-center gap-2">
          <Calendar size={18} className="text-ea-blue" /> Recent Activity
        </h3>
        {recentActivity.map((activity, idx) => (
          <div key={idx} className="ea-card mb-2 flex items-center gap-3">
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1">
              <div className="text-ea-text font-semibold text-sm">{activity.title}</div>
              <div className="text-ea-text-secondary text-xs">{activity.time}</div>
            </div>
            <div className="text-ea-gold font-bold text-sm">+{activity.xp} XP</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="px-5 pb-6">
        <h3 className="text-ea-text font-bold mb-3">Settings</h3>
        <div className="ea-card">
          {[
            { label: 'Notifications', value: 'On' },
            { label: 'Sound Effects', value: 'On' },
            { label: 'Daily Reminder', value: '9:00 AM' },
            { label: 'Language', value: 'English / Arabic' },
          ].map((setting, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <span className="text-ea-text text-sm">{setting.label}</span>
              <span className="text-ea-text-secondary text-sm">{setting.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

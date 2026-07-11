import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, BookMarked, Mic, Award, Zap, ChevronRight } from 'lucide-react';
import { getTodayStory } from '../../data/stories';

const Dashboard = () => {
  const { user, setCurrentScreen, addXP } = useApp();
  const todayStory = getTodayStory();

  const quickStats = [
    { icon: BookOpen, label: 'Stories', value: user.totalStories, color: 'text-ea-blue' },
    { icon: BookMarked, label: 'Words', value: user.totalWords, color: 'text-ea-green' },
    { icon: Mic, label: 'Spoken', value: user.totalSpoken, color: 'text-ea-purple' },
    { icon: Award, label: 'Badges', value: user.totalBadges, color: 'text-ea-gold' },
  ];

  const dailyQuests = [
    { id: 1, title: 'Read Today's Story', desc: 'Complete the daily adventure', xp: 50, completed: false, icon: '📖' },
    { id: 2, title: 'Learn 5 New Words', desc: 'Master vocabulary from the story', xp: 25, completed: false, icon: '📚' },
    { id: 3, title: 'Practice Pronunciation', desc: 'Record and improve your speaking', xp: 30, completed: false, icon: '🎙️' },
    { id: 4, title: 'Complete a Quiz', desc: 'Test your understanding', xp: 40, completed: true, icon: '🎯' },
  ];

  const recentWords = [
    { word: 'adventure', arabic: 'مغامرة', progress: 100 },
    { word: 'brave', arabic: 'شجاع', progress: 80 },
    { word: 'curious', arabic: 'فضولي', progress: 60 },
    { word: 'journey', arabic: 'رحلة', progress: 100 },
    { word: 'mysterious', arabic: 'غامض', progress: 40 },
  ];

  return (
    <div className="screen-container">
      {/* Welcome Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ea-orange to-ea-gold flex items-center justify-center text-2xl">
            {user.avatar}
          </div>
          <div>
            <p className="text-ea-text-secondary text-sm">Good morning! ☀️</p>
            <h2 className="text-ea-text font-bold text-lg">Level {user.level} Adventurer</h2>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-ea-card rounded-xl p-3 border border-ea-border">
          <div className="flex justify-between text-xs text-ea-text-secondary mb-1">
            <span>XP Progress</span>
            <span>{user.xp} / 5,000</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-ea-orange to-ea-gold rounded-full transition-all"
              style={{ width: `${(user.xp / 5000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 px-5 mb-6">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="ea-card text-center py-3">
              <Icon size={20} className={`mx-auto mb-1 ${stat.color}`} />
              <div className="text-lg font-bold text-ea-text">{stat.value}</div>
              <div className="text-[10px] text-ea-text-secondary">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Today's Story */}
      <div className="px-5 mb-6">
        <div 
          onClick={() => setCurrentScreen('story')}
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="h-48 bg-gradient-to-br from-ea-purple/30 to-ea-blue/30 flex items-center justify-center">
            <span className="text-6xl">📖</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-ea-orange text-white text-xs font-bold px-2 py-0.5 rounded-md">🔥 NEW</span>
              <span className="text-ea-text-secondary text-xs">{todayStory.duration}</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{todayStory.title}</h3>
            <p className="text-white/80 text-sm">{todayStory.titleAr}</p>
          </div>
          <div className="absolute top-4 right-4 z-20">
            <div className="w-10 h-10 rounded-full bg-ea-orange flex items-center justify-center shadow-lg">
              <Zap size={18} className="text-white" fill="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="px-5 mb-6">
        <h3 className="text-ea-text font-bold mb-3 flex items-center gap-2">
          <Zap size={18} className="text-ea-gold" />
          Daily Quests
        </h3>
        {dailyQuests.map(quest => (
          <div 
            key={quest.id}
            onClick={() => !quest.completed && addXP(quest.xp)}
            className={`flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer transition-all ${
              quest.completed 
                ? 'bg-ea-green/10 border border-ea-green/20 opacity-60' 
                : 'bg-ea-card border border-ea-border hover:border-ea-orange'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              quest.completed ? 'bg-ea-green/20' : 'bg-ea-orange/10'
            }`}>
              {quest.completed ? '✅' : quest.icon}
            </div>
            <div className="flex-1">
              <div className="text-ea-text font-semibold text-sm">{quest.title}</div>
              <div className="text-ea-text-secondary text-xs">{quest.desc}</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-ea-gold text-xs font-bold">+{quest.xp} XP</span>
              {quest.completed ? (
                <div className="w-5 h-5 rounded-full bg-ea-green flex items-center justify-center">
                  <span className="text-ea-dark text-xs">✓</span>
                </div>
              ) : (
                <ChevronRight size={16} className="text-ea-text-secondary" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Words */}
      <div className="px-5 mb-6">
        <h3 className="text-ea-text font-bold mb-3">Recent Words</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {recentWords.map((word, idx) => (
            <div key={idx} className="ea-card min-w-[140px] flex-shrink-0">
              <div className="text-ea-text font-bold">{word.word}</div>
              <div className="text-ea-text-secondary text-xs">{word.arabic}</div>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    word.progress === 100 ? 'bg-ea-green' : word.progress >= 60 ? 'bg-ea-gold' : 'bg-ea-orange'
                  }`}
                  style={{ width: `${word.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold League Preview */}
      <div className="px-5 mb-6">
        <div className="ea-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-ea-text font-bold text-sm">🏆 Gold League</h3>
            <span className="text-ea-text-secondary text-xs">2 days left</span>
          </div>
          <div className="flex items-end justify-center gap-4 h-20">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-lg mb-1">🥈</div>
              <div className="w-8 h-12 bg-gray-400/30 rounded-t-lg" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-ea-gold to-yellow-600 flex items-center justify-center text-xl mb-1 shadow-lg shadow-yellow-500/30">🥇</div>
              <div className="w-10 h-16 bg-ea-gold/30 rounded-t-lg" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-600 to-amber-700 flex items-center justify-center text-lg mb-1">🥉</div>
              <div className="w-8 h-10 bg-amber-700/30 rounded-t-lg" />
            </div>
          </div>
          <div className="text-center mt-2 text-ea-text-secondary text-xs">
            You are <span className="text-ea-orange font-bold">#6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

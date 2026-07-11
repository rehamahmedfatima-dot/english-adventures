import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, BookMarked, Mic, Award, Zap, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { user, setCurrentScreen, addXP } = useApp();

  const quickStats = [
    { icon: BookOpen, label: 'Stories', value: user.totalStories, color: 'text-ea-blue' },
    { icon: BookMarked, label: 'Words', value: user.totalWords, color: 'text-ea-green' },
    { icon: Mic, label: 'Spoken', value: user.totalSpoken, color: 'text-ea-purple' },
    { icon: Award, label: 'Badges', value: user.totalBadges, color: 'text-ea-gold' },
  ];

  const dailyQuests = [
    { id: 1, title: 'Read Todays Story', desc: 'Complete the daily adventure', xp: 50, completed: false, icon: '📖' },
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
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ea-orange to-ea-gold flex items-center justify-center text-2xl">
            {user.avatar}
          </div>
          <div>
            <p className="text-ea-text-secondary text-sm">Good morning! ☀️</p>
            <h2 className="text-white font-bold text-lg">{user.name}</h2>
          </div>
        </div>

        <div className="bg-ea-card rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-ea-gold font-bold">Level {user.level}</span>
            <span className="text-ea-text-secondary text-sm">{user.xp} / 5000 XP</span>
          </div>
          <div className="w-full h-2 bg-ea-darker rounded-full">
            <div className="h-full w-[82%] bg-gradient-to-r from-ea-gold to-ea-orange rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-ea-card rounded-xl p-3 text-center">
                <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-ea-gray text-xs">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-ea-orange to-rose-500 rounded-2xl p-5 mb-6 cursor-pointer" onClick={() => setCurrentScreen('story')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-xl">Todays Story</h3>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          <p className="text-white/80 text-sm mb-2">The Lost Key at the Airport</p>
          <p className="text-white/60 text-xs mb-3">المفتاح المفقود في المطار</p>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">B1 Level</span>
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">15 min</span>
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-3">Daily Quests</h3>
        <div className="space-y-3 mb-6">
          {dailyQuests.map((quest) => (
            <div key={quest.id} className="bg-ea-card rounded-xl p-4 flex items-center gap-3">
              <div className="text-2xl">{quest.icon}</div>
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm">{quest.title}</h4>
                <p className="text-ea-gray text-xs">{quest.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-ea-gold text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> +{quest.xp}
                </span>
                {quest.completed && <span className="text-ea-green text-xs">Done!</span>}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-white font-bold text-lg mb-3">Recent Words</h3>
        <div className="space-y-2">
          {recentWords.map((word, index) => (
            <div key={index} className="bg-ea-card rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-white font-medium">{word.word}</span>
                <span className="text-ea-gray text-sm mx-2">•</span>
                <span className="text-ea-text-secondary text-sm">{word.arabic}</span>
              </div>
              <div className="w-16 h-1.5 bg-ea-darker rounded-full">
                <div className="h-full bg-ea-green rounded-full" style={{ width: `${word.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

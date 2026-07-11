import React from 'react';
import { Trophy, Star, Target, Award } from 'lucide-react';

const badges = [
  { id: 1, name: 'First Story', nameAr: 'أول قصة', icon: '📖', unlocked: true, color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Word Master', nameAr: 'سيد الكلمات', icon: '📚', unlocked: true, color: 'from-emerald-500 to-teal-500' },
  { id: 3, name: 'Perfect Score', nameAr: 'درجة كاملة', icon: '⭐', unlocked: false, color: 'from-yellow-500 to-amber-500' },
  { id: 4, name: '7 Day Streak', nameAr: '7 أيام متتالية', icon: '🔥', unlocked: true, color: 'from-orange-500 to-red-500' },
  { id: 5, name: 'Pronunciation Pro', nameAr: 'محترف النطق', icon: '🎙️', unlocked: false, color: 'from-purple-500 to-violet-500' },
  { id: 6, name: 'World Traveler', nameAr: 'مسافر العالم', icon: '🌍', unlocked: false, color: 'from-pink-500 to-rose-500' },
];

const leaderboard = [
  { rank: 1, name: 'Ahmed K.', score: 9850, avatar: '👑' },
  { rank: 2, name: 'Sarah M.', score: 9420, avatar: '🥈' },
  { rank: 3, name: 'Omar H.', score: 9100, avatar: '🥉' },
  { rank: 4, name: 'You', score: 8750, avatar: '😊', isYou: true },
  { rank: 5, name: 'Lina R.', score: 8600, avatar: '🎯' },
];

const quizQuestions = [
  { question: 'What does "adventure" mean?', options: ['مغامرة', 'رحلة', 'قصة', 'بطل'], correct: 0 },
  { question: 'Choose the correct sentence:', options: ['She go to school', 'She goes to school', 'She going to school', 'She gone to school'], correct: 1 },
];

const Achievements = () => {
  return (
    <div className="screen-container px-5 py-6">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-ea-card rounded-xl p-3 text-center">
          <Trophy className="w-5 h-5 text-ea-gold mx-auto mb-1" />
          <div className="text-white font-bold">8</div>
          <div className="text-ea-gray text-xs">Badges</div>
        </div>
        <div className="bg-ea-card rounded-xl p-3 text-center">
          <Star className="w-5 h-5 text-ea-gold mx-auto mb-1" />
          <div className="text-white font-bold">4,120</div>
          <div className="text-ea-gray text-xs">XP</div>
        </div>
        <div className="bg-ea-card rounded-xl p-3 text-center">
          <Target className="w-5 h-5 text-ea-gold mx-auto mb-1" />
          <div className="text-white font-bold">22</div>
          <div className="text-ea-gray text-xs">Streak</div>
        </div>
      </div>

      <h3 className="text-white font-bold text-lg mb-3">Badges</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`bg-ea-card rounded-xl p-4 text-center border ${
              badge.unlocked ? 'border-ea-gold/30' : 'border-ea-darker opacity-50'
            }`}
          >
            <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl`}>
              {badge.icon}
            </div>
            <h4 className={`text-sm font-bold ${badge.unlocked ? 'text-white' : 'text-ea-gray'}`}>
              {badge.name}
            </h4>
            <p className="text-ea-text-secondary text-xs">{badge.nameAr}</p>
          </div>
        ))}
      </div>

      <h3 className="text-white font-bold text-lg mb-3">Leaderboard</h3>
      <div className="bg-ea-card rounded-2xl p-4 mb-6">
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 p-3 rounded-xl mb-2 last:mb-0 ${
              user.isYou ? 'bg-ea-gold/10 border border-ea-gold/30' : 'bg-ea-darker/50'
            }`}
          >
            <span className="text-lg">{user.avatar}</span>
            <div className="flex-1">
              <span className={`font-bold text-sm ${user.isYou ? 'text-ea-gold' : 'text-white'}`}>
                {user.name}
              </span>
            </div>
            <span className="text-ea-text-secondary text-sm">{user.score.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <h3 className="text-white font-bold text-lg mb-3">Quick Quiz</h3>
      {quizQuestions.map((q, idx) => (
        <div key={idx} className="bg-ea-card rounded-xl p-4 mb-3">
          <p className="text-white font-medium text-sm mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                className="w-full text-left bg-ea-darker rounded-lg p-3 text-ea-text-secondary text-sm hover:bg-ea-gold/20 hover:text-white transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;

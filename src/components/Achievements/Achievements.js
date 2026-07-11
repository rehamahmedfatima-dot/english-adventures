import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Trophy, Clock, ChevronRight } from 'lucide-react';

const Achievements = () => {
  const { addXP } = useApp();
  const [activeTab, setActiveTab] = useState('badges');

  const badges = [
    { id: 1, name: 'First Story', desc: 'Read your first story', icon: '📖', unlocked: true, xp: 50 },
    { id: 2, name: 'Word Master', desc: 'Learn 50 words', icon: '📚', unlocked: true, xp: 100 },
    { id: 3, name: 'Pronunciation Pro', desc: 'Score 90%+ on pronunciation', icon: '🎙️', unlocked: true, xp: 75 },
    { id: 4, name: '7-Day Streak', desc: 'Study for 7 days straight', icon: '🔥', unlocked: true, xp: 150 },
    { id: 5, name: 'Quiz Champion', desc: 'Get 100% on a quiz', icon: '🎯', unlocked: false, progress: 80 },
    { id: 6, name: 'Social Butterfly', desc: 'Share 10 times', icon: '🦋', unlocked: false, progress: 40 },
    { id: 7, name: 'Night Owl', desc: 'Study after midnight', icon: '🦉', unlocked: false, progress: 0 },
    { id: 8, name: 'Speed Reader', desc: 'Read 5 stories in one day', icon: '⚡', unlocked: false, progress: 20 },
    { id: 9, name: 'Perfect Week', desc: 'Complete all daily quests for 7 days', icon: '✨', unlocked: false, progress: 60 },
    { id: 10, name: 'Level 50', desc: 'Reach level 50', icon: '👑', unlocked: false, progress: 24 },
    { id: 11, name: 'Tongue Twister', desc: 'Complete 10 tongue twisters', icon: '🗣️', unlocked: false, progress: 50 },
    { id: 12, name: 'World Traveler', desc: 'Visit all locations in World Mode', icon: '🌍', unlocked: false, progress: 33 },
  ];

  const leaderboard = [
    { rank: 1, name: 'AhmedPro', avatar: '👑', xp: 8940, streak: 45 },
    { rank: 2, name: 'Sara_Speak', avatar: '🎤', xp: 7820, streak: 38 },
    { rank: 3, name: 'Omar_Eng', avatar: '🌟', xp: 7650, streak: 32 },
    { rank: 4, name: 'Lina_Learns', avatar: '📚', xp: 6540, streak: 28 },
    { rank: 5, name: 'Khaled_Voice', avatar: '🎧', xp: 6210, streak: 25 },
    { rank: 6, name: 'You', avatar: '😎', xp: 4120, streak: 22, isYou: true },
  ];

  const quizQuestions = [
    { question: 'What is the opposite of "happy"?', options: ['Sad', 'Angry', 'Tired', 'Excited'], correct: 0 },
    { question: 'Choose the correct sentence:', options: [
      'She don't like apples.',
      'She doesn't likes apples.',
      'She doesn't like apples.',
      'She not like apples.'
    ], correct: 2 },
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleQuizAnswer = (idx) => {
    if (idx === quizQuestions[currentQuiz].correct) {
      setQuizScore(prev => prev + 25);
      addXP(25);
    }
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="screen-container">
      {/* Tabs */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        {[
          { id: 'badges', label: '🏅 Badges' },
          { id: 'leaderboard', label: '🏆 Leaderboard' },
          { id: 'quiz', label: '🎯 Quiz' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-ea-orange to-orange-600 text-white shadow-lg shadow-orange-500/30' 
                : 'bg-ea-card border border-ea-border text-ea-text-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'badges' && (
        <div className="px-5 py-4">
          <div className="grid grid-cols-3 gap-3">
            {badges.map(badge => (
              <div 
                key={badge.id}
                className={`ea-card text-center py-4 cursor-pointer transition-all hover:scale-105 ${
                  !badge.unlocked ? 'opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-ea-text text-xs font-bold mb-1">{badge.name}</div>
                <div className="text-ea-text-secondary text-[10px]">{badge.desc}</div>
                {badge.unlocked ? (
                  <div className="text-ea-gold text-xs font-bold mt-2">+{badge.xp} XP</div>
                ) : (
                  <div className="mt-2">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-ea-text-secondary rounded-full"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <div className="text-ea-text-secondary text-[10px] mt-1">{badge.progress}%</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="px-5 py-4">
          <div className="ea-card mb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy size={20} className="text-ea-gold" />
              <span className="text-ea-gold font-bold">Gold League</span>
            </div>
            <p className="text-ea-text-secondary text-xs">2 days left until promotion</p>
          </div>

          {leaderboard.map((player, idx) => (
            <div 
              key={idx}
              className={`ea-card mb-2 flex items-center gap-3 ${player.isYou ? 'border-ea-orange/50 bg-ea-orange/5' : ''}`}
            >
              <div className={`w-8 text-center font-bold text-sm ${
                player.rank === 1 ? 'text-ea-gold' :
                player.rank === 2 ? 'text-gray-300' :
                player.rank === 3 ? 'text-amber-600' :
                'text-ea-text-secondary'
              }`}>
                {player.rank <= 3 ? ['🥇', '🥈', '🥉'][player.rank - 1] : player.rank}
              </div>
              <div className="text-2xl">{player.avatar}</div>
              <div className="flex-1">
                <div className="text-ea-text font-semibold text-sm">{player.name}</div>
                <div className="text-ea-text-secondary text-xs">🔥 {player.streak} days</div>
              </div>
              <div className="text-ea-orange font-bold text-sm">{player.xp.toLocaleString()} XP</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="px-5 py-4">
          {!showResult ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-ea-text-secondary text-sm">Question {currentQuiz + 1} of {quizQuestions.length}</span>
                <div className="flex items-center gap-1 text-ea-text-secondary text-sm">
                  <Clock size={14} /> <span>30s</span>
                </div>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-gradient-to-r from-ea-orange to-ea-gold rounded-full transition-all"
                  style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              <div className="ea-card mb-6">
                <h3 className="text-ea-text font-bold text-lg mb-4">{quizQuestions[currentQuiz].question}</h3>
              </div>

              {quizQuestions[currentQuiz].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  className="w-full text-left p-4 rounded-xl mb-2 bg-ea-card border border-ea-border text-ea-text font-semibold hover:border-ea-orange hover:bg-ea-card-hover transition-all"
                >
                  {option}
                </button>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#1e1e35" strokeWidth="12" fill="none" />
                  <circle 
                    cx="64" cy="64" r="56" 
                    stroke={quizScore >= 40 ? '#4ade80' : '#ffc947'} 
                    strokeWidth="12" 
                    fill="none"
                    strokeDasharray={`${(quizScore / 50) * 351} 351`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${quizScore >= 40 ? 'text-ea-green' : 'text-ea-gold'}`}>
                    {quizScore}
                  </span>
                </div>
              </div>
              <h3 className="text-ea-text font-bold text-xl mb-2">
                {quizScore >= 40 ? 'Excellent! 🎉' : quizScore >= 25 ? 'Good job! 👍' : 'Keep practicing! 💪'}
              </h3>
              <p className="text-ea-text-secondary mb-4">You earned {quizScore} XP!</p>
              <button 
                onClick={() => { setCurrentQuiz(0); setQuizScore(0); setShowResult(false); }}
                className="ea-btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Achievements;

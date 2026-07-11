import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, RotateCcw, Trophy, Flame, Skull, Star, Volume2, Award, ChevronRight } from 'lucide-react';

const challenges = [
  {
    id: 1,
    text: "Write right is right, but write wrong is not right.",
    arabic: "الكتابة الصحيحة صحيحة، لكن الكتابة الخاطئة ليست صحيحة.",
    difficulty: "hard",
    difficultyAr: "صعب",
    xp: 50,
    icon: <Flame className="w-5 h-5 text-orange-400" />
  },
  {
    id: 2,
    text: "She sells seashells by the seashore.",
    arabic: "تبيع أصداف البحر على شاطئ البحر.",
    difficulty: "medium",
    difficultyAr: "متوسط",
    xp: 35,
    icon: <Star className="w-5 h-5 text-amber-400" />
  },
  {
    id: 3,
    text: "Peter Piper picked a peck of pickled peppers.",
    arabic: "بيتر بايبر قطف كمية من الفلفل المخلل.",
    difficulty: "medium",
    difficultyAr: "متوسط",
    xp: 35,
    icon: <Star className="w-5 h-5 text-amber-400" />
  },
  {
    id: 4,
    text: "How can a clam cram in a clean cream can?",
    arabic: "كيف يمكن للمحار أن يحشو في علبة كريم نظيفة؟",
    difficulty: "hard",
    difficultyAr: "صعب",
    xp: 50,
    icon: <Flame className="w-5 h-5 text-orange-400" />
  },
  {
    id: 5,
    text: "I scream, you scream, we all scream for ice cream!",
    arabic: "أنا أصرخ، أنت تصرخ، كلنا نصرخ من أجل الآيس كريم!",
    difficulty: "easy",
    difficultyAr: "سهل",
    xp: 20,
    icon: <Star className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 6,
    text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair.",
    arabic: "فازي وازي كان دباً. فازي وازي لم يكن لديه شعر.",
    difficulty: "easy",
    difficultyAr: "سهل",
    xp: 20,
    icon: <Star className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 7,
    text: "Six slippery snails slid slowly seaward.",
    arabic: "ستة حلزونات زلقة انزلقت ببطء نحو البحر.",
    difficulty: "medium",
    difficultyAr: "متوسط",
    xp: 35,
    icon: <Star className="w-5 h-5 text-amber-400" />
  },
  {
    id: 8,
    text: "Which wristwatches are Swiss wristwatches?",
    arabic: "أي ساعات المعصم هي الساعات السويسرية؟",
    difficulty: "hard",
    difficultyAr: "صعب",
    xp: 50,
    icon: <Flame className="w-5 h-5 text-orange-400" />
  },
  {
    id: 9,
    text: "Thirty-three thieves thought that they thrilled the throne throughout Thursday.",
    arabic: "ثلاثة وثلاثون لصاً ظنوا أنهم أثاروا العرش طوال الخميس.",
    difficulty: "insane",
    difficultyAr: "مجنون",
    xp: 80,
    icon: <Skull className="w-5 h-5 text-rose-500" />
  },
  {
    id: 10,
    text: "Can you can a can as a canner can can a can?",
    arabic: "هل يمكنك علب علبة كما يمكن للعامل علب علبة؟",
    difficulty: "insane",
    difficultyAr: "مجنون",
    xp: 80,
    icon: <Skull className="w-5 h-5 text-rose-500" />
  },
  {
    id: 11,
    text: "The sixth sick sheik's sixth sheep's sick.",
    arabic: "الخروف السادس المريض للشيخ المريض السادس مريض.",
    difficulty: "insane",
    difficultyAr: "مجنون",
    xp: 80,
    icon: <Skull className="w-5 h-5 text-rose-500" />
  },
  {
    id: 12,
    text: "Pad kid poured curd pulled cod.",
    arabic: "صب الطفل اللبن الرائب وسحب سمك القد.",
    difficulty: "insane",
    difficultyAr: "مجنون",
    xp: 100,
    icon: <Skull className="w-5 h-5 text-rose-500" />
  }
];

const leaderboard = [
  { rank: 1, name: "Ahmed K.", score: 9850, avatar: "👑" },
  { rank: 2, name: "Sarah M.", score: 9420, avatar: "🥈" },
  { rank: 3, name: "Omar H.", score: 9100, avatar: "🥉" },
  { rank: 4, name: "You", score: 8750, avatar: "😊", isYou: true },
  { rank: 5, name: "Lina R.", score: 8600, avatar: "🎯" }
];

function Waveform({ isRecording }) {
  const [bars, setBars] = useState(Array(20).fill(10));

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setBars(Array(20).fill(0).map(() => Math.random() * 40 + 5));
    }, 100);
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={{ height: isRecording ? height : 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-1.5 bg-gradient-to-t from-amber-500 to-orange-400 rounded-full"
        />
      ))}
    </div>
  );
}

export default function TongueTwisters() {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [filter, setFilter] = useState('all');
  const timerRef = useRef(null);

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.difficulty === filter);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setShowResult(false);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    // Simulate AI scoring
    const simulatedScore = Math.floor(Math.random() * 30) + 65;
    setScore(simulatedScore);
    setShowResult(true);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'insane': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  if (activeChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => { setActiveChallenge(null); setShowResult(false); }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(activeChallenge.difficulty)}`}>
              {activeChallenge.difficultyAr} {activeChallenge.icon}
            </div>
          </div>

          {/* Challenge Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/80 rounded-3xl p-6 mb-6 border border-slate-700"
          >
            <div className="text-center mb-6">
              <p className="text-white text-xl font-bold leading-relaxed mb-3">
                "{activeChallenge.text}"
              </p>
              <p className="text-slate-400 text-sm font-arabic">
                {activeChallenge.arabic}
              </p>
            </div>

            <button
              onClick={() => speakText(activeChallenge.text)}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl flex items-center justify-center gap-2 text-white transition-colors mb-4"
            >
              <Volume2 className="w-5 h-5" />
              استمع للنطق الصحيح
            </button>
          </motion.div>

          {/* Recording Section */}
          <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700">
            <Waveform isRecording={isRecording} />

            <div className="text-center mb-4">
              {isRecording ? (
                <span className="text-2xl font-mono text-amber-400">
                  {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                </span>
              ) : (
                <span className="text-slate-500">اضغط سجل ونطق التحدي</span>
              )}
            </div>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 animate-pulse' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-amber-500/30'
              }`}
            >
              {isRecording ? <RotateCcw className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
            </button>
          </div>

          {/* Result */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-slate-800/80 rounded-3xl p-6 border border-slate-700 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#334155" strokeWidth="8" fill="none" />
                    <circle 
                      cx="64" cy="64" r="56" 
                      stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8" fill="none"
                      strokeDasharray={`${score * 3.52} 352`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{score}%</span>
                  </div>
                </div>

                <p className="text-white font-bold text-lg mb-1">
                  {score >= 80 ? 'ممتاز! 🎉' : score >= 60 ? 'جيد! 👍' : 'حاول مرة أخرى 💪'}
                </p>
                <p className="text-amber-400 font-bold">+{activeChallenge.xp} XP</p>

                <button
                  onClick={() => { setShowResult(false); setActiveChallenge(null); }}
                  className="mt-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white text-sm transition-colors"
                >
                  تحدي آخر
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">اتحداك تقولها</h1>
            <p className="text-slate-400 text-sm">Tongue Twisters Challenge</p>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1.5 rounded-full">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">8,750</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'الكل', labelEn: 'All' },
            { id: 'easy', label: 'سهل', labelEn: 'Easy' },
            { id: 'medium', label: 'متوسط', labelEn: 'Medium' },
            { id: 'hard', label: 'صعب', labelEn: 'Hard' },
            { id: 'insane', label: 'مجنون', labelEn: 'Insane' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === f.id 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Challenges List */}
        <div className="space-y-3 mb-8">
          {filteredChallenges.map((challenge, index) => (
            <motion.button
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveChallenge(challenge)}
              className="w-full bg-slate-800/80 rounded-2xl p-4 border border-slate-700 hover:border-amber-500/50 transition-all text-left"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white text-sm font-medium mb-1 line-clamp-2">{challenge.text}</p>
                  <p className="text-slate-500 text-xs font-arabic">{challenge.arabic}</p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-3">
                  <div className={`px-2 py-0.5 rounded-full text-xs border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficultyAr}
                  </div>
                  <span className="text-amber-400 text-xs font-bold">+{challenge.xp} XP</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-white font-bold">لوحة المتصدرين الأسبوعية</h2>
          </div>

          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  user.isYou ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-slate-700/50'
                }`}
              >
                <span className="text-lg">{user.avatar}</span>
                <div className="flex-1">
                  <span className={`font-bold ${user.isYou ? 'text-amber-400' : 'text-white'}`}>
                    {user.name}
                  </span>
                </div>
                <span className="text-slate-400 text-sm">{user.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

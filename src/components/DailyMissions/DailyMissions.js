import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle2, Circle, Clock, Mic, Camera, MessageCircle, BookOpen, Star, Zap, Award } from 'lucide-react';

const missions = [
  {
    id: 1,
    title: "Ask someone for the time",
    titleAr: "اسأل شخصاً عن الوقت",
    description: "Find someone and ask 'What time is it?' in English",
    descriptionAr: "اعثر على شخص واسأله 'What time is it?' بالإنجليزية",
    type: "speaking",
    icon: <Mic className="w-5 h-5" />,
    xp: 50,
    timeLimit: "Today",
    completed: true,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    title: "Record a 1-minute video",
    titleAr: "سجل فيديو لمدة دقيقة",
    description: "Introduce yourself in English for 60 seconds",
    descriptionAr: "قدم نفسك بالإنجليزية لمدة 60 ثانية",
    type: "video",
    icon: <Camera className="w-5 h-5" />,
    xp: 100,
    timeLimit: "Today",
    completed: false,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 3,
    title: "Scan 3 things around you",
    titleAr: "امسح 3 أشياء حولك",
    description: "Use Life Scanner to learn words from your environment",
    descriptionAr: "استخدم الماسح الضوئي لتعلم كلمات من بيئتك",
    type: "scanner",
    icon: <Camera className="w-5 h-5" />,
    xp: 75,
    timeLimit: "Today",
    completed: false,
    color: "from-violet-500 to-purple-600"
  },
  {
    id: 4,
    title: "Talk to an AI Character",
    titleAr: "تحدث مع شخصية ذكاء اصطناعي",
    description: "Have a conversation with Officer Johnson or Dr. Sarah",
    descriptionAr: "أجرِ محادثة مع Officer Johnson أو Dr. Sarah",
    type: "conversation",
    icon: <MessageCircle className="w-5 h-5" />,
    xp: 80,
    timeLimit: "Today",
    completed: false,
    color: "from-rose-500 to-pink-600"
  },
  {
    id: 5,
    title: "Read a news article",
    titleAr: "اقرأ خبراً",
    description: "Read one simplified news article in Live Content",
    descriptionAr: "اقرأ خبراً مبسطاً في المحتوى الحي",
    type: "reading",
    icon: <BookOpen className="w-5 h-5" />,
    xp: 60,
    timeLimit: "Today",
    completed: false,
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 6,
    title: "Fix your pronunciation",
    titleAr: "صحح نطقك",
    description: "Practice the words you struggled with this week",
    descriptionAr: "تدرب على الكلمات التي واجهت صعوبة فيها هذا الأسبوع",
    type: "pronunciation",
    icon: <Mic className="w-5 h-5" />,
    xp: 70,
    timeLimit: "This week",
    completed: false,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 7,
    title: "Complete a tongue twister",
    titleAr: "أكمل تحدي لسان",
    description: "Get 70%+ score on any tongue twister challenge",
    descriptionAr: "احصل على 70%+ في أي تحدي لسان",
    type: "challenge",
    icon: <Zap className="w-5 h-5" />,
    xp: 40,
    timeLimit: "This week",
    completed: true,
    color: "from-orange-500 to-red-600"
  },
  {
    id: 8,
    title: "Learn 10 new words",
    titleAr: "تعلم 10 كلمات جديدة",
    description: "Master 10 vocabulary flashcards with 90%+ accuracy",
    descriptionAr: "أتقن 10 بطاقات مفردات بدقة 90%+",
    type: "vocabulary",
    icon: <BookOpen className="w-5 h-5" />,
    xp: 100,
    timeLimit: "This week",
    completed: false,
    color: "from-amber-500 to-yellow-600"
  }
];

const weeklyProgress = {
  completed: 2,
  total: 8,
  streak: 5,
  bestStreak: 12
};

export default function DailyMissions() {
  const [activeTab, setActiveTab] = useState('today');
  const [completedMissions, setCompletedMissions] = useState([1, 7]);
  const [showCelebration, setShowCelebration] = useState(false);

  const toggleMission = (id) => {
    if (completedMissions.includes(id)) {
      setCompletedMissions(prev => prev.filter(m => m !== id));
    } else {
      setCompletedMissions(prev => [...prev, id]);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  };

  const filteredMissions = activeTab === 'today' 
    ? missions.filter(m => m.timeLimit === 'Today')
    : missions;

  const progress = (completedMissions.length / missions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">المهام اليومية</h1>
            <p className="text-slate-400 text-sm">Daily Missions</p>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{weeklyProgress.streak} days 🔥</span>
          </div>
        </div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6 mb-6 border border-slate-600"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-lg">Weekly Progress</h2>
              <p className="text-slate-400 text-sm">{completedMissions.length} of {missions.length} completed</p>
            </div>
            <div className="text-right">
              <div className="text-amber-400 font-bold text-2xl">{Math.round(progress)}%</div>
              <div className="text-slate-500 text-xs">this week</div>
            </div>
          </div>

          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Target className="w-4 h-4" />
              <span>Best streak: {weeklyProgress.bestStreak} days</span>
            </div>
            <div className="text-amber-400 font-bold">
              +{completedMissions.reduce((acc, id) => acc + missions.find(m => m.id === id)?.xp || 0, 0)} XP earned
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'today', label: 'Today', labelAr: 'اليوم' },
            { id: 'week', label: 'This Week', labelAr: 'هذا الأسبوع' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.labelAr}
            </button>
          ))}
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredMissions.map((mission, index) => {
              const isCompleted = completedMissions.includes(mission.id);
              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleMission(mission.id)}
                  className={`relative overflow-hidden rounded-2xl border transition-all cursor-pointer ${
                    isCompleted 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    <button className="mt-1 flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-500" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`p-1.5 rounded-lg bg-gradient-to-br ${mission.color}`}>
                          {React.cloneElement(mission.icon, { className: "w-4 h-4 text-white" })}
                        </span>
                        <h3 className={`font-bold ${isCompleted ? 'text-emerald-400 line-through' : 'text-white'}`}>
                          {mission.titleAr}
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm mb-1">{mission.title}</p>
                      <p className="text-slate-500 text-xs font-arabic">{mission.descriptionAr}</p>

                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3 h-3" /> +{mission.xp} XP
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <Clock className="w-3 h-3" /> {mission.timeLimit}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-slate-900/90 rounded-3xl p-8 text-center border border-amber-500/30">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <Star className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Mission Complete!</h2>
                <p className="text-amber-400 font-bold text-lg">+XP Earned!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

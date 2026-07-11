import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, TrendingUp, BookOpen, Mic, Target, Clock, ChevronRight, Sparkles, RotateCcw, Zap } from 'lucide-react';

const weakWords = [
  { word: 'although', arabic: 'على الرغم من', forgotten: 7, lastSeen: '2 days ago', status: 'critical' },
  { word: 'through', arabic: 'عبر / خلال', forgotten: 5, lastSeen: '1 week ago', status: 'warning' },
  { word: 'necessary', arabic: 'ضروري', forgotten: 3, lastSeen: '3 days ago', status: 'warning' },
  { word: 'environment', arabic: 'بيئة', forgotten: 2, lastSeen: 'Yesterday', status: 'moderate' },
  { word: 'pronunciation', arabic: 'النطق', forgotten: 2, lastSeen: '4 days ago', status: 'moderate' }
];

const pronunciationIssues = [
  { sound: 'TH', accuracy: 45, tip: 'Put your tongue between your teeth', tipAr: 'ضع لسانك بين أسنانك', example: 'think, thought, through' },
  { sound: 'R', accuracy: 62, tip: 'Curl your tongue back slightly', tipAr: 'أرجع لسانك للخلف قليلاً', example: 'right, wrong, write' },
  { sound: 'V', accuracy: 78, tip: 'Bite your lower lip gently', tipAr: 'اعض شفتك السفلى برفق', example: 'very, voice, video' }
];

const dailyPlan = [
  {
    time: '9:00 AM',
    activity: 'Story: Airport Adventure',
    activityAr: 'قصة: مغامرة المطار',
    focus: 'although, through',
    type: 'story',
    icon: <BookOpen className="w-4 h-4" />,
    duration: '15 min',
    completed: true
  },
  {
    time: '2:00 PM',
    activity: 'Conversation: Bank Manager',
    activityAr: 'محادثة: مدير البنك',
    focus: 'necessary, environment',
    type: 'conversation',
    icon: <Mic className="w-4 h-4" />,
    duration: '10 min',
    completed: false
  },
  {
    time: '6:00 PM',
    activity: 'Pronunciation Drill: TH sounds',
    activityAr: 'تدريب نطق: أصوات TH',
    focus: 'think, thought, through',
    type: 'pronunciation',
    icon: <Target className="w-4 h-4" />,
    duration: '8 min',
    completed: false
  },
  {
    time: '9:00 PM',
    activity: 'Review Quiz: Weak Words',
    activityAr: 'اختبار مراجعة: الكلمات الضعيفة',
    focus: 'All weak words',
    type: 'quiz',
    icon: <Zap className="w-4 h-4" />,
    duration: '5 min',
    completed: false
  }
];

const stats = {
  totalWords: 1247,
  weakWords: 23,
  accuracy: 86,
  streak: 12,
  storiesCompleted: 45,
  conversationsHad: 128
};

export default function AIMemory() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'moderate': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Memory</h1>
            <p className="text-slate-400 text-sm">Your personal learning brain</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Words Learned', value: stats.totalWords, icon: <BookOpen className="w-4 h-4" />, color: 'from-emerald-500 to-teal-600' },
            { label: 'Weak Words', value: stats.weakWords, icon: <AlertTriangle className="w-4 h-4" />, color: 'from-rose-500 to-pink-600' },
            { label: 'Accuracy', value: `${stats.accuracy}%`, icon: <Target className="w-4 h-4" />, color: 'from-amber-500 to-orange-600' },
            { label: 'Day Streak', value: stats.streak, icon: <TrendingUp className="w-4 h-4" />, color: 'from-violet-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-2`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة' },
            { id: 'weak', label: 'Weak Words', labelAr: 'كلمات ضعيفة' },
            { id: 'pronunciation', label: 'Pronunciation', labelAr: 'النطق' },
            { id: 'plan', label: 'Daily Plan', labelAr: 'الخطة اليومية' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.labelAr}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-5 border border-violet-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <h3 className="text-white font-bold">AI Insight</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                You forget "although" every week. I've added it to today's story at the airport. 
                You'll see it 4 times in different contexts.
              </p>
              <p className="text-slate-500 text-xs font-arabic mt-2">
                تنسى كلمة "although" كل أسبوع. أضفتها لقصة اليوم في المطار. ستراها 4 مرات في سياقات مختلفة.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700">
              <h3 className="text-white font-bold mb-3">Learning Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Stories Completed</span>
                  <span className="text-white font-bold">{stats.storiesCompleted}</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full">
                  <div className="h-full w-[45%] bg-emerald-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-slate-400 text-sm">Conversations Practiced</span>
                  <span className="text-white font-bold">{stats.conversationsHad}</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full">
                  <div className="h-full w-[64%] bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'weak' && (
          <div className="space-y-3">
            {weakWords.map((word, index) => (
              <motion.div
                key={word.word}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800/80 rounded-2xl p-4 border ${getStatusColor(word.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{word.word}</h3>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-black/20">
                    Forgot {word.forgotten}x
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-arabic mb-2">{word.arabic}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {word.lastSeen}
                  </span>
                  <button className="flex items-center gap-1 text-amber-400 hover:text-amber-300">
                    <RotateCcw className="w-3 h-3" /> Practice now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'pronunciation' && (
          <div className="space-y-4">
            {pronunciationIssues.map((issue, index) => (
              <motion.div
                key={issue.sound}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-xl">/{issue.sound}/</h3>
                  <div className={`text-sm font-bold ${issue.accuracy < 50 ? 'text-rose-400' : issue.accuracy < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {issue.accuracy}% accuracy
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-700 rounded-full mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${issue.accuracy}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full ${
                      issue.accuracy < 50 ? 'bg-rose-500' : issue.accuracy < 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>

                <div className="bg-slate-700/50 rounded-xl p-3 mb-2">
                  <p className="text-slate-300 text-sm">💡 {issue.tip}</p>
                  <p className="text-slate-500 text-xs font-arabic">{issue.tipAr}</p>
                </div>

                <p className="text-slate-400 text-xs">Examples: {issue.example}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-4 border border-violet-500/30 mb-4">
              <p className="text-white font-bold text-sm">Today's Focus</p>
              <p className="text-slate-300 text-xs">although, through, necessary, TH pronunciation</p>
              <p className="text-slate-500 text-xs font-arabic mt-1">التركيز اليومي</p>
            </div>

            {dailyPlan.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800/80 rounded-2xl p-4 border transition-all ${
                  item.completed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold ${item.completed ? 'text-emerald-400 line-through' : 'text-white'}`}>
                        {item.activityAr}
                      </h4>
                      <span className="text-slate-500 text-xs">{item.time}</span>
                    </div>
                    <p className="text-slate-400 text-xs">{item.activity}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-violet-400 text-xs">Focus: {item.focus}</span>
                      <span className="text-slate-500 text-xs">{item.duration}</span>
                    </div>
                  </div>
                  {item.completed && <span className="text-emerald-400 text-lg">✓</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

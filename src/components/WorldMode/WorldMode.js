import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Utensils, Landmark, Stethoscope, GraduationCap, ShoppingBag, Hotel, Car, Lock, ChevronRight, MessageCircle, Volume2, X } from 'lucide-react';

const locations = [
  {
    id: 'airport',
    name: 'Airport',
    nameAr: 'المطار',
    icon: <Plane className="w-6 h-6" />,
    progress: 85,
    unlocked: true,
    description: 'Check-in, security, boarding, and customs',
    descriptionAr: 'تسجيل الدخول، الأمن، الصعود، والجمارك',
    color: 'from-sky-500 to-blue-600',
    characters: [
      { name: 'Officer Johnson', role: 'Security Officer', roleAr: 'ضابط الأمن', personality: 'Strict & formal', accent: 'American', avatar: '👮‍♂️' },
      { name: 'Lisa', role: 'Flight Attendant', roleAr: 'مضيفة طيران', personality: 'Friendly & helpful', accent: 'British', avatar: '✈️' }
    ],
    scenarios: [
      { title: 'Check-in Counter', titleAr: 'مكتب تسجيل الدخول', completed: true },
      { title: 'Security Check', titleAr: 'تفتيش الأمن', completed: true },
      { title: 'Boarding Gate', titleAr: 'بوابة الصعود', completed: false },
      { title: 'Customs', titleAr: 'الجمارك', completed: false }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    nameAr: 'المطعم',
    icon: <Utensils className="w-6 h-6" />,
    progress: 60,
    unlocked: true,
    description: 'Ordering food, complaints, and paying',
    descriptionAr: 'طلب الطعام، الشكاوى، والدفع',
    color: 'from-orange-500 to-red-600',
    characters: [
      { name: 'Marco', role: 'Waiter', roleAr: 'نادل', personality: 'Cheerful & chatty', accent: 'Italian-American', avatar: '🍽️' },
      { name: 'Chef Antonio', role: 'Head Chef', roleAr: 'الشيف', personality: 'Passionate & loud', accent: 'Italian', avatar: '👨‍🍳' }
    ],
    scenarios: [
      { title: 'Making a Reservation', titleAr: 'حجز طاولة', completed: true },
      { title: 'Ordering Food', titleAr: 'طلب الطعام', completed: true },
      { title: 'Special Requests', titleAr: 'طلبات خاصة', completed: false },
      { title: 'Paying the Bill', titleAr: 'دفع الفاتورة', completed: false }
    ]
  },
  {
    id: 'bank',
    name: 'Bank',
    nameAr: 'البنك',
    icon: <Landmark className="w-6 h-6" />,
    progress: 30,
    unlocked: true,
    description: 'Opening accounts, loans, and transfers',
    descriptionAr: 'فتح حسابات، قروض، وتحويلات',
    color: 'from-emerald-500 to-teal-600',
    characters: [
      { name: 'Mr. Smith', role: 'Bank Manager', roleAr: 'مدير البنك', personality: 'Serious & professional', accent: 'American', avatar: '💼' },
      { name: 'Emma', role: 'Teller', roleAr: 'أمين الصندوق', personality: 'Patient & kind', accent: 'Canadian', avatar: '💳' }
    ],
    scenarios: [
      { title: 'Opening an Account', titleAr: 'فتح حساب', completed: true },
      { title: 'Applying for a Loan', titleAr: 'التقديم على قرض', completed: false },
      { title: 'Money Transfer', titleAr: 'تحويل أموال', completed: false }
    ]
  },
  {
    id: 'hospital',
    name: 'Hospital',
    nameAr: 'المستشفى',
    icon: <Stethoscope className="w-6 h-6" />,
    progress: 0,
    unlocked: true,
    description: 'Describing symptoms, prescriptions, and emergencies',
    descriptionAr: 'وصف الأعراض، الوصفات الطبية، والطوارئ',
    color: 'from-rose-500 to-pink-600',
    characters: [
      { name: 'Dr. Sarah', role: 'Doctor', roleAr: 'طبيبة', personality: 'Calm & reassuring', accent: 'British', avatar: '👩‍⚕️' },
      { name: 'Nurse Mike', role: 'Nurse', roleAr: 'ممرض', personality: 'Quick & efficient', accent: 'Australian', avatar: '💉' }
    ],
    scenarios: [
      { title: 'Making an Appointment', titleAr: 'حجز موعد', completed: false },
      { title: 'Describing Symptoms', titleAr: 'وصف الأعراض', completed: false },
      { title: 'Getting Prescription', titleAr: 'الحصول على وصفة', completed: false }
    ]
  },
  {
    id: 'university',
    name: 'University',
    nameAr: 'الجامعة',
    icon: <GraduationCap className="w-6 h-6" />,
    progress: 0,
    unlocked: false,
    description: 'Registration, classes, and campus life',
    descriptionAr: 'التسجيل، المحاضرات، وحياة الحرم الجامعي',
    color: 'from-violet-500 to-purple-600',
    characters: [
      { name: 'Prof. Anderson', role: 'Professor', roleAr: 'أستاذ', personality: 'Wise & demanding', accent: 'British', avatar: '🎓' },
      { name: 'Tommy', role: 'Student', roleAr: 'طالب', personality: 'Energetic & casual', accent: 'American (Southern)', avatar: '📚' }
    ],
    scenarios: [
      { title: 'Course Registration', titleAr: 'تسجيل المقررات', completed: false },
      { title: 'Class Discussion', titleAr: 'مناقشة صفية', completed: false },
      { title: 'Campus Tour', titleAr: 'جولة في الحرم', completed: false }
    ]
  },
  {
    id: 'shopping',
    name: 'Shopping Mall',
    nameAr: 'المركز التجاري',
    icon: <ShoppingBag className="w-6 h-6" />,
    progress: 0,
    unlocked: false,
    description: 'Bargaining, returns, and recommendations',
    descriptionAr: 'المساومة، الاسترجاع، والتوصيات',
    color: 'from-amber-500 to-yellow-600',
    characters: [
      { name: 'Jessica', role: 'Shop Assistant', roleAr: 'مساعدة متجر', personality: 'Enthusiastic & persuasive', accent: 'American', avatar: '🛍️' },
      { name: 'David', role: 'Store Manager', roleAr: 'مدير المتجر', personality: 'Polite & firm', accent: 'British', avatar: '🏪' }
    ],
    scenarios: [
      { title: 'Asking for Help', titleAr: 'طلب المساعدة', completed: false },
      { title: 'Trying Clothes', titleAr: 'تجربة الملابس', completed: false },
      { title: 'Making a Return', titleAr: 'إرجاع منتج', completed: false }
    ]
  }
];

export default function WorldMode() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const startScenario = (location, scenario) => {
    setActiveScenario({ location, scenario });
    setChatMessages([
      {
        sender: 'ai',
        text: `Welcome to the ${location.name}! I'm ${location.characters[0].name}, the ${location.characters[0].role}. How can I help you today?`,
        textAr: `مرحباً بك في ${location.nameAr}! أنا ${location.characters[0].name}، ${location.characters[0].roleAr}. كيف يمكنني مساعدتك اليوم؟`,
        character: location.characters[0]
      }
    ]);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    setUserInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's interesting! Let me help you with that.",
        "I see. Could you tell me more?",
        "Great question! Here's what you need to know...",
        "Absolutely! Let's work through this together."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: randomResponse,
        textAr: "رد ذكي اصطناعي...",
        character: activeScenario.location.characters[0]
      }]);
    }, 1000);
  };

  if (activeScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
        {/* Chat Header */}
        <div className="bg-slate-800/90 border-b border-slate-700 p-4 flex items-center gap-3">
          <button 
            onClick={() => setActiveScenario(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-2xl">{activeScenario.location.characters[0].avatar}</div>
          <div>
            <h3 className="text-white font-bold">{activeScenario.location.characters[0].name}</h3>
            <p className="text-slate-400 text-xs">{activeScenario.scenario.title} • {activeScenario.location.characters[0].accent} accent</p>
          </div>
          <button 
            onClick={() => {
              const lastAiMsg = chatMessages.filter(m => m.sender === 'ai').pop();
              if (lastAiMsg) {
                const utterance = new SpeechSynthesisUtterance(lastAiMsg.text);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                speechSynthesis.speak(utterance);
              }
            }}
            className="ml-auto p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-amber-400"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.sender === 'user' 
                  ? 'bg-amber-500 text-white rounded-br-sm' 
                  : 'bg-slate-700 text-white rounded-bl-sm'
              }`}>
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{msg.character?.avatar}</span>
                    <span className="text-xs text-slate-400">{msg.character?.name}</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.textAr && <p className="text-xs text-slate-400 mt-1 font-arabic">{msg.textAr}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-slate-800/90 border-t border-slate-700 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your response in English..."
              className="flex-1 bg-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={sendMessage}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-4 py-3 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pb-24">
        <div className="max-w-lg mx-auto">
          {/* Location Header */}
          <button 
            onClick={() => setSelectedLocation(null)}
            className="text-slate-400 hover:text-white mb-4 flex items-center gap-1"
          >
            ← Back to World
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${selectedLocation.color} rounded-3xl p-6 mb-6`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                {selectedLocation.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedLocation.name}</h1>
                <p className="text-white/80 font-arabic">{selectedLocation.nameAr}</p>
              </div>
            </div>
            <p className="text-white/70 mt-3 text-sm">{selectedLocation.description}</p>
            <p className="text-white/50 text-xs font-arabic">{selectedLocation.descriptionAr}</p>

            <div className="mt-4">
              <div className="flex justify-between text-white/80 text-sm mb-1">
                <span>Progress</span>
                <span>{selectedLocation.progress}%</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${selectedLocation.progress}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Characters */}
          <h2 className="text-white font-bold text-lg mb-3">Characters you'll meet</h2>
          <div className="space-y-3 mb-6">
            {selectedLocation.characters.map((char, index) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex items-center gap-4"
              >
                <span className="text-3xl">{char.avatar}</span>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{char.name}</h3>
                  <p className="text-slate-400 text-sm">{char.role} • {char.accent} accent</p>
                  <p className="text-slate-500 text-xs font-arabic">{char.roleAr} • {char.personality}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">Talk</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scenarios */}
          <h2 className="text-white font-bold text-lg mb-3">Scenarios</h2>
          <div className="space-y-3">
            {selectedLocation.scenarios.map((scenario, index) => (
              <motion.button
                key={scenario.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => startScenario(selectedLocation, scenario)}
                className={`w-full bg-slate-800/80 rounded-2xl p-4 border transition-all text-left flex items-center justify-between ${
                  scenario.completed 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : 'border-slate-700 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <h3 className={`font-bold ${scenario.completed ? 'text-emerald-400' : 'text-white'}`}>
                    {scenario.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-arabic">{scenario.titleAr}</p>
                </div>
                {scenario.completed ? (
                  <span className="text-emerald-400 text-sm">✓ Done</span>
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">World Mode</h1>
          <p className="text-slate-400 text-sm">Live the language in a virtual city</p>
          <p className="text-slate-500 text-xs font-arabic">عش اللغة في مدينة افتراضية</p>
        </div>

        {/* City Map Grid */}
        <div className="grid grid-cols-2 gap-4">
          {locations.map((location, index) => (
            <motion.button
              key={location.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => location.unlocked && setSelectedLocation(location)}
              className={`relative rounded-2xl p-5 border transition-all text-left ${
                location.unlocked 
                  ? 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10' 
                  : 'bg-slate-800/40 border-slate-800 opacity-60'
              }`}
            >
              {!location.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Lock className="w-8 h-8 text-slate-600" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${location.color} flex items-center justify-center text-white mb-3 ${!location.unlocked && 'opacity-30'}`}>
                {location.icon}
              </div>

              <h3 className={`font-bold ${location.unlocked ? 'text-white' : 'text-slate-600'}`}>
                {location.name}
              </h3>
              <p className="text-xs text-slate-500 font-arabic">{location.nameAr}</p>

              {location.unlocked && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{location.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-700 rounded-full">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${location.color}`}
                      style={{ width: `${location.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Total Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-slate-800/80 rounded-2xl p-5 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold">City Exploration</span>
            <span className="text-amber-400 font-bold">29%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="h-full w-[29%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>
          <p className="text-slate-500 text-xs mt-2">3 of 6 locations unlocked • 5 of 17 scenarios completed</p>
        </motion.div>
      </div>
    </div>
  );
}

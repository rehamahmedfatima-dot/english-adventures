import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, BookOpen, Mic, Trophy, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    icon: <Plane className="w-20 h-20 text-amber-400" />,
    title: "Welcome to English Adventures!",
    titleAr: "مرحباً بك في مغامرات الإنجليزية!",
    description: "Learn English by living it. Travel through stories, meet characters, and master the language.",
    descriptionAr: "تعلم الإنجليزية بالعيش فيها. سافر عبر القصص، قابل الشخصيات، وأتقن اللغة.",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 2,
    icon: <BookOpen className="w-20 h-20 text-emerald-400" />,
    title: "Interactive Stories",
    titleAr: "قصص تفاعلية",
    description: "Choose your path in 1000+ stories. Your decisions shape the adventure and your learning.",
    descriptionAr: "اختر طريقك في أكثر من 1000 قصة. قراراتك تشكل المغامرة وتعلمك.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 3,
    icon: <Mic className="w-20 h-20 text-rose-400" />,
    title: "AI Pronunciation Coach",
    titleAr: "مدرب النطق بالذكاء الاصطناعي",
    description: "Get real-time feedback on your pronunciation with 3D mouth animations and phoneme analysis.",
    descriptionAr: "احصل على تقييم فوري لنطقك مع رسومات ثلاثية الأبعاد للفم وتحليل الصوتيات.",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: 4,
    icon: <Trophy className="w-20 h-20 text-violet-400" />,
    title: "Your Journey Starts Now",
    titleAr: "رحلتك تبدأ الآن",
    description: "Complete your placement test to get a personalized learning path designed just for you.",
    descriptionAr: "أكمل اختبار تحديد المستوى للحصول على خطة تعلم مخصصة لك فقط.",
    color: "from-violet-500 to-purple-600"
  }
];

const levelOptions = [
  { id: 'beginner', label: 'Beginner', labelAr: 'مبتدئ', desc: 'I know a few words', descAr: 'أعرف بعض الكلمات', color: 'bg-emerald-500' },
  { id: 'elementary', label: 'Elementary', labelAr: 'أساسي', desc: 'I can make simple sentences', descAr: 'أستطيع تكوين جمل بسيطة', color: 'bg-blue-500' },
  { id: 'intermediate', label: 'Intermediate', labelAr: 'متوسط', desc: 'I can hold a conversation', descAr: 'أستطيع إجراء محادثة', color: 'bg-amber-500' },
  { id: 'advanced', label: 'Advanced', labelAr: 'متقدم', desc: 'I want to master fluency', descAr: 'أريد إتقان الطلاقة', color: 'bg-rose-500' }
];

export default function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (currentSlide === slides.length) {
      setShowLevelSelect(true);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setTimeout(() => {
      onComplete(level);
    }, 500);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  if (showLevelSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">What's your level?</h2>
          <p className="text-slate-400 text-lg">ما هو مستواك؟</p>
        </motion.div>

        <div className="w-full max-w-md space-y-4">
          {levelOptions.map((level, index) => (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLevelSelect(level.id)}
              className={`w-full p-5 rounded-2xl bg-slate-800/80 border-2 border-slate-700 hover:border-amber-500 transition-all flex items-center gap-4 ${
                selectedLevel === level.id ? 'border-amber-500 bg-amber-500/10' : ''
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${level.color}`} />
              <div className="text-left flex-1">
                <div className="text-white font-bold text-lg">{level.label}</div>
                <div className="text-slate-400 text-sm">{level.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-amber-400 font-bold">{level.labelAr}</div>
                <div className="text-slate-500 text-xs">{level.descAr}</div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-slate-500 text-sm"
        >
          Don't worry, you can change this later in your profile
        </motion.p>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-md relative">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-center"
          >
            {/* Icon with glow */}
            <div className={`w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${slide.color} p-1`}>
              <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center">
                {slide.icon}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{slide.title}</h1>
            <p className="text-amber-400 text-lg mb-4 font-arabic">{slide.titleAr}</p>

            <p className="text-slate-300 text-base leading-relaxed mb-2">{slide.description}</p>
            <p className="text-slate-500 text-sm font-arabic">{slide.descriptionAr}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-3 rounded-full transition-all ${
              currentSlide === 0 ? 'text-slate-700 cursor-not-allowed' : 'text-white hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/25 transition-all"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Skip button */}
        <button
          onClick={() => setShowLevelSelect(true)}
          className="mt-6 text-slate-500 text-sm hover:text-slate-300 transition-colors w-full"
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
}

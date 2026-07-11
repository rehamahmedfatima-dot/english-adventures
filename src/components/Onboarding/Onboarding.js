import React, { useState } from 'react';
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
    description: "Choose your path in stories. Your decisions shape the adventure and your learning.",
    descriptionAr: "اختر طريقك في القصص. قراراتك تشكل المغامرة وتعلمك.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 3,
    icon: <Mic className="w-20 h-20 text-rose-400" />,
    title: "AI Pronunciation Coach",
    titleAr: "مدرب النطق بالذكاء الاصطناعي",
    description: "Get real-time feedback on your pronunciation with phoneme analysis.",
    descriptionAr: "احصل على تقييم فوري لنطقك مع تحليل الصوتيات.",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: 4,
    icon: <Trophy className="w-20 h-20 text-violet-400" />,
    title: "Your Journey Starts Now",
    titleAr: "رحلتك تبدأ الآن",
    description: "Complete your placement test to get a personalized learning path.",
    descriptionAr: "أكمل اختبار تحديد المستوى للحصول على خطة تعلم مخصصة لك.",
    color: "from-violet-500 to-purple-600"
  }
];

const levelOptions = [
  { id: 'beginner', label: 'Beginner', labelAr: 'مبتدئ', desc: 'I know a few words', descAr: 'أعرف بعض الكلمات', color: 'bg-emerald-500' },
  { id: 'elementary', label: 'Elementary', labelAr: 'أساسي', desc: 'I can make simple sentences', descAr: 'أستطيع تكوين جمل بسيطة', color: 'bg-blue-500' },
  { id: 'intermediate', label: 'Intermediate', labelAr: 'متوسط', desc: 'I can hold a conversation', descAr: 'أستطيع إجراء محادثة', color: 'bg-amber-500' },
  { id: 'advanced', label: 'Advanced', labelAr: 'متقدم', desc: 'I want to master fluency', descAr: 'أريد إتقان الطلاقة', color: 'bg-rose-500' }
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setShowLevelSelect(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (showLevelSelect) {
    return (
      <div className="min-h-screen bg-ea-dark flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">What is your level?</h2>
          <p className="text-ea-text-secondary text-lg">ما هو مستواك؟</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          {levelOptions.map((level) => (
            <button
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              className={`w-full p-5 rounded-2xl bg-ea-card border-2 border-ea-darker hover:border-ea-gold transition-all flex items-center gap-4 ${
                selectedLevel === level.id ? 'border-ea-gold bg-amber-500/10' : ''
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${level.color}`} />
              <div className="text-left flex-1">
                <div className="text-white font-bold text-lg">{level.label}</div>
                <div className="text-ea-gray text-sm">{level.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-ea-gold font-bold">{level.labelAr}</div>
                <div className="text-ea-gray text-xs">{level.descAr}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-ea-dark flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-ea-gold' : 'w-2 bg-ea-gray'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center"
          >
            <div className={`w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${slide.color} p-1`}>
              <div className="w-full h-full rounded-3xl bg-ea-dark flex items-center justify-center">
                {slide.icon}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{slide.title}</h1>
            <p className="text-ea-gold text-lg mb-4">{slide.titleAr}</p>

            <p className="text-ea-text-secondary text-base mb-2">{slide.description}</p>
            <p className="text-ea-gray text-sm">{slide.descriptionAr}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-12">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-3 rounded-full ${
              currentSlide === 0 ? 'text-ea-darker cursor-not-allowed' : 'text-white hover:bg-ea-card'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="px-8 py-3 bg-gradient-to-r from-ea-gold to-ea-orange text-white rounded-full font-bold flex items-center gap-2"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

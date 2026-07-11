import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, ChevronRight, RotateCcw } from 'lucide-react';

const storyData = {
  title: 'The Lost Key at the Airport',
  titleAr: 'المفتاح المفقود في المطار',
  level: 'B1',
  duration: '15 min',
  parts: [
    {
      id: 1,
      text: 'Sarah stood at the airport security checkpoint, her heart racing. She reached into her pocket and felt nothing.',
      textAr: 'وقفت سارة عند نقطة تفتيش الأمن في المطار، وقلبها يدق بسرعة. وصلت إلى جيبها ولم تشعر بشيء.',
      words: ['checkpoint', 'racing', 'reached'],
      choices: [
        { text: 'Panic and tell the officer', textAr: 'الذعر وإخبار الضابط', next: 2 },
        { text: 'Stay calm and check again', textAr: 'البقاء هادئاً والتفتيش مرة أخرى', next: 3 },
      ],
    },
    {
      id: 2,
      text: 'The security officer looked at her with concern. "Lost something, miss?" he asked in a deep voice.',
      textAr: 'نظر إليها ضابط الأمن بقلق. "فقدتِ شيئاً يا آنسة؟" سأل بصوت عميق.',
      words: ['concern', 'deep'],
      choices: [
        { text: 'Yes, my house key!', textAr: 'نعم، مفتاح منزلي!', next: 4 },
        { text: 'Its nothing important', textAr: 'إنه لا شيء مهم', next: 5 },
      ],
    },
    {
      id: 3,
      text: 'Sarah took a deep breath and checked her bag. There it was - the key had fallen into a small pocket!',
      textAr: 'أخذت سارة نفساً عميقاً وفحصت حقيبتها. كان هناك - سقط المفتاح في جيب صغير!',
      words: ['breath', 'fallen'],
      choices: [
        { text: 'Smile and proceed', textAr: 'ابتسم واستمر', next: 6 },
        { text: 'Thank the officer anyway', textAr: 'اشكر الضابط على أي حال', next: 6 },
      ],
    },
    {
      id: 4,
      text: '"Dont worry, miss. We can help you find it. Let me call the lost and found department," the officer said kindly.',
      textAr: '"لا تقلقي يا آنسة. يمكننا مساعدتك في العثور عليه. دعني أتصل بقسم المفقودات،" قال الضابط بلطف.',
      words: ['department', 'kindly'],
      choices: [
        { text: 'Thank you so much!', textAr: 'شكراً جزيلاً!', next: 6 },
      ],
    },
    {
      id: 5,
      text: 'The officer nodded but looked suspicious. Sarah realized she should have been honest. Honesty is always the best policy.',
      textAr: 'أومأ الضابط برأسه لكنه بدا مشبوهاً. أدركت سارة أنها كان يجب أن تكون صادقة. الصدق هو أفضل سياسة دائماً.',
      words: ['suspicious', 'honest', 'policy'],
      choices: [
        { text: 'Admit the truth', textAr: 'اعترف بالحقيقة', next: 4 },
      ],
    },
    {
      id: 6,
      text: 'Sarah boarded her flight with a smile. Whether she found the key or not, she learned an important lesson about staying calm.',
      textAr: 'صعدت سارة إلى طائرتها وهي تبتسم. سواء وجدت المفتاح أم لا، تعلمت درساً مهماً حول البقاء هادئة.',
      words: ['boarded', 'whether', 'lesson'],
      choices: [],
    },
  ],
};

const StoryMode = () => {
  const [currentPart, setCurrentPart] = useState(0);
  const [completedWords, setCompletedWords] = useState([]);
  const { addXP } = useApp();

  const part = storyData.parts[currentPart];
  const progress = ((currentPart + 1) / storyData.parts.length) * 100;

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const handleChoice = (nextId) => {
    if (part.words) {
      setCompletedWords(prev => [...prev, ...part.words]);
      addXP(10);
    }
    const nextIndex = storyData.parts.findIndex(p => p.id === nextId);
    if (nextIndex >= 0) {
      setCurrentPart(nextIndex);
    }
  };

  const restart = () => {
    setCurrentPart(0);
    setCompletedWords([]);
  };

  return (
    <div className="screen-container px-5 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-ea-gold/20 text-ea-gold text-xs px-2 py-1 rounded-full">{storyData.level}</span>
          <span className="bg-ea-card text-ea-text-secondary text-xs px-2 py-1 rounded-full">{storyData.duration}</span>
        </div>
        <h2 className="text-white font-bold text-xl mb-1">{storyData.title}</h2>
        <p className="text-ea-text-secondary text-sm">{storyData.titleAr}</p>
      </div>

      <div className="w-full h-2 bg-ea-card rounded-full mb-6">
        <div className="h-full bg-gradient-to-r from-ea-gold to-ea-orange rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="bg-ea-card rounded-2xl p-5 mb-6">
        <button onClick={() => speak(part.text)} className="flex items-center gap-2 text-ea-gold mb-4">
          <Volume2 className="w-4 h-4" />
          <span className="text-sm">Listen</span>
        </button>

        <p className="text-white text-base leading-relaxed mb-3">{part.text}</p>
        <p className="text-ea-text-secondary text-sm leading-relaxed">{part.textAr}</p>

        {part.words && part.words.length > 0 && (
          <div className="mt-4 pt-4 border-t border-ea-darker">
            <p className="text-ea-gray text-xs mb-2">New Words:</p>
            <div className="flex flex-wrap gap-2">
              {part.words.map((word, idx) => (
                <span key={idx} className="bg-ea-darker text-ea-gold text-xs px-3 py-1 rounded-full">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {part.choices.length > 0 ? (
        <div className="space-y-3">
          {part.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice.next)}
              className="w-full bg-gradient-to-r from-ea-orange to-rose-500 rounded-xl p-4 text-left hover:opacity-90 transition-opacity"
            >
              <p className="text-white font-medium">{choice.text}</p>
              <p className="text-white/70 text-sm">{choice.textAr}</p>
              <ChevronRight className="w-5 h-5 text-white/50 mt-2" />
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-ea-gold text-2xl mb-2">🎉 Story Complete!</p>
          <p className="text-ea-text-secondary text-sm mb-4">You learned {completedWords.length} new words</p>
          <button onClick={restart} className="flex items-center gap-2 mx-auto bg-ea-card text-white px-6 py-3 rounded-xl">
            <RotateCcw className="w-4 h-4" />
            Read Again
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryMode;

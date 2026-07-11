import React, { useState } from 'react';
import { Volume2, RotateCcw, Check } from 'lucide-react';

const words = [
  { word: 'adventure', arabic: 'مغامرة', example: 'Life is either a daring adventure or nothing.', level: 'A2' },
  { word: 'brave', arabic: 'شجاع', example: 'Be brave enough to live life creatively.', level: 'A1' },
  { word: 'curious', arabic: 'فضولي', example: 'I am curious about the world around me.', level: 'A2' },
  { word: 'journey', arabic: 'رحلة', example: 'The journey of a thousand miles begins with one step.', level: 'A1' },
  { word: 'mysterious', arabic: 'غامض', example: 'There was a mysterious noise in the night.', level: 'B1' },
  { word: 'although', arabic: 'على الرغم من', example: 'Although it was raining, we went out.', level: 'B1' },
  { word: 'through', arabic: 'عبر / خلال', example: 'We walked through the forest.', level: 'A2' },
  { word: 'necessary', arabic: 'ضروري', example: 'Sleep is necessary for good health.', level: 'B1' },
];

const Vocabulary = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mastered, setMastered] = useState([]);

  const currentWord = words[currentIndex];

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const markMastered = () => {
    if (!mastered.includes(currentWord.word)) {
      setMastered([...mastered, currentWord.word]);
    }
    nextWord();
  };

  return (
    <div className="screen-container px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-xl">Flashcards</h2>
        <span className="text-ea-gold text-sm">{mastered.length}/{words.length} mastered</span>
      </div>

      <div className="bg-ea-card rounded-2xl p-6 mb-6 min-h-[280px] flex flex-col justify-center">
        <div className="text-center">
          <span className="bg-ea-gold/20 text-ea-gold text-xs px-2 py-1 rounded-full mb-4 inline-block">
            {currentWord.level}
          </span>
          <h3 className="text-white font-bold text-3xl mb-2">{currentWord.word}</h3>
          <button onClick={() => speak(currentWord.word)} className="text-ea-gold mb-4">
            <Volume2 className="w-5 h-5 mx-auto" />
          </button>

          {showAnswer ? (
            <div>
              <p className="text-ea-text-secondary text-xl mb-4">{currentWord.arabic}</p>
              <p className="text-ea-gray text-sm italic">"{currentWord.example}"</p>
            </div>
          ) : (
            <p className="text-ea-gray text-sm">Tap to reveal meaning</p>
          )}
        </div>

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-6 w-full py-3 bg-ea-darker text-white rounded-xl hover:bg-ea-card transition-colors"
        >
          {showAnswer ? 'Hide' : 'Show Meaning'}
        </button>
      </div>

      <div className="flex gap-3">
        <button onClick={nextWord} className="flex-1 py-3 bg-ea-card text-white rounded-xl flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Skip
        </button>
        <button onClick={markMastered} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Mastered
        </button>
      </div>

      <h3 className="text-white font-bold text-lg mt-8 mb-3">Word List</h3>
      <div className="space-y-2">
        {words.map((w, idx) => (
          <div key={idx} className="bg-ea-card rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-white font-medium">{w.word}</span>
              <span className="text-ea-gray text-sm mx-2">•</span>
              <span className="text-ea-text-secondary text-sm">{w.arabic}</span>
            </div>
            {mastered.includes(w.word) && <span className="text-emerald-400 text-sm">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vocabulary;

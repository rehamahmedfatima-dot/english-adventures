import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { vocabulary } from '../../data/vocabulary';
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const Vocabulary = () => {
  const { addXP } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState('flashcards'); // flashcards | list

  const currentWord = vocabulary[currentIndex];
  const weakWords = vocabulary.filter(w => !w.mastered);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleRate = (difficulty) => {
    let xp = 0;
    if (difficulty === 'easy') xp = 10;
    else if (difficulty === 'medium') xp = 15;
    else xp = 20;
    addXP(xp);
    setIsFlipped(false);
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="screen-container">
      {/* Tabs */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        <button 
          onClick={() => setViewMode('flashcards')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
            viewMode === 'flashcards' 
              ? 'bg-gradient-to-r from-ea-orange to-orange-600 text-white shadow-lg shadow-orange-500/30' 
              : 'bg-ea-card border border-ea-border text-ea-text-secondary'
          }`}
        >
          🎴 Flashcards
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
            viewMode === 'list' 
              ? 'bg-gradient-to-r from-ea-orange to-orange-600 text-white shadow-lg shadow-orange-500/30' 
              : 'bg-ea-card border border-ea-border text-ea-text-secondary'
          }`}
        >
          📋 Word List
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-around px-5 py-3">
        <div className="text-center">
          <div className="text-ea-text font-bold text-lg">{vocabulary.length}</div>
          <div className="text-ea-text-secondary text-xs">Total</div>
        </div>
        <div className="text-center">
          <div className="text-ea-green font-bold text-lg">{vocabulary.filter(w => w.mastered).length}</div>
          <div className="text-ea-text-secondary text-xs">Mastered</div>
        </div>
        <div className="text-center">
          <div className="text-ea-gold font-bold text-lg">{weakWords.length}</div>
          <div className="text-ea-text-secondary text-xs">Learning</div>
        </div>
      </div>

      {viewMode === 'flashcards' ? (
        <div className="px-5 py-4">
          {/* Flashcard */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="ea-card min-h-[280px] flex flex-col items-center justify-center cursor-pointer transition-all hover:border-ea-orange relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ea-orange to-ea-gold" />

            {!isFlipped ? (
              <>
                <h2 className="text-3xl font-bold text-ea-text mb-2">{currentWord.word}</h2>
                <p className="text-ea-text-secondary text-sm">Tap to flip</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                  className="mt-4 flex items-center gap-2 text-ea-orange font-semibold"
                >
                  <Volume2 size={18} /> Listen
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-ea-orange mb-2">{currentWord.arabic}</h2>
                <p className="text-ea-text text-center px-4 mb-4">"{currentWord.example}"</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(currentWord.example); }}
                  className="flex items-center gap-2 text-ea-blue font-semibold text-sm"
                >
                  <Volume2 size={16} /> Listen to example
                </button>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button 
              onClick={() => { setIsFlipped(false); setCurrentIndex(prev => Math.max(0, prev - 1)); }}
              disabled={currentIndex === 0}
              className="p-3 rounded-xl bg-ea-card border border-ea-border disabled:opacity-30"
            >
              <ChevronLeft size={20} className="text-ea-text" />
            </button>
            <span className="text-ea-text-secondary text-sm font-semibold">
              {currentIndex + 1} / {vocabulary.length}
            </span>
            <button 
              onClick={() => { setIsFlipped(false); setCurrentIndex(prev => Math.min(vocabulary.length - 1, prev + 1)); }}
              disabled={currentIndex === vocabulary.length - 1}
              className="p-3 rounded-xl bg-ea-card border border-ea-border disabled:opacity-30"
            >
              <ChevronRight size={20} className="text-ea-text" />
            </button>
          </div>

          {/* Difficulty Rating */}
          {isFlipped && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button onClick={() => handleRate('hard')} className="py-3 rounded-xl bg-ea-red/10 border border-ea-red/20 text-ea-red font-bold text-sm hover:bg-ea-red/20 transition-all">
                😰 Hard
              </button>
              <button onClick={() => handleRate('medium')} className="py-3 rounded-xl bg-ea-gold/10 border border-ea-gold/20 text-ea-gold font-bold text-sm hover:bg-ea-gold/20 transition-all">
                😐 Medium
              </button>
              <button onClick={() => handleRate('easy')} className="py-3 rounded-xl bg-ea-green/10 border border-ea-green/20 text-ea-green font-bold text-sm hover:bg-ea-green/20 transition-all">
                😊 Easy
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="px-5 py-4">
          {vocabulary.map((word, idx) => (
            <div key={idx} className="ea-card mb-2 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                word.mastered ? 'bg-ea-green/20 text-ea-green' : 'bg-ea-orange/10 text-ea-orange'
              }`}>
                {word.mastered ? <Check size={16} /> : <RotateCcw size={16} />}
              </div>
              <div className="flex-1">
                <div className="text-ea-text font-semibold">{word.word}</div>
                <div className="text-ea-text-secondary text-xs">{word.arabic}</div>
              </div>
              <button onClick={() => speak(word.word)} className="p-2 rounded-lg bg-white/5 text-ea-text-secondary hover:text-ea-orange transition-colors">
                <Volume2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vocabulary;

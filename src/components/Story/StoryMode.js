import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTodayStory } from '../../data/stories';
import { Volume2, ChevronRight, Star } from 'lucide-react';

const StoryMode = () => {
  const { addXP } = useApp();
  const story = getTodayStory();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState(null);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    addXP(15);
    setTimeout(() => {
      setSelectedChoice(null);
      if (currentStep < story.content.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1500);
  };

  const currentContent = story.content[currentStep];

  return (
    <div className="screen-container">
      {/* Story Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-ea-text font-bold text-lg">{story.title}</h2>
          <span className="text-ea-text-secondary text-xs">{story.duration}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-ea-orange to-ea-gold rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / story.content.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Story Content */}
      <div className="px-5 py-4">
        {currentContent.type === 'narration' && (
          <div className="ea-card mb-4">
            <p className="text-ea-text leading-relaxed text-base">
              {currentContent.text.split(' ').map((word, idx) => (
                <span 
                  key={idx}
                  onClick={() => {
                    setHighlightedWord(word);
                    speak(word);
                  }}
                  className={`cursor-pointer transition-colors ${
                    story.words.includes(word.toLowerCase().replace(/[.,!?]/, '')) 
                      ? 'text-ea-orange font-semibold hover:text-ea-gold' 
                      : 'hover:text-ea-gold'
                  }`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-ea-text-secondary text-xs mt-2 underline"
            >
              {showTranslation ? 'Hide' : 'Show'} Translation
            </button>
            {showTranslation && (
              <p className="text-ea-text-secondary text-sm mt-2 border-r-2 border-ea-orange pr-3">
                {currentContent.textAr}
              </p>
            )}
            <button 
              onClick={() => speak(currentContent.text)}
              className="mt-3 flex items-center gap-2 text-ea-orange text-sm font-semibold"
            >
              <Volume2 size={16} /> Listen
            </button>
          </div>
        )}

        {currentContent.type === 'dialogue' && (
          <div className="ea-card mb-4 border-l-4 border-l-ea-blue">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ea-blue to-blue-600 flex items-center justify-center text-sm">
                {currentContent.speaker[0]}
              </div>
              <span className="text-ea-blue font-bold text-sm">{currentContent.speaker}</span>
            </div>
            <p className="text-ea-text leading-relaxed">{currentContent.text}</p>
            <p className="text-ea-text-secondary text-sm mt-2">{currentContent.textAr}</p>
            <button 
              onClick={() => speak(currentContent.text)}
              className="mt-2 flex items-center gap-2 text-ea-orange text-sm font-semibold"
            >
              <Volume2 size={16} /> Listen
            </button>
          </div>
        )}

        {currentContent.type === 'choice' && (
          <div className="mb-4">
            <h3 className="text-ea-gold font-bold text-lg mb-3 flex items-center gap-2">
              <Star size={18} /> Your Turn!
            </h3>
            <p className="text-ea-text mb-4">{currentContent.question}</p>
            {currentContent.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(choice)}
                className={`w-full text-right p-4 rounded-xl mb-2 font-semibold transition-all ${
                  selectedChoice === choice 
                    ? 'bg-ea-green/20 border-2 border-ea-green text-ea-green' 
                    : selectedChoice 
                      ? 'bg-ea-card border border-ea-border text-ea-text-secondary opacity-50'
                      : 'bg-ea-card border border-ea-border text-ea-text hover:border-ea-orange hover:bg-ea-card-hover'
                }`}
              >
                {selectedChoice === choice && '✅ '}{choice}
              </button>
            ))}
          </div>
        )}

        {/* Word Popup */}
        {highlightedWord && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setHighlightedWord(null)}>
            <div className="bg-ea-card border border-ea-border rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-ea-orange mb-1">{highlightedWord}</h3>
              <p className="text-ea-text-secondary mb-4">Translation will appear here</p>
              <button 
                onClick={() => speak(highlightedWord)}
                className="ea-btn-primary w-full flex items-center justify-center gap-2"
              >
                <Volume2 size={18} /> Listen
              </button>
            </div>
          </div>
        )}

        {/* Next Button */}
        {currentContent.type !== 'choice' && currentStep < story.content.length - 1 && (
          <button 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="ea-btn-primary w-full flex items-center justify-center gap-2 mt-4"
          >
            Next <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryMode;

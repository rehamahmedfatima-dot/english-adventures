import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, RotateCcw } from 'lucide-react';

const sampleWords = [
  { word: 'adventure', phonetic: '/ədˈvɛntʃər/', arabic: 'مغامرة' },
  { word: 'through', phonetic: '/θruː/', arabic: 'عبر' },
  { word: 'although', phonetic: '/ɔːlˈðəʊ/', arabic: 'على الرغم من' },
  { word: 'necessary', phonetic: '/ˈnɛsəsəri/', arabic: 'ضروري' },
];

const Pronunciation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [score, setScore] = useState(null);
  const [currentWord, setCurrentWord] = useState(0);
  const timerRef = useRef(null);

  const word = sampleWords[currentWord];

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setScore(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setScore(Math.floor(Math.random() * 30) + 65);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    setCurrentWord((prev) => (prev + 1) % sampleWords.length);
    setScore(null);
    setRecordingTime(0);
  };

  return (
    <div className="screen-container px-5 py-6">
      <h2 className="text-white font-bold text-xl mb-6">Pronunciation Studio</h2>

      <div className="bg-ea-card rounded-2xl p-6 mb-6 text-center">
        <h3 className="text-white font-bold text-3xl mb-2">{word.word}</h3>
        <p className="text-ea-gold text-lg mb-1">{word.phonetic}</p>
        <p className="text-ea-text-secondary text-sm mb-4">{word.arabic}</p>
        <button onClick={() => speak(word.word)} className="flex items-center gap-2 mx-auto text-ea-gold">
          <Volume2 className="w-5 h-5" />
          <span className="text-sm">Listen</span>
        </button>
      </div>

      <div className="bg-ea-card rounded-2xl p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-1 h-16 mb-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-ea-gold to-ea-orange rounded-full transition-all"
              style={{
                height: isRecording ? `${Math.random() * 40 + 5}px` : '4px',
              }}
            />
          ))}
        </div>

        <div className="text-2xl font-mono text-ea-gold mb-4">
          {isRecording
            ? `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`
            : '00:00'}
        </div>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            isRecording ? 'bg-rose-500 animate-pulse' : 'bg-gradient-to-r from-ea-gold to-ea-orange'
          }`}
        >
          <Mic className="w-8 h-8 text-white" />
        </button>
      </div>

      {score !== null && (
        <div className="bg-ea-card rounded-2xl p-6 text-center mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle
                cx="64" cy="64" r="56"
                stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e'}
                strokeWidth="8" fill="none"
                strokeDasharray={`${score * 3.52} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{score}%</span>
            </div>
          </div>
          <p className="text-white font-bold">
            {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good!' : 'Keep practicing!'}
          </p>
        </div>
      )}

      <button onClick={nextWord} className="w-full py-3 bg-ea-card text-white rounded-xl flex items-center justify-center gap-2">
        <RotateCcw className="w-4 h-4" />
        Next Word
      </button>
    </div>
  );
};

export default Pronunciation;

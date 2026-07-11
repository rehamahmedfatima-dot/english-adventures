import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, Volume2, Play, Square, Award } from 'lucide-react';

const Pronunciation = () => {
  const { addXP } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [score, setScore] = useState(null);
  const [activeTab, setActiveTab] = useState('word');
  const [currentWord, setCurrentWord] = useState({
    word: 'Think',
    phonetic: '/θɪŋk/',
    arabic: 'يفكر',
    example: 'I think about you every day.',
  });

  const timerRef = useRef(null);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          stopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    setIsRecording(false);
    // Simulate AI scoring
    const simulatedScore = Math.floor(Math.random() * 25) + 70;
    setScore(simulatedScore);
    addXP(30);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const phonemes = [
    { letter: 'TH', sound: '/θ/', status: 'correct', score: 94, tip: 'اللسان بين الأسنان' },
    { letter: 'I', sound: '/ɪ/', status: 'warning', score: 78, tip: 'لسانك متأخر قليلاً' },
    { letter: 'NK', sound: '/ŋk/', status: 'error', score: 52, tip: 'حرف N نطقته M - ارفع لسانك للخلف' },
  ];

  return (
    <div className="screen-container">
      {/* Tabs */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        {['word', 'sentence', 'progress'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-ea-orange to-orange-600 text-white shadow-lg shadow-orange-500/30' 
                : 'bg-ea-card border border-ea-border text-ea-text-secondary'
            }`}
          >
            {tab === 'word' ? '🔤 Word' : tab === 'sentence' ? '📝 Sentence' : '📊 Progress'}
          </button>
        ))}
      </div>

      {activeTab === 'word' && (
        <div className="px-5 py-4">
          {/* Word Card */}
          <div className="ea-card text-center mb-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ea-orange to-ea-gold" />
            <h2 className="text-4xl font-bold text-ea-text mb-1">{currentWord.word}</h2>
            <p className="text-ea-text-secondary text-sm mb-1">{currentWord.phonetic}</p>
            <p className="text-ea-text-secondary text-sm mb-4">{currentWord.arabic}</p>
            <button 
              onClick={() => speak(currentWord.word)}
              className="flex items-center gap-2 mx-auto text-ea-orange font-semibold"
            >
              <Volume2 size={18} /> Listen
            </button>
          </div>

          {/* Recording Area */}
          <div className="ea-card text-center mb-6">
            <div className="flex items-center justify-center gap-1 h-16 mb-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 rounded-full bg-gradient-to-t from-ea-orange to-ea-gold transition-all duration-300 ${
                    isRecording ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{ 
                    height: isRecording ? `${Math.random() * 40 + 20}px` : '20px',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            <div className="text-3xl font-bold text-ea-orange mb-4 font-mono">
              {formatTime(recordingTime)}
            </div>

            <button 
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl transition-all ${
                isRecording 
                  ? 'bg-ea-red animate-pulse shadow-lg shadow-red-500/40' 
                  : 'bg-gradient-to-r from-ea-orange to-orange-600 shadow-lg shadow-orange-500/40'
              }`}
            >
              {isRecording ? <Square size={24} /> : <Mic size={24} />}
            </button>
            <p className="text-ea-text-secondary text-xs mt-3">
              {isRecording ? 'Tap to stop' : 'Tap to record'}
            </p>
          </div>

          {/* Score Display */}
          {score && (
            <div className="ea-card text-center mb-6">
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="50" stroke="#1e1e35" strokeWidth="8" fill="none" />
                  <circle 
                    cx="56" cy="56" r="50" 
                    stroke={score >= 80 ? '#4ade80' : score >= 60 ? '#ffc947' : '#f87171'} 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${(score / 100) * 314} 314`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${
                    score >= 80 ? 'text-ea-green' : score >= 60 ? 'text-ea-gold' : 'text-ea-red'
                  }`}>{score}</span>
                </div>
              </div>
              <p className="text-ea-text font-bold mb-1">
                {score >= 90 ? 'Excellent! Native-like! 🔥' : 
                 score >= 80 ? 'Great! Almost perfect! ⭐' : 
                 score >= 70 ? 'Good! Keep practicing! 💪' : 'Try again! You're improving! 🌱'}
              </p>
              <div className="flex justify-center gap-4 mt-3 text-xs">
                <div className="text-ea-green">Accuracy: {Math.min(100, score + 5)}%</div>
                <div className="text-ea-gold">Fluency: {Math.min(100, score - 3)}%</div>
                <div className="text-ea-blue">Complete: {Math.min(100, score + 2)}%</div>
              </div>
            </div>
          )}

          {/* Phoneme Breakdown */}
          <div className="ea-card">
            <h3 className="text-ea-text font-bold mb-3 flex items-center gap-2">
              <Award size={18} className="text-ea-gold" /> Phoneme Breakdown
            </h3>
            {phonemes.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  p.status === 'correct' ? 'bg-ea-green/15 text-ea-green' :
                  p.status === 'warning' ? 'bg-ea-gold/15 text-ea-gold' :
                  'bg-ea-red/15 text-ea-red'
                }`}>
                  {p.letter}
                </div>
                <div className="flex-1">
                  <div className="text-ea-text text-sm font-semibold">{p.sound}</div>
                  <div className="text-ea-text-secondary text-xs">{p.tip}</div>
                </div>
                <div className={`font-bold ${
                  p.status === 'correct' ? 'text-ea-green' :
                  p.status === 'warning' ? 'text-ea-gold' :
                  'text-ea-red'
                }`}>{p.score}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sentence' && (
        <div className="px-5 py-4">
          <div className="ea-card mb-4">
            <p className="text-ea-text leading-relaxed mb-3">
              "I think about you every day."
            </p>
            <p className="text-ea-text-secondary text-sm mb-4">أفكر فيك كل يوم.</p>
            <div className="flex gap-2">
              <button onClick={() => speak("I think about you every day.")} className="ea-btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                <Volume2 size={16} /> Listen
              </button>
              <button className="ea-btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
                <Mic size={16} /> Practice
              </button>
            </div>
          </div>

          <div className="ea-card mb-4">
            <p className="text-ea-text leading-relaxed mb-3">
              "The weather is nice today."
            </p>
            <p className="text-ea-text-secondary text-sm mb-4">الطقس جميل اليوم.</p>
            <div className="flex gap-2">
              <button onClick={() => speak("The weather is nice today.")} className="ea-btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                <Volume2 size={16} /> Listen
              </button>
              <button className="ea-btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
                <Mic size={16} /> Practice
              </button>
            </div>
          </div>

          <div className="ea-card">
            <p className="text-ea-text leading-relaxed mb-3">
              "Can you help me please?"
            </p>
            <p className="text-ea-text-secondary text-sm mb-4">هل يمكنك مساعدتي من فضلك؟</p>
            <div className="flex gap-2">
              <button onClick={() => speak("Can you help me please?")} className="ea-btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                <Volume2 size={16} /> Listen
              </button>
              <button className="ea-btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
                <Mic size={16} /> Practice
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="px-5 py-4">
          <div className="ea-card text-center mb-4">
            <h3 className="text-ea-text font-bold text-lg mb-1">Level 12</h3>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-ea-orange to-ea-gold rounded-full" style={{ width: '77%' }} />
            </div>
            <p className="text-ea-text-secondary text-xs">3,840 / 5,000 XP</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="ea-card text-center">
              <div className="text-2xl font-bold text-ea-orange">47</div>
              <div className="text-ea-text-secondary text-xs">Words Practiced</div>
            </div>
            <div className="ea-card text-center">
              <div className="text-2xl font-bold text-ea-blue">23</div>
              <div className="text-ea-text-secondary text-xs">Sentences Spoken</div>
            </div>
            <div className="ea-card text-center">
              <div className="text-2xl font-bold text-ea-gold">82%</div>
              <div className="text-ea-text-secondary text-xs">Avg. Score</div>
            </div>
            <div className="ea-card text-center">
              <div className="text-2xl font-bold text-ea-green">12</div>
              <div className="text-ea-text-secondary text-xs">Day Streak</div>
            </div>
          </div>

          <h3 className="text-ea-text font-bold mb-3">Recent Activity</h3>
          {[
            { word: 'Think', score: 94, time: '2 min ago' },
            { word: 'Weather', score: 87, time: '1 hour ago' },
            { word: 'Help', score: 91, time: '3 hours ago' },
          ].map((item, idx) => (
            <div key={idx} className="ea-card mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ea-orange/10 flex items-center justify-center text-ea-orange font-bold">
                {item.score}
              </div>
              <div className="flex-1">
                <div className="text-ea-text font-semibold text-sm">{item.word}</div>
                <div className="text-ea-text-secondary text-xs">{item.time}</div>
              </div>
              <div className={`text-xs font-bold ${item.score >= 90 ? 'text-ea-green' : 'text-ea-gold'}`}>
                {item.score >= 90 ? 'Excellent' : 'Good'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pronunciation;

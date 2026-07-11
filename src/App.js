import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard/Dashboard';
import StoryMode from './components/Story/StoryMode';
import Vocabulary from './components/Vocabulary/Vocabulary';
import Pronunciation from './components/Pronunciation/Pronunciation';
import Achievements from './components/Achievements/Achievements';
import Profile from './components/Profile/Profile';
import Onboarding from './components/Onboarding/Onboarding';
import TongueTwisters from './components/TongueTwisters/TongueTwisters';
import DailyMissions from './components/DailyMissions/DailyMissions';
import WorldMode from './components/WorldMode/WorldMode';
import AIMemory from './components/AIMemory/AIMemory';

const screenTitles = {
  dashboard: { title: 'English Adventures', icon: '🚀' },
  story: { title: "Today's Story", icon: '📖' },
  vocabulary: { title: 'Vocabulary', icon: '📚' },
  pronunciation: { title: 'Pronunciation', icon: '🎙️' },
  achievements: { title: 'Achievements', icon: '🏆' },
  profile: { title: 'Profile', icon: '👤' },
  onboarding: { title: 'Welcome!', icon: '👋' },
  tongueTwisters: { title: 'Tongue Twisters', icon: '🗣️' },
  dailyMissions: { title: 'Daily Missions', icon: '🎯' },
  worldMode: { title: 'World Mode', icon: '🌍' },
  aiMemory: { title: 'AI Memory', icon: '🧠' },
};

const App = () => {
  const { currentScreen, showToast } = useApp();
  const { title, icon } = screenTitles[currentScreen] || screenTitles.dashboard;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <Dashboard />;
      case 'story': return <StoryMode />;
      case 'vocabulary': return <Vocabulary />;
      case 'pronunciation': return <Pronunciation />;
      case 'achievements': return <Achievements />;
      case 'profile': return <Profile />;
      case 'onboarding': return <Onboarding />;
      case 'tongueTwisters': return <TongueTwisters />;
      case 'dailyMissions': return <DailyMissions />;
      case 'worldMode': return <WorldMode />;
      case 'aiMemory': return <AIMemory />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-ea-dark flex justify-center">
      <div className="w-full max-w-md bg-ea-dark min-h-screen relative">
        <Header title={title} icon={icon} />
        <main className="pt-0">
          {renderScreen()}
        </main>
        {showToast && (
          <div className="xp-toast show">
            {showToast}
          </div>
        )}
        <BottomNav />
      </div>
    </div>
  );
};

export default App;

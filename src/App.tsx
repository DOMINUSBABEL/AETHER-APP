import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Orbit, Layers, Compass, BookOpen, SunMoon, Settings } from 'lucide-react';
import DailyScreen from './components/DailyScreen';
import TarotScreen from './components/TarotScreen';
import SoulMapScreen from './components/SoulMapScreen';
import SettingsModal from './components/SettingsModal';
import LoginScreen from './components/LoginScreen';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { t } = useLanguage();

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'daily':
        return <DailyScreen key="daily" />;
      case 'tarot':
        return <TarotScreen key="tarot" />;
      case 'soulmap':
        return <SoulMapScreen key="soulmap" />;
      default:
        return <DailyScreen key="daily" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body flex justify-center overflow-hidden">
      {/* App Container */}
      <div className="w-full max-w-7xl relative min-h-screen flex flex-col md:flex-row bg-background shadow-2xl shadow-black/50 overflow-hidden">
        
        {/* Desktop Sidebar / Mobile Top Bar */}
        <header className="md:w-64 md:h-screen md:relative absolute top-0 w-full z-50 flex md:flex-col items-center justify-between md:justify-start px-6 md:px-0 py-4 md:py-8 h-16 md:h-auto bg-background/80 md:bg-surface-container-lowest/50 backdrop-blur-md border-b md:border-b-0 md:border-r border-outline-variant/10">
          <div className="flex items-center gap-3 md:mb-12 md:px-8">
            <Orbit className="text-primary w-5 h-5 md:w-6 md:h-6" />
            <h1 className="font-headline tracking-widest text-primary text-sm md:text-base font-bold uppercase">
              {t('login.title')}
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-col w-full px-4 space-y-2 flex-1">
            <DesktopNavItem 
              icon={<Compass className="w-5 h-5" />} 
              label={t('nav.daily')} 
              isActive={activeTab === 'daily'} 
              onClick={() => setActiveTab('daily')} 
            />
            <DesktopNavItem 
              icon={<Layers className="w-5 h-5" />} 
              label={t('nav.tarot')} 
              isActive={activeTab === 'tarot'} 
              onClick={() => setActiveTab('tarot')} 
            />
            <DesktopNavItem 
              icon={<SunMoon className="w-5 h-5" />} 
              label={t('nav.soulmap')} 
              isActive={activeTab === 'soulmap'} 
              onClick={() => setActiveTab('soulmap')} 
            />
          </nav>

          <button 
            aria-label="Settings"
            onClick={() => setIsSettingsOpen(true)}
            className="w-8 h-8 md:w-full md:h-auto md:px-8 md:py-4 md:rounded-none md:border-t md:border-l-0 md:border-r-0 md:border-b-0 md:bg-transparent rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20 flex items-center justify-center md:justify-start md:gap-3 hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5 text-on-surface-variant" />
            <span className="hidden md:inline font-label text-xs tracking-widest uppercase text-on-surface-variant">Settings</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar pt-20 pb-28 md:pt-8 md:pb-8 md:px-8 relative h-[100dvh]">
          <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {renderScreen()}
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-background/80 backdrop-blur-xl border-t border-outline-variant/10 rounded-t-3xl">
          <MobileNavItem 
            icon={<Compass className="w-5 h-5" />} 
            label={t('nav.daily')} 
            isActive={activeTab === 'daily'} 
            onClick={() => setActiveTab('daily')} 
          />
          <MobileNavItem 
            icon={<Layers className="w-5 h-5" />} 
            label={t('nav.tarot')} 
            isActive={activeTab === 'tarot'} 
            onClick={() => setActiveTab('tarot')} 
          />
          <MobileNavItem 
            icon={<SunMoon className="w-5 h-5" />} 
            label={t('nav.soulmap')} 
            isActive={activeTab === 'soulmap'} 
            onClick={() => setActiveTab('soulmap')} 
          />
        </nav>

        {/* Global Background Effects */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary/5 blur-[120px]"></div>
        </div>
        
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </div>
  );
}

function MobileNavItem({ icon, label, isActive, onClick }: { icon: ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`flex flex-col items-center justify-center transition-all duration-300 group ${isActive ? 'text-primary' : 'text-secondary opacity-50 hover:opacity-100'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg p-1`}
    >
      <div className={`mb-1.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-active:scale-90'}`}>
        {icon}
      </div>
      <span className={`font-label text-[9px] uppercase tracking-[0.15em] ${isActive ? 'font-bold' : ''}`}>
        {label}
      </span>
    </button>
  );
}

function DesktopNavItem({ icon, label, isActive, onClick }: { icon: ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-primary/10 text-primary' : 'text-secondary opacity-70 hover:opacity-100 hover:bg-surface-container-high'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className={`font-label text-xs uppercase tracking-[0.15em] ${isActive ? 'font-bold' : ''}`}>
        {label}
      </span>
    </button>
  );
}

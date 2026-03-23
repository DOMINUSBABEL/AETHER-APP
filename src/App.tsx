import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Compass, BookOpen, SunMoon, Settings } from 'lucide-react';
import DailyScreen from './components/DailyScreen';
import TarotScreen from './components/TarotScreen';
import SoulMapScreen from './components/SoulMapScreen';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('daily');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    <div className="min-h-screen bg-background text-on-background font-body flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-md relative min-h-screen flex flex-col shadow-2xl shadow-black/50 bg-background overflow-hidden">
        
        {/* Top App Bar */}
          <header className="absolute top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-md border-b border-outline-variant/10">
            <Sparkles className="text-primary w-5 h-5" />
            <h1 className="font-headline tracking-widest text-primary text-sm font-bold uppercase">
              The Digital Oracle
            </h1>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container-high transition-colors"
            >
              <Settings className="w-4 h-4 text-on-surface-variant" />
            </button>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto no-scrollbar pt-20 pb-28 relative">
            <AnimatePresence mode="wait">
              {renderScreen()}
            </AnimatePresence>
          </main>

          {/* Bottom Navigation */}
          <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-background/80 backdrop-blur-xl border-t border-outline-variant/10 rounded-t-3xl">
            <NavItem 
              icon={<Compass className="w-5 h-5" />} 
              label="Sincronicidad" 
              isActive={activeTab === 'daily'} 
              onClick={() => setActiveTab('daily')} 
            />
            <NavItem 
              icon={<Layers className="w-5 h-5" />} 
              label="Tarot" 
              isActive={activeTab === 'tarot'} 
              onClick={() => setActiveTab('tarot')} 
            />
            <NavItem 
              icon={<SunMoon className="w-5 h-5" />} 
              label="Carta Astral" 
              isActive={activeTab === 'soulmap'} 
              onClick={() => setActiveTab('soulmap')} 
            />
          </nav>

          {/* Global Background Effects */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary/5 blur-[100px]"></div>
          </div>
          
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-all duration-300 group ${isActive ? 'text-primary' : 'text-secondary opacity-50 hover:opacity-100'}`}
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

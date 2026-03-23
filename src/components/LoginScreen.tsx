import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDateContext } from '../context/DateContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { language, setLanguage, t } = useLanguage();
  const { userDate, setUserDate, partnerDate, setPartnerDate } = useDateContext();

  return (
    <div className="min-h-screen bg-background text-on-background font-body flex justify-center items-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-tertiary/10 blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm glass-card p-8 rounded-3xl border border-outline-variant/20 shadow-2xl relative z-10 flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(233,195,73,0.2)]">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="font-headline text-3xl text-primary mb-2 tracking-wide">
          {t('login.title')}
        </h1>
        <p className="text-on-surface-variant text-sm mb-10 font-light">
          {t('login.subtitle')}
        </p>

        <div className="w-full space-y-6">
          <div className="text-left space-y-4 mb-6">
            <div>
              <label className="block font-label text-[10px] tracking-widest uppercase text-outline mb-2">
                {t('settings.date.label')}
              </label>
              <input 
                type="date" 
                value={userDate}
                onChange={(e) => setUserDate(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block font-label text-[10px] tracking-widest uppercase text-outline mb-2">
                {t('settings.partnerDate.label')}
              </label>
              <input 
                type="date" 
                value={partnerDate}
                onChange={(e) => setPartnerDate(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-1">
            <button
              onClick={() => setLanguage('es')}
              className={`flex-1 py-2 rounded-lg font-label text-xs tracking-widest uppercase transition-all ${language === 'es' ? 'bg-surface-container-high text-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 rounded-lg font-label text-xs tracking-widest uppercase transition-all ${language === 'en' ? 'bg-surface-container-high text-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              English
            </button>
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-primary text-on-primary hover:bg-primary-fixed py-4 rounded-xl font-label text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(233,195,73,0.3)] hover:shadow-[0_0_30px_rgba(233,195,73,0.5)]"
          >
            {t('login.button')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

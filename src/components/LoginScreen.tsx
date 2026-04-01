import { motion } from 'motion/react';
import { Orbit, Calendar, Heart } from 'lucide-react';
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
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md glass-card p-8 md:p-10 rounded-3xl border border-outline-variant/20 shadow-2xl relative z-10 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-20"></div>
          <Orbit className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="font-headline text-5xl text-primary mb-3 tracking-widest">
          {t('login.title')}
        </h1>
        <p className="text-on-surface-variant text-xs mb-10 font-label tracking-[0.2em] uppercase max-w-xs mx-auto">
          {t('login.subtitle')}
        </p>

        <div className="w-full space-y-8">
          <div className="text-left space-y-5">
            <div className="relative group">
              <label htmlFor="user-date" className="block font-label text-[10px] tracking-widest uppercase text-outline mb-2 ml-1 transition-colors group-focus-within:text-primary">
                {t('settings.date.label')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-outline-variant group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  id="user-date"
                  type="date" 
                  value={userDate}
                  onChange={(e) => setUserDate(e.target.value)}
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-xl pl-11 pr-4 py-3.5 text-on-surface focus:outline-none focus:border-primary/50 focus:bg-surface-container-lowest transition-all text-sm shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
            </div>
            <div className="relative group">
              <label htmlFor="partner-date" className="block font-label text-[10px] tracking-widest uppercase text-outline mb-2 ml-1 transition-colors group-focus-within:text-tertiary">
                {t('settings.partnerDate.label')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Heart className="w-4 h-4 text-outline-variant group-focus-within:text-tertiary transition-colors" />
                </div>
                <input 
                  id="partner-date"
                  type="date" 
                  value={partnerDate}
                  onChange={(e) => setPartnerDate(e.target.value)}
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-xl pl-11 pr-4 py-3.5 text-on-surface focus:outline-none focus:border-tertiary/50 focus:bg-surface-container-lowest transition-all text-sm shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl p-1.5 backdrop-blur-sm">
            <button
              onClick={() => setLanguage('es')}
              className={`flex-1 py-2.5 rounded-lg font-label text-xs tracking-widest uppercase transition-all duration-300 ${language === 'es' ? 'bg-surface-container-high text-primary shadow-md scale-100' : 'text-on-surface-variant hover:text-on-surface scale-95 hover:scale-100'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2.5 rounded-lg font-label text-xs tracking-widest uppercase transition-all duration-300 ${language === 'en' ? 'bg-surface-container-high text-primary shadow-md scale-100' : 'text-on-surface-variant hover:text-on-surface scale-95 hover:scale-100'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              English
            </button>
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-primary text-on-primary hover:bg-primary-fixed py-4 rounded-xl font-label text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('login.button')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

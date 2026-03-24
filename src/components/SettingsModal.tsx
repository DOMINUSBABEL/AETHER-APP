import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { userDate, setUserDate, partnerDate, setPartnerDate } = useDateContext();
  const { language, setLanguage, t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-surface-container-high/90 backdrop-blur-xl rounded-2xl border border-outline-variant/20 shadow-2xl z-[70] overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline text-2xl text-primary">{t('settings.title')}</h2>
                <button aria-label={t('settings.close') || "Close"} onClick={onClose} className="p-2 rounded-full bg-surface-container-highest hover:bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="settings-user-date" className="block font-label text-xs tracking-widest uppercase text-outline mb-2 ml-1">
                    {t('settings.date.label')}
                  </label>
                  <input 
                    id="settings-user-date"
                    type="date" 
                    value={userDate}
                    onChange={(e) => setUserDate(e.target.value)}
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:border-primary/50 focus:bg-surface-container-lowest transition-colors shadow-inner"
                  />
                  <p className="text-[10px] text-on-surface-variant mt-2 italic ml-1">
                    {t('settings.date.desc')}
                  </p>
                </div>

                <div>
                  <label htmlFor="settings-partner-date" className="block font-label text-xs tracking-widest uppercase text-outline mb-2 ml-1">
                    {t('settings.partnerDate.label')}
                  </label>
                  <input 
                    id="settings-partner-date"
                    type="date" 
                    value={partnerDate}
                    onChange={(e) => setPartnerDate(e.target.value)}
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-xl px-4 py-3.5 text-on-surface focus:outline-none focus:border-tertiary/50 focus:bg-surface-container-lowest transition-colors shadow-inner"
                  />
                  <p className="text-[10px] text-on-surface-variant mt-2 italic ml-1">
                    {t('settings.partnerDate.desc')}
                  </p>
                </div>

                <div>
                  <label className="block font-label text-xs tracking-widest uppercase text-outline mb-2 ml-1">
                    {t('settings.language.label')}
                  </label>
                  <div className="flex items-center justify-between bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl p-1.5 backdrop-blur-sm">
                    <button
                      onClick={() => setLanguage('es')}
                      className={`flex-1 py-2.5 rounded-lg font-label text-xs tracking-widest uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${language === 'es' ? 'bg-surface-container-high text-primary shadow-md scale-100' : 'text-on-surface-variant hover:text-on-surface scale-95 hover:scale-100'}`}
                    >
                      Español
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-2.5 rounded-lg font-label text-xs tracking-widest uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${language === 'en' ? 'bg-surface-container-high text-primary shadow-md scale-100' : 'text-on-surface-variant hover:text-on-surface scale-95 hover:scale-100'}`}
                    >
                      English
                    </button>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2 italic ml-1">
                    {t('settings.language.desc')}
                  </p>
                </div>
              </div>
              
              <div className="mt-10">
                <button 
                  onClick={onClose}
                  className="w-full bg-primary text-on-primary hover:bg-primary-fixed rounded-xl py-4 font-label text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high"
                >
                  {t('settings.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

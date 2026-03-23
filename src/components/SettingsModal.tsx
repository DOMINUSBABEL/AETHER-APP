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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-surface-container-high rounded-2xl border border-outline-variant/20 shadow-2xl z-[70] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-xl text-primary">{t('settings.title')}</h2>
                <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-label text-xs tracking-widest uppercase text-outline mb-2">
                    {t('settings.date.label')}
                  </label>
                  <input 
                    type="date" 
                    value={userDate}
                    onChange={(e) => setUserDate(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] text-on-surface-variant mt-2 italic">
                    {t('settings.date.desc')}
                  </p>
                </div>

                <div>
                  <label className="block font-label text-xs tracking-widest uppercase text-outline mb-2 mt-4">
                    {t('settings.partnerDate.label')}
                  </label>
                  <input 
                    type="date" 
                    value={partnerDate}
                    onChange={(e) => setPartnerDate(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] text-on-surface-variant mt-2 italic">
                    {t('settings.partnerDate.desc')}
                  </p>
                </div>

                <div>
                  <label className="block font-label text-xs tracking-widest uppercase text-outline mb-2 mt-4">
                    {t('settings.language.label')}
                  </label>
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
                  <p className="text-[10px] text-on-surface-variant mt-2 italic">
                    {t('settings.language.desc')}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={onClose}
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg py-3 font-label text-xs tracking-widest uppercase transition-colors"
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

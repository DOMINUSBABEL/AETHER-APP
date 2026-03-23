import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Heart, Briefcase, Activity, Star } from 'lucide-react';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';
import { createSeededRandom, getRandomItem, getMultipleRandomItems } from '../utils/random';
import { 
  psychicClimates, 
  egoBoundaries, 
  consciousManifestations, 
  somaticConnections, 
  chromaticFrequencies,
  zodiacSigns
} from '../data/dailyData';

export default function DailyScreen() {
  const { seed, partnerSeed, partnerDate } = useDateContext();
  const { t } = useLanguage();
  const randomFunc = createSeededRandom(seed);
  const partnerRandomFunc = createSeededRandom(seed + partnerSeed);

  const climate = getRandomItem(psychicClimates, randomFunc);
  const egoText = getRandomItem(egoBoundaries, randomFunc);
  const manifestationText = getRandomItem(consciousManifestations, randomFunc);
  const somaticText = getRandomItem(somaticConnections, randomFunc);
  const chromatic = getRandomItem(chromaticFrequencies, randomFunc);
  const numericMarker = Math.floor(randomFunc() * 9) + 1; // 1-9
  const displayedSigns = getMultipleRandomItems(zodiacSigns, 4, randomFunc);
  const activeSignIndex = Math.floor(randomFunc() * 4);
  
  const sharedClimate = getRandomItem(psychicClimates, partnerRandomFunc);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 space-y-10"
    >
      {/* Zodiac Selector (Visual Only) */}
      <section>
        <div className="flex overflow-x-auto space-x-8 pb-4 scroll-smooth no-scrollbar">
          {displayedSigns.map((sign, i) => (
            <div key={sign} className={`flex flex-col items-center space-y-2 shrink-0 ${i === activeSignIndex ? 'text-primary' : 'opacity-30'}`}>
              <span className={`font-label text-[10px] tracking-widest uppercase ${i === activeSignIndex ? 'font-bold tracking-[0.2em]' : ''}`}>{sign}</span>
              {i === activeSignIndex && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(233,195,73,0.6)] mt-1"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* General Message */}
      <section className="relative">
        <div className="glass-card p-8 rounded-xl border border-primary/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="h-px w-8 bg-tertiary/50"></div>
            <span className="font-label text-[10px] tracking-[0.3em] text-tertiary uppercase">{t('daily.header.subtitle')}</span>
          </div>
          
          <h2 className="font-headline text-3xl mb-6 leading-tight italic relative z-10">
            {climate.title}
          </h2>
          
          <p className="text-on-surface-variant font-body leading-relaxed text-base font-light relative z-10">
            {climate.text}
          </p>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="space-y-4">
        <PillarCard 
          icon={<Heart className="w-5 h-5 text-tertiary" />}
          title={t('daily.ego.title')}
          text={egoText}
        />
        <PillarCard 
          icon={<Briefcase className="w-5 h-5 text-primary" />}
          title={t('daily.conscious.title')}
          text={manifestationText}
        />
        <PillarCard 
          icon={<Activity className="w-5 h-5 text-secondary" />}
          title={t('daily.somatic.title')}
          text={somaticText}
        />
      </section>

      {/* Synchronicity Markers */}
      <section>
        <div className="grid grid-cols-2 gap-px bg-outline-variant/20 rounded-xl overflow-hidden border border-outline-variant/10">
          <div className="p-6 bg-surface-container-lowest flex flex-col items-center text-center">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-outline mb-3">{t('daily.numeric.title')}</span>
            <span className="font-headline text-5xl text-primary text-glow">{numericMarker}</span>
          </div>
          <div className="p-6 bg-surface-container-lowest flex flex-col items-center text-center">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-outline mb-3">{t('daily.chromatic.title')}</span>
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${chromatic.color} mb-2 ${chromatic.shadow}`}></div>
              <span className="font-label text-xs font-bold text-primary tracking-[0.2em] uppercase">{chromatic.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      {partnerDate && (
        <section className="glass-card rounded-xl p-6 border border-tertiary/20 shadow-lg mt-8 bg-tertiary/5">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-tertiary w-5 h-5" />
            <h3 className="font-headline text-xl text-tertiary">{t('daily.compatibility.title')}</h3>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-4">
            {t('daily.compatibility.desc')}
          </p>
          <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/10">
            <h4 className="font-headline text-lg text-on-surface mb-2">{sharedClimate.title}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {sharedClimate.text}
            </p>
          </div>
        </section>
      )}
    </motion.div>
  );
}

function PillarCard({ icon, title, text }: { icon: ReactNode, title: string, text: string }) {
  return (
    <div className="p-5 bg-surface-container-low/50 rounded-xl border border-outline-variant/10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-full shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-label text-[10px] tracking-widest uppercase text-outline mb-1.5">{title}</h3>
          <p className="text-on-surface text-sm leading-relaxed italic opacity-90">"{text}"</p>
        </div>
      </div>
    </div>
  );
}

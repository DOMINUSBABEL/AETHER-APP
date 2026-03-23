import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, ArrowUpCircle, BookOpen } from 'lucide-react';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';
import { createSeededRandom, getMultipleRandomItems } from '../utils/random';
import { zodiacSigns, sunDescriptions, moonDescriptions, ascendantDescriptions } from '../data/soulMapData';

export default function SoulMapScreen() {
  const { seed, partnerSeed, partnerDate } = useDateContext();
  const { t, language } = useLanguage();
  const randomFunc = createSeededRandom(seed + 100); // Offset seed for variety
  const partnerRandomFunc = createSeededRandom(partnerSeed + 200);

  const selectedSigns = getMultipleRandomItems(zodiacSigns, 3, randomFunc);
  const sunSign = selectedSigns[0];
  const moonSign = selectedSigns[1];
  const ascendantSign = selectedSigns[2];

  const partnerSigns = getMultipleRandomItems(zodiacSigns, 3, partnerRandomFunc);
  const partnerSun = partnerSigns[0];

  const affinityScore = Math.floor(createSeededRandom(seed + partnerSeed)() * 40) + 60; // 60-99%

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 space-y-12"
    >
      {/* Header */}
      <section className="text-center space-y-4">
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-tertiary">{t('soulmap.header.subtitle')}</span>
        <h2 className="font-headline text-4xl font-bold tracking-tighter leading-none text-on-surface">
          {t('soulmap.header.title')}
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed font-light">
          {t('soulmap.header.desc')}
        </p>
      </section>

      {/* Abstract Chart Graphic */}
      <section className="flex justify-center py-4">
        <div className="relative w-64 h-64 rounded-full border border-primary/10 flex items-center justify-center alchemical-gradient">
          <div className="absolute inset-4 rounded-full border border-primary/5 opacity-40"></div>
          <div className="absolute inset-12 rounded-full border border-primary/10"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Sun className="text-primary w-10 h-10 mb-2" />
            <div className="font-label text-[8px] uppercase tracking-widest text-secondary">{t('soulmap.center')}</div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute top-[10%] left-[50%] -translate-x-1/2 p-1.5 bg-surface-container-high rounded-full border border-primary/30 celestial-glow">
            <Sun className="text-primary w-4 h-4" />
          </div>
          <div className="absolute bottom-[20%] left-[15%] p-1.5 bg-surface-container-high rounded-full border border-tertiary/30">
            <Moon className="text-tertiary w-4 h-4" />
          </div>
          <div className="absolute bottom-[20%] right-[15%] p-1.5 bg-surface-container-high rounded-full border border-secondary/30">
            <ArrowUpCircle className="text-secondary w-4 h-4" />
          </div>
        </div>
      </section>

      {/* The Three Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sun */}
        <PlanetCard 
          title={t('soulmap.sun.title')}
          subtitle={t('soulmap.sun.subtitle')}
          icon={<Sun className="text-primary w-6 h-6" />}
          colorClass="text-primary"
          bgClass="bg-primary/10"
          description={<>{language === 'es' ? 'Tu Sol en' : 'Your Sun in'} <span className="text-primary font-medium">{sunSign}</span> {sunDescriptions[sunSign]}</>}
        />

        {/* Moon */}
        <PlanetCard 
          title={t('soulmap.moon.title')}
          subtitle={t('soulmap.moon.subtitle')}
          icon={<Moon className="text-tertiary w-6 h-6" />}
          colorClass="text-tertiary"
          bgClass="bg-tertiary/10"
          description={<>{language === 'es' ? 'Tu Luna en' : 'Your Moon in'} <span className="text-tertiary font-medium">{moonSign}</span> {moonDescriptions[moonSign]}</>}
        />

        {/* Ascendant */}
        <PlanetCard 
          title={t('soulmap.asc.title')}
          subtitle={t('soulmap.asc.subtitle')}
          icon={<ArrowUpCircle className="text-secondary w-6 h-6" />}
          colorClass="text-secondary"
          bgClass="bg-secondary/10"
          description={<>{language === 'es' ? 'Tu Ascendente en' : 'Your Ascendant in'} <span className="text-secondary font-medium">{ascendantSign}</span> {ascendantDescriptions[ascendantSign]}</>}
        />
      </section>

      {/* Synthesis */}
      <section className="glass-card rounded-xl p-6 border border-primary/10 shadow-lg mt-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary w-5 h-5" />
          <h3 className="font-headline text-xl text-on-surface">{t('soulmap.synthesis.title')}</h3>
        </div>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed font-light">
          {t('soulmap.synthesis.desc', { sun: sunSign, moon: moonSign, asc: ascendantSign })}
        </p>
      </section>

      {/* Compatibility Section */}
      {partnerDate && (
        <section className="glass-card rounded-xl p-6 border border-tertiary/20 shadow-lg mt-8 bg-tertiary/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline text-xl text-tertiary">{t('soulmap.compatibility.title')}</h3>
            <div className="text-right">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline block">{t('soulmap.compatibility.score')}</span>
              <span className="font-headline text-2xl text-tertiary">{affinityScore}%</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-4">
            {t('soulmap.compatibility.desc')}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex-1 bg-surface-container p-3 rounded-lg text-center border border-outline-variant/10">
              <span className="block font-label text-[10px] uppercase text-primary mb-1">{language === 'es' ? 'Tú' : 'You'}</span>
              <span className="font-medium text-on-surface">{sunSign}</span>
            </div>
            <div className="text-tertiary">⟷</div>
            <div className="flex-1 bg-surface-container p-3 rounded-lg text-center border border-outline-variant/10">
              <span className="block font-label text-[10px] uppercase text-tertiary mb-1">{language === 'es' ? 'Pareja' : 'Partner'}</span>
              <span className="font-medium text-on-surface">{partnerSun}</span>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}

function PlanetCard({ title, subtitle, icon, colorClass, bgClass, description }: { title: string, subtitle: string, icon: ReactNode, colorClass: string, bgClass: string, description: ReactNode }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/5 hover:bg-surface-container transition-colors duration-300 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="font-headline text-2xl text-on-surface">{title}</h3>
          <p className={`font-label text-[8px] uppercase tracking-widest ${colorClass}`}>{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${bgClass}`}>
          {icon}
        </div>
      </div>
      <p className="text-sm font-light leading-relaxed text-on-surface-variant flex-grow">
        {description}
      </p>
    </div>
  );
}

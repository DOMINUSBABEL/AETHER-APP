import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Heart, Briefcase, Activity, Moon, Star, Calendar } from 'lucide-react';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  psychicClimates, 
  egoBoundaries, 
  consciousManifestations, 
  somaticConnections, 
  chromaticFrequencies,
  zodiacSigns
} from '../data/dailyData';
import { 
  getLifePathNumber, 
  getSunSign, 
  getSunSignIndex,
  getPersonalDayNumber, 
  getMoonPhase, 
  numerologyDescriptions 
} from '../utils/mysticAlgorithms';

export default function DailyScreen() {
  const { userDate, partnerDate } = useDateContext();
  const { t, language } = useLanguage();

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Cálculos de Numerología
  const lifePath = getLifePathNumber(userDate);
  const personalDay = getPersonalDayNumber(userDate, todayStr);
  const numDesc = numerologyDescriptions[personalDay] || numerologyDescriptions[1];

  // 2. Cálculos Astrológicos
  const sunSign = getSunSign(userDate);
  const sunSignIndex = getSunSignIndex(userDate);
  const moonPhase = getMoonPhase(todayStr, language);

  // 3. Selección Determinista de Textos basada en Sincronicidad Algorítmica
  // Usamos el Número del Día Personal y el Índice Solar como "semilla" para acoplar la lectura
  const climateIndex = (personalDay + sunSignIndex) % psychicClimates.length;
  const climate = psychicClimates[climateIndex];

  const egoIndex = (personalDay * 3) % egoBoundaries.length;
  const egoText = egoBoundaries[egoIndex];

  const manifestationIndex = (personalDay * 7) % consciousManifestations.length;
  const manifestationText = consciousManifestations[manifestationIndex];

  const somaticIndex = (personalDay * 5) % somaticConnections.length;
  const somaticText = somaticConnections[somaticIndex];

  const chromaticIndex = personalDay % chromaticFrequencies.length;
  const chromatic = chromaticFrequencies[chromaticIndex];

  // Sincronicidad Compartida (si hay pareja)
  const partnerPersonalDay = partnerDate ? getPersonalDayNumber(partnerDate, todayStr) : 0;
  const sharedClimateIndex = (personalDay + partnerPersonalDay) % psychicClimates.length;
  const sharedClimate = psychicClimates[sharedClimateIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 space-y-8"
    >
      {/* Zodiac Header Tracker */}
      <section className="relative">
        <div
          className="flex overflow-x-auto space-x-8 pb-4 scroll-smooth no-scrollbar border-b border-outline-variant/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          tabIndex={0}
          role="list"
          aria-label={t('daily.zodiac.label') || "Zodiac sign selector"}
        >
          {zodiacSigns.map((sign, i) => (
            <div
              key={sign}
              role="listitem"
              aria-current={sign === sunSign ? 'true' : undefined}
              className={`flex flex-col items-center space-y-2 shrink-0 ${sign === sunSign ? 'text-primary' : 'opacity-20'}`}
            >
              <span className={`font-label text-[10px] tracking-widest uppercase ${sign === sunSign ? 'font-bold tracking-[0.2em] text-glow' : ''}`}>
                {sign}
              </span>
              {sign === sunSign && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(233,195,73,0.8)] mt-1" />}
            </div>
          ))}
        </div>
      </section>

      {/* Astro-Numerology Sync Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Signo Solar Card */}
        <div className="glass-card p-5 rounded-xl border border-primary/10 flex items-center justify-between">
          <div>
            <span className="font-label text-[9px] tracking-widest text-outline uppercase block mb-1">Tu Signo Solar</span>
            <span className="font-headline text-xl text-primary font-bold">{sunSign}</span>
          </div>
          <Star className="w-8 h-8 text-primary/30" />
        </div>

        {/* Luna de Hoy Card */}
        <div className="glass-card p-5 rounded-xl border border-tertiary/10 flex items-center justify-between">
          <div>
            <span className="font-label text-[9px] tracking-widest text-outline uppercase block mb-1">Fase Lunar de Hoy</span>
            <span className="font-headline text-lg text-tertiary font-medium">{moonPhase.phase}</span>
          </div>
          <span className="text-3xl select-none">{moonPhase.icon}</span>
        </div>

        {/* Sendero de Vida Card */}
        <div className="glass-card p-5 rounded-xl border border-secondary/10 flex items-center justify-between">
          <div>
            <span className="font-label text-[9px] tracking-widest text-outline uppercase block mb-1">Sendero de Vida</span>
            <span className="font-headline text-xl text-secondary font-bold">Nº {lifePath}</span>
          </div>
          <Calendar className="w-8 h-8 text-secondary/30" />
        </div>
      </section>

      {/* General Clima Psíquico Message */}
      <section className="relative">
        <div className="glass-card p-6 md:p-8 rounded-xl border border-primary/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="h-px w-8 bg-tertiary/50" />
            <span className="font-label text-[9px] tracking-[0.3em] text-tertiary uppercase">{t('daily.header.subtitle')}</span>
          </div>
          
          <h2 className="font-headline text-2xl md:text-3xl mb-4 leading-tight italic relative z-10">
            {climate.title}
          </h2>
          
          <p className="text-on-surface-variant font-body leading-relaxed text-sm font-light relative z-10">
            {climate.text}
          </p>
        </div>
      </section>

      {/* Personal Day Numerology Sync */}
      <section className="glass-card p-6 rounded-xl border border-secondary/20 bg-secondary/5 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-2xl font-headline shrink-0">
            {personalDay}
          </div>
          <div className="space-y-2">
            <h3 className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">
              Vibración de tu Día Personal
            </h3>
            <h4 className="font-headline text-lg text-on-surface">
              {numDesc.title}
            </h4>
            <p className="text-on-surface-variant text-sm font-light leading-relaxed">
              {language === 'es' ? numDesc.descEs : numDesc.descEn}
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <span className="font-headline text-5xl text-primary text-glow">{personalDay}</span>
          </div>
          <div className="p-6 bg-surface-container-lowest flex flex-col items-center text-center">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-outline mb-3">{t('daily.chromatic.title')}</span>
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${chromatic.color} mb-2 ${chromatic.shadow}`} />
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
    <div className="p-5 bg-surface-container-low/50 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors duration-300 h-full flex flex-col justify-between">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-full shrink-0">
          {icon}
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="font-label text-[10px] tracking-widest uppercase text-outline mb-1.5">{title}</h3>
          <p className="text-on-surface text-sm leading-relaxed italic opacity-90">"{text}"</p>
        </div>
      </div>
    </div>
  );
}

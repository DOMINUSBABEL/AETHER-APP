import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Star, RefreshCw } from 'lucide-react';
import { getSeededRandomCards, TarotCardData } from '../data/tarotDeck';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';

export default function TarotScreen() {
  const { seed, partnerSeed, partnerDate } = useDateContext();
  const { t } = useLanguage();
  const [drawOffset, setDrawOffset] = useState(0);
  const [spreadType, setSpreadType] = useState<'psychic' | 'shadow' | 'love' | 'path'>('psychic');
  const [spread, setSpread] = useState<TarotCardData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Update spread when seed, drawOffset, or spreadType changes
  useEffect(() => {
    // We use a different offset base for each spread type so they don't show the same cards
    const typeOffset = spreadType === 'psychic' ? 0 : spreadType === 'shadow' ? 100 : spreadType === 'love' ? 200 : 300;
    const currentSeed = spreadType === 'love' && partnerSeed ? seed + partnerSeed : seed;
    setSpread(getSeededRandomCards(3, currentSeed, drawOffset + typeOffset));
  }, [seed, partnerSeed, drawOffset, spreadType]);

  const drawNewCards = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setDrawOffset(prev => prev + 1);
      setIsDrawing(false);
    }, 500);
  };

  if (spread.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 pb-24"
    >
      {/* Header */}
      <section className="mb-10 text-center">
        <span className="font-label text-[9px] tracking-[0.3em] uppercase text-tertiary mb-3 block">{t('tarot.header.subtitle')}</span>
        
        {/* Spread Selector */}
        <div className="mb-6">
          <select 
            value={spreadType}
            onChange={(e) => setSpreadType(e.target.value as any)}
            className="bg-surface-container-highest border border-outline-variant/30 text-primary font-headline text-xl rounded-lg px-4 py-2 focus:outline-none focus:border-primary/50 text-center appearance-none"
          >
            <option value="psychic">{t('tarot.spread.psychic')}</option>
            <option value="shadow">{t('tarot.spread.shadow')}</option>
            <option value="love">{t('tarot.spread.love')}</option>
            <option value="path">{t('tarot.spread.path')}</option>
          </select>
        </div>

        <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed mb-6">
          {t(`tarot.spread.${spreadType}.desc`)}
        </p>
        {spreadType === 'love' && !partnerDate && (
          <p className="text-secondary font-label text-[10px] uppercase tracking-widest mb-6 border border-secondary/30 bg-secondary/10 p-2 rounded-lg">
            {t('settings.partnerDate.desc')}
          </p>
        )}
        <button 
          onClick={drawNewCards}
          disabled={isDrawing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary font-label text-[10px] tracking-widest uppercase hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isDrawing ? 'animate-spin' : ''}`} />
          {t('tarot.button.new')}
        </button>
      </section>

      {/* Spread Layout */}
      <div className={`space-y-12 transition-opacity duration-500 ${isDrawing ? 'opacity-0' : 'opacity-100'}`}>
        {/* Card 1 */}
        <TarotCard 
          position="I"
          title={t(spreadType === 'psychic' ? 'tarot.past' : `tarot.pos.${spreadType}.1`)}
          cardName={spread[0].name}
          polarity={t(spreadType === 'shadow' ? 'tarot.shadow' : 'tarot.light')}
          subtitle={spread[0].archetype}
          description={spreadType === 'shadow' ? spread[0].descriptionShadow : spread[0].descriptionLight}
          imageUrl={spread[0].imageUrl}
          icon={spreadType === 'shadow' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          colorClass={spreadType === 'shadow' ? 'text-tertiary' : 'text-primary'}
          borderColorClass={spreadType === 'shadow' ? 'border-tertiary/30' : 'border-primary/30'}
          isShadow={spreadType === 'shadow'}
        />

        {/* Card 2 */}
        <TarotCard 
          position="II"
          title={t(spreadType === 'psychic' ? 'tarot.present' : `tarot.pos.${spreadType}.2`)}
          cardName={spread[1].name}
          polarity={t(spreadType === 'love' ? 'tarot.light' : 'tarot.shadow')}
          subtitle={spread[1].archetype}
          description={spreadType === 'love' ? spread[1].descriptionLight : spread[1].descriptionShadow}
          imageUrl={spread[1].imageUrl}
          icon={spreadType === 'love' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          colorClass={spreadType === 'love' ? 'text-primary' : 'text-tertiary'}
          borderColorClass={spreadType === 'love' ? 'border-primary/30' : 'border-tertiary/30'}
          isShadow={spreadType !== 'love'}
        />

        {/* Card 3 */}
        <TarotCard 
          position="III"
          title={t(spreadType === 'psychic' ? 'tarot.future' : `tarot.pos.${spreadType}.3`)}
          cardName={spread[2].name}
          polarity={t('tarot.light')}
          subtitle={spread[2].archetype}
          description={spread[2].descriptionLight}
          imageUrl={spread[2].imageUrl}
          icon={<Star className="w-4 h-4" />}
          colorClass="text-primary"
          borderColorClass="border-primary/30"
        />
      </div>

    </motion.div>
  );
}

function TarotCard({ 
  position, title, cardName, polarity, subtitle, description, imageUrl, icon, colorClass, borderColorClass, isShadow = false 
}: { 
  position: string, title: string, cardName: string, polarity: string, subtitle: string, description: string, imageUrl: string, icon: ReactNode, colorClass: string, borderColorClass: string, isShadow?: boolean
}) {
  const { t } = useLanguage();
  return (
    <div className="relative group">
      <div className={`absolute -top-3 left-0 font-label text-[9px] tracking-[0.2em] uppercase ${colorClass} opacity-60`}>
        {t('tarot.position')} {position} • {title}
      </div>
      <div className={`glass-card p-5 rounded-xl border ${borderColorClass} ${!isShadow ? 'celestial-glow' : 'shadow-[0_0_30px_rgba(255,183,123,0.05)]'} transition-all duration-500`}>
        
        {/* Card Image Placeholder */}
        <div className="aspect-[2/3] w-full mb-6 overflow-hidden rounded-lg bg-surface-container-lowest relative">
          <img 
            src={imageUrl} 
            alt={cardName} 
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isShadow ? 'grayscale opacity-70 mix-blend-luminosity' : 'opacity-90'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
             <span className="font-headline text-2xl text-white text-glow tracking-wide">{cardName}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-headline text-lg leading-tight ${colorClass} ${!isShadow ? 'text-glow' : ''}`}>{subtitle}</h3>
            <span className={`font-label text-[8px] px-2 py-0.5 border ${borderColorClass} ${colorClass} rounded-full flex items-center gap-1 shrink-0 mt-1`}>
              {icon} {polarity.toUpperCase()}
            </span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

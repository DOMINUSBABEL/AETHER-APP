import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Star, RefreshCw, Layers, Sparkles, ArrowLeft } from 'lucide-react';
import { getSeededRandomCards, TarotCardData } from '../data/tarotDeck';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';

export default function TarotScreen() {
  const { seed, partnerSeed, partnerDate } = useDateContext();
  const { t } = useLanguage();
  const [isSetup, setIsSetup] = useState(true);
  const [drawOffset, setDrawOffset] = useState(0);
  const [deckType, setDeckType] = useState<'full' | 'major'>('full');
  const [spreadType, setSpreadType] = useState<'1' | '3' | '5'>('3');
  const [spread, setSpread] = useState<TarotCardData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Update spread when seed, drawOffset, deckType, or spreadType changes
  useEffect(() => {
    if (isSetup) return;
    const typeOffset = spreadType === '1' ? 0 : spreadType === '3' ? 100 : 200;
    const deckOffset = deckType === 'major' ? 500 : 0;
    const currentSeed = seed;
    const count = parseInt(spreadType, 10);
    setSpread(getSeededRandomCards(count, currentSeed, drawOffset + typeOffset + deckOffset, deckType));
  }, [seed, drawOffset, spreadType, deckType, isSetup]);

  const startReading = () => {
    setIsSetup(false);
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
    }, 100);
  };

  const drawNewCards = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setDrawOffset(prev => prev + 1);
      setIsDrawing(false);
    }, 500);
  };

  const backToSetup = () => {
    setIsSetup(true);
    setSpread([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 90 },
    show: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 pb-24"
    >
      <AnimatePresence mode="wait">
        {isSetup ? (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto mt-10"
          >
            <div className="text-center mb-10">
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-tertiary mb-3 block">{t('tarot.header.subtitle')}</span>
              <h2 className="font-headline text-3xl text-primary tracking-tight">{t('tarot.setup.title')}</h2>
            </div>

            <div className="space-y-8 glass-card p-8 rounded-2xl border border-primary/20">
              {/* Deck Selection */}
              <div>
                <label className="block font-label text-[10px] tracking-widest uppercase text-primary mb-4">
                  {t('tarot.setup.deck')}
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setDeckType('full')}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${deckType === 'full' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  >
                    <Layers className="w-5 h-5" />
                    <span className="font-body text-sm">{t('tarot.setup.deck.full')}</span>
                  </button>
                  <button
                    onClick={() => setDeckType('major')}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${deckType === 'major' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="font-body text-sm">{t('tarot.setup.deck.major')}</span>
                  </button>
                </div>
              </div>

              {/* Spread Selection */}
              <div>
                <label className="block font-label text-[10px] tracking-widest uppercase text-primary mb-4">
                  {t('tarot.setup.spread')}
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {(['1', '3', '5'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSpreadType(type)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${spreadType === type ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                    >
                      <div className="flex gap-1">
                        {Array.from({ length: parseInt(type) }).map((_, i) => (
                          <div key={i} className="w-3 h-4 rounded-sm border border-current opacity-70"></div>
                        ))}
                      </div>
                      <span className="font-body text-sm">{t(`tarot.setup.spread.${type}`)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startReading}
                className="w-full py-4 rounded-xl bg-primary text-on-primary font-label text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t('tarot.setup.start')}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <section className="mb-10 text-center flex flex-col items-center">
              <button 
                onClick={backToSetup}
                className="mb-6 inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-[10px] tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowLeft className="w-3 h-3" />
                {t('tarot.setup.back')}
              </button>
              
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-tertiary mb-3 block">
                {deckType === 'major' ? t('tarot.setup.deck.major') : t('tarot.setup.deck.full')}
              </span>
              <h2 className="font-headline text-2xl text-primary tracking-tight mb-6">
                {t(`tarot.setup.spread.${spreadType}`)}
              </h2>

              <button 
                onClick={drawNewCards}
                disabled={isDrawing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary font-label text-[10px] tracking-widest uppercase hover:bg-primary/10 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RefreshCw className={`w-3 h-3 ${isDrawing ? 'animate-spin' : ''}`} />
                {t('tarot.button.new')}
              </button>
            </section>

            {/* Spread Layout */}
            {!isDrawing && spread.length > 0 && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={`grid grid-cols-1 gap-12 md:gap-6 ${spreadType === '1' ? 'md:grid-cols-1 max-w-md mx-auto' : spreadType === '3' ? 'md:grid-cols-3' : 'md:grid-cols-5'}`}
              >
                {spread.map((card, index) => {
                  let title = `Card ${index + 1}`;
                  if (spreadType === '3') {
                    title = index === 0 ? t('tarot.past') : index === 1 ? t('tarot.present') : t('tarot.future');
                  } else if (spreadType === '5') {
                    const titles = [t('tarot.pos.cross.1'), t('tarot.pos.cross.2'), t('tarot.pos.cross.3'), t('tarot.pos.cross.4'), t('tarot.pos.cross.5')];
                    title = titles[index];
                  }

                  return (
                    <motion.div key={`${card.id}-${drawOffset}`} variants={itemVariants} className="h-full">
                      <TarotCard 
                        position={['I', 'II', 'III', 'IV', 'V'][index]}
                        title={title}
                        cardName={card.name}
                        polarity={t('tarot.light')}
                        subtitle={card.archetype}
                        description={card.descriptionLight}
                        imageUrl={card.imageUrl}
                        icon={<Star className="w-4 h-4" />}
                        colorClass="text-primary"
                        borderColorClass="border-primary/30"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="relative group h-full perspective-1000">
      <div className={`absolute -top-3 left-0 font-label text-[9px] tracking-[0.2em] uppercase ${colorClass} opacity-60 z-10`}>
        {t('tarot.position')} {position} • {title}
      </div>
      <div className={`glass-card h-full p-5 rounded-xl border ${borderColorClass} ${!isShadow ? 'celestial-glow' : 'shadow-[0_0_30px_rgba(255,183,123,0.05)]'} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col`}>
        
        {/* Card Image Placeholder */}
        <div className="aspect-[2/3] w-full mb-6 overflow-hidden rounded-lg bg-surface-container-lowest relative shrink-0">
          <img 
            src={imageUrl} 
            alt={cardName} 
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isShadow ? 'grayscale opacity-70 mix-blend-luminosity' : 'opacity-90'}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
             <span className="font-headline text-2xl text-white text-glow tracking-wide">{cardName}</span>
          </div>
        </div>

        <div className="space-y-3 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-headline text-lg leading-tight ${colorClass} ${!isShadow ? 'text-glow' : ''}`}>{subtitle}</h3>
            <span className={`font-label text-[8px] px-2 py-0.5 border ${borderColorClass} ${colorClass} rounded-full flex items-center gap-1 shrink-0 mt-1`}>
              {icon} {polarity.toUpperCase()}
            </span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed font-light flex-grow">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

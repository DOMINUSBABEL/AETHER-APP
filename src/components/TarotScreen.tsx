import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Sparkles, ArrowLeft, RefreshCw, HelpCircle, FileText } from 'lucide-react';
import { getSeededRandomCards, TarotCardData } from '../data/tarotDeck';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';
import TarotCard3D from './TarotCard3D';
import { createSeededRandom } from '../utils/random';
import { getLifePathNumber, getSunSign, generateTarotSymmetryReading } from '../utils/mysticAlgorithms';

export default function TarotScreen() {
  const { seed, userDate } = useDateContext();
  const { t, language } = useLanguage();
  const [isSetup, setIsSetup] = useState(true);
  const [drawOffset, setDrawOffset] = useState(0);
  const [deckType, setDeckType] = useState<'full' | 'major'>('full');
  const [spreadType, setSpreadType] = useState<'1' | '3' | '5'>('3');
  const [spread, setSpread] = useState<TarotCardData[]>([]);
  const [reversals, setReversals] = useState<boolean[]>([]);
  const [question, setQuestion] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);

  // Update spread and reversals when inputs change
  useEffect(() => {
    if (isSetup) return;
    const typeOffset = spreadType === '1' ? 0 : spreadType === '3' ? 100 : 200;
    const deckOffset = deckType === 'major' ? 500 : 0;
    const count = parseInt(spreadType, 10);
    
    // Draw seeded cards
    const cards = getSeededRandomCards(count, seed, drawOffset + typeOffset + deckOffset, deckType);
    setSpread(cards);

    // Calculate seeded reversals (30% chance for reverse polarity/shadow)
    const randFunc = createSeededRandom(seed + (drawOffset + 5) * 83 + typeOffset);
    const cardReversals = Array.from({ length: count }).map(() => randFunc() > 0.7);
    setReversals(cardReversals);
  }, [seed, drawOffset, spreadType, deckType, isSetup]);

  const startReading = () => {
    setIsSetup(false);
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
    }, 800);
  };

  const drawNewCards = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setDrawOffset(prev => prev + 1);
      setIsDrawing(false);
    }, 800);
  };

  const backToSetup = () => {
    setIsSetup(true);
    setSpread([]);
    setReversals([]);
  };

  // Generate dynamic algorithmic reading synthesis
  const renderReadingText = () => {
    if (spread.length === 0 || reversals.length === 0) return null;

    const lifePath = getLifePathNumber(userDate);
    const sunSign = getSunSign(userDate);
    const positions = spreadType === '1' 
      ? ['MENSAJE'] 
      : spreadType === '3' 
        ? [t('tarot.past'), t('tarot.present'), t('tarot.future')] 
        : [t('tarot.pos.cross.1'), t('tarot.pos.cross.2'), t('tarot.pos.cross.3'), t('tarot.pos.cross.4'), t('tarot.pos.cross.5')];

    const { reading } = generateTarotSymmetryReading(
      spread,
      reversals,
      positions,
      question,
      lifePath,
      sunSign,
      language
    );

    // Parse minimal markdown structure into beautiful styled HTML paragraphs
    return reading.split('\n\n').map((block, i) => {
      if (block.startsWith('###')) {
        return (
          <h3 key={i} className="font-headline text-xl text-primary mt-8 mb-4 border-b border-primary/20 pb-2 tracking-wide uppercase">
            {block.replace('###', '').trim()}
          </h3>
        );
      }
      if (block.startsWith('####')) {
        return (
          <h4 key={i} className="font-label text-sm text-secondary font-bold mt-6 mb-3 tracking-widest uppercase">
            {block.replace('####', '').trim()}
          </h4>
        );
      }
      if (block.startsWith('*')) {
        return (
          <div key={i} className="pl-4 border-l-2 border-primary/40 my-3 text-on-surface-variant leading-relaxed text-sm font-light italic">
            {block.replace(/^\*\s*/, '')}
          </div>
        );
      }
      return (
        <p key={i} className="text-on-surface-variant font-body text-sm leading-relaxed mb-4 font-light">
          {block}
        </p>
      );
    });
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
            className="max-w-md mx-auto mt-6"
          >
            <div className="text-center mb-8">
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-tertiary mb-3 block">
                {t('tarot.header.subtitle')}
              </span>
              <h2 className="font-headline text-4xl text-primary tracking-tight">{t('tarot.setup.title')}</h2>
            </div>

            <div className="space-y-6 glass-card p-6 md:p-8 rounded-2xl border border-primary/20">
              {/* Question Input */}
              <div className="relative group">
                <label htmlFor="tarot-question" className="flex items-center gap-2 font-label text-[10px] tracking-widest uppercase text-primary mb-3 ml-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {t('tarot.question.label')}
                </label>
                <textarea
                  id="tarot-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={t('tarot.question.placeholder')}
                  rows={2}
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 focus:bg-surface-container-lowest transition-all text-sm shadow-inner placeholder:text-on-surface-variant/40 resize-none font-body leading-relaxed"
                />
              </div>

              {/* Deck Selection */}
              <div>
                <label id="deck-label" className="block font-label text-[10px] tracking-widest uppercase text-primary mb-3">
                  {t('tarot.setup.deck')}
                </label>
                <div role="group" aria-labelledby="deck-label" className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setDeckType('full')}
                    aria-pressed={deckType === 'full'}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${deckType === 'full' ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'}`}
                  >
                    <Layers className="w-5 h-5" />
                    <span className="font-label text-xs uppercase tracking-widest">{t('tarot.setup.deck.full')}</span>
                  </button>
                  <button
                    onClick={() => setDeckType('major')}
                    aria-pressed={deckType === 'major'}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${deckType === 'major' ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'}`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="font-label text-xs uppercase tracking-widest">{t('tarot.setup.deck.major')}</span>
                  </button>
                </div>
              </div>

              {/* Spread Selection */}
              <div>
                <label id="spread-label" className="block font-label text-[10px] tracking-widest uppercase text-primary mb-3">
                  {t('tarot.setup.spread')}
                </label>
                <div role="group" aria-labelledby="spread-label" className="grid grid-cols-1 gap-3">
                  {(['1', '3', '5'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSpreadType(type)}
                      aria-pressed={spreadType === type}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${spreadType === type ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'}`}
                    >
                      <div className="flex gap-1">
                        {Array.from({ length: parseInt(type) }).map((_, i) => (
                          <div key={i} className="w-2.5 h-3.5 rounded-sm border border-current opacity-70"></div>
                        ))}
                      </div>
                      <span className="font-label text-xs uppercase tracking-widest">{t(`tarot.setup.spread.${type}`)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startReading}
                className="w-full py-4 mt-2 rounded-xl bg-primary text-on-primary font-label text-xs tracking-widest uppercase hover:bg-primary-fixed hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98]"
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
            <section className="mb-8 text-center flex flex-col items-center">
              <button 
                onClick={backToSetup}
                className="mb-4 inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-[10px] tracking-widest uppercase"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t('tarot.setup.back')}
              </button>
              
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-tertiary mb-2 block">
                {deckType === 'major' ? t('tarot.setup.deck.major') : t('tarot.setup.deck.full')}
              </span>
              <h2 className="font-headline text-3xl text-primary tracking-tight mb-4">
                {t(`tarot.setup.spread.${spreadType}`)}
              </h2>

              <button 
                onClick={drawNewCards}
                disabled={isDrawing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-label text-[10px] tracking-widest uppercase hover:bg-primary/10 transition-all disabled:opacity-50 active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
                {t('tarot.button.new')}
              </button>
            </section>

            {/* Reading View */}
            {isDrawing ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-primary animate-spin" />
                <span className="font-label text-[10px] tracking-widest text-primary uppercase animate-pulse">Mezclando los Arquetipos...</span>
              </div>
            ) : (
              spread.length > 0 && reversals.length > 0 && (
                <div className="space-y-12">
                  {/* Grid of 3D Cards */}
                  <div 
                    className={`grid grid-cols-1 gap-12 pt-4 justify-center items-stretch ${spreadType === '1' ? 'max-w-xs mx-auto' : spreadType === '3' ? 'md:grid-cols-3 max-w-4xl mx-auto' : 'md:grid-cols-5 max-w-6xl mx-auto'}`}
                  >
                    {spread.map((card, index) => {
                      let cardTitle = `CARTA ${index + 1}`;
                      if (spreadType === '3') {
                        cardTitle = index === 0 ? t('tarot.past') : index === 1 ? t('tarot.present') : t('tarot.future');
                      } else if (spreadType === '5') {
                        const titles = [t('tarot.pos.cross.1'), t('tarot.pos.cross.2'), t('tarot.pos.cross.3'), t('tarot.pos.cross.4'), t('tarot.pos.cross.5')];
                        cardTitle = titles[index];
                      }

                      return (
                        <div key={`${card.id}-${drawOffset}`} className="flex justify-center h-full">
                          <TarotCard3D
                            cardId={card.id}
                            cardName={card.name}
                            suit={card.suit}
                            isReversed={reversals[index]}
                            position={['I', 'II', 'III', 'IV', 'V'][index]}
                            title={cardTitle}
                            subtitle={card.archetype}
                            description={reversals[index] ? card.descriptionShadow : card.descriptionLight}
                            colorClass="text-primary"
                            borderColorClass="border-primary/30"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Algorithmic Sinergy Veredict Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="glass-card p-6 md:p-8 rounded-2xl border border-primary/20 shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
                  >
                    <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[80px]" />
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/25">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-headline text-2xl text-primary tracking-wide">
                        {t('tarot.reading.title')}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {renderReadingText()}
                    </div>
                  </motion.div>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

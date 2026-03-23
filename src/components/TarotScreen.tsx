import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Star, RefreshCw } from 'lucide-react';
import { getSeededRandomCards, TarotCardData } from '../data/tarotDeck';
import { useDateContext } from '../context/DateContext';

export default function TarotScreen() {
  const { seed } = useDateContext();
  const [drawOffset, setDrawOffset] = useState(0);
  const [spread, setSpread] = useState<TarotCardData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Update spread when seed or drawOffset changes
  useEffect(() => {
    setSpread(getSeededRandomCards(3, seed, drawOffset));
  }, [seed, drawOffset]);

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
        <span className="font-label text-[9px] tracking-[0.3em] uppercase text-tertiary mb-3 block">Secuencia de Revelación</span>
        <h2 className="font-headline text-3xl text-on-surface mb-4 tracking-tight">Desarrollo Psíquico</h2>
        <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed mb-6">
          Un viaje desde la luz de la experiencia pasada, a través de la sombra del conflicto presente, hacia el potencial integrado del futuro.
        </p>
        <button 
          onClick={drawNewCards}
          disabled={isDrawing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary font-label text-[10px] tracking-widest uppercase hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isDrawing ? 'animate-spin' : ''}`} />
          Nueva Tirada
        </button>
      </section>

      {/* Spread Layout */}
      <div className={`space-y-12 transition-opacity duration-500 ${isDrawing ? 'opacity-0' : 'opacity-100'}`}>
        {/* Past */}
        <TarotCard 
          position="I"
          title="PASADO"
          cardName={spread[0].name}
          polarity="Luz"
          subtitle={spread[0].archetype}
          description={spread[0].descriptionLight}
          imageUrl={spread[0].imageUrl}
          icon={<Sun className="w-4 h-4" />}
          colorClass="text-primary"
          borderColorClass="border-primary/30"
        />

        {/* Present */}
        <TarotCard 
          position="II"
          title="PRESENTE"
          cardName={spread[1].name}
          polarity="Sombra"
          subtitle={spread[1].archetype}
          description={spread[1].descriptionShadow}
          imageUrl={spread[1].imageUrl}
          icon={<Moon className="w-4 h-4" />}
          colorClass="text-tertiary"
          borderColorClass="border-tertiary/30"
          isShadow
        />

        {/* Future */}
        <TarotCard 
          position="III"
          title="FUTURO"
          cardName={spread[2].name}
          polarity="Luz"
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
  return (
    <div className="relative group">
      <div className={`absolute -top-3 left-0 font-label text-[9px] tracking-[0.2em] uppercase ${colorClass} opacity-60`}>
        Posición {position} • {title}
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

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, ArrowUpCircle, BookOpen, Heart } from 'lucide-react';
import { useDateContext } from '../context/DateContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  zodiacSigns, 
  elements, 
  getSunSign, 
  getMoonSign, 
  getAscendantSign, 
  getSunSignIndex, 
  getMoonSignIndex, 
  getAscendantIndex 
} from '../utils/mysticAlgorithms';
import { sunDescriptions, moonDescriptions, ascendantDescriptions } from '../data/soulMapData';

export default function SoulMapScreen() {
  const { userDate, userTime, partnerDate } = useDateContext();
  const { t, language } = useLanguage();

  // 1. Cálculos Astrológicos
  const sunSign = getSunSign(userDate);
  const moonSign = getMoonSign(userDate);
  const ascendantSign = getAscendantSign(userDate, userTime);

  const sunIndex = getSunSignIndex(userDate);
  const moonIndex = getMoonSignIndex(userDate);
  const ascIndex = getAscendantIndex(userDate, userTime);

  const sunElement = elements[sunSign as keyof typeof elements];
  const moonElement = elements[moonSign as keyof typeof elements];
  const ascElement = elements[ascendantSign as keyof typeof elements];

  // 2. Cálculos para Pareja (Sinastría)
  const partnerSun = partnerDate ? getSunSign(partnerDate) : '';
  const partnerElement = partnerDate ? elements[partnerSun as keyof typeof elements] : '';

  // Algoritmo de Compatibilidad
  let affinityScore = 50;
  let compatibilityDesc = '';

  if (partnerDate) {
    // Definimos relaciones de elementos
    if (sunElement === partnerElement) {
      affinityScore = 95;
      compatibilityDesc = language === 'es' 
        ? `Excelente afinidad de elementos compartidos (${sunElement}). Vibran en la misma frecuencia de temperamento, facilitando la comprensión mutua.`
        : `Excellent affinity of shared elements (${sunElement}). You vibrate at the same temperamental frequency, easing mutual understanding.`;
    } else if (
      (sunElement === 'Fuego' && partnerElement === 'Aire') || 
      (sunElement === 'Aire' && partnerElement === 'Fuego')
    ) {
      affinityScore = 90;
      compatibilityDesc = language === 'es'
        ? "El Aire alimenta al Fuego. Esta es una relación dinámica, intelectualmente estimulante y llena de inspiración constante."
        : "Air feeds Fire. This is a dynamic, intellectually stimulating relationship filled with constant inspiration.";
    } else if (
      (sunElement === 'Tierra' && partnerElement === 'Agua') || 
      (sunElement === 'Agua' && partnerElement === 'Tierra')
    ) {
      affinityScore = 92;
      compatibilityDesc = language === 'es'
        ? "El Agua nutre la Tierra, y la Tierra contiene al Agua. Gran estabilidad y apoyo emocional mutuo; construyen bases muy sólidas."
        : "Water nurtures Earth, and Earth contains Water. Great stability and mutual emotional support; you build very solid foundations.";
    } else if (
      (sunElement === 'Fuego' && partnerElement === 'Agua') || 
      (sunElement === 'Agua' && partnerElement === 'Fuego')
    ) {
      affinityScore = 62;
      compatibilityDesc = language === 'es'
        ? "Fuego y Agua: una combinación de alta intensidad emocional pero desafiante. El agua puede apagar la iniciativa del fuego, y el fuego evaporar la sensibilidad del agua."
        : "Fire and Water: a highly intense emotional combination but challenging. Water can extinguish Fire's drive, and Fire can evaporate Water's sensitivity.";
    } else if (
      (sunElement === 'Fuego' && partnerElement === 'Tierra') || 
      (sunElement === 'Tierra' && partnerElement === 'Fuego')
    ) {
      affinityScore = 68;
      compatibilityDesc = language === 'es'
        ? "Fuego y Tierra: dinamismo pragmático. El fuego provee entusiasmo y la tierra estructura, pero la impaciencia del fuego choca con la lentitud estructurada de la tierra."
        : "Fire and Earth: pragmatic dynamism. Fire provides enthusiasm and Earth structure, but Fire's impatience clashes with Earth's structured pace.";
    } else if (
      (sunElement === 'Aire' && partnerElement === 'Agua') || 
      (sunElement === 'Agua' && partnerElement === 'Aire')
    ) {
      affinityScore = 70;
      compatibilityDesc = language === 'es'
        ? "Aire y Agua: intelecto versus emoción. Buscan puentes racionales para explicar profundidades afectivas. Se requiere comunicación honesta para no perderse en malentendidos."
        : "Air and Water: intellect versus emotion. You seek rational bridges to explain affective depths. Honest communication is required to avoid misunderstandings.";
    } else { // Aire y Tierra
      affinityScore = 65;
      compatibilityDesc = language === 'es'
        ? "Aire y Tierra: ideas versus realidad tangible. El aire busca libertad e innovación y la tierra demanda compromiso material. Pueden complementarse si valoran sus diferencias."
        : "Air and Earth: ideas versus tangible reality. Air seeks freedom and innovation while Earth demands material commitment. They can complement each other if they value their differences.";
    }
  }

  // 3. Síntesis Algorítmica de Integración
  const generateDynamicSynthesis = () => {
    if (language === 'es') {
      return `Tu núcleo de identidad solar (${sunSign}, elemento ${sunElement}) representa tu fuerza de voluntad e impulso primario. Sin embargo, este se procesa emocionalmente a través de tu refugio lunar en ${moonSign} (${moonElement}), creando una dinámica donde tu ${sunElement === moonElement ? 'esencia y emociones coinciden armónicamente' : 'identidad activa debe dialogar con un mundo emocional diferente'}. En el plano social y físico, proyectas tu Ascendente en ${ascendantSign} (${ascElement}), que actúa como la máscara o lente inicial por la cual interactúas con el entorno. La integración de tu ser se logra equilibrando estas tres fuerzas fundamentales.`;
    } else {
      return `Your core solar identity (${sunSign}, ${sunElement} element) represents your primary willpower and drive. However, this is emotionally processed through your lunar refuge in ${moonSign} (${moonElement}), creating a dynamic where your ${sunElement === moonElement ? 'essence and emotions align harmoniously' : 'active identity must dialogue with a different emotional world'}. Socially and physically, you project your Ascendant in ${ascendantSign} (${ascElement}), which acts as the initial mask or lens through which you interact with your environment. Integrating your self is achieved by balancing these three fundamental forces.`;
    }
  };

  // 4. Render del Gráfico de la Rueda Astral (Mandala Natal en SVG)
  const renderAstralWheelSVG = () => {
    const size = 300;
    const center = size / 2;
    const radius = 120;
    const innerRadius = 80;

    // Abreviaciones de los signos
    const signAbbr = ['ARI', 'TAU', 'GEM', 'CAN', 'LEO', 'VIR', 'LIB', 'SCO', 'SAG', 'CAP', 'AQU', 'PIS'];

    // Ángulos de los signos en radianes (12 sectores de 30 grados cada uno)
    // Astrológicamente, la rueda se dibuja con el Ascendente al este (izquierda, ángulo = PI)
    // Así que ajustamos el ángulo base para que el Ascendente coincida con la izquierda de la rueda.
    const getAngleForSignIndex = (index: number) => {
      // Ascendente a la izquierda (180 grados).
      // Cada signo avanza en sentido antihorario.
      // Posición relativa al Ascendente del usuario:
      const relativeIndex = (index - ascIndex + 12) % 12;
      return Math.PI - (relativeIndex * 30 * Math.PI) / 180 - (15 * Math.PI) / 180; // Centro del sector
    };

    const getBorderAngleForSignIndex = (index: number) => {
      const relativeIndex = (index - ascIndex + 12) % 12;
      return Math.PI - (relativeIndex * 30 * Math.PI) / 180; // Línea de frontera de sector
    };

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="max-w-[280px] mx-auto select-none overflow-visible">
        {/* Filtro de Resplandor Dorado */}
        <defs>
          <radialGradient id="alchemical-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="gold-shine" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Resplandor de Fondo */}
        <circle cx={center} cy={center} r={radius + 20} fill="url(#alchemical-glow)" />

        {/* Círculo Exterior */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#d4af37" strokeWidth="2.5" className="opacity-80" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#d4af37" strokeWidth="1" className="opacity-40" />
        <circle cx={center} cy={center} r="25" fill="none" stroke="#d4af37" strokeWidth="1" className="opacity-30" />

        {/* Líneas de Sector Zodiacal y Abreviaturas */}
        {zodiacSigns.map((_, i) => {
          const borderAngle = getBorderAngleForSignIndex(i);
          const x1 = center + Math.cos(borderAngle) * innerRadius;
          const y1 = center + Math.sin(borderAngle) * innerRadius;
          const x2 = center + Math.cos(borderAngle) * radius;
          const y2 = center + Math.sin(borderAngle) * radius;

          const labelAngle = getAngleForSignIndex(i);
          const labelX = center + Math.cos(labelAngle) * (radius - 18);
          const labelY = center + Math.sin(labelAngle) * (radius - 18);

          return (
            <g key={i}>
              {/* Radio divisorio */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" />
              {/* Etiqueta del signo */}
              <text 
                x={labelX} 
                y={labelY} 
                fill={i === sunIndex ? '#d4af37' : i === moonIndex ? '#a3a3b5' : i === ascIndex ? '#e09f67' : '#5a5a70'}
                fontSize="8" 
                fontFamily="Space Grotesk"
                fontWeight="500"
                textAnchor="middle" 
                alignmentBaseline="middle"
                transform={`rotate(${(labelAngle * 180) / Math.PI + 90}, ${labelX}, ${labelY})`}
              >
                {signAbbr[i]}
              </text>
            </g>
          );
        })}

        {/* Marcador del Ascendente (Horizonte Este - Línea Horizontal de la Izquierda) */}
        <line 
          x1={center - radius - 15} 
          y1={center} 
          x2={center + radius + 15} 
          y2={center} 
          stroke="#e09f67" 
          strokeWidth="2.5" 
          strokeDasharray="4 2"
          className="opacity-70" 
        />
        {/* Glifo / Etiqueta ASC a la izquierda */}
        <rect x={center - radius - 28} y={center - 8} width="22" height="16" rx="3" fill="#0f0f13" stroke="#e09f67" strokeWidth="1" />
        <text x={center - radius - 17} y={center + 1.5} fill="#e09f67" fontSize="8" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
          ASC
        </text>

        {/* Posiciones de Planetas (Sol, Luna, Ascendente) */}
        {(() => {
          // Sol
          const sunAngle = getAngleForSignIndex(sunIndex) - 0.05; // Desplazamiento leve para evitar solapamientos
          const sx = center + Math.cos(sunAngle) * 52;
          const sy = center + Math.sin(sunAngle) * 52;

          // Luna
          const moonAngle = getAngleForSignIndex(moonIndex) + 0.05;
          const mx = center + Math.cos(moonAngle) * 52;
          const my = center + Math.sin(moonAngle) * 52;

          // Ascendente
          const ascAngle = Math.PI - 0.08; // Cerca de la línea izquierda
          const ax = center + Math.cos(ascAngle) * 52;
          const ay = center + Math.sin(ascAngle) * 52;

          return (
            <g>
              {/* Conector Sol */}
              <line x1={center} y1={center} x2={sx} y2={sy} stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" />
              <circle cx={sx} cy={sy} r="12" fill="#0f0f13" stroke="#d4af37" strokeWidth="1.5" />
              {/* Glifo del Sol (punto en el círculo) */}
              <circle cx={sx} cy={sy} r="7" fill="none" stroke="#d4af37" strokeWidth="1" />
              <circle cx={sx} cy={sy} r="1.5" fill="#d4af37" />

              {/* Conector Luna */}
              <line x1={center} y1={center} x2={mx} y2={my} stroke="rgba(163, 163, 181, 0.2)" strokeWidth="1" />
              <circle cx={mx} cy={my} r="12" fill="#0f0f13" stroke="#a3a3b5" strokeWidth="1.5" />
              {/* Glifo de la Luna */}
              <path d={`M ${mx - 2} ${my - 5} A 5 5 0 0 1 ${mx - 2} ${my + 5} A 3.8 3.8 0 0 0 ${mx - 2} ${my - 5}`} fill="#a3a3b5" />

              {/* Conector Ascendente en la rueda */}
              <line x1={center} y1={center} x2={ax} y2={ay} stroke="rgba(224, 159, 103, 0.2)" strokeWidth="1" />
              <circle cx={ax} cy={ay} r="12" fill="#0f0f13" stroke="#e09f67" strokeWidth="1.5" />
              {/* Símbolo Ascendente */}
              <text x={ax} y={ay + 1} fill="#e09f67" fontSize="8" fontWeight="bold" fontFamily="Space Grotesk" textAnchor="middle" alignmentBaseline="middle">
                A
              </text>
            </g>
          );
        })()}
      </svg>
    );
  };

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

      {/* Rueda Astral Interactiva SVG */}
      <section className="flex justify-center py-4 relative">
        <div className="relative w-72 h-72 rounded-full border border-primary/5 flex items-center justify-center bg-surface-container-lowest/30 backdrop-blur-md">
          {renderAstralWheelSVG()}
        </div>
      </section>

      {/* The Three Pillars (Sun, Moon, Ascendant) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sun */}
        <PlanetCard 
          title={t('soulmap.sun.title')}
          subtitle={t('soulmap.sun.subtitle')}
          icon={<Sun className="text-primary w-6 h-6" />}
          colorClass="text-primary"
          bgClass="bg-primary/10"
          description={<>{language === 'es' ? 'Tu Sol en' : 'Your Sun in'} <span className="text-primary font-bold">{sunSign}</span> ({sunElement}). {sunDescriptions[sunSign]}</>}
        />

        {/* Moon */}
        <PlanetCard 
          title={t('soulmap.moon.title')}
          subtitle={t('soulmap.moon.subtitle')}
          icon={<Moon className="text-tertiary w-6 h-6" />}
          colorClass="text-tertiary"
          bgClass="bg-tertiary/10"
          description={<>{language === 'es' ? 'Tu Luna en' : 'Your Moon in'} <span className="text-tertiary font-bold">{moonSign}</span> ({moonElement}). {moonDescriptions[moonSign]}</>}
        />

        {/* Ascendant */}
        <PlanetCard 
          title={t('soulmap.asc.title')}
          subtitle={t('soulmap.asc.subtitle')}
          icon={<ArrowUpCircle className="text-secondary w-6 h-6" />}
          colorClass="text-secondary"
          bgClass="bg-secondary/10"
          description={<>{language === 'es' ? 'Tu Ascendente en' : 'Your Ascendant in'} <span className="text-secondary font-bold">{ascendantSign}</span> ({ascElement}). {ascendantDescriptions[ascendantSign]}</>}
        />
      </section>

      {/* Dynamic Astral Synthesis */}
      <section className="glass-card rounded-xl p-6 md:p-8 border border-primary/10 shadow-lg mt-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary w-5 h-5" />
          <h3 className="font-headline text-2xl text-primary">{t('soulmap.synthesis.title')}</h3>
        </div>
        <p className="text-on-surface-variant font-body text-sm leading-relaxed font-light italic">
          {generateDynamicSynthesis()}
        </p>
      </section>

      {/* Synastry / Compatibility Section */}
      {partnerDate && (
        <section className="glass-card rounded-xl p-6 border border-tertiary/20 shadow-lg mt-8 bg-tertiary/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="text-tertiary w-6 h-6" />
              <h3 className="font-headline text-2xl text-tertiary">{t('soulmap.compatibility.title')}</h3>
            </div>
            <div className="text-right">
              <span className="font-label text-[9px] uppercase tracking-widest text-outline block">{t('soulmap.compatibility.score')}</span>
              <span className="font-headline text-3xl text-tertiary font-bold text-glow">{affinityScore}%</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-6 border-b border-outline-variant/10 pb-4">
            {compatibilityDesc}
          </p>
          <div className="flex items-center gap-4 text-sm max-w-sm mx-auto">
            <div className="flex-1 bg-surface-container p-4 rounded-xl text-center border border-primary/20 shadow-md">
              <span className="block font-label text-[9px] uppercase text-primary mb-1">{language === 'es' ? 'Tú' : 'You'}</span>
              <span className="font-bold text-on-surface font-headline text-base">{sunSign}</span>
              <span className="block text-[8px] text-outline uppercase mt-1">{sunElement}</span>
            </div>
            <div className="text-tertiary text-2xl animate-pulse">⟷</div>
            <div className="flex-1 bg-surface-container p-4 rounded-xl text-center border border-tertiary/20 shadow-md">
              <span className="block font-label text-[9px] uppercase text-tertiary mb-1">{language === 'es' ? 'Pareja' : 'Partner'}</span>
              <span className="font-bold text-on-surface font-headline text-base">{partnerSun}</span>
              <span className="block text-[8px] text-outline uppercase mt-1">{partnerElement}</span>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}

function PlanetCard({ title, subtitle, icon, colorClass, bgClass, description }: { title: string, subtitle: string, icon: ReactNode, colorClass: string, bgClass: string, description: ReactNode }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/5 hover:bg-surface-container transition-colors duration-300 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h3 className="font-headline text-2xl text-on-surface font-bold">{title}</h3>
            <p className={`font-label text-[8px] uppercase tracking-widest ${colorClass}`}>{subtitle}</p>
          </div>
          <div className={`p-3 rounded-full ${bgClass} shrink-0`}>
            {icon}
          </div>
        </div>
        <p className="text-sm font-light leading-relaxed text-on-surface-variant">
          {description}
        </p>
      </div>
    </div>
  );
}

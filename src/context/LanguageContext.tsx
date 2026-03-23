import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const translations = {
  es: {
    'login.title': 'El Oráculo Digital',
    'login.subtitle': 'Explora las profundidades de tu psique.',
    'login.button': 'Ingresar al Oráculo',
    'nav.daily': 'Sincronicidad',
    'nav.tarot': 'Tarot',
    'nav.soulmap': 'Carta Astral',
    'tarot.header.subtitle': 'Secuencia de Revelación',
    'tarot.header.title': 'Desarrollo Psíquico',
    'tarot.header.desc': 'Un viaje desde la luz de la experiencia pasada, a través de la sombra del conflicto presente, hacia el potencial integrado del futuro.',
    'tarot.button.new': 'Nueva Tirada',
    'tarot.position': 'Posición',
    'tarot.past': 'PASADO',
    'tarot.present': 'PRESENTE',
    'tarot.future': 'FUTURO',
    'tarot.light': 'Luz',
    'tarot.shadow': 'Sombra',
    'tarot.spread.psychic': 'Desarrollo Psíquico',
    'tarot.spread.shadow': 'Trabajo de Sombra',
    'tarot.spread.love': 'Compatibilidad Amorosa',
    'tarot.spread.path': 'Camino de Vida',
    'tarot.spread.psychic.desc': 'Un viaje desde la luz de la experiencia pasada, a través de la sombra del conflicto presente, hacia el potencial integrado del futuro.',
    'tarot.spread.shadow.desc': 'Explora lo oculto, la resistencia y el camino hacia la integración de tu sombra.',
    'tarot.spread.love.desc': 'Analiza la dinámica entre tú y tu pareja, revelando la energía de la relación.',
    'tarot.spread.path.desc': 'Descubre tu situación actual, el obstáculo a superar y el consejo para avanzar.',
    'tarot.pos.shadow.1': 'LA SOMBRA',
    'tarot.pos.shadow.2': 'EL DESAFÍO',
    'tarot.pos.shadow.3': 'LA INTEGRACIÓN',
    'tarot.pos.love.1': 'TÚ',
    'tarot.pos.love.2': 'LA OTRA PERSONA',
    'tarot.pos.love.3': 'LA DINÁMICA',
    'tarot.pos.path.1': 'SITUACIÓN ACTUAL',
    'tarot.pos.path.2': 'OBSTÁCULO',
    'tarot.pos.path.3': 'CONSEJO',
    'soulmap.header.subtitle': 'Plano Cósmico',
    'soulmap.header.title': 'El Mapa del Alma',
    'soulmap.header.desc': 'Un descenso arquitectónico a los arquetipos que gobiernan tu manifestación terrenal.',
    'soulmap.center': 'Centro de Gravedad',
    'soulmap.sun.title': 'El Núcleo',
    'soulmap.sun.subtitle': 'Sol • Ego • Vitalidad Esencial',
    'soulmap.moon.title': 'El Refugio',
    'soulmap.moon.subtitle': 'Luna • Subconsciente • Seguridad del Alma',
    'soulmap.asc.title': 'La Persona',
    'soulmap.asc.subtitle': 'Ascendente • La Máscara • Lente Social',
    'soulmap.synthesis.title': 'Síntesis de Integración',
    'soulmap.synthesis.desc': 'El viaje de tu alma es el equilibrio entre la esencia de {sun}, el refugio de {moon} y la proyección de {asc}.',
    'soulmap.compatibility.title': 'Sinastría (Compatibilidad)',
    'soulmap.compatibility.desc': 'La resonancia cósmica entre tu energía y la de tu pareja.',
    'soulmap.compatibility.score': 'Índice de Afinidad',
    'daily.header.subtitle': 'Clima Psíquico',
    'daily.header.title': 'Sincronicidad Diaria',
    'daily.header.desc': 'La resonancia arquetípica de hoy, decodificada para tu navegación consciente.',
    'daily.ego.title': 'Fronteras del Ego',
    'daily.conscious.title': 'Manifestación Consciente',
    'daily.somatic.title': 'Conexión Somática',
    'daily.chromatic.title': 'Frecuencia Cromática',
    'daily.numeric.title': 'Marcador Numérico',
    'daily.chromatic.desc': 'Integra este color en tu campo visual hoy para anclar la energía arquetípica.',
    'daily.compatibility.title': 'Sincronicidad Compartida',
    'daily.compatibility.desc': 'La energía que fluye entre tú y tu pareja hoy.',
    'settings.title': 'Configuración del Oráculo',
    'settings.date.label': 'Fecha de Nacimiento / Sincronicidad',
    'settings.date.desc': 'Esta fecha calibra el motor de sincronicidad y la carta astral.',
    'settings.partnerDate.label': 'Fecha de la Otra Persona (Opcional)',
    'settings.partnerDate.desc': 'Añade la fecha de tu pareja o interés para lecturas de compatibilidad.',
    'settings.language.label': 'Idioma',
    'settings.language.desc': 'Selecciona el idioma de la interfaz.',
    'settings.close': 'Cerrar',
  },
  en: {
    'login.title': 'The Digital Oracle',
    'login.subtitle': 'Explore the depths of your psyche.',
    'login.button': 'Enter the Oracle',
    'nav.daily': 'Synchronicity',
    'nav.tarot': 'Tarot',
    'nav.soulmap': 'Soul Map',
    'tarot.header.subtitle': 'Revelation Sequence',
    'tarot.header.title': 'Psychic Unfolding',
    'tarot.header.desc': 'A journey from the light of past experience, through the shadow of present conflict, toward the integrated potential of the future.',
    'tarot.button.new': 'New Draw',
    'tarot.position': 'Position',
    'tarot.past': 'PAST',
    'tarot.present': 'PRESENT',
    'tarot.future': 'FUTURE',
    'tarot.light': 'Light',
    'tarot.shadow': 'Shadow',
    'tarot.spread.psychic': 'Psychic Unfolding',
    'tarot.spread.shadow': 'Shadow Work',
    'tarot.spread.love': 'Love Compatibility',
    'tarot.spread.path': 'Life Path',
    'tarot.spread.psychic.desc': 'A journey from the light of past experience, through the shadow of present conflict, toward the integrated potential of the future.',
    'tarot.spread.shadow.desc': 'Explore the hidden, the resistance, and the path to integrating your shadow.',
    'tarot.spread.love.desc': 'Analyze the dynamic between you and your partner, revealing the energy of the relationship.',
    'tarot.spread.path.desc': 'Discover your current situation, the obstacle to overcome, and the advice to move forward.',
    'tarot.pos.shadow.1': 'THE SHADOW',
    'tarot.pos.shadow.2': 'THE CHALLENGE',
    'tarot.pos.shadow.3': 'INTEGRATION',
    'tarot.pos.love.1': 'YOU',
    'tarot.pos.love.2': 'THE OTHER PERSON',
    'tarot.pos.love.3': 'THE DYNAMIC',
    'tarot.pos.path.1': 'CURRENT SITUATION',
    'tarot.pos.path.2': 'OBSTACLE',
    'tarot.pos.path.3': 'ADVICE',
    'soulmap.header.subtitle': 'Cosmic Blueprint',
    'soulmap.header.title': 'The Soul Map',
    'soulmap.header.desc': 'An architectural descent into the archetypes that govern your earthly manifestation.',
    'soulmap.center': 'Center of Gravity',
    'soulmap.sun.title': 'The Core',
    'soulmap.sun.subtitle': 'Sun • Ego • Essential Vitality',
    'soulmap.moon.title': 'The Refuge',
    'soulmap.moon.subtitle': 'Moon • Subconscious • Soul Safety',
    'soulmap.asc.title': 'The Persona',
    'soulmap.asc.subtitle': 'Ascendant • The Mask • Social Lens',
    'soulmap.synthesis.title': 'Integration Synthesis',
    'soulmap.synthesis.desc': 'Your soul\'s journey is the balance between the essence of {sun}, the refuge of {moon}, and the projection of {asc}.',
    'soulmap.compatibility.title': 'Synastry (Compatibility)',
    'soulmap.compatibility.desc': 'The cosmic resonance between your energy and your partner\'s.',
    'soulmap.compatibility.score': 'Affinity Index',
    'daily.header.subtitle': 'Psychic Climate',
    'daily.header.title': 'Daily Synchronicity',
    'daily.header.desc': 'Today\'s archetypal resonance, decoded for your conscious navigation.',
    'daily.ego.title': 'Ego Boundaries',
    'daily.conscious.title': 'Conscious Manifestation',
    'daily.somatic.title': 'Somatic Connection',
    'daily.chromatic.title': 'Chromatic Frequency',
    'daily.numeric.title': 'Numeric Marker',
    'daily.chromatic.desc': 'Integrate this color into your visual field today to anchor the archetypal energy.',
    'daily.compatibility.title': 'Shared Synchronicity',
    'daily.compatibility.desc': 'The energy flowing between you and your partner today.',
    'settings.title': 'Oracle Settings',
    'settings.date.label': 'Birth / Synchronicity Date',
    'settings.date.desc': 'This date calibrates the synchronicity engine and soul map.',
    'settings.partnerDate.label': 'Partner\'s Date (Optional)',
    'settings.partnerDate.desc': 'Add your partner\'s or love interest\'s date for compatibility readings.',
    'settings.language.label': 'Language',
    'settings.language.desc': 'Select the interface language.',
    'settings.close': 'Close',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[language][key as keyof typeof translations['es']] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

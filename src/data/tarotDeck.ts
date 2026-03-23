import { createSeededRandom } from '../utils/random';

export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCardData {
  id: string;
  name: string;
  suit: Suit;
  value: number;
  archetype: string;
  descriptionLight: string;
  descriptionShadow: string;
  imageUrl: string;
}

export const tarotDeck: TarotCardData[] = [
  // ARCANOS MAYORES (22)
  {
    id: 'major-0',
    name: 'El Loco',
    suit: 'major',
    value: 0,
    archetype: 'El Niño Divino / El Potencial Puro',
    descriptionLight: 'Un salto de fe hacia lo desconocido. Confianza absoluta en el proceso de individuación. El inicio de un nuevo ciclo psíquico libre de condicionamientos.',
    descriptionShadow: 'Ingenuidad imprudente, negación de la realidad material o incapacidad para comprometerse con el proceso de maduración.',
    imageUrl: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-1',
    name: 'El Mago',
    suit: 'major',
    value: 1,
    archetype: 'El Creador / El Alquimista',
    descriptionLight: 'Voluntad consciente y manifestación. Tienes todas las herramientas (los cuatro elementos) a tu disposición para transformar tu realidad interna en externa.',
    descriptionShadow: 'Manipulación, ilusiones del ego, o uso de la energía psíquica para fines puramente egoístas sin conexión con el Ser.',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-2',
    name: 'La Sacerdotisa',
    suit: 'major',
    value: 2,
    archetype: 'El Anima / La Intuición Profunda',
    descriptionLight: 'Conexión directa con el inconsciente colectivo. Sabiduría oculta, sueños reveladores y la necesidad de escuchar la voz interior antes de actuar.',
    descriptionShadow: 'Secretos tóxicos, desconexión de la realidad emocional, o represión de la intuición por miedo a lo desconocido.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-3',
    name: 'La Emperatriz',
    suit: 'major',
    value: 3,
    archetype: 'La Gran Madre / La Naturaleza',
    descriptionLight: 'Abundancia, fertilidad creativa y nutrición emocional. La integración del principio femenino que da vida y sostiene el crecimiento de nuevas ideas.',
    descriptionShadow: 'Sobreprotección asfixiante, dependencia emocional, o negligencia de las propias necesidades creativas.',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-4',
    name: 'El Emperador',
    suit: 'major',
    value: 4,
    archetype: 'El Padre / El Orden Estructural',
    descriptionLight: 'Establecimiento de límites sanos, autoridad interna y estructura psíquica. La capacidad de materializar visiones a través de la disciplina.',
    descriptionShadow: 'Rigidez tiránica, represión emocional, o un ego inflexible que se niega a adaptarse a las demandas del inconsciente.',
    imageUrl: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-5',
    name: 'El Hierofante',
    suit: 'major',
    value: 5,
    archetype: 'El Sabio / El Puente',
    descriptionLight: 'Búsqueda de significado a través de la tradición, la filosofía o la guía espiritual. La integración de valores colectivos en la psique individual.',
    descriptionShadow: 'Dogmatismo ciego, conformidad opresiva, o la proyección de la propia autoridad interna en figuras externas (gurús).',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-6',
    name: 'Los Enamorados',
    suit: 'major',
    value: 6,
    archetype: 'La Unión de los Opuestos (Coniunctio)',
    descriptionLight: 'Alineación profunda entre el consciente y el inconsciente (Anima/Animus). Elecciones hechas desde la autenticidad del corazón y la integración.',
    descriptionShadow: 'Proyección de la propia completitud en otra persona, indecisión paralizante, o relaciones basadas en la dependencia.',
    imageUrl: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-7',
    name: 'El Carro',
    suit: 'major',
    value: 7,
    archetype: 'El Ego Triunfante / La Voluntad Dirigida',
    descriptionLight: 'Dominio sobre las fuerzas opuestas de la psique. Avance determinado gracias a la integración de la luz y la sombra bajo una voluntad consciente.',
    descriptionShadow: 'Control forzado que reprime las emociones, agresión desmedida, o un ego inflado que ignora las señales del inconsciente.',
    imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-8',
    name: 'La Fuerza',
    suit: 'major',
    value: 8,
    archetype: 'El Instinto Domesticado',
    descriptionLight: 'Coraje compasivo. La capacidad de integrar y canalizar los instintos animales (la Sombra) a través del amor y la aceptación, no de la represión.',
    descriptionShadow: 'Represión de los instintos naturales que lleva a explosiones emocionales, o debilidad ante los impulsos destructivos.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-9',
    name: 'El Ermitaño',
    suit: 'major',
    value: 9,
    archetype: 'El Anciano Sabio / La Introspección',
    descriptionLight: 'Retirada consciente del mundo exterior para iluminar el mundo interior. Búsqueda de la verdad personal en la soledad y el silencio.',
    descriptionShadow: 'Aislamiento patológico, misantropía, o perderse en el propio laberinto mental sin retornar para compartir la sabiduría.',
    imageUrl: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-10',
    name: 'La Rueda de la Fortuna',
    suit: 'major',
    value: 10,
    archetype: 'El Destino / Los Ciclos Cósmicos',
    descriptionLight: 'Aceptación de la naturaleza cíclica de la psique y la vida. Sincronicidad en acción. Comprender que el centro (el Ser) permanece inmóvil ante el cambio.',
    descriptionShadow: 'Sentirse víctima de las circunstancias, resistencia al cambio inevitable, o incapacidad para ver el patrón mayor.',
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-11',
    name: 'La Justicia',
    suit: 'major',
    value: 11,
    archetype: 'El Equilibrio / La Ley de Causa y Efecto',
    descriptionLight: 'Evaluación objetiva de la propia psique. Asumir la responsabilidad radical de las propias proyecciones y acciones. Equilibrio kármico.',
    descriptionShadow: 'Juicio severo e implacable hacia uno mismo o los demás, negación de la propia responsabilidad, o racionalización de la culpa.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-12',
    name: 'El Colgado',
    suit: 'major',
    value: 12,
    archetype: 'El Sacrificio / El Cambio de Perspectiva',
    descriptionLight: 'Suspensión voluntaria del ego. Rendición ante el proceso del inconsciente que permite una iluminación profunda y una nueva forma de ver la realidad.',
    descriptionShadow: 'Martirio innecesario, estancamiento por miedo a actuar, o manipulación a través del rol de víctima.',
    imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-13',
    name: 'La Muerte',
    suit: 'major',
    value: 13,
    archetype: 'La Transformación / La Nigredo',
    descriptionLight: 'Muerte psicológica de una vieja identidad o patrón. El proceso alquímico de putrefacción necesario para que nazca una nueva forma de ser.',
    descriptionShadow: 'Aferrarse desesperadamente a lo que ya está muerto, miedo paralizante al cambio, o depresión estancada.',
    imageUrl: 'https://images.unsplash.com/photo-1475598322381-f1b499717fea?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-14',
    name: 'La Templanza',
    suit: 'major',
    value: 14,
    archetype: 'La Alquimia Interior / La Albedo',
    descriptionLight: 'Integración armoniosa de los opuestos psíquicos. Curación profunda a través de la moderación y la mezcla equilibrada de emoción y razón.',
    descriptionShadow: 'Desequilibrio extremo, impaciencia con el proceso de curación, o una falsa armonía que oculta conflictos no resueltos.',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-15',
    name: 'El Diablo',
    suit: 'major',
    value: 15,
    archetype: 'La Sombra / Las Cadenas de la Proyección',
    descriptionLight: 'Enfrentamiento directo con la Sombra personal. Reconocimiento de los apegos, adicciones y proyecciones que nos mantienen prisioneros del inconsciente.',
    descriptionShadow: 'Identificación total con los impulsos destructivos, materialismo ciego, o la proyección de la propia maldad en los demás.',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-16',
    name: 'La Torre',
    suit: 'major',
    value: 16,
    archetype: 'La Crisis Despertadora / La Destrucción del Ego',
    descriptionLight: 'Destrucción repentina de estructuras psíquicas falsas o defensas del ego. Una revelación dolorosa pero liberadora que despeja el camino hacia la verdad.',
    descriptionShadow: 'Trauma no integrado, resistencia destructiva a la revelación, o la creación constante de crisis para evitar la verdadera intimidad.',
    imageUrl: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-17',
    name: 'La Estrella',
    suit: 'major',
    value: 17,
    archetype: 'La Esperanza / La Conexión Cósmica',
    descriptionLight: 'Renovación psíquica tras la crisis. Inspiración pura que fluye del inconsciente colectivo. Fe en el proceso de individuación y conexión con el Ser.',
    descriptionShadow: 'Desesperanza, desconexión de la fuente espiritual, o perderse en fantasías utópicas sin anclaje en la realidad.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-18',
    name: 'La Luna',
    suit: 'major',
    value: 18,
    archetype: 'El Inconsciente Profundo / La Ilusión',
    descriptionLight: 'Navegación por el reino de los sueños, los miedos atávicos y la intuición cruda. Aceptar la ambigüedad y permitir que los contenidos reprimidos emerjan.',
    descriptionShadow: 'Paranoia, ser abrumado por complejos inconscientes, engaño, o la incapacidad de distinguir la realidad de la proyección.',
    imageUrl: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-19',
    name: 'El Sol',
    suit: 'major',
    value: 19,
    archetype: 'La Conciencia Iluminada / La Rubedo',
    descriptionLight: 'Claridad total, vitalidad y éxito en la integración psíquica. El ego y el Ser trabajan en perfecta armonía. Alegría de vivir auténtica.',
    descriptionShadow: 'Exceso de confianza ciego (inflación del ego), agotamiento por exceso de actividad, o una positividad tóxica que niega la Sombra.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-20',
    name: 'El Juicio',
    suit: 'major',
    value: 20,
    archetype: 'El Renacimiento / La Llamada del Ser',
    descriptionLight: 'Un despertar profundo a la verdadera vocación. Absolución de culpas pasadas mediante la comprensión superior. La psique se reorganiza en un nivel más alto.',
    descriptionShadow: 'Sordera ante la llamada interior, aferrarse a viejas identidades por miedo al juicio de los demás, o auto-condenación implacable.',
    imageUrl: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'major-21',
    name: 'El Mundo',
    suit: 'major',
    value: 21,
    archetype: 'La Individuación / La Totalidad',
    descriptionLight: 'Completitud del ciclo psíquico. Integración total de los cuatro elementos (pensamiento, sentimiento, sensación, intuición). Danza armónica con el universo.',
    descriptionShadow: 'Estancamiento justo antes de la meta, incapacidad para cerrar ciclos, o una falsa sensación de completitud que evita el próximo paso evolutivo.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
  }
];

// Generador de Arcanos Menores para completar la baraja de 78 cartas
const suits: { id: Suit; name: string; element: string; archetype: string }[] = [
  { id: 'wands', name: 'Bastos', element: 'Fuego', archetype: 'Intuición / Voluntad' },
  { id: 'cups', name: 'Copas', element: 'Agua', archetype: 'Sentimiento / Relación' },
  { id: 'swords', name: 'Espadas', element: 'Aire', archetype: 'Pensamiento / Conflicto' },
  { id: 'pentacles', name: 'Oros', element: 'Tierra', archetype: 'Sensación / Materia' }
];

const values = [
  { val: 1, name: 'As', desc: 'El impulso puro del elemento. Un nuevo comienzo psíquico.' },
  { val: 2, name: 'Dos', desc: 'Dualidad, elección y equilibrio inicial.' },
  { val: 3, name: 'Tres', desc: 'Síntesis, crecimiento y primera manifestación.' },
  { val: 4, name: 'Cuatro', desc: 'Estabilidad, estructura y consolidación.' },
  { val: 5, name: 'Cinco', desc: 'Crisis, conflicto y desafío al status quo.' },
  { val: 6, name: 'Seis', desc: 'Armonía recuperada, equilibrio dinámico y reciprocidad.' },
  { val: 7, name: 'Siete', desc: 'Evaluación, estrategia y desafío interno.' },
  { val: 8, name: 'Ocho', desc: 'Movimiento, reevaluación y cambio de perspectiva.' },
  { val: 9, name: 'Nueve', desc: 'Culminación cercana, madurez del elemento y resiliencia.' },
  { val: 10, name: 'Diez', desc: 'Finalización del ciclo del elemento, exceso o plenitud.' },
  { val: 11, name: 'Sota', desc: 'El aspecto inmaduro o aprendiz del elemento. Mensajes del inconsciente.' },
  { val: 12, name: 'Caballero', desc: 'La energía en movimiento, el aspecto adolescente y dinámico.' },
  { val: 13, name: 'Reina', desc: 'El dominio interno y receptivo del elemento. Integración emocional.' },
  { val: 14, name: 'Rey', desc: 'El dominio externo y directivo del elemento. Autoridad consciente.' }
];

suits.forEach(suit => {
  values.forEach(v => {
    tarotDeck.push({
      id: `${suit.id}-${v.val}`,
      name: `${v.name} de ${suit.name}`,
      suit: suit.id,
      value: v.val,
      archetype: `${suit.archetype} - ${v.name}`,
      descriptionLight: `${v.desc} Expresión luminosa de la energía de ${suit.element}.`,
      descriptionShadow: `Bloqueo o distorsión en la energía de ${suit.element}. Resistencia al proceso.`,
      imageUrl: `https://picsum.photos/seed/${suit.id}${v.val}/800/1200?blur=1`
    });
  });
});

export const getSeededRandomCards = (count: number, seed: number, offset: number = 0): TarotCardData[] => {
  const randomFunc = createSeededRandom(seed + offset * 1000);
  
  // Create a copy of the deck to shuffle
  const shuffled = [...tarotDeck];
  
  // Fisher-Yates shuffle using the seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomFunc() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};

export const getRandomCards = (count: number): TarotCardData[] => {
  const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

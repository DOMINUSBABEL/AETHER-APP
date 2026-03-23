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
    imageUrl: 'https://images.unsplash.com/photo-1561731216-83622284f156?q=80&w=800&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop'
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

// Generador detallado de Arcanos Menores
const suitsData: Record<Suit, { name: string; element: string; archetype: string }> = {
  wands: { name: 'Bastos', element: 'Fuego', archetype: 'Intuición / Voluntad' },
  cups: { name: 'Copas', element: 'Agua', archetype: 'Sentimiento / Relación' },
  swords: { name: 'Espadas', element: 'Aire', archetype: 'Pensamiento / Conflicto' },
  pentacles: { name: 'Oros', element: 'Tierra', archetype: 'Sensación / Materia' },
  major: { name: 'Mayor', element: 'Éter', archetype: 'Viaje del Loco' }
};

const minorArcanaDetails: Record<string, Record<number, { name: string; archetype: string; light: string; shadow: string }>> = {
  wands: {
    1: { name: 'As', archetype: 'La Chispa Creativa', light: 'Inspiración pura, un nuevo comienzo lleno de energía y potencial creativo.', shadow: 'Falta de dirección, energía desperdiciada o retrasos en los proyectos.' },
    2: { name: 'Dos', archetype: 'El Visionario', light: 'Planificación a futuro, toma de decisiones audaces y salir de la zona de confort.', shadow: 'Miedo a lo desconocido, falta de planificación o quedarse estancado.' },
    3: { name: 'Tres', archetype: 'La Expansión', light: 'Progreso, expansión de horizontes y previsión. Tus esfuerzos comienzan a dar frutos.', shadow: 'Frustración, retrasos o falta de visión a largo plazo.' },
    4: { name: 'Cuatro', archetype: 'La Celebración', light: 'Alegría, armonía, celebración de logros y un sentido de comunidad o pertenencia.', shadow: 'Falta de apoyo, inestabilidad o celebración prematura.' },
    5: { name: 'Cinco', archetype: 'El Conflicto', light: 'Competencia sana, diversidad de opiniones y el desafío que impulsa el crecimiento.', shadow: 'Conflictos destructivos, tensión constante o falta de cooperación.' },
    6: { name: 'Seis', archetype: 'El Victorioso', light: 'Éxito, reconocimiento público, victoria y autoconfianza.', shadow: 'Ego inflado, caída en desgracia o falta de reconocimiento.' },
    7: { name: 'Siete', archetype: 'El Defensor', light: 'Perseverancia, defensa de tus creencias y mantener tu posición ante la adversidad.', shadow: 'Agotamiento, rendición o sentirse abrumado por la oposición.' },
    8: { name: 'Ocho', archetype: 'El Movimiento', light: 'Acción rápida, progreso acelerado, viajes y comunicación clara.', shadow: 'Retrasos, frustración, o actuar con demasiada prisa sin pensar.' },
    9: { name: 'Nueve', archetype: 'El Resiliente', light: 'Resiliencia, persistencia, y la fuerza para superar los últimos obstáculos.', shadow: 'Agotamiento extremo, paranoia o incapacidad para soltar el pasado.' },
    10: { name: 'Diez', archetype: 'La Carga', light: 'Asumir responsabilidades, trabajo duro que lleva a la culminación.', shadow: 'Estrés abrumador, llevar cargas ajenas o colapso por exceso de trabajo.' },
    11: { name: 'Sota', archetype: 'El Explorador', light: 'Entusiasmo, descubrimiento, espíritu libre y nuevas ideas.', shadow: 'Impaciencia, falta de seguimiento o inmadurez.' },
    12: { name: 'Caballero', archetype: 'El Aventurero', light: 'Energía, pasión, acción impulsiva y aventura.', shadow: 'Temeridad, ira, o actuar sin considerar las consecuencias.' },
    13: { name: 'Reina', archetype: 'La Líder', light: 'Confianza, independencia, calidez y determinación.', shadow: 'Intolerancia, agresividad o ser excesivamente demandante.' },
    14: { name: 'Rey', archetype: 'El Visionario', light: 'Liderazgo natural, visión audaz, carisma y emprendimiento.', shadow: 'Tiranía, impulsividad destructiva o expectativas poco realistas.' }
  },
  cups: {
    1: { name: 'As', archetype: 'El Despertar Emocional', light: 'Amor incondicional, compasión, nueva relación o despertar espiritual.', shadow: 'Emociones reprimidas, amor no correspondido o vacío emocional.' },
    2: { name: 'Dos', archetype: 'La Unión', light: 'Conexión profunda, asociación mutua, amor y armonía.', shadow: 'Desequilibrio en la relación, falta de comunicación o ruptura.' },
    3: { name: 'Tres', archetype: 'La Amistad', light: 'Celebración, amistad, comunidad y colaboración creativa.', shadow: 'Aislamiento, chismes o exceso de indulgencia.' },
    4: { name: 'Cuatro', archetype: 'La Contemplación', light: 'Meditación, reevaluación y búsqueda de significado interior.', shadow: 'Apatía, oportunidades perdidas o desconexión del entorno.' },
    5: { name: 'Cinco', archetype: 'El Duelo', light: 'Procesar la pérdida, aceptar el dolor y encontrar la lección en la decepción.', shadow: 'Aferrarse al pasado, incapacidad para perdonar o pesimismo profundo.' },
    6: { name: 'Seis', archetype: 'La Nostalgia', light: 'Inocencia, recuerdos felices, sanación del niño interior y reencuentros.', shadow: 'Vivir en el pasado, ingenuidad o negación del presente.' },
    7: { name: 'Siete', archetype: 'La Ilusión', light: 'Imaginación fértil, múltiples opciones y soñar despierto.', shadow: 'Ilusiones, falta de enfoque, o sentirse abrumado por las opciones.' },
    8: { name: 'Ocho', archetype: 'El Abandono', light: 'Dejar ir lo que ya no sirve, búsqueda espiritual y transición.', shadow: 'Miedo a avanzar, estancamiento o abandono prematuro.' },
    9: { name: 'Nueve', archetype: 'La Satisfacción', light: 'Deseos cumplidos, satisfacción emocional y gratitud.', shadow: 'Complacencia, materialismo o deseos superficiales.' },
    10: { name: 'Diez', archetype: 'La Plenitud', light: 'Felicidad duradera, armonía familiar y alineación divina.', shadow: 'Conflictos familiares, relaciones rotas o falsa apariencia de felicidad.' },
    11: { name: 'Sota', archetype: 'El Soñador', light: 'Sensibilidad, intuición, mensajes del corazón y creatividad.', shadow: 'Inmadurez emocional, escapismo o hipersensibilidad.' },
    12: { name: 'Caballero', archetype: 'El Romántico', light: 'Idealismo, encanto, seguir el corazón y la imaginación.', shadow: 'Cambios de humor, celos o promesas poco realistas.' },
    13: { name: 'Reina', archetype: 'La Empática', light: 'Compasión, cuidado, intuición profunda y apoyo emocional.', shadow: 'Codependencia, manipulación emocional o martirio.' },
    14: { name: 'Rey', archetype: 'El Consejero', light: 'Equilibrio emocional, diplomacia, sabiduría y compasión madura.', shadow: 'Frialdad emocional, manipulación o represión de los sentimientos.' }
  },
  swords: {
    1: { name: 'As', archetype: 'La Verdad', light: 'Claridad mental, revelación, la verdad cortando a través de la ilusión.', shadow: 'Confusión, hostilidad, o usar la verdad como un arma destructiva.' },
    2: { name: 'Dos', archetype: 'La Encrucijada', light: 'Pausa para la reflexión, equilibrio mental y toma de decisiones difíciles.', shadow: 'Indecisión paralizante, negación o estancamiento.' },
    3: { name: 'Tres', archetype: 'El Dolor', light: 'Liberación emocional a través del dolor, enfrentar la verdad y sanar.', shadow: 'Sufrimiento prolongado, represión del dolor o crueldad.' },
    4: { name: 'Cuatro', archetype: 'El Reposo', light: 'Descanso, recuperación, meditación y preparación mental.', shadow: 'Agotamiento, aislamiento forzado o estancamiento mental.' },
    5: { name: 'Cinco', archetype: 'La Derrota', light: 'Aprender de los conflictos, elegir las batallas y soltar el ego.', shadow: 'Traición, resentimiento, o ganar a cualquier costo.' },
    6: { name: 'Seis', archetype: 'La Transición', light: 'Dejar atrás las dificultades, transición hacia la calma y curación.', shadow: 'Resistencia al cambio, llevar equipaje emocional o estancamiento.' },
    7: { name: 'Siete', archetype: 'La Estrategia', light: 'Astucia, estrategia, pensamiento independiente y diplomacia.', shadow: 'Engaño, evasión de responsabilidades o manipulación.' },
    8: { name: 'Ocho', archetype: 'La Restricción', light: 'Reconocer las prisiones mentales y encontrar la salida a través de la nueva perspectiva.', shadow: 'Victimismo, parálisis por análisis o sentirse atrapado.' },
    9: { name: 'Nueve', archetype: 'La Angustia', light: 'Enfrentar los miedos irracionales, buscar ayuda y liberar la ansiedad.', shadow: 'Desesperación, insomnio, o ser consumido por la preocupación.' },
    10: { name: 'Diez', archetype: 'La Ruina', light: 'El final de un ciclo doloroso, tocar fondo y la promesa de un nuevo amanecer.', shadow: 'Martirio, victimismo extremo o incapacidad para soltar el dolor.' },
    11: { name: 'Sota', archetype: 'El Inquisidor', light: 'Curiosidad, agilidad mental, sed de conocimiento y comunicación clara.', shadow: 'Cinismo, chismes o hablar sin pensar.' },
    12: { name: 'Caballero', archetype: 'El Crítico', light: 'Acción decisiva, intelecto agudo, ambición y franqueza.', shadow: 'Crueldad, impaciencia, o intelecto sin compasión.' },
    13: { name: 'Reina', archetype: 'La Analista', light: 'Claridad, independencia, límites saludables y percepción aguda.', shadow: 'Frialdad, amargura o crítica destructiva.' },
    14: { name: 'Rey', archetype: 'El Estratega', light: 'Autoridad intelectual, lógica, justicia y pensamiento estratégico.', shadow: 'Manipulación mental, tiranía intelectual o falta de empatía.' }
  },
  pentacles: {
    1: { name: 'As', archetype: 'La Manifestación', light: 'Nuevas oportunidades materiales, prosperidad, y el inicio de un proyecto tangible.', shadow: 'Oportunidades perdidas, escasez o mala planificación financiera.' },
    2: { name: 'Dos', archetype: 'El Malabarista', light: 'Adaptabilidad, equilibrio de prioridades y gestión del tiempo.', shadow: 'Desorganización, estrés financiero o asumir demasiado.' },
    3: { name: 'Tres', archetype: 'El Artesano', light: 'Trabajo en equipo, colaboración, maestría y reconocimiento del talento.', shadow: 'Falta de cooperación, trabajo de mala calidad o ignorar el consejo.' },
    4: { name: 'Cuatro', archetype: 'El Conservador', light: 'Seguridad material, ahorro y construcción de bases sólidas.', shadow: 'Avaricia, miedo a la escasez o aferrarse demasiado a lo material.' },
    5: { name: 'Cinco', archetype: 'El Excluido', light: 'Buscar ayuda en tiempos de necesidad, resiliencia y encontrar riqueza espiritual.', shadow: 'Aislamiento, pobreza mental o rechazo de la ayuda.' },
    6: { name: 'Seis', archetype: 'El Filántropo', light: 'Generosidad, caridad, equilibrio entre dar y recibir.', shadow: 'Deudas, egoísmo o dar con condiciones.' },
    7: { name: 'Siete', archetype: 'El Cultivador', light: 'Paciencia, evaluación del progreso y recompensa por el trabajo duro.', shadow: 'Impaciencia, falta de recompensa o procrastinación.' },
    8: { name: 'Ocho', archetype: 'El Aprendiz', light: 'Dedicación, desarrollo de habilidades, atención al detalle y maestría.', shadow: 'Perfeccionismo, falta de ambición o trabajo monótono.' },
    9: { name: 'Nueve', archetype: 'La Independencia', light: 'Autosuficiencia, lujo, disfrute de los frutos del trabajo y refinamiento.', shadow: 'Dependencia financiera, superficialidad o aislamiento en el éxito.' },
    10: { name: 'Diez', archetype: 'El Legado', light: 'Riqueza generacional, estabilidad familiar, tradición y éxito a largo plazo.', shadow: 'Cargas familiares, pérdida financiera o disputas por herencias.' },
    11: { name: 'Sota', archetype: 'El Estudiante', light: 'Deseo de aprender, manifestación práctica, nuevas oportunidades de estudio.', shadow: 'Falta de progreso, procrastinación o falta de sentido práctico.' },
    12: { name: 'Caballero', archetype: 'El Trabajador', light: 'Fiabilidad, trabajo duro, paciencia y dedicación a largo plazo.', shadow: 'Terquedad, aburrimiento o adicción al trabajo.' },
    13: { name: 'Reina', archetype: 'La Proveedora', light: 'Abundancia, sentido práctico, conexión con la naturaleza y seguridad.', shadow: 'Materialismo, negligencia o asfixia protectora.' },
    14: { name: 'Rey', archetype: 'El Empresario', light: 'Éxito material, liderazgo empresarial, estabilidad y generosidad.', shadow: 'Avaricia, corrupción o estar obsesionado con el estatus.' }
  }
};

['wands', 'cups', 'swords', 'pentacles'].forEach((suit) => {
  const suitId = suit as Suit;
  const suitData = suitsData[suitId];
  const details = minorArcanaDetails[suitId];
  
  for (let val = 1; val <= 14; val++) {
    const card = details[val];
    tarotDeck.push({
      id: `${suitId}-${val}`,
      name: `${card.name} de ${suitData.name}`,
      suit: suitId,
      value: val,
      archetype: `${suitData.archetype} - ${card.archetype}`,
      descriptionLight: card.light,
      descriptionShadow: card.shadow,
      imageUrl: `https://picsum.photos/seed/tarot-${suitId}-${val}/800/1200?blur=1`
    });
  }
});

export const getSeededRandomCards = (count: number, seed: number, offset: number = 0, deckType: 'full' | 'major' = 'full'): TarotCardData[] => {
  const randomFunc = createSeededRandom(seed + offset * 1000);
  
  // Filter deck if needed
  const availableCards = deckType === 'major' ? tarotDeck.filter(c => c.suit === 'major') : tarotDeck;
  
  // Create a copy of the deck to shuffle
  const shuffled = [...availableCards];
  
  // Fisher-Yates shuffle using the seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomFunc() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};

export const getRandomCards = (count: number, deckType: 'full' | 'major' = 'full'): TarotCardData[] => {
  const availableCards = deckType === 'major' ? tarotDeck.filter(c => c.suit === 'major') : tarotDeck;
  const shuffled = [...availableCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

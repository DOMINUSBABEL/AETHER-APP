export const zodiacSigns = [
  'Aries', 'Tauro', 'Géminis', 'Cáncer', 
  'Leo', 'Virgo', 'Libra', 'Escorpio', 
  'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
];

export const elements = {
  Aries: 'Fuego', Leo: 'Fuego', Sagitario: 'Fuego',
  Tauro: 'Tierra', Virgo: 'Tierra', Capricornio: 'Tierra',
  Géminis: 'Aire', Libra: 'Aire', Acuario: 'Aire',
  Cáncer: 'Agua', Escorpio: 'Agua', Piscis: 'Agua'
} as const;

export const elementIcons = {
  Fuego: '🔥',
  Tierra: '🌱',
  Aire: '💨',
  Agua: '💧'
} as const;

// 1. CÁLCULO DE SIGNO SOLAR
export function getSunSignIndex(dateStr: string): number {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 0;
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1; // Tauro
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2; // Géminis
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3; // Cáncer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7; // Escorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8; // Sagitario
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9; // Capricornio
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10; // Acuario
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 11; // Piscis
  return 0;
}

export function getSunSign(dateStr: string): string {
  return zodiacSigns[getSunSignIndex(dateStr)];
}

// 2. CÁLCULO DE SIGNO LUNAR SIDERAL (Aproximación matemática basada en época)
export function getMoonSignIndex(dateStr: string): number {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 0;

  // Época de referencia: 1970-01-01T00:00:00Z
  const epoch = new Date('1970-01-01T00:00:00Z').getTime();
  const current = date.getTime();
  const diffDays = (current - epoch) / (1000 * 60 * 60 * 24);

  // Período Sideral Lunar promedio = 27.321661 días
  const siderealPeriod = 27.321661;
  const positionInCycle = (diffDays % siderealPeriod + siderealPeriod) % siderealPeriod;
  
  // El 1 de enero de 1970 la Luna estaba en Libra (~ Signo index 6, aproximadamente a la mitad del signo)
  // Alineamos agregando un offset de 5.8 signos
  const rawSignIndex = (positionInCycle / siderealPeriod) * 12;
  const moonIndex = Math.floor((rawSignIndex + 5.8) % 12);
  
  return moonIndex;
}

export function getMoonSign(dateStr: string): string {
  return zodiacSigns[getMoonSignIndex(dateStr)];
}

// Obtener fase lunar (período sinódico = 29.530589 días)
export function getMoonPhase(dateStr: string, lang: 'es' | 'en' = 'es'): { phase: string; icon: string } {
  if (!dateStr) return { phase: 'N/A', icon: '🌑' };
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { phase: 'N/A', icon: '🌑' };

  const epoch = new Date('1970-01-07T20:35:00Z').getTime(); // Luna Nueva de referencia
  const current = date.getTime();
  const diffDays = (current - epoch) / (1000 * 60 * 60 * 24);
  
  const synodicPeriod = 29.530589;
  const position = (diffDays % synodicPeriod + synodicPeriod) % synodicPeriod;
  const fraction = position / synodicPeriod;

  if (fraction < 0.03 || fraction > 0.97) {
    return { phase: lang === 'es' ? 'Luna Nueva' : 'New Moon', icon: '🌑' };
  } else if (fraction < 0.22) {
    return { phase: lang === 'es' ? 'Luna Creciente' : 'Waxing Crescent', icon: '🌒' };
  } else if (fraction < 0.28) {
    return { phase: lang === 'es' ? 'Cuarto Creciente' : 'First Quarter', icon: '🌓' };
  } else if (fraction < 0.47) {
    return { phase: lang === 'es' ? 'Luna Gíbosa Creciente' : 'Waxing Gibbous', icon: '🌔' };
  } else if (fraction < 0.53) {
    return { phase: lang === 'es' ? 'Luna Llena' : 'Full Moon', icon: '🌕' };
  } else if (fraction < 0.72) {
    return { phase: lang === 'es' ? 'Luna Gíbosa Menguante' : 'Waning Gibbous', icon: '🌖' };
  } else if (fraction < 0.78) {
    return { phase: lang === 'es' ? 'Cuarto Menguante' : 'Last Quarter', icon: '🌗' };
  } else {
    return { phase: lang === 'es' ? 'Luna Menguante' : 'Waning Crescent', icon: '🌘' };
  }
}

// 3. CÁLCULO DEL ASCENDENTE (Basado en la hora solar aproximada)
export function getAscendantIndex(birthDateStr: string, birthTimeStr: string): number {
  const sunSignIndex = getSunSignIndex(birthDateStr);
  if (!birthTimeStr) return (sunSignIndex + 3) % 12; // Valor por defecto si no hay hora

  const [hours, minutes] = birthTimeStr.split(':').map(Number);
  const decimalHour = hours + minutes / 60;

  // A las 6:00 AM (Amanecer promedio), el Ascendente coincide con el Signo Solar.
  // La Tierra rota 15 grados por hora, cruzando un signo zodiacal (30 grados) cada 2 horas.
  const hoursSinceDawn = (decimalHour - 6 + 24) % 24;
  const signShift = Math.floor(hoursSinceDawn / 2);

  return (sunSignIndex + signShift) % 12;
}

export function getAscendantSign(birthDateStr: string, birthTimeStr: string): string {
  return zodiacSigns[getAscendantIndex(birthDateStr, birthTimeStr)];
}

// 4. NUMEROLOGÍA
export function getLifePathNumber(dateStr: string): number {
  if (!dateStr) return 1;
  const digits = dateStr.replace(/[^0-9]/g, '');
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i], 10);
  }

  // Reducir a un dígito, respetando números maestros 11 y 22
  while (sum > 9 && sum !== 11 && sum !== 22) {
    let tempSum = 0;
    const str = sum.toString();
    for (let i = 0; i < str.length; i++) {
      tempSum += parseInt(str[i], 10);
    }
    sum = tempSum;
  }
  return sum;
}

export function getPersonalDayNumber(birthDateStr: string, targetDateStr: string): number {
  if (!birthDateStr || !targetDateStr) return 1;
  
  const birthDigits = birthDateStr.replace(/[^0-9]/g, '');
  const targetDigits = targetDateStr.replace(/[^0-9]/g, '');
  
  // Sumar día y mes de nacimiento + año, mes y día actual
  const birthMonthAndDay = birthDigits.slice(4); // MMDD
  const targetYearMonthDay = targetDigits; // YYYYMMDD
  
  const combined = birthMonthAndDay + targetYearMonthDay;
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += parseInt(combined[i], 10);
  }
  
  while (sum > 9) {
    let tempSum = 0;
    const str = sum.toString();
    for (let i = 0; i < str.length; i++) {
      tempSum += parseInt(str[i], 10);
    }
    sum = tempSum;
  }
  
  return sum;
}

export const numerologyDescriptions: Record<number, { title: string; descEs: string; descEn: string }> = {
  1: {
    title: "El Iniciador (Líder)",
    descEs: "Día para manifestar independencia y pionerismo. Las fuerzas universales apoyan nuevos comienzos autónomos.",
    descEn: "A day to manifest independence and pioneering. Universal forces support new autonomous beginnings."
  },
  2: {
    title: "El Cooperador (Armonía)",
    descEs: "Día regido por la receptividad y la paciencia. La diplomacia y los vínculos de apoyo son tus mayores fortalezas hoy.",
    descEn: "A day ruled by receptivity and patience. Diplomacy and supportive connections are your greatest strengths today."
  },
  3: {
    title: "El Expresivo (Creatividad)",
    descEs: "Frecuencia de expansión social y artística. Expresa tus verdades internas; las palabras y las ideas fluyen con gracia.",
    descEn: "Frequency of social and artistic expansion. Express your inner truths; words and ideas flow with grace."
  },
  4: {
    title: "El Constructor (Disciplina)",
    descEs: "Vibración de estabilidad y enfoque pragmático. Excelente momento para estructurar proyectos o resolver asuntos materiales.",
    descEn: "Vibration of stability and pragmatic focus. Excellent time to structure projects or solve material matters."
  },
  5: {
    title: "El Buscador (Libertad)",
    descEs: "Energía de cambio rápido y adaptabilidad. Mantente abierto a la aventura, los viajes mentales y los giros inesperados.",
    descEn: "Energy of rapid change and adaptability. Stay open to adventure, mental travel, and unexpected shifts."
  },
  6: {
    title: "El Protector (Nutrición)",
    descEs: "Foco en la armonía familiar, la sanación y el embellecimiento del entorno. Un día ideal para reconciliaciones.",
    descEn: "Focus on family harmony, healing, and beautifying your environment. An ideal day for reconciliations."
  },
  7: {
    title: "El Filósofo (Introspección)",
    descEs: "Día para el aislamiento sabio, el estudio y el autoanálisis. La meditación de hoy revelará verdades del inconsciente.",
    descEn: "A day for wise isolation, study, and self-analysis. Today's meditation will reveal truths from the unconscious."
  },
  8: {
    title: "El Soberano (Poder Material)",
    descEs: "Energía de balance kármico y autoridad sobre el mundo material. Éxito financiero y manifestación de voluntad concreta.",
    descEn: "Energy of karmic balance and authority over the material world. Financial success and manifestation of concrete will."
  },
  9: {
    title: "El Místico (Trascendencia)",
    descEs: "Día de cierres de ciclos, desapego y compasión universal. Suelta lo viejo con gratitud para abrir paso al futuro.",
    descEn: "A day of closing cycles, detachment, and universal compassion. Release the old with gratitude to make way for the future."
  },
  11: {
    title: "El Canalizador (Iluminación)",
    descEs: "Número Maestro de gran voltaje intuitivo. Actúas como un puente entre mundos. Presta atención a las epifanías.",
    descEn: "Master Number of high intuitive voltage. You act as a bridge between worlds. Pay close attention to epiphanies."
  },
  22: {
    title: "El Arquitecto Maestro (Manifestación)",
    descEs: "Número Maestro para transformar grandes ideales abstractos en realidades estructurales permanentes para el colectivo.",
    descEn: "Master Number to transform grand abstract ideals into permanent structural realities for the collective."
  }
};

// 5. SINERGIA DE TIRADAS DE TAROT (SÍNTESIS ALGORÍTMICA DETERMINISTA)
export function generateTarotSymmetryReading(
  cards: { name: string; suit: string; archetype: string; value: number }[],
  reversals: boolean[],
  positions: string[],
  question: string,
  lifePathNumber: number,
  sunSign: string,
  lang: 'es' | 'en' = 'es'
): { reading: string; elementalBalance: Record<string, number>; dominantSuit: string } {
  
  // Conteo de Elementos
  const elementalBalance = { Fuego: 0, Agua: 0, Aire: 0, Tierra: 0, Éter: 0 };
  let majorCount = 0;
  
  cards.forEach(card => {
    if (card.suit === 'major') {
      elementalBalance.Éter++;
      majorCount++;
    } else if (card.suit === 'wands') {
      elementalBalance.Fuego++;
    } else if (card.suit === 'cups') {
      elementalBalance.Agua++;
    } else if (card.suit === 'swords') {
      elementalBalance.Aire++;
    } else if (card.suit === 'pentacles') {
      elementalBalance.Tierra++;
    }
  });

  // Determinar palo dominante
  let maxVal = -1;
  let dominantSuit = 'Ninguno';
  Object.entries(elementalBalance).forEach(([key, val]) => {
    if (val > maxVal) {
      maxVal = val;
      dominantSuit = key;
    }
  });

  const dominantSuitName = lang === 'es' ? {
    Fuego: 'Bastos (Voluntad y Acción)',
    Agua: 'Copas (Emociones y Relaciones)',
    Aire: 'Espadas (Lógica y Conflictos)',
    Tierra: 'Oros (Estabilidad y Materia)',
    Éter: 'Arcanos Mayores (Destino y Arquetipos Mayores)',
    Ninguno: 'Equilibrio Elemental'
  }[dominantSuit] : {
    Fuego: 'Wands (Will and Action)',
    Agua: 'Cups (Emotions and Relations)',
    Aire: 'Swords (Logic and Conflicts)',
    Tierra: 'Pentacles (Stability and Matter)',
    Éter: 'Major Arcana (Destiny and Major Archetypes)',
    Ninguno: 'Elemental Balance'
  }[dominantSuit];

  // Construcción de la lectura determinista
  let text = '';
  
  if (lang === 'es') {
    text += `### ANÁLISIS DE SINCRONICIDAD ENERGÉTICA\n\n`;
    text += `La consulta se realiza bajo la influencia de tu **Sendero de Vida nº ${lifePathNumber}** y tu signo solar **${sunSign}**. `;
    
    if (question && question.trim().length > 0) {
      text += `Tu intención enfocada en: *"${question}"* resuena con los siguientes planos arquetípicos:\n\n`;
    } else {
      text += `Tu tirada general sin pregunta específica revela las siguientes dinámicas:\n\n`;
    }

    // Dominancia
    text += `* **Fuerza Rectora**: Tu lectura está fuertemente influenciada por el elemento **${dominantSuitName}**. `;
    if (dominantSuit === 'Éter') {
      text += `La alta concentración de Arcanos Mayores indica que estás atravesando un ciclo kármico o de individuación de gran relevancia a largo plazo, donde las decisiones del ego importan menos que la rendición al Ser.\n`;
    } else if (dominantSuit === 'Fuego') {
      text += `Hay un impulso ardiente de acción, deseo e intuición. Se requiere valentía, pero cuida no actuar con ceguera reactiva.\n`;
    } else if (dominantSuit === 'Agua') {
      text += `Las mareas afectivas y el subconsciente dominan la situación. Es tiempo de procesar duelos, escuchar la intuición y nutrir los lazos.\n`;
    } else if (dominantSuit === 'Aire') {
      text += `Tu mente está hiperactiva. Hay verdades afiladas, decisiones complejas o tensiones racionales. La espada corta ilusiones, pero también puede herir.\n`;
    } else {
      text += `El foco está en lo tangible: finanzas, salud, cuerpo, trabajo y constancia. Paciencia y bases sólidas son tu refugio.\n`;
    }

    text += `\n### DESARROLLO DE LAS POSICIONES\n\n`;
    
    // Iteración de cartas
    cards.forEach((card, index) => {
      const positionName = positions[index] || `Posición ${index + 1}`;
      const isReversed = reversals[index];
      
      text += `#### **${positionName}**: **${card.name}** ${isReversed ? '(Invertida/Sombra)' : '(Al Derecho/Luz)'}\n`;
      text += `* *Arquetipo:* ${card.archetype}\n`;
      
      if (!isReversed) {
        text += `* *Frecuencia Lumínica:* La carta actúa en su polo de integración consciente. `;
        if (card.suit === 'major') {
          text += `Trae un flujo directo de energía espiritual pura. Debes asimilar la lección del arquetipo sin resistencia.\n\n`;
        } else {
          text += `Indica que los recursos de este elemento (acción, sentimiento, intelecto o materia) fluyen de manera constructiva en tu entorno.\n\n`;
        }
      } else {
        text += `* *Frecuencia de Sombra:* La energía se encuentra bloqueada, distorsionada o reprimida. `;
        if (card.suit === 'major') {
          text += `Representa una resistencia subconsciente a asimilar este cambio de conciencia. Hay miedo a la transformación.\n\n`;
        } else {
          text += `Señala un exceso o carencia del elemento (ej. ira desmedida en bastos, represión emocional en copas, confusión mental en espadas o codicia/escasez en oros).\n\n`;
        }
      }
    });

    // Síntesis Kármica
    text += `### EL CONSEJO DEL ORÁCULO DE AETHER\n\n`;
    text += `El equilibrio de tu tirada `;
    const reverseCount = reversals.filter(r => r).length;
    if (reverseCount === 0) {
      text += `muestra un camino libre de resistencias inmediatas. Las energías están alineadas para la manifestación consciente. Confía plenamente en tu guía interna.`;
    } else if (reverseCount === cards.length) {
      text += `está completamente dominado por la Sombra. Esto indica un profundo bloqueo interno o un período de incubación psicológica intensa. No intentes empujar los eventos externos; el trabajo es puramente interno.`;
    } else {
      text += `revela tensiones puntuales (con ${reverseCount} cartas invertidas). Hay un diálogo dinámico entre lo que expresas en luz y lo que ocultas en la sombra. Tu Sendero de Vida nº ${lifePathNumber} te invita a integrar estas tensiones actuando con responsabilidad radical. El obstáculo es el camino.`;
    }
  } else {
    // ENGLISH
    text += `### ENERGY SYNCHRONICITY ANALYSIS\n\n`;
    text += `This reading is calibrated under the influence of your **Life Path Number ${lifePathNumber}** and your sun sign **${sunSign}**. `;
    
    if (question && question.trim().length > 0) {
      text += `Your intention focused on: *"${question}"* resonates with the following archetypal spheres:\n\n`;
    } else {
      text += `Your general reading reveals the following dynamics:\n\n`;
    }

    text += `* **Ruling Force**: Your reading is heavily influenced by the element of **${dominantSuitName}**. `;
    if (dominantSuit === 'Éter') {
      text += `The high concentration of Major Arcana indicates that you are crossing a major karmic or individuation cycle, where ego decisions matter less than surrender to the Self.\n`;
    } else if (dominantSuit === 'Fuego') {
      text += `There is a burning impulse of action, desire, and intuition. Courage is required, but beware of acting with reactive blindness.\n`;
    } else if (dominantSuit === 'Agua') {
      text += `Affective tides and the subconscious dominate. It is time to process grief, listen to intuition, and nurture connections.\n`;
    } else if (dominantSuit === 'Aire') {
      text += `Your mind is hyperactive. There are sharp truths, complex decisions, or rational tensions. The sword cuts through illusion, but it can also wound.\n`;
    } else {
      text += `The focus is on the tangible: finances, health, body, work, and constancy. Patience and solid foundations are your refuge.\n`;
    }

    text += `\n### POSITION ANALYSIS\n\n`;
    
    cards.forEach((card, index) => {
      const positionName = positions[index] || `Position ${index + 1}`;
      const isReversed = reversals[index];
      
      text += `#### **${positionName}**: **${card.name}** ${isReversed ? '(Reversed/Shadow)' : '(Upright/Light)'}\n`;
      text += `* *Archetype:* ${card.archetype}\n`;
      
      if (!isReversed) {
        text += `* *Light Frequency:* The card acts in its conscious integration pole. `;
        if (card.suit === 'major') {
          text += `Brings a direct flow of pure spiritual energy. You must assimilate the lesson of the archetype without resistance.\n\n`;
        } else {
          text += `Indicates that the resources of this element (action, feeling, intellect, or matter) flow constructively in your environment.\n\n`;
        }
      } else {
        text += `* *Shadow Frequency:* The energy is blocked, distorted, or repressed. `;
        if (card.suit === 'major') {
          text += `Represents a subconscious resistance to assimilating this change of consciousness. There is fear of transformation.\n\n`;
        } else {
          text += `Points to excess or lack of the element (e.g., unrestrained anger in wands, emotional repression in cups, mental confusion in swords, or greed/scarcity in pentacles).\n\n`;
        }
      }
    });

    text += `### THE COUNSEL OF THE AETHER ORACLE\n\n`;
    text += `The balance of your spread `;
    const reverseCount = reversals.filter(r => r).length;
    if (reverseCount === 0) {
      text += `shows a path free of immediate resistance. Energies are aligned for conscious manifestation. Trust your inner guidance fully.`;
    } else if (reverseCount === cards.length) {
      text += `is completely dominated by Shadow. This indicates deep internal blockage or an intense psychological incubation phase. Do not force external events; the work is purely internal.`;
    } else {
      text += `reveals specific points of tension (with ${reverseCount} reversed cards). There is a dynamic dialogue between what you express in light and what you hide in shadow. Your Life Path Number ${lifePathNumber} invites you to integrate these tensions by acting with radical responsibility. The obstacle is the path.`;
    }
  }

  return { reading: text, elementalBalance, dominantSuit };
}

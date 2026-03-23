const fs = require('fs');

const suitsData = {
  wands: { name: 'Bastos', element: 'Fuego', archetype: 'Intuición / Voluntad' },
  cups: { name: 'Copas', element: 'Agua', archetype: 'Sentimiento / Relación' },
  swords: { name: 'Espadas', element: 'Aire', archetype: 'Pensamiento / Conflicto' },
  pentacles: { name: 'Oros', element: 'Tierra', archetype: 'Sensación / Materia' }
};

const minorArcanaDetails = {
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

let output = '';

['wands', 'cups', 'swords', 'pentacles'].forEach((suit) => {
  const suitData = suitsData[suit];
  const details = minorArcanaDetails[suit];
  
  for (let val = 1; val <= 14; val++) {
    const card = details[val];
    output += `  {
    id: '${suit}-${val}',
    name: '${card.name} de ${suitData.name}',
    suit: '${suit}',
    value: ${val},
    archetype: '${suitData.archetype} - ${card.archetype}',
    descriptionLight: '${card.light.replace(/'/g, "\\'")}',
    descriptionShadow: '${card.shadow.replace(/'/g, "\\'")}',
    imageUrl: 'https://picsum.photos/seed/tarot-${suit}-${val}/800/1200?blur=1'
  },\n`;
  }
});

fs.writeFileSync('minor_arcana.txt', output);

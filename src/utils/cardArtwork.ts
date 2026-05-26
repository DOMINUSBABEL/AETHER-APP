// Motor de Renderizado de Arte Sagrado y Geometría Sagrada Minimalista para AETHER

export function drawTarotCardFront(
  canvas: HTMLCanvasElement,
  cardId: string,
  cardName: string,
  suit: string,
  isReversed: boolean
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Fondo - Gradiente Cósmico
  const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.8);
  if (suit === 'major') {
    grad.addColorStop(0, '#151226'); // Violeta profundo
    grad.addColorStop(1, '#07060d');
  } else if (suit === 'wands') {
    grad.addColorStop(0, '#261212'); // Fuego / Carbón rojizo
    grad.addColorStop(1, '#0d0606');
  } else if (suit === 'cups') {
    grad.addColorStop(0, '#122026'); // Agua / Azul noche
    grad.addColorStop(1, '#060a0d');
  } else if (suit === 'swords') {
    grad.addColorStop(0, '#171b1d'); // Aire / Gris tormenta
    grad.addColorStop(1, '#0a0c0d');
  } else {
    grad.addColorStop(0, '#1b2015'); // Tierra / Verde musgo oscuro
    grad.addColorStop(1, '#0a0d08');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Si está invertida, rotamos el dibujo central
  ctx.save();
  if (isReversed) {
    ctx.translate(w / 2, h / 2);
    ctx.rotate(Math.PI);
    ctx.translate(-w / 2, -h / 2);
  }

  // 2. Dibujar Constelaciones / Estrellas en el Fondo
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  // Líneas geométricas aleatorias con semilla fija basada en cardId
  let seed = 0;
  for (let i = 0; i < cardId.length; i++) seed += cardId.charCodeAt(i);
  
  const pseudoRandom = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Nodos estelares
  for (let i = 0; i < 6; i++) {
    const x1 = pseudoRandom() * w;
    const y1 = pseudoRandom() * h;
    const x2 = pseudoRandom() * w;
    const y2 = pseudoRandom() * h;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();

  // Puntos estelares brillantes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 20; i++) {
    const x = pseudoRandom() * w;
    const y = pseudoRandom() * h;
    const r = pseudoRandom() * 1.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Dibujar Geometría Sagrada Central
  ctx.strokeStyle = '#d4af37'; // Oro
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#d4af37';
  ctx.shadowBlur = 10;

  const cx = w / 2;
  const cy = h / 2.2; // Centrado ligeramente hacia arriba

  // Aro exterior celestial
  ctx.beginPath();
  ctx.arc(cx, cy, 100, 0, Math.PI * 2);
  ctx.stroke();
  
  // Aro interior de guías
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.beginPath();
  ctx.arc(cx, cy, 85, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;

  // Dibujar el Glifo Sagrado según el Arcano o Palo
  if (suit === 'major') {
    drawMajorArcanaGlyph(ctx, cardId, cx, cy);
  } else {
    drawMinorArcanaGlyph(ctx, suit, cx, cy);
  }

  ctx.restore(); // Restaurar rotación

  // 4. Borde del Marco Celestial (Oro)
  ctx.shadowBlur = 5;
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(15, 15, w - 30, h - 30);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(20, 20, w - 40, h - 40);
  ctx.stroke();

  // Esquinas ornamentadas
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  const drawCorner = (x: number, y: number, dx: number, dy: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 15);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 15, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + dx * 6, y + dy * 6, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#d4af37';
    ctx.fill();
  };
  drawCorner(15, 15, 1, 1);
  drawCorner(w - 15, 15, -1, 1);
  drawCorner(15, h - 15, 1, -1);
  drawCorner(w - 15, h - 15, -1, -1);

  // 5. Nombre de la Carta y Tipografía
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText(cardName, w / 2, h - 70);

  ctx.fillStyle = '#d4af37';
  ctx.font = '10px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '5px';
  const typeText = suit === 'major' ? 'ARCANO MAYOR' : `ARCANO DE ${suit.toUpperCase()}`;
  ctx.fillText(typeText, w / 2, h - 45);
}

// Dibujo del Reverso de la Carta
export function drawTarotCardBack(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // Fondo Oscuro Absoluto
  ctx.fillStyle = '#08080c';
  ctx.fillRect(0, 0, w, h);

  // Líneas de Rejilla de Fondo (Malla Sagrada)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= w; i += 25) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
  }
  for (let j = 0; j <= h; j += 25) {
    ctx.moveTo(0, j);
    ctx.lineTo(w, j);
  }
  ctx.stroke();

  // Círculo Central y Mandalas de Geometría Sagrada
  const cx = w / 2;
  const cy = h / 2;

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = '#d4af37';
  ctx.shadowBlur = 8;

  // Dibujar Flor de la Vida Simplificada
  const drawCircle = (x: number, y: number, r: number) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  };

  drawCircle(cx, cy, 110);
  drawCircle(cx, cy, 95);
  drawCircle(cx, cy, 60);

  // Pétalos geométricos concéntricos
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const px = cx + Math.cos(angle) * 60;
    const py = cy + Math.sin(angle) * 60;
    drawCircle(px, py, 60);
  }

  // Estrellas de ocho puntas
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle1 = (i * Math.PI) / 4;
    const angle2 = ((i + 2) * Math.PI) / 4;
    ctx.moveTo(cx + Math.cos(angle1) * 35, cy + Math.sin(angle1) * 35);
    ctx.lineTo(cx + Math.cos(angle2) * 35, cy + Math.sin(angle2) * 35);
  }
  ctx.stroke();

  // Nombre de la App en el Centro
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '8px';
  ctx.fillText('AETHER', cx + 4, cy); // +4 para compensar el letterSpacing

  // Doble Borde del Reverso
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(15, 15, w - 30, h - 30);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(22, 22, w - 44, h - 44);
  ctx.stroke();
}

// Dibujar Glifos para Arcanos Mayores
function drawMajorArcanaGlyph(ctx: CanvasRenderingContext2D, cardId: string, cx: number, cy: number) {
  const index = parseInt(cardId.split('-')[1], 10);

  switch (index) {
    case 0: // El Loco (Círculo abierto con espiral ascendente)
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 1.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 45, cy);
      ctx.quadraticCurveTo(cx, cy - 20, cx, cy - 45);
      ctx.stroke();
      break;

    case 1: // El Mago (Infinito y triángulo)
      // Infinito
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy);
      ctx.bezierCurveTo(cx - 30, cy - 20, cx - 10, cy - 20, cx, cy);
      ctx.bezierCurveTo(cx + 10, cy + 20, cx + 30, cy + 20, cx + 30, cy);
      ctx.bezierCurveTo(cx + 30, cy - 20, cx + 10, cy - 20, cx, cy);
      ctx.bezierCurveTo(cx - 10, cy + 20, cx - 30, cy + 20, cx - 30, cy);
      ctx.stroke();
      // Triángulo interior
      ctx.beginPath();
      ctx.moveTo(cx, cy - 50);
      ctx.lineTo(cx - 40, cy + 25);
      ctx.lineTo(cx + 40, cy + 25);
      ctx.closePath();
      ctx.stroke();
      break;

    case 2: // La Sacerdotisa (Luna creciente y cruz)
      ctx.beginPath();
      ctx.arc(cx - 15, cy, 35, -Math.PI / 2, Math.PI / 2);
      ctx.quadraticCurveTo(cx - 5, cy, cx - 15, cy - 35);
      ctx.stroke();
      // Cruz solar a la derecha
      ctx.beginPath();
      ctx.moveTo(cx + 15, cy - 25);
      ctx.lineTo(cx + 15, cy + 25);
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + 30, cy);
      ctx.stroke();
      break;

    case 3: // La Emperatriz (Corona e Y)
      ctx.beginPath();
      ctx.moveTo(cx - 35, cy - 15);
      ctx.lineTo(cx - 20, cy + 25);
      ctx.lineTo(cx + 20, cy + 25);
      ctx.lineTo(cx + 35, cy - 15);
      ctx.lineTo(cx + 15, cy + 5);
      ctx.lineTo(cx, cy - 30);
      ctx.lineTo(cx - 15, cy + 5);
      ctx.closePath();
      ctx.stroke();
      break;

    case 4: // El Emperador (Cubo y scepter)
      // Cuadrado/Rigidez
      ctx.beginPath();
      ctx.rect(cx - 30, cy - 30, 60, 60);
      ctx.stroke();
      // Cruz interior
      ctx.beginPath();
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx, cy + 30);
      ctx.moveTo(cx - 30, cy);
      ctx.lineTo(cx + 30, cy);
      ctx.stroke();
      break;

    case 5: // El Hierofante (Triple Cruz de guías)
      ctx.beginPath();
      ctx.moveTo(cx, cy - 45);
      ctx.lineTo(cx, cy + 45);
      // Tres travesaños
      ctx.moveTo(cx - 35, cy - 25);
      ctx.lineTo(cx + 35, cy - 25);
      ctx.moveTo(cx - 25, cy);
      ctx.lineTo(cx + 25, cy);
      ctx.moveTo(cx - 15, cy + 25);
      ctx.lineTo(cx + 15, cy + 25);
      ctx.stroke();
      break;

    case 6: // Los Enamorados (Dos círculos entrelazados)
      ctx.beginPath();
      ctx.arc(cx - 20, cy, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 20, cy, 30, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 7: // El Carro (Escudo con alas)
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 20);
      ctx.lineTo(cx + 30, cy - 20);
      ctx.quadraticCurveTo(cx + 30, cy + 20, cx, cy + 35);
      ctx.quadraticCurveTo(cx - 30, cy + 20, cx - 30, cy - 20);
      ctx.stroke();
      // Alas laterales
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 10);
      ctx.lineTo(cx - 55, cy - 25);
      ctx.lineTo(cx - 45, cy + 5);
      ctx.closePath();
      ctx.moveTo(cx + 30, cy - 10);
      ctx.lineTo(cx + 55, cy - 25);
      ctx.lineTo(cx + 45, cy + 5);
      ctx.closePath();
      ctx.stroke();
      break;

    case 8: // La Fuerza (Infinito vertical y fauces)
      // Infinito vertical
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 20, 0, Math.PI * 2);
      ctx.arc(cx, cy + 20, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 9: // El Ermitaño (Estrella hexagonal/Linterna)
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        const angle = (i * Math.PI) / 3;
        ctx.moveTo(cx + Math.cos(angle) * 45, cy + Math.sin(angle) * 45);
        ctx.lineTo(cx + Math.cos(angle + (2 * Math.PI) / 3) * 45, cy + Math.sin(angle + (2 * Math.PI) / 3) * 45);
        ctx.lineTo(cx + Math.cos(angle + (4 * Math.PI) / 3) * 45, cy + Math.sin(angle + (4 * Math.PI) / 3) * 45);
        ctx.closePath();
        ctx.stroke();
      }
      break;

    case 10: // La Rueda (Rueda de 8 radios)
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 40);
      }
      ctx.stroke();
      break;

    case 11: // La Justicia (Balanza)
      ctx.beginPath();
      // Barra horizontal
      ctx.moveTo(cx - 45, cy - 20);
      ctx.lineTo(cx + 45, cy - 20);
      // Soporte vertical
      ctx.moveTo(cx, cy - 35);
      ctx.lineTo(cx, cy + 45);
      // Platillos
      ctx.moveTo(cx - 35, cy - 20);
      ctx.lineTo(cx - 45, cy + 15);
      ctx.lineTo(cx - 25, cy + 15);
      ctx.closePath();
      ctx.moveTo(cx + 35, cy - 20);
      ctx.lineTo(cx + 45, cy + 15);
      ctx.lineTo(cx + 25, cy + 15);
      ctx.closePath();
      ctx.stroke();
      break;

    case 12: // El Colgado (T y triángulo invertido)
      ctx.beginPath();
      // La horca
      ctx.moveTo(cx - 25, cy - 40);
      ctx.lineTo(cx + 25, cy - 40);
      ctx.moveTo(cx, cy - 40);
      ctx.lineTo(cx, cy + 30);
      // El colgado simplificado como un triángulo invertido
      ctx.moveTo(cx - 20, cy);
      ctx.lineTo(cx + 20, cy);
      ctx.lineTo(cx, cy + 25);
      ctx.closePath();
      ctx.stroke();
      break;

    case 13: // La Muerte (Reloj de arena)
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy - 35);
      ctx.lineTo(cx + 25, cy - 35);
      ctx.lineTo(cx - 25, cy + 35);
      ctx.lineTo(cx + 25, cy + 35);
      ctx.closePath();
      ctx.stroke();
      break;

    case 14: // La Templanza (Dos vasijas en flujo)
      ctx.beginPath();
      // Vaso arriba izquierda
      ctx.arc(cx - 25, cy - 25, 12, 0, Math.PI * 2);
      // Vaso abajo derecha
      ctx.arc(cx + 25, cy + 25, 12, 0, Math.PI * 2);
      ctx.stroke();
      // Flujo dinámico S
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy - 15);
      ctx.bezierCurveTo(cx, cy - 15, cx, cy + 15, cx + 20, cy + 15);
      ctx.stroke();
      break;

    case 15: // El Diablo (Invertido pentagrama)
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        // Rotado 180 para apuntar hacia abajo
        const angle1 = (i * 2 * Math.PI) / 5 + Math.PI / 10 + Math.PI;
        const angle2 = (((i + 2) * 2 * Math.PI) / 5) + Math.PI / 10 + Math.PI;
        ctx.moveTo(cx + Math.cos(angle1) * 35, cy + Math.sin(angle1) * 35);
        ctx.lineTo(cx + Math.cos(angle2) * 35, cy + Math.sin(angle2) * 35);
      }
      ctx.stroke();
      break;

    case 16: // La Torre (Rayo y torre colapsando)
      ctx.beginPath();
      // Estructura de la torre
      ctx.moveTo(cx - 20, cy + 40);
      ctx.lineTo(cx - 12, cy - 25);
      ctx.lineTo(cx + 12, cy - 25);
      ctx.lineTo(cx + 20, cy + 40);
      ctx.stroke();
      // El rayo destructor
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 45);
      ctx.lineTo(cx - 10, cy - 10);
      ctx.lineTo(cx + 8, cy - 15);
      ctx.lineTo(cx - 2, cy + 15);
      ctx.stroke();
      break;

    case 17: // La Estrella (Gran estrella de 8 puntas)
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const extR = i % 2 === 0 ? 50 : 22;
        ctx.lineTo(cx + Math.cos(angle) * extR, cy + Math.sin(angle) * extR);
      }
      ctx.closePath();
      ctx.stroke();
      break;

    case 18: // La Luna (Creciente solar con torres)
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx - 12, cy, 35, -Math.PI/2, Math.PI/2);
      ctx.stroke();
      break;

    case 19: // El Sol (Círculo radiante)
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.stroke();
      // 12 rayos
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 32, cy + Math.sin(angle) * 32);
        ctx.lineTo(cx + Math.cos(angle) * 52, cy + Math.sin(angle) * 52);
        ctx.stroke();
      }
      break;

    case 20: // El Juicio (Trompeta con ondas)
      ctx.beginPath();
      ctx.moveTo(cx - 35, cy);
      ctx.lineTo(cx + 20, cy - 10);
      ctx.lineTo(cx + 20, cy + 10);
      ctx.closePath();
      ctx.stroke();
      // Ondas sonoras
      ctx.beginPath();
      ctx.arc(cx + 35, cy, 10, -Math.PI / 3, Math.PI / 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 42, cy, 20, -Math.PI / 3, Math.PI / 3);
      ctx.stroke();
      break;

    case 21: // El Mundo (Óvalo de corona y estrella)
      ctx.beginPath();
      ctx.ellipse(cx, cy, 35, 52, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Cuatro marcas en esquinas externas del óvalo
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      break;
      
    default:
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.stroke();
      break;
  }
}

// Dibujar Glifos para Arcanos Menores por Palo (Elementos)
function drawMinorArcanaGlyph(ctx: CanvasRenderingContext2D, suit: string, cx: number, cy: number) {
  if (suit === 'wands') { // BASTOS / FUEGO: Triángulos de fuego y varas
    ctx.beginPath();
    // Dos bastos cruzados
    ctx.moveTo(cx - 45, cy + 45);
    ctx.lineTo(cx + 45, cy - 45);
    ctx.moveTo(cx + 45, cy + 45);
    ctx.lineTo(cx - 45, cy - 45);
    ctx.stroke();
    // Triángulo ascendente en el centro
    ctx.beginPath();
    ctx.moveTo(cx, cy - 35);
    ctx.lineTo(cx - 25, cy + 15);
    ctx.lineTo(cx + 25, cy + 15);
    ctx.closePath();
    ctx.stroke();
  } else if (suit === 'cups') { // COPAS / AGUA: Copa y ondas de agua
    ctx.beginPath();
    // La Copa
    ctx.moveTo(cx - 25, cy - 30);
    ctx.lineTo(cx + 25, cy - 30);
    ctx.quadraticCurveTo(cx + 25, cy + 15, cx, cy + 20);
    ctx.quadraticCurveTo(cx - 25, cy + 15, cx - 25, cy - 30);
    ctx.stroke();
    // Soporte y base
    ctx.beginPath();
    ctx.moveTo(cx, cy + 20);
    ctx.lineTo(cx, cy + 40);
    ctx.moveTo(cx - 20, cy + 40);
    ctx.lineTo(cx + 20, cy + 40);
    ctx.stroke();
    // Ondas superiores
    ctx.beginPath();
    ctx.arc(cx, cy - 15, 10, 0, Math.PI);
    ctx.stroke();
  } else if (suit === 'swords') { // ESPADAS / AIRE: Espada central vertical
    ctx.beginPath();
    // Hoja de la espada
    ctx.moveTo(cx, cy - 50);
    ctx.lineTo(cx - 8, cy + 15);
    ctx.lineTo(cx + 8, cy + 15);
    ctx.closePath();
    ctx.stroke();
    // Guardamano y empuñadura
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy + 15);
    ctx.lineTo(cx + 22, cy + 15);
    ctx.moveTo(cx, cy + 15);
    ctx.lineTo(cx, cy + 42);
    // Pomo
    ctx.arc(cx, cy + 42, 4, 0, Math.PI * 2);
    ctx.stroke();
  } else if (suit === 'pentacles') { // OROS / TIERRA: Pentagrama
    ctx.beginPath();
    // Aro exterior del pentáculo
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.stroke();
    // Pentagrama de 5 puntas
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle1 = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const angle2 = (((i + 2) * 2 * Math.PI) / 5) - Math.PI / 2;
      ctx.moveTo(cx + Math.cos(angle1) * 38, cy + Math.sin(angle1) * 38);
      ctx.lineTo(cx + Math.cos(angle2) * 38, cy + Math.sin(angle2) * 38);
    }
    ctx.stroke();
  }
}

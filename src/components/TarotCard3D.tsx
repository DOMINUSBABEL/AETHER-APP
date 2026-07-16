import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { drawTarotCardFront, drawTarotCardBack } from '../utils/cardArtwork';

interface TarotCard3DProps {
  cardId: string;
  cardName: string;
  suit: string;
  isReversed: boolean;
  position: string;
  title: string;
  subtitle: string;
  description: string;
  colorClass: string;
  borderColorClass: string;
}

export default function TarotCard3D({
  cardId,
  cardName,
  suit,
  isReversed,
  position,
  title,
  subtitle,
  description,
  colorClass,
  borderColorClass
}: TarotCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensiones del Canvas WebGL
    const width = container.clientWidth || 320;
    const height = (width * 3) / 2; // Mantener relación 2:3

    // 1. Escena, Cámara y Renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true // Fondo transparente para ver los halos CSS
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Crear las texturas dinámicas mediante Canvas
    const wRes = 512;
    const hRes = 768;

    // Canvas frontal
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = wRes;
    frontCanvas.height = hRes;
    drawTarotCardFront(frontCanvas, cardId, cardName, suit, isReversed);
    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.colorSpace = THREE.SRGBColorSpace;

    // Canvas trasero
    const backCanvas = document.createElement('canvas');
    backCanvas.width = wRes;
    backCanvas.height = hRes;
    drawTarotCardBack(backCanvas);
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;
    // Voltear el eje X en el reverso para corregir efecto espejo en plano -Z
    backTexture.wrapS = THREE.RepeatWrapping;
    backTexture.repeat.x = -1;

    // 3. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5d4, 1.5); // Luz cálida dorada
    dirLight1.position.set(2, 3, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4afff, 1.0); // Luz fría purpúrea
    dirLight2.position.set(-2, -3, 2);
    scene.add(dirLight2);

    // 4. Geometría y Materiales de la Carta 3D (Caja Delgada)
    const cardWidth = 2.0;
    const cardHeight = 3.0;
    const cardThickness = 0.05;

    const geometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardThickness);

    // Material dorado para bordes
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Oro
      metalness: 0.85,
      roughness: 0.15,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.3,
      metalness: 0.1,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.3,
      metalness: 0.15,
    });

    // Materiales en orden: +X, -X, +Y, -Y, +Z (Frente), -Z (Dorso)
    const materials = [
      borderMaterial, // +X
      borderMaterial, // -X
      borderMaterial, // +Y
      borderMaterial, // -Y
      frontMaterial,  // +Z (Frente)
      backMaterial    // -Z (Dorso)
    ];

    const cardMesh = new THREE.Mesh(geometry, materials);
    
    // Si no está volteada al inicio, mostramos el dorso (rotamos 180 grados en Y)
    if (!isFlipped) {
      cardMesh.rotation.y = Math.PI;
    }
    scene.add(cardMesh);

    // 5. Sistema de Partículas (Aura Celestial)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#d4af37');
    const purpleColor = new THREE.Color('#784bad');

    for (let i = 0; i < particleCount; i++) {
      // Distribución orbital elíptica detrás de la carta (Z < 0)
      const angle = Math.random() * Math.PI * 2;
      const radiusX = 1.0 + Math.random() * 0.8;
      const radiusY = 1.5 + Math.random() * 1.0;
      
      positions[i * 3] = Math.cos(angle) * radiusX;
      positions[i * 3 + 1] = Math.sin(angle) * radiusY;
      positions[i * 3 + 2] = -0.2 - Math.random() * 0.5; // Detrás de la carta

      // Color intermedio aleatorio entre dorado y morado
      const mixedColor = goldColor.clone().lerp(purpleColor, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crear textura circular suave para las partículas
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Manejo de Interacción y Eventos (Giro / Mouse Move)
    let targetRotationX = 0;
    let targetRotationY = isFlipped ? 0 : Math.PI;
    let currentRotationX = cardMesh.rotation.x;
    let currentRotationY = cardMesh.rotation.y;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 a 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1; // -1 a 1

      // Efecto de inclinación ligera (Parallax 3D)
      targetRotationX = y * 0.25;
      
      // Si está volteada o de espaldas, sumamos el offset al giro del mouse
      const baseFlipAngle = isFlipped ? 0 : Math.PI;
      targetRotationY = baseFlipAngle + x * 0.25;
    };

    const handleMouseLeave = () => {
      targetRotationX = 0;
      targetRotationY = isFlipped ? 0 : Math.PI;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 7. Loop de Animación
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Lerp suave para la rotación de la carta (efecto inercia física)
      currentRotationX += (targetRotationX - currentRotationX) * 0.1;
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;

      cardMesh.rotation.x = currentRotationX;
      cardMesh.rotation.y = currentRotationY;

      // Animar Partículas (Órbitas lentas y pulsación)
      const posArr = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Rotación lenta alrededor del eje Z
        const px = posArr[i * 3];
        const py = posArr[i * 3 + 1];
        
        const speed = 0.05 + (i % 5) * 0.02;
        const cosVal = Math.cos(speed * delta);
        const sinVal = Math.sin(speed * delta);

        posArr[i * 3] = px * cosVal - py * sinVal;
        posArr[i * 3 + 1] = px * sinVal + py * cosVal;

        // Pulsación leve en el eje Z
        posArr[i * 3 + 2] = -0.2 - Math.sin(time * 1.5 + i) * 0.15;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Rotación suave global de las partículas en Z
      particles.rotation.z += 0.03 * delta;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Limpieza del WebGL en el Desmontaje (Evita fugas de memoria en Android)
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      borderMaterial.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
      
      renderer.dispose();
    };
  }, [cardId, cardName, suit, isReversed, isFlipped]);

  const toggleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[280px] mx-auto select-none flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-expanded={isFlipped}
      aria-label={`${cardName}${isFlipped ? (isReversed ? ' (Invertida)' : ' (Al derecho)') : ' (Oculta)'}`}
    >
      <div className={`absolute -top-3 left-0 font-label text-[9px] tracking-[0.2em] uppercase ${colorClass} opacity-60 z-10 pointer-events-none`}>
        {position} • {title}
      </div>

      {/* Canvas de Three.js */}
      <div className="w-full relative shrink-0 aspect-[2/3] celestial-glow rounded-xl overflow-hidden bg-transparent">
        <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
        
        {/* Glow de fondo animado en CSS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Explicación en texto minimalista debajo de la carta interactiva */}
      <div className={`w-full text-center mt-4 transition-all duration-700 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-1 group-hover:opacity-60'}`}>
        <span className="font-label text-[10px] tracking-widest text-primary uppercase block mb-1">
          {isFlipped ? cardName : 'Haz clic para revelar'}
        </span>
        <span className="font-headline text-[13px] text-on-surface-variant italic font-light line-clamp-3 px-2 leading-relaxed">
          {isFlipped ? (isReversed ? 'Invertida: ' + description : description) : 'Reverencia el Oráculo'}
        </span>
      </div>
    </div>
  );
}

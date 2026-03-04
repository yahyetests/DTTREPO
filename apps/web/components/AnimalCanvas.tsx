// ── AnimalCanvas ──
// Full-section overlay with physics-based floating animals.
// Usage: <AnimalCanvas animals={['bear','bunny','star']} count={10} />

import React, { useRef } from 'react';
import { useAnimalPhysics, type AnimalPhysicsOptions } from '@/lib/animalPhysics';
import { type AnimalType } from '@/lib/animalSvgs';

interface AnimalCanvasProps {
 animals: AnimalType[];
 count?: number;
 className?: string;
 mouseRepulsion?: boolean;
 parallaxFactor?: number;
 minOpacity?: number;
 maxOpacity?: number;
}

export function AnimalCanvas({
 animals,
 count = 10,
 className = '',
 mouseRepulsion = true,
 parallaxFactor = 0.3,
 minOpacity = 0.15,
 maxOpacity = 0.4,
}: AnimalCanvasProps) {
 const canvasRef = useRef<HTMLCanvasElement>(null);

 useAnimalPhysics(canvasRef, {
 animals,
 count,
 mouseRepulsion,
 parallaxFactor,
 minOpacity,
 maxOpacity,
 });

 return (
 <canvas
 ref={canvasRef}
 className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
 style={{ willChange: 'transform' }}
 aria-hidden="true"
 />
 );
}

export default AnimalCanvas;

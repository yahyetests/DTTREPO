// ── AnimalBob ──
// A single cute animal with a gentle bobbing animation.
// Perfect for card corners: <AnimalBob animal="bunny" className="absolute top-2 right-2" />

import React from 'react';
import { type AnimalType, getAnimalDataUri } from '@/lib/animalSvgs';

interface AnimalBobProps {
 animal: AnimalType;
 size?: number;
 className?: string;
 style?: React.CSSProperties;
}

export function AnimalBob({ animal, size = 40, className = '', style }: AnimalBobProps) {
 return (
 <img
 src={getAnimalDataUri(animal)}
 alt=""
 aria-hidden="true"
 className={`pointer-events-none select-none animate-animal-bob ${className}`}
 style={{
 width: size,
 height: size,
 willChange: 'transform',
 ...style,
 }}
 />
 );
}

export default AnimalBob;

// ── AnimalMarch ──
// Animals walking/marching across the bottom edge (for footer).
// Usage: <AnimalMarch animals={['bear','bunny','fox']} />

import React from 'react';
import { type AnimalType, getAnimalDataUri } from '@/lib/animalSvgs';

interface AnimalMarchProps {
 animals?: AnimalType[];
 className?: string;
}

export function AnimalMarch({
 animals = ['bear', 'bunny', 'fox'],
 className = '',
}: AnimalMarchProps) {
 return (
 <div
 className={`relative w-full h-12 overflow-hidden pointer-events-none ${className}`}
 aria-hidden="true"
 >
 {animals.map((animal, i) => (
 <img
 key={`${animal}-${i}`}
 src={getAnimalDataUri(animal)}
 alt=""
 className="absolute bottom-0 animate-animal-march"
 style={{
 width: 36,
 height: 36,
 animationDelay: `${i * 3.5}s`,
 animationDuration: `${14 + i * 2}s`,
 willChange: 'transform',
 opacity: 0.5,
 }}
 />
 ))}
 </div>
 );
}

export default AnimalMarch;

// ── Cute Animal SVG Library ──
// All inline SVGs for the child-friendly theme.
// Each returns a data URI suitable for CSS background-image or React rendering.

export type AnimalType = 'bear' | 'bunny' | 'cat' | 'owl' | 'fox' | 'panda' | 'frog' | 'star';

const ANIMAL_SVGS: Record<AnimalType, string> = {
 bear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
 <circle cx="20" cy="18" r="12" fill="#D4A574"/>
 <circle cx="60" cy="18" r="12" fill="#D4A574"/>
 <circle cx="40" cy="42" r="28" fill="#D4A574"/>
 <circle cx="20" cy="18" r="7" fill="#C4956A"/>
 <circle cx="60" cy="18" r="7" fill="#C4956A"/>
 <circle cx="40" cy="42" r="22" fill="#E8C9A0"/>
 <circle cx="32" cy="36" r="4" fill="#4A3F6B"/>
 <circle cx="48" cy="36" r="4" fill="#4A3F6B"/>
 <circle cx="33" cy="35" r="1.5" fill="white"/>
 <circle cx="49" cy="35" r="1.5" fill="white"/>
 <ellipse cx="40" cy="44" rx="5" ry="3.5" fill="#4A3F6B"/>
 <path d="M36 50 Q40 55 44 50" stroke="#4A3F6B" stroke-width="1.5" fill="none" stroke-linecap="round"/>
 <circle cx="26" cy="44" r="5" fill="#FFB5C5" opacity="0.5"/>
 <circle cx="54" cy="44" r="5" fill="#FFB5C5" opacity="0.5"/>
 </svg>`,

 bunny: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 90" fill="none">
 <ellipse cx="30" cy="20" rx="8" ry="22" fill="#F0E0E8"/>
 <ellipse cx="50" cy="20" rx="8" ry="22" fill="#F0E0E8"/>
 <ellipse cx="30" cy="22" rx="5" ry="18" fill="#FFB5C5"/>
 <ellipse cx="50" cy="22" rx="5" ry="18" fill="#FFB5C5"/>
 <circle cx="40" cy="55" r="24" fill="#F0E0E8"/>
 <circle cx="40" cy="55" r="18" fill="#FFF5F8"/>
 <circle cx="33" cy="50" r="3.5" fill="#4A3F6B"/>
 <circle cx="47" cy="50" r="3.5" fill="#4A3F6B"/>
 <circle cx="34" cy="49" r="1.2" fill="white"/>
 <circle cx="48" cy="49" r="1.2" fill="white"/>
 <ellipse cx="40" cy="57" rx="3" ry="2.5" fill="#FFB5C5"/>
 <path d="M37 61 Q40 64 43 61" stroke="#4A3F6B" stroke-width="1.2" fill="none" stroke-linecap="round"/>
 <circle cx="28" cy="57" r="4" fill="#FFB5C5" opacity="0.4"/>
 <circle cx="52" cy="57" r="4" fill="#FFB5C5" opacity="0.4"/>
 </svg>`,

 cat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
 <polygon points="18,30 25,5 35,28" fill="#B8B0D0"/>
 <polygon points="62,30 55,5 45,28" fill="#B8B0D0"/>
 <polygon points="21,28 25,10 32,27" fill="#FFB5C5"/>
 <polygon points="59,28 55,10 48,27" fill="#FFB5C5"/>
 <circle cx="40" cy="45" r="25" fill="#B8B0D0"/>
 <circle cx="40" cy="48" r="18" fill="#D4CEE8"/>
 <ellipse cx="33" cy="42" rx="4.5" ry="5" fill="#5CD6C8"/>
 <ellipse cx="47" cy="42" rx="4.5" ry="5" fill="#5CD6C8"/>
 <ellipse cx="33" cy="43" rx="2" ry="4" fill="#4A3F6B"/>
 <ellipse cx="47" cy="43" rx="2" ry="4" fill="#4A3F6B"/>
 <circle cx="34" cy="41" r="1.2" fill="white"/>
 <circle cx="48" cy="41" r="1.2" fill="white"/>
 <ellipse cx="40" cy="50" rx="2.5" ry="2" fill="#FFB5C5"/>
 <path d="M35 53 L40 50 L45 53" stroke="#4A3F6B" stroke-width="1" fill="none" stroke-linecap="round"/>
 <line x1="15" y1="44" x2="28" y2="46" stroke="#B8B0D0" stroke-width="1" stroke-linecap="round"/>
 <line x1="15" y1="48" x2="28" y2="48" stroke="#B8B0D0" stroke-width="1" stroke-linecap="round"/>
 <line x1="52" y1="46" x2="65" y2="44" stroke="#B8B0D0" stroke-width="1" stroke-linecap="round"/>
 <line x1="52" y1="48" x2="65" y2="48" stroke="#B8B0D0" stroke-width="1" stroke-linecap="round"/>
 </svg>`,

 owl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
 <polygon points="15,25 25,8 30,30" fill="#A68B5B"/>
 <polygon points="65,25 55,8 50,30" fill="#A68B5B"/>
 <ellipse cx="40" cy="45" rx="26" ry="28" fill="#A68B5B"/>
 <ellipse cx="40" cy="48" rx="18" ry="20" fill="#D4C4A0"/>
 <circle cx="30" cy="38" r="10" fill="white"/>
 <circle cx="50" cy="38" r="10" fill="white"/>
 <circle cx="30" cy="38" r="6" fill="#FF9BC2"/>
 <circle cx="50" cy="38" r="6" fill="#FF9BC2"/>
 <circle cx="30" cy="38" r="3.5" fill="#4A3F6B"/>
 <circle cx="50" cy="38" r="3.5" fill="#4A3F6B"/>
 <circle cx="31" cy="37" r="1.2" fill="white"/>
 <circle cx="51" cy="37" r="1.2" fill="white"/>
 <polygon points="40,46 37,50 43,50" fill="#E8A030"/>
 <path d="M32 56 Q40 62 48 56" stroke="#A68B5B" stroke-width="1.5" fill="none"/>
 </svg>`,

 fox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
 <polygon points="15,35 22,5 32,32" fill="#E8945A"/>
 <polygon points="65,35 58,5 48,32" fill="#E8945A"/>
 <polygon points="18,32 22,12 28,30" fill="#FFF5F0"/>
 <polygon points="62,32 58,12 52,30" fill="#FFF5F0"/>
 <circle cx="40" cy="48" r="24" fill="#E8945A"/>
 <circle cx="40" cy="52" r="16" fill="#FFF5F0"/>
 <circle cx="33" cy="42" r="3.5" fill="#4A3F6B"/>
 <circle cx="47" cy="42" r="3.5" fill="#4A3F6B"/>
 <circle cx="34" cy="41" r="1.2" fill="white"/>
 <circle cx="48" cy="41" r="1.2" fill="white"/>
 <ellipse cx="40" cy="50" rx="3" ry="2.5" fill="#4A3F6B"/>
 <path d="M37 54 Q40 57 43 54" stroke="#4A3F6B" stroke-width="1.2" fill="none" stroke-linecap="round"/>
 <circle cx="28" cy="50" r="4" fill="#FFB5C5" opacity="0.4"/>
 <circle cx="52" cy="50" r="4" fill="#FFB5C5" opacity="0.4"/>
 </svg>`,

 panda: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
 <circle cx="20" cy="20" r="12" fill="#4A3F6B"/>
 <circle cx="60" cy="20" r="12" fill="#4A3F6B"/>
 <circle cx="40" cy="44" r="28" fill="white"/>
 <ellipse cx="30" cy="38" rx="10" ry="9" fill="#4A3F6B"/>
 <ellipse cx="50" cy="38" rx="10" ry="9" fill="#4A3F6B"/>
 <circle cx="30" cy="38" r="5" fill="white"/>
 <circle cx="50" cy="38" r="5" fill="white"/>
 <circle cx="30" cy="38" r="3" fill="#4A3F6B"/>
 <circle cx="50" cy="38" r="3" fill="#4A3F6B"/>
 <circle cx="31" cy="37" r="1" fill="white"/>
 <circle cx="51" cy="37" r="1" fill="white"/>
 <ellipse cx="40" cy="48" rx="4" ry="3" fill="#4A3F6B"/>
 <path d="M36 52 Q40 56 44 52" stroke="#4A3F6B" stroke-width="1.2" fill="none" stroke-linecap="round"/>
 <circle cx="26" cy="48" r="4" fill="#FFB5C5" opacity="0.4"/>
 <circle cx="54" cy="48" r="4" fill="#FFB5C5" opacity="0.4"/>
 </svg>`,

 frog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70" fill="none">
 <circle cx="25" cy="15" r="12" fill="#8ED8A0"/>
 <circle cx="55" cy="15" r="12" fill="#8ED8A0"/>
 <circle cx="25" cy="14" r="5" fill="white"/>
 <circle cx="55" cy="14" r="5" fill="white"/>
 <circle cx="25" cy="14" r="3" fill="#4A3F6B"/>
 <circle cx="55" cy="14" r="3" fill="#4A3F6B"/>
 <circle cx="26" cy="13" r="1" fill="white"/>
 <circle cx="56" cy="13" r="1" fill="white"/>
 <ellipse cx="40" cy="40" rx="28" ry="22" fill="#8ED8A0"/>
 <ellipse cx="40" cy="44" rx="20" ry="14" fill="#B8ECBE"/>
 <path d="M30 42 Q40 48 50 42" stroke="#4A3F6B" stroke-width="1.5" fill="none" stroke-linecap="round"/>
 <circle cx="28" cy="38" r="4" fill="#FFB5C5" opacity="0.3"/>
 <circle cx="52" cy="38" r="4" fill="#FFB5C5" opacity="0.3"/>
 </svg>`,

 star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
 <path d="M20 2 L24.5 14.5 L38 16 L28 25 L30.5 38 L20 32 L9.5 38 L12 25 L2 16 L15.5 14.5 Z" fill="#FFD93D" opacity="0.8"/>
 <path d="M20 8 L22.5 16 L31 17 L25 23 L26.5 31.5 L20 27.5 L13.5 31.5 L15 23 L9 17 L17.5 16 Z" fill="#FFEB85"/>
 </svg>`,
};

/** Get raw SVG string for an animal type */
export function getAnimalSvg(type: AnimalType): string {
 return ANIMAL_SVGS[type];
}

/** Get a data URI for use in <img> src or CSS background */
export function getAnimalDataUri(type: AnimalType): string {
 const svg = ANIMAL_SVGS[type];
 return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** All available animal types */
export const ALL_ANIMALS: AnimalType[] = ['bear', 'bunny', 'cat', 'owl', 'fox', 'panda', 'frog', 'star'];

/** Random animal from a given set */
export function randomAnimal(types?: AnimalType[]): AnimalType {
 const pool = types || ALL_ANIMALS;
 return pool[Math.floor(Math.random() * pool.length)];
}

// ── Animal Physics Engine ──
// A lightweight physics hook for floating animal particles.

import { useEffect, useRef, useCallback } from 'react';
import { type AnimalType, getAnimalSvg } from './animalSvgs';

export interface AnimalParticle {
 x: number;
 y: number;
 vx: number;
 vy: number;
 rotation: number;
 rotationSpeed: number;
 scale: number;
 opacity: number;
 type: AnimalType;
 svgImage: HTMLImageElement | null;
}

export interface AnimalPhysicsOptions {
 /** Animal types to use */
 animals: AnimalType[];
 /** Number of animals to spawn */
 count: number;
 /** Enable mouse repulsion */
 mouseRepulsion?: boolean;
 /** Repulsion radius in px */
 repulsionRadius?: number;
 /** Scroll parallax factor (0 = none, 1 = full scroll speed) */
 parallaxFactor?: number;
 /** Min opacity */
 minOpacity?: number;
 /** Max opacity */
 maxOpacity?: number;
 /** Min scale */
 minScale?: number;
 /** Max scale */
 maxScale?: number;
 /** Gravity strength */
 gravity?: number;
 /** Bounce restitution (0-1) */
 restitution?: number;
 /** Animal size in px */
 animalSize?: number;
}

const DEFAULT_OPTIONS: Required<Omit<AnimalPhysicsOptions, 'animals' | 'count'>> = {
 mouseRepulsion: true,
 repulsionRadius: 120,
 parallaxFactor: 0.3,
 minOpacity: 0.15,
 maxOpacity: 0.4,
 minScale: 0.4,
 maxScale: 1.0,
 gravity: 0.015,
 restitution: 0.6,
 animalSize: 50,
};

function lerp(a: number, b: number, t: number): number {
 return a + (b - a) * t;
}

function randomRange(min: number, max: number): number {
 return min + Math.random() * (max - min);
}

function createParticle(
 width: number,
 height: number,
 animals: AnimalType[],
 opts: Required<Omit<AnimalPhysicsOptions, 'animals' | 'count'>>
): AnimalParticle {
 const type = animals[Math.floor(Math.random() * animals.length)];
 // Spawn from random edge
 const edge = Math.floor(Math.random() * 4);
 let x: number, y: number;
 switch (edge) {
 case 0: x = randomRange(0, width); y = -50; break; // top
 case 1: x = width + 50; y = randomRange(0, height); break; // right
 case 2: x = randomRange(0, width); y = height + 50; break; // bottom
 default: x = -50; y = randomRange(0, height); break; // left
 }

 const img = new Image();
 const svg = getAnimalSvg(type);
 img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;

 return {
 x,
 y,
 vx: randomRange(-0.5, 0.5),
 vy: randomRange(-0.3, 0.3),
 rotation: randomRange(0, 360),
 rotationSpeed: randomRange(-0.3, 0.3),
 scale: randomRange(opts.minScale, opts.maxScale),
 opacity: randomRange(opts.minOpacity, opts.maxOpacity),
 type,
 svgImage: img,
 };
}

export function useAnimalPhysics(
 canvasRef: React.RefObject<HTMLCanvasElement | null>,
 options: AnimalPhysicsOptions
) {
 const particlesRef = useRef<AnimalParticle[]>([]);
 const mouseRef = useRef({ x: -1000, y: -1000 });
 const scrollRef = useRef(0);
 const animFrameRef = useRef<number>(0);
 const timeRef = useRef(0);
 const isVisibleRef = useRef(true);

 const opts = { ...DEFAULT_OPTIONS, ...options };

 const init = useCallback(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const w = canvas.width;
 const h = canvas.height;

 // Check prefers-reduced-motion
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const isMobile = window.innerWidth < 768;
 const count = reducedMotion ? Math.min(options.count, 3) : (isMobile ? Math.min(options.count, 4) : options.count);

 const particles: AnimalParticle[] = [];
 for (let i = 0; i < count; i++) {
 const p = createParticle(w, h, options.animals, opts);
 // Start them inside the viewport for initial display
 p.x = randomRange(50, w - 50);
 p.y = randomRange(50, h - 50);
 particles.push(p);
 }
 particlesRef.current = particles;
 }, [canvasRef, options.animals, options.count]);

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;

 const resize = () => {
 const parent = canvas.parentElement;
 if (!parent) return;
 const rect = parent.getBoundingClientRect();
 canvas.width = rect.width;
 canvas.height = rect.height;
 if (particlesRef.current.length === 0) {
 init();
 }
 };

 resize();
 window.addEventListener('resize', resize);

 const handleMouse = (e: MouseEvent) => {
 const rect = canvas.getBoundingClientRect();
 mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
 };

 const handleScroll = () => {
 scrollRef.current = window.scrollY;
 };

 const handleVisibility = () => {
 isVisibleRef.current = !document.hidden;
 };

 window.addEventListener('mousemove', handleMouse);
 window.addEventListener('scroll', handleScroll, { passive: true });
 document.addEventListener('visibilitychange', handleVisibility);

 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 const animate = () => {
 if (!isVisibleRef.current) {
 animFrameRef.current = requestAnimationFrame(animate);
 return;
 }

 timeRef.current += 1;
 const w = canvas.width;
 const h = canvas.height;

 ctx.clearRect(0, 0, w, h);

 for (const p of particlesRef.current) {
 // Gravity
 p.vy += opts.gravity;

 // Horizontal drift (sinusoidal)
 p.vx += Math.sin(timeRef.current * 0.008) * 0.008;

 // Damping
 p.vx *= 0.998;
 p.vy *= 0.998;

 // Mouse repulsion
 if (opts.mouseRepulsion) {
 const dx = p.x - mouseRef.current.x;
 const dy = p.y - mouseRef.current.y;
 const dist = Math.sqrt(dx * dx + dy * dy);
 if (dist < opts.repulsionRadius && dist > 0) {
 const force = (opts.repulsionRadius - dist) / opts.repulsionRadius * 0.3;
 p.vx += (dx / dist) * force;
 p.vy += (dy / dist) * force;
 }
 }

 // Update position
 p.x += p.vx;
 p.y += p.vy;

 // Wall bouncing
 const size = opts.animalSize * p.scale;
 if (p.x < 0) { p.x = 0; p.vx *= -opts.restitution; }
 if (p.x > w - size) { p.x = w - size; p.vx *= -opts.restitution; }
 if (p.y < 0) { p.y = 0; p.vy *= -opts.restitution; }
 if (p.y > h - size) { p.y = h - size; p.vy *= -opts.restitution; }

 // Rotation
 p.rotation += p.rotationSpeed;

 // Scroll parallax offset
 const parallaxOffset = scrollRef.current * opts.parallaxFactor;

 // Render
 ctx.save();
 ctx.globalAlpha = p.opacity;
 const drawX = p.x;
 const drawY = p.y - parallaxOffset % h;
 ctx.translate(drawX + size / 2, drawY + size / 2);
 ctx.rotate((p.rotation * Math.PI) / 180);
 ctx.translate(-size / 2, -size / 2);

 if (p.svgImage && p.svgImage.complete && p.svgImage.naturalWidth > 0) {
 ctx.drawImage(p.svgImage, 0, 0, size, size);
 }

 ctx.restore();
 }

 animFrameRef.current = requestAnimationFrame(animate);
 };

 init();
 animFrameRef.current = requestAnimationFrame(animate);

 return () => {
 cancelAnimationFrame(animFrameRef.current);
 window.removeEventListener('resize', resize);
 window.removeEventListener('mousemove', handleMouse);
 window.removeEventListener('scroll', handleScroll);
 document.removeEventListener('visibilitychange', handleVisibility);
 };
 }, [canvasRef, init, opts]);
}

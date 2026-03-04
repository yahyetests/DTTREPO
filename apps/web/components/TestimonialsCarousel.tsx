import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/content/site-content';
import { cn } from '@/lib/utils';

export const TestimonialsCarousel: React.FC = () => {
 const [current, setCurrent] = useState(0);
 const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 const [itemsPerView, setItemsPerView] = useState(3);

 useEffect(() => {
 const handleResize = () => {
 setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
 };
 handleResize();
 window.addEventListener('resize', handleResize);
 return () => window.removeEventListener('resize', handleResize);
 }, []);

 const maxIndex = Math.max(0, testimonials.length - itemsPerView);

 const goNext = useCallback(() => {
 setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
 }, [maxIndex]);

 const goPrev = useCallback(() => {
 setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
 }, [maxIndex]);

 useEffect(() => {
 if (!isAutoPlaying) return;
 const timer = setInterval(goNext, 5000);
 return () => clearInterval(timer);
 }, [isAutoPlaying, goNext]);

 return (
 <div
 className="relative"
 onMouseEnter={() => setIsAutoPlaying(false)}
 onMouseLeave={() => setIsAutoPlaying(true)}
 >
 <div className="overflow-hidden">
 <motion.div
 className="flex gap-6"
 animate={{ x: `-${current * (100 / itemsPerView + (itemsPerView > 1 ? 2 : 0))}%` }}
 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
 >
 {testimonials.map((testimonial, idx) => (
 <div
 key={idx}
 className="relative flex-shrink-0 card-default p-6 lg:p-8"
 style={{ width: itemsPerView > 1 ? 'calc(33.333% - 16px)' : '100%' }}
 >
 <Quote className="w-8 h-8 text-secondary/30 mb-4" />
 <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
 "{testimonial.text}"
 </p>
 <div className="flex items-center justify-between">
 <div>
 <p className="font-bold text-primary text-sm">{testimonial.name}</p>
 <p className="text-xs text-slate-400">{testimonial.role}</p>
 </div>
 <div className="flex gap-0.5">
 {Array.from({ length: testimonial.rating }).map((_, i) => (
 <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
 ))}
 </div>
 </div>
 </div>
 ))}
 </motion.div>
 </div>

 {/* Controls */}
 <div className="flex items-center justify-center gap-4 mt-8">
 <button
 onClick={goPrev}
 className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-white transition-colors shadow-soft"
 aria-label="Previous testimonial"
 >
 <ChevronLeft className="w-5 h-5 text-primary " />
 </button>

 <div className="flex gap-2">
 {Array.from({ length: maxIndex + 1 }).map((_, i) => (
 <button
 key={i}
 onClick={() => setCurrent(i)}
 className={cn(
 "w-2 h-2 rounded-full transition-all duration-300",
 current === i ? "w-6 bg-secondary" : "bg-slate-300 hover:bg-slate-400"
 )}
 aria-label={`Go to slide ${i + 1}`}
 />
 ))}
 </div>

 <button
 onClick={goNext}
 className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-white transition-colors shadow-soft"
 aria-label="Next testimonial"
 >
 <ChevronRight className="w-5 h-5 text-primary " />
 </button>
 </div>
 </div>
 );
};

export default TestimonialsCarousel;

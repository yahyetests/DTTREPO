
"use client";

import React, { useState } from "react";
import { Star, MapPin, Calendar, Clock, Award, ShieldCheck, ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { availableTutors } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function TutorProfilePage({ params }: { params: { tutorId: string } }) {
  const tutorId = params.tutorId;
  const tutor = availableTutors.find(t => t.id === tutorId);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  if (!tutor) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Tutor not found</h2>
        <p className="text-slate-500 mb-4">The tutor you are looking for does not exist or has been removed.</p>
        <a href="/dashboard/sessions">
          <Button>Back to Dashboard</Button>
        </a>
      </div>
    );
  }

  // Mock calendar days
  const today = new Date();
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d,
      dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dayNumber: d.getDate(),
      slots: i % 2 === 0 ? ['16:00', '17:00', '18:00'] : ['14:00', '15:30'] // Randomize slots a bit
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <a href="/dashboard/sessions" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-2">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Tutors
      </a>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 relative group">
               {tutor.imageUrl ? (
                 <img src={tutor.imageUrl} alt={tutor.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-3xl">
                   {tutor.name[0]}
                 </div>
               )}
            </div>
            <div className="flex-1">
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                 <div>
                   <h1 className="text-2xl font-bold text-slate-900">{tutor.name}</h1>
                   <div className="flex items-center gap-3 mt-2 flex-wrap">
                     <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                       <span className="font-bold text-amber-700">{tutor.rating}</span>
                       <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                     </div>
                     <span className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-primary transition-colors">
                       24 reviews
                     </span>
                     <span className="hidden sm:inline text-slate-300">|</span>
                     <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                       <ShieldCheck className="w-3.5 h-3.5" /> Verified Tutor
                     </span>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <Button variant="outline" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 border-slate-200">
                     <Heart className="w-4 h-4" />
                   </Button>
                   <Button variant="outline" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-primary hover:bg-slate-50 border-slate-200">
                     <Share2 className="w-4 h-4" />
                   </Button>
                 </div>
               </div>
               
               <div className="mt-5 pt-5 border-t border-slate-100">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Teaches</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map(sub => (
                      <span key={sub} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-700 text-xs font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">About Me</h2>
            <div className="prose prose-sm max-w-none text-slate-600">
              <p className="leading-relaxed whitespace-pre-line">
                {tutor.bio}
              </p>
              <p className="leading-relaxed mt-4">
                I believe in a student-centered approach, tailoring every lesson to individual learning styles. Whether you're aiming for that A* or just need to pass, we'll build a plan to get you there.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
               <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                 <div className="bg-white p-2 rounded-md shadow-sm text-green-500">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="font-semibold text-slate-900 text-sm">Background Check</p>
                   <p className="text-xs text-slate-500">DBS Checked & Verified</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                 <div className="bg-white p-2 rounded-md shadow-sm text-blue-500">
                    <Clock className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="font-semibold text-slate-900 text-sm">Fast Responder</p>
                   <p className="text-xs text-slate-500">Replies within 2 hours</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Student Reviews</h2>
                  <p className="text-sm text-slate-500">What students say about {tutor.name.split(' ')[0]}</p>
                </div>
                <Button variant="outline" size="sm">Write a Review</Button>
             </div>
             
             {/* Rating Breakdown */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                <div className="flex flex-col items-center justify-center text-center">
                   <div className="text-5xl font-bold text-slate-900 tracking-tight">{tutor.rating}</div>
                   <div className="flex text-amber-500 my-2 gap-1">
                     {[1,2,3,4,5].map(i => (
                        <Star key={i} className={cn("w-5 h-5", i <= Math.round(tutor.rating) ? "fill-current" : "text-slate-200 fill-slate-200")} />
                     ))}
                   </div>
                   <p className="text-sm text-slate-500 font-medium">Based on 24 reviews</p>
                </div>
                <div className="space-y-2 flex flex-col justify-center">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center gap-3 text-sm">
                      <span className="font-medium text-slate-600 w-3 text-right">{star}</span>
                      <Star className="w-3.5 h-3.5 text-slate-300" />
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full" 
                          style={{ width: star === 5 ? '65%' : star === 4 ? '25%' : star === 3 ? '5%' : '2%' }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="space-y-8">
               {tutor.reviews && tutor.reviews.length > 0 ? (
                 tutor.reviews.map((review) => (
                   <div key={review.id} className="border-b border-slate-100 last:border-0 pb-8 last:pb-0">
                     <div className="flex items-start justify-between mb-2">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                           {review.authorName[0]}
                         </div>
                         <div>
                            <span className="font-bold text-slate-900 block text-sm">{review.authorName}</span>
                            <span className="text-xs text-slate-400">{review.date}</span>
                         </div>
                       </div>
                       <div className="flex text-amber-500 gap-0.5">
                         {Array.from({length: 5}).map((_, i) => (
                           <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-current" : "text-slate-200 fill-slate-200")} />
                         ))}
                       </div>
                     </div>
                     <p className="text-slate-600 text-sm leading-relaxed mt-3 ml-11">"{review.comment}"</p>
                   </div>
                 ))
               ) : (
                 <p className="text-slate-500 italic text-center py-8">No reviews yet.</p>
               )}
             </div>
          </div>

        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg sticky top-24 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Hourly Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">£{tutor.hourlyRate}</span>
                <span className="text-slate-500 text-sm">/ hr</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-500" /> Select Date
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                  {calendarDays.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(idx)}
                      className={cn(
                        "flex flex-col items-center justify-center min-w-[4rem] h-16 rounded-xl border transition-all shrink-0",
                        selectedDate === idx 
                          ? "border-secondary bg-amber-50 text-secondary ring-1 ring-secondary/50" 
                          : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span className="text-xs font-medium uppercase">{day.dayName}</span>
                      <span className="text-lg font-bold">{day.dayNumber}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate !== null ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-500" /> Available Slots
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {calendarDays[selectedDate].slots.map((slot) => (
                      <button 
                        key={slot}
                        className="py-2 px-3 text-sm font-medium border border-slate-200 rounded-lg hover:border-secondary hover:text-secondary hover:bg-amber-50 transition-colors text-slate-700"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-24 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm">
                  Select a date to view slots
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Button className="w-full btn-secondary h-11" disabled={selectedDate === null}>
                  Confirm Booking
                </Button>
                <p className="text-xs text-center text-slate-400">
                  You won't be charged yet. Free cancellation up to 24h before.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">Bulk Booking Discount</h4>
            <p className="text-xs text-slate-600 mb-3">Book 5+ sessions to save 10% on your total order.</p>
            <a href="#" className="text-xs text-secondary font-semibold hover:underline">Learn more &rarr;</a>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, ChevronRight, Trophy } from 'lucide-react';
import type { SubjectQuiz } from '@/content/quizzes';

interface StarterQuizProps {
 quiz: SubjectQuiz;
}

export default function StarterQuiz({ quiz }: StarterQuizProps) {
 const [currentQ, setCurrentQ] = useState(0);
 const [selected, setSelected] = useState<number | null>(null);
 const [answered, setAnswered] = useState(false);
 const [score, setScore] = useState(0);
 const [finished, setFinished] = useState(false);

 const total = quiz.questions.length;
 const question = quiz.questions[currentQ];

 function handleSelect(idx: number) {
 if (answered) return;
 setSelected(idx);
 setAnswered(true);
 if (idx === question.correctIndex) {
 setScore(s => s + 1);
 }
 }

 function handleNext() {
 if (currentQ + 1 >= total) {
 setFinished(true);
 } else {
 setCurrentQ(q => q + 1);
 setSelected(null);
 setAnswered(false);
 }
 }

 function handleRestart() {
 setCurrentQ(0);
 setSelected(null);
 setAnswered(false);
 setScore(0);
 setFinished(false);
 }

 if (finished) {
 const pct = Math.round((score / total) * 100);
 return (
 <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto">
 <Trophy className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-2xl font-bold text-slate-900 ">Quiz Complete!</h3>
 <p className="text-lg text-slate-600 ">
 You scored <span className="font-bold text-emerald-600">{score}/{total}</span> ({pct}%)
 </p>
 <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden max-w-xs mx-auto">
 <div
 className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700"
 style={{ width: `${pct}%` }}
 />
 </div>
 <p className="text-sm text-slate-500 ">
 {pct >= 80 ? "Excellent! You've got a strong base." :
 pct >= 60 ? "Good effort! A tutor can help you fill the gaps." :
 "A great starting point — our tutors will help you improve fast."}
 </p>
 <button
 onClick={handleRestart}
 className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
 >
 <RotateCcw className="w-4 h-4" /> Restart Quiz
 </button>
 </div>
 );
 }

 return (
 <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
 {/* Progress bar */}
 <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-slate-100">
 <span className="text-sm font-medium text-slate-600 ">
 Question {currentQ + 1} of {total}
 </span>
 <div className="flex gap-1.5">
 {quiz.questions.map((_, i) => (
 <div
 key={i}
 className={`w-2.5 h-2.5 rounded-full transition-colors ${i < currentQ ? 'bg-emerald-400' :
 i === currentQ ? 'bg-emerald-600' :
 'bg-slate-200'
 }`}
 />
 ))}
 </div>
 </div>

 {/* Question */}
 <div className="p-6 space-y-5">
 <h4 className="text-lg font-semibold text-slate-900 ">{question.question}</h4>

 <div className="space-y-3">
 {question.options.map((opt, idx) => {
 let classes = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ";
 if (!answered) {
 classes += selected === idx
 ? "border-emerald-400 bg-emerald-50 text-slate-900 "
 : "border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700";
 } else if (idx === question.correctIndex) {
 classes += "border-green-400 bg-green-50 text-green-800";
 } else if (idx === selected) {
 classes += "border-red-400 bg-red-50 text-red-800";
 } else {
 classes += "border-slate-100 bg-white text-slate-400";
 }

 return (
 <button
 key={idx}
 className={classes}
 onClick={() => handleSelect(idx)}
 disabled={answered}
 >
 <span className="flex items-center gap-3">
 <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">
 {String.fromCharCode(65 + idx)}
 </span>
 {opt}
 {answered && idx === question.correctIndex && (
 <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />
 )}
 {answered && idx === selected && idx !== question.correctIndex && (
 <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />
 )}
 </span>
 </button>
 );
 })}
 </div>

 {/* Explanation */}
 {answered && (
 <div className={`p-4 rounded-xl text-sm ${selected === question.correctIndex
 ? 'bg-green-50 border border-green-200 text-green-800'
 : 'bg-orange-50 border border-orange-200 text-orange-800'
 }`}>
 <strong>{selected === question.correctIndex ? '✅ Correct!' : '❌ Not quite.'}</strong>{' '}
 {question.explanation}
 </div>
 )}

 {/* Next button */}
 {answered && (
 <div className="flex justify-end">
 <button
 onClick={handleNext}
 className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm"
 >
 {currentQ + 1 >= total ? 'See Results' : 'Next Question'}
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 )}
 </div>
 </div>
 );
}

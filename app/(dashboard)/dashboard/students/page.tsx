
"use client";

import React, { useState } from "react";
import { Search, MoreHorizontal, Mail, Calendar, TrendingUp, BookOpen, ChevronDown, ChevronUp, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { myStudents } from "@/lib/data";
import { cn } from "@/lib/utils";

// Helper to generate mock objectives based on subject
const getObjectives = (subject: string) => {
  if (subject.includes("Math")) return [
    { name: "Algebra & Functions", value: 75 },
    { name: "Geometry", value: 60 },
    { name: "Statistics", value: 85 },
    { name: "Exam Technique", value: 70 }
  ];
  if (subject.includes("Physics")) return [
    { name: "Mechanics", value: 80 },
    { name: "Electricity", value: 65 },
    { name: "Waves", value: 55 },
    { name: "Practical Skills", value: 90 }
  ];
  return [
    { name: "Core Concepts", value: 70 },
    { name: "Critical Thinking", value: 60 },
    { name: "Homework Completion", value: 85 },
    { name: "Exam Prep", value: 65 }
  ];
};

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Local state to handle progress updates
  const [students, setStudents] = useState(() => 
    myStudents.map(s => ({
      ...s,
      objectives: getObjectives(s.subject),
      isEditing: false
    }))
  );

  const toggleEdit = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, isEditing: !s.isEditing } : { ...s, isEditing: false }
    ));
  };

  const updateObjective = (studentId: string, index: number, newValue: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      
      const newObjectives = [...s.objectives];
      newObjectives[index] = { ...newObjectives[index], value: newValue };
      
      // Recalculate overall progress
      const total = newObjectives.reduce((acc, obj) => acc + obj.value, 0);
      const newProgress = Math.round(total / newObjectives.length);

      return { ...s, objectives: newObjectives, progress: newProgress };
    }));
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Students</h1>
          <p className="text-slate-500">Track progress, manage schedules, and view reports.</p>
        </div>
        <Button className="btn-secondary">
          Invite New Student
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search students by name or subject..." 
            className="pl-9 max-w-md border-slate-200" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Student List Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
            <div className="p-6 flex items-start justify-between border-b border-slate-50">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{student.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{student.gradeLevel}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">{student.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">
                  Next: <span className={cn("font-medium", student.nextSession === 'Unscheduled' ? 'text-slate-400 italic' : 'text-blue-600')}>{student.nextSession}</span>
                </span>
              </div>
              
              {/* Progress Section */}
              <div className={cn("rounded-xl transition-all duration-300", student.isEditing ? "bg-slate-50 p-4 -mx-2 ring-1 ring-slate-200" : "")}>
                 <div className="flex items-center justify-between text-xs mb-2">
                   <span className="text-slate-500 font-medium flex items-center gap-1">
                     <TrendingUp className="w-3 h-3" /> Overall Progress
                   </span>
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{student.progress}%</span>
                      <button 
                        onClick={() => toggleEdit(student.id)}
                        className="text-secondary hover:text-secondary/80 text-[10px] font-semibold underline decoration-dotted underline-offset-2"
                      >
                        {student.isEditing ? "Close" : "Update"}
                      </button>
                   </div>
                 </div>
                 
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${student.progress}%` }} />
                 </div>

                 {/* Detailed Objectives Tracker */}
                 {student.isEditing && (
                   <div className="space-y-4 mt-4 animate-in slide-in-from-top-2">
                     <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Learning Objectives</h4>
                     {student.objectives.map((obj, idx) => (
                       <div key={idx} className="space-y-1">
                         <div className="flex justify-between text-xs">
                           <span className="text-slate-600">{obj.name}</span>
                           <span className="font-medium text-slate-900">{obj.value}%</span>
                         </div>
                         <input 
                           type="range" 
                           min="0" 
                           max="100" 
                           value={obj.value}
                           onChange={(e) => updateObjective(student.id, idx, parseInt(e.target.value))}
                           className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                         />
                       </div>
                     ))}
                     <div className="flex gap-2 pt-2">
                       <Button size="sm" className="w-full h-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => toggleEdit(student.id)}>
                         <Save className="w-3 h-3 mr-1.5" /> Save Updates
                       </Button>
                     </div>
                   </div>
                 )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="w-full bg-white">
                <Mail className="w-3.5 h-3.5 mr-2" /> Message
              </Button>
              <Button size="sm" className="w-full btn-secondary">
                View Profile
              </Button>
            </div>
          </div>
        ))}

        {/* Add Student Card Placeholder */}
        <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer group min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <span className="text-2xl text-slate-400">+</span>
          </div>
          <h3 className="font-bold text-slate-900">Add New Student</h3>
          <p className="text-sm text-slate-500 mt-1">Send an invite code</p>
        </div>
      </div>
    </div>
  );
}

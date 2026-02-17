
"use client";

import React, { useState } from "react";
import { Plus, Trash2, Calendar, Clock, Save, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DailyAvailability, AvailabilityException, DayOfWeek, TimeRange } from "@/lib/types";

export default function AvailabilityPage() {
  const [slotDuration, setSlotDuration] = useState<30 | 60>(60);
  const [isSaving, setIsSaving] = useState(false);
  
  // Weekly Schedule State
  const [schedule, setSchedule] = useState<DailyAvailability[]>([
    { day: "Monday", isEnabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { day: "Tuesday", isEnabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { day: "Wednesday", isEnabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { day: "Thursday", isEnabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { day: "Friday", isEnabled: true, slots: [{ start: "09:00", end: "16:00" }] },
    { day: "Saturday", isEnabled: false, slots: [] },
    { day: "Sunday", isEnabled: false, slots: [] },
  ]);

  // Exceptions State
  const [exceptions, setExceptions] = useState<AvailabilityException[]>([]);
  const [newExceptionDate, setNewExceptionDate] = useState("");

  // Handlers for Weekly Schedule
  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isEnabled = !newSchedule[index].isEnabled;
    if (newSchedule[index].isEnabled && newSchedule[index].slots.length === 0) {
      newSchedule[index].slots.push({ start: "09:00", end: "17:00" });
    }
    setSchedule(newSchedule);
  };

  const addSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.push({ start: "09:00", end: "17:00" });
    setSchedule(newSchedule);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.splice(slotIndex, 1);
    setSchedule(newSchedule);
  };

  const updateSlot = (dayIndex: number, slotIndex: number, field: keyof TimeRange, value: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex][field] = value;
    setSchedule(newSchedule);
  };

  // Handlers for Exceptions
  const addException = () => {
    if (!newExceptionDate) return;
    
    const exists = exceptions.find(e => e.date === newExceptionDate);
    if (exists) return; // Prevent duplicates

    const newException: AvailabilityException = {
      id: Math.random().toString(36).substr(2, 9),
      date: newExceptionDate,
      isOff: true,
      slots: []
    };
    
    setExceptions([...exceptions, newException]);
    setNewExceptionDate("");
  };

  const removeException = (id: string) => {
    setExceptions(exceptions.filter(e => e.id !== id));
  };

  const toggleExceptionStatus = (id: string) => {
    setExceptions(exceptions.map(e => {
      if (e.id === id) {
        const isOff = !e.isOff;
        return {
          ...e,
          isOff,
          slots: !isOff && e.slots.length === 0 ? [{ start: "09:00", end: "17:00" }] : e.slots
        };
      }
      return e;
    }));
  };

  const addExceptionSlot = (id: string) => {
    setExceptions(exceptions.map(e => {
      if (e.id === id) {
        return { ...e, slots: [...e.slots, { start: "09:00", end: "17:00" }] };
      }
      return e;
    }));
  };

  const removeExceptionSlot = (exId: string, slotIndex: number) => {
    setExceptions(exceptions.map(e => {
      if (e.id === exId) {
        const newSlots = [...e.slots];
        newSlots.splice(slotIndex, 1);
        return { ...e, slots: newSlots };
      }
      return e;
    }));
  };

  const updateExceptionSlot = (exId: string, slotIndex: number, field: keyof TimeRange, value: string) => {
    setExceptions(exceptions.map(e => {
      if (e.id === exId) {
        const newSlots = [...e.slots];
        newSlots[slotIndex][field] = value;
        return { ...e, slots: newSlots };
      }
      return e;
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Availability</h1>
          <p className="text-slate-500">Set your weekly schedule and override for specific dates.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="btn-secondary">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-500" /> General Settings
        </h2>
        <div className="max-w-xs space-y-2">
          <Label>Appointment Duration</Label>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSlotDuration(30)}
              className={cn(
                "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                slotDuration === 30 ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              30 min
            </button>
            <button
              onClick={() => setSlotDuration(60)}
              className={cn(
                "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                slotDuration === 60 ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              60 min
            </button>
          </div>
          <p className="text-xs text-slate-500">
            This determines the length of slots shown to students.
          </p>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Weekly Schedule</h2>
          <p className="text-sm text-slate-500">Define your standard recurring hours.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {schedule.map((day, dayIndex) => (
            <div key={day.day} className="p-6 flex flex-col md:flex-row md:items-start gap-4">
              <div className="w-32 pt-2 shrink-0 flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                  checked={day.isEnabled}
                  onChange={() => toggleDay(dayIndex)}
                />
                <span className={cn("font-medium", day.isEnabled ? "text-slate-900" : "text-slate-400")}>
                  {day.day}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                {!day.isEnabled ? (
                  <div className="pt-2 text-sm text-slate-400 italic">Unavailable</div>
                ) : (
                  <>
                    {day.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex items-center gap-3">
                        <Input
                          type="time"
                          className="w-32"
                          value={slot.start}
                          onChange={(e) => updateSlot(dayIndex, slotIndex, 'start', e.target.value)}
                        />
                        <span className="text-slate-400">-</span>
                        <Input
                          type="time"
                          className="w-32"
                          value={slot.end}
                          onChange={(e) => updateSlot(dayIndex, slotIndex, 'end', e.target.value)}
                        />
                        <button 
                          onClick={() => removeSlot(dayIndex, slotIndex)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addSlot(dayIndex)}
                      className="text-sm font-medium text-secondary hover:text-secondary/80 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add hours
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Exceptions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Date Exceptions</h2>
            <p className="text-sm text-slate-500">Add time off or extra availability for specific dates.</p>
          </div>
          <div className="flex gap-2">
            <Input 
              type="date" 
              className="w-auto"
              value={newExceptionDate}
              onChange={(e) => setNewExceptionDate(e.target.value)}
            />
            <Button onClick={addException} disabled={!newExceptionDate} variant="outline">
              Add Date
            </Button>
          </div>
        </div>

        {exceptions.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No exceptions added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {exceptions.map((exception) => (
              <div key={exception.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">
                      {new Date(exception.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <select
                      className="text-sm border-slate-200 rounded-md py-1 px-2"
                      value={exception.isOff ? "off" : "custom"}
                      onChange={() => toggleExceptionStatus(exception.id)}
                    >
                      <option value="off">Unavailable (Off)</option>
                      <option value="custom">Custom Hours</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => removeException(exception.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!exception.isOff && (
                   <div className="pl-0 sm:pl-4 space-y-2">
                     {exception.slots.map((slot, idx) => (
                       <div key={idx} className="flex items-center gap-3">
                         <Input
                           type="time"
                           className="w-28 bg-white"
                           value={slot.start}
                           onChange={(e) => updateExceptionSlot(exception.id, idx, 'start', e.target.value)}
                         />
                         <span className="text-slate-400">-</span>
                         <Input
                           type="time"
                           className="w-28 bg-white"
                           value={slot.end}
                           onChange={(e) => updateExceptionSlot(exception.id, idx, 'end', e.target.value)}
                         />
                         <button 
                           onClick={() => removeExceptionSlot(exception.id, idx)}
                           className="text-slate-400 hover:text-red-500"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                     ))}
                     <button 
                       onClick={() => addExceptionSlot(exception.id)}
                       className="text-xs font-medium text-secondary hover:text-secondary/80 flex items-center gap-1 mt-2"
                     >
                       <Plus className="w-3 h-3" /> Add hours
                     </button>
                   </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { Search, FileText, Video, Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allResources } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const subjects = ["All", ...Array.from(new Set(allResources.map(r => r.subject)))];
  const types = ["All", "pdf", "video", "link"];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || resource.subject === selectedSubject;
    const matchesType = selectedType === "All" || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-red-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-blue-500" />;
      default: return <LinkIcon className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <Download className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Learning Resources</h1>
        <p className="text-slate-500">Access study materials, recordings, and revision guides.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end md:items-center">
        <div className="w-full md:flex-1 space-y-2">
           <label className="text-xs font-semibold text-slate-500 uppercase">Search</label>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input 
               placeholder="Search resources..." 
               className="pl-9" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>
        <div className="w-full md:w-48 space-y-2">
           <label className="text-xs font-semibold text-slate-500 uppercase">Subject</label>
           <select 
             className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
             value={selectedSubject}
             onChange={(e) => setSelectedSubject(e.target.value)}
           >
             {subjects.map(s => <option key={s} value={s}>{s}</option>)}
           </select>
        </div>
        <div className="w-full md:w-48 space-y-2">
           <label className="text-xs font-semibold text-slate-500 uppercase">Type</label>
           <select 
             className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
             value={selectedType}
             onChange={(e) => setSelectedType(e.target.value)}
           >
             {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t.toUpperCase()}</option>)}
           </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                  {getIcon(resource.type)}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600">
                  {resource.subject}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{resource.title}</h3>
              <p className="text-xs text-slate-500">Added on {new Date(resource.dateAdded).toLocaleDateString()}</p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium uppercase text-slate-500 tracking-wider">{resource.type}</span>
              <Button size="sm" variant="ghost" className="h-8 gap-2 text-secondary hover:text-secondary/80 hover:bg-white">
                {resource.type === 'pdf' ? 'Download' : 'View'}
                {getActionIcon(resource.type)}
              </Button>
            </div>
          </div>
        ))}
        {filteredResources.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No resources found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}

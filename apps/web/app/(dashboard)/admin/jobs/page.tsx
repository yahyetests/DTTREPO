"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface JobOpening {
  id: string;
  title: string;
  type: string;
  department: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", type: "", department: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await api('/admin/jobs') as { jobs: JobOpening[] };
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      await api(`/admin/jobs/${id}`, { method: 'DELETE' });
      setJobs(jobs.filter(j => j.id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Failed to delete job opening.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await api('/admin/jobs', {
        method: 'POST',
        body: formData,
      }) as { job: JobOpening };

      setJobs([data.job, ...jobs]);
      setShowModal(false);
      setFormData({ title: "", type: "", department: "", description: "" });
    } catch (error) {
      console.error("Failed to create job:", error);
      alert("Failed to create job opening.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (user?.role !== 'ADMIN') {
    return <div className="p-8 text-red-500">Access Denied: Requires Admin Role</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Job Openings</h1>
          <p className="text-slate-500 mt-1">Manage careers page listings.</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="btn-secondary whitespace-nowrap">
          <Plus className="w-4 h-4 mr-2" />
          Create Job Opening
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No job openings found. Create one to display it on the careers page.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {jobs.map(job => (
              <div key={job.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Create Job Opening</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="e.g. Senior Mathematics Tutor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
                <input
                  required
                  type="text"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="e.g. Full-time / Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <input
                  required
                  type="text"
                  value={formData.department}
                  onChange={e => setFormData({...formData, department: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="e.g. Education"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary focus:outline-none min-h-[100px]"
                  placeholder="Enter job description..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 btn-secondary" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Job"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

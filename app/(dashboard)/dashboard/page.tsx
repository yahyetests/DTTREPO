import { Calendar, Clock, BookOpen, Video, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser, upcomingSessions, recentResources } from "@/lib/data";

export default function DashboardPage() {
  // Calculate dynamic stats
  const sessionCount = upcomingSessions.length;
  const uniqueSubjects = new Set(upcomingSessions.map(s => s.subject)).size;
  
  // Formatters
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric' }).format(date);
  };

  const getDayMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      month: new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date),
      day: new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(date)
    };
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      default: return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {currentUser.firstName}! Here's what's happening today.</p>
        </div>
        <Button className="btn-secondary">
          Book New Session
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-slate-900">{sessionCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-secondary flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Hours Remaining</p>
              <p className="text-2xl font-bold text-slate-900">{currentUser.balanceHours}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Subjects</p>
              <p className="text-2xl font-bold text-slate-900">{uniqueSubjects}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Upcoming Sessions</h2>
            <button className="text-sm text-secondary hover:underline">View all</button>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             {upcomingSessions.length > 0 ? (
               upcomingSessions.map((session) => {
                 const { month, day } = getDayMonth(session.date);
                 return (
                   <div key={session.id} className="p-4 border-b border-slate-100 last:border-0 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                     <div className="w-14 h-14 rounded-lg bg-slate-100 flex flex-col items-center justify-center text-slate-600 shrink-0">
                       <span className="text-xs font-bold uppercase">{month}</span>
                       <span className="text-lg font-bold">{day}</span>
                     </div>
                     <div className="flex-1 min-w-0">
                       <h3 className="font-semibold text-slate-900 truncate">{session.subject}</h3>
                       <p className="text-sm text-slate-500 truncate">with {session.tutorName} • {session.startTime} - {session.endTime}</p>
                     </div>
                     <div className="hidden sm:flex flex-col gap-2">
                        {session.meetingLink && (
                          <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
                            Join Link
                          </Button>
                        )}
                     </div>
                   </div>
                 );
               })
             ) : (
               <div className="p-8 text-center text-slate-500">
                 No upcoming sessions. Book one now!
               </div>
             )}
          </div>
        </div>

        {/* Recent Resources / Notifications */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Resources</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            {recentResources.map((resource) => (
              <div key={resource.id} className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 hover:text-primary cursor-pointer truncate">
                    {resource.title}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    {resource.subject} • {formatDate(resource.dateAdded)}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-slate-500 mt-2">
              View Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

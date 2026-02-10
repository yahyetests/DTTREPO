
import React from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Library, 
  Settings, 
  LogOut,
  User as UserIcon,
  Clock,
  CreditCard
} from "lucide-react";
import { currentUser } from "@/lib/data";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
    { name: "Availability", href: "/dashboard/availability", icon: Clock },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Resources", href: "/dashboard/resources", icon: Library },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-primary text-slate-300 fixed h-full inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <a href="/" className="font-heading font-bold text-xl text-white tracking-tight">
            Takween Tutors
          </a>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-1 px-4">
          {sidebarLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </a>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="User" className="w-full h-full rounded-full" />
              ) : (
                <span className="font-bold text-xs">{currentUser.firstName[0]}{currentUser.lastName[0]}</span>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{currentUser.firstName} {currentUser.lastName}</p>
              <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 flex items-center justify-between md:hidden">
           <a href="/" className="font-heading font-bold text-xl text-primary">
            Takween
          </a>
          <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-slate-500" />
          </div>
        </header>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

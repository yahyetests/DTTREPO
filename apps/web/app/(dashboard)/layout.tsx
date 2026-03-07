
import React, { useState } from "react";
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Library,
    Settings,
    LogOut,
    User as UserIcon,
    Clock,
    CreditCard,
    Users,
    AlertTriangle,
    Menu,
    X,
    Briefcase,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/** Lightweight confirmation dialog — no extra dependencies required. */
function SignOutDialog({
    open,
    onConfirm,
    onCancel,
}: {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signout-title"
        >
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h2 id="signout-title" className="font-bold text-slate-900 text-base">Sign out?</h2>
                        <p className="text-sm text-slate-500">You'll need to log in again to access your dashboard.</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Shared sidebar content used by both desktop sidebar and mobile drawer */
function SidebarContent({
    sidebarLinks,
    initials,
    user,
    onSignOut,
    onLinkClick,
}: {
    sidebarLinks: { name: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
    initials: string;
    user: { name?: string; email?: string } | null;
    onSignOut: () => void;
    onLinkClick?: () => void;
}) {
    return (
        <>
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <a href="/" className="font-heading font-bold text-xl text-white tracking-tight">
                    Takween Tutors
                </a>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-1 px-4">
                {sidebarLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={onLinkClick}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                        <link.icon className="w-4 h-4" />
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-3 py-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                        <span className="font-bold text-xs">{initials}</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email || ''}</p>
                    </div>
                </div>
                <button
                    onClick={onSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                    aria-label="Sign out of your account"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </>
    );
}

export default function DashboardLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    const { user, logout } = useAuth();
    const [showSignOut, setShowSignOut] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getLinks = () => {
        if (user?.role === 'ADMIN') {
            return [
                { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { name: "Job Openings", href: "/admin/jobs", icon: Briefcase },
                { name: "Settings", href: "/dashboard/settings", icon: Settings },
            ];
        }
        if (user?.role === 'TUTOR') {
            return [
                { name: "Dashboard", href: "/tutor/dashboard", icon: LayoutDashboard },
                { name: "My Sessions", href: "/tutor/sessions", icon: Calendar },
                { name: "Availability", href: "/tutor/availability", icon: Clock },
                { name: "Students", href: "/tutor/students", icon: Users },
                { name: "Messages", href: "/tutor/messages", icon: MessageSquare },
                { name: "Settings", href: "/tutor/settings", icon: Settings },
            ];
        }
        if (user?.role === 'PARENT') {
            return [
                { name: "Family Dashboard", href: "/parent-dashboard", icon: LayoutDashboard },
                { name: "Settings", href: "/parent-dashboard/settings", icon: Settings },
            ];
        }
        return [
            { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
            { name: "My Sessions", href: "/student/sessions", icon: Calendar },
            { name: "Messages", href: "/student/messages", icon: MessageSquare },
            { name: "Billing", href: "/student/billing", icon: CreditCard },
            { name: "Resources", href: "/student/resources", icon: Library },
            { name: "Settings", href: "/student/settings", icon: Settings },
        ];
    };

    const sidebarLinks = getLinks();
    const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?';

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sign-out confirmation modal */}
            <SignOutDialog
                open={showSignOut}
                onConfirm={() => { setShowSignOut(false); logout(); }}
                onCancel={() => setShowSignOut(false)}
            />

            {/* Mobile sidebar drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
                    <aside className="absolute left-0 inset-y-0 w-64 bg-primary flex flex-col animate-in slide-in-from-left duration-200">
                        <SidebarContent
                            sidebarLinks={sidebarLinks}
                            initials={initials}
                            user={user}
                            onSignOut={() => { setMobileMenuOpen(false); setShowSignOut(true); }}
                            onLinkClick={() => setMobileMenuOpen(false)}
                        />
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar — Navy */}
            <aside className="hidden md:flex w-64 flex-col fixed h-full inset-y-0 z-50 bg-primary">
                <SidebarContent
                    sidebarLinks={sidebarLinks}
                    initials={initials}
                    user={user}
                    onSignOut={() => setShowSignOut(true)}
                />
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen">
                <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Open navigation menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
                        </button>
                        <a href="/" className="font-heading font-bold text-xl text-primary md:hidden">
                            Takween
                        </a>
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center md:hidden">
                            <UserIcon className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                </header>
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

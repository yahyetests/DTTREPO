import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldX } from 'lucide-react';

interface RoleRouteProps {
 role: string | string[];
 children: React.ReactNode;
}

export default function RoleRoute({ role, children }: RoleRouteProps) {
 const { user, loading } = useAuth();

 if (loading) {
 return (
 <div className="flex items-center justify-center min-h-[60vh]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
 </div>
 );
 }

 if (!user) {
 window.location.href = '/login';
 return null;
 }

 const roles = Array.isArray(role) ? role : [role];
 if (!roles.includes(user.role)) {
 return (
 <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
 <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
 <ShieldX className="w-8 h-8 text-red-500" />
 </div>
 <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
 <p className="text-slate-500 mb-6">
 You don't have permission to view this page.
 </p>
 <a
 href="/"
 className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
 >
 Go Home
 </a>
 </div>
 );
 }

 return <>{children}</>;
}

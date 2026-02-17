import React from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            fallback || (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                </div>
            )
        );
    }

    if (!user) {
        // Redirect to login
        window.location.href = '/login';
        return null;
    }

    return <>{children}</>;
}

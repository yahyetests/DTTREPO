import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '../lib/api';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'TUTOR' | 'ADMIN';
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    register: (name: string, email: string, password: string, role: string) => Promise<AuthUser>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user on mount
    useEffect(() => {
        api<{ user: AuthUser }>('/auth/me')
            .then((data) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
        const data = await api<{ user: AuthUser }>('/auth/login', {
            method: 'POST',
            body: { email, password },
        });
        setUser(data.user);
        return data.user;
    }, []);

    const register = useCallback(async (name: string, email: string, password: string, role: string): Promise<AuthUser> => {
        const data = await api<{ user: AuthUser }>('/auth/register', {
            method: 'POST',
            body: { name, email, password, role },
        });
        setUser(data.user);
        return data.user;
    }, []);

    const logout = useCallback(async () => {
        try {
            await api('/auth/logout', { method: 'POST' });
        } catch {
            // Ignore
        }
        setUser(null);
        window.location.href = '/login';
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

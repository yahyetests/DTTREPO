import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '../lib/api';
import { supabase } from '../lib/supabase';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN';
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

    // Check auth on mount — use Supabase's local session first (instant)
    // Only hit the backend API if a session actually exists
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // No session in localStorage — no need for a network call
                setUser(null);
                setLoading(false);
                return;
            }
            // Session exists — fetch the full profile from the backend
            api<{ user: AuthUser }>('/auth/me')
                .then((data) => setUser(data.user))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        });
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message);

        // Fetch user profile from unified backend to populate full entity
        const { user: profile } = await api<{ user: AuthUser }>('/auth/me');
        setUser(profile);
        return profile;
    }, []);

    const register = useCallback(async (name: string, email: string, password: string, role: string): Promise<AuthUser> => {
        const { data: authData, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role,
                }
            }
        });

        if (error) throw new Error('Registration failed. Please try again.');

        // If Supabase requires email confirmation, the user won't have a confirmed email yet
        if (authData.user && !authData.user.email_confirmed_at) {
            throw new Error('CONFIRM_EMAIL');
        }

        // Immediately sync the new user to the Prisma database
        const { user: profile } = await api<{ user: AuthUser }>('/auth/sync', {
            method: 'POST',
            body: { name, role },
        });

        setUser(profile);
        return profile;
    }, []);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
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

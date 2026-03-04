import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
}

interface ToastContextType {
    toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const ICONS: Record<ToastVariant, React.ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const STYLES: Record<ToastVariant, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { id, message, variant }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast container — fixed bottom-right */}
            {toasts.length > 0 && (
                <div
                    className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full"
                    role="region"
                    aria-live="polite"
                    aria-label="Notifications"
                >
                    {toasts.map(t => (
                        <div
                            key={t.id}
                            className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium animate-in slide-in-from-right-2 duration-300 ${STYLES[t.variant]}`}
                        >
                            {ICONS[t.variant]}
                            <span className="flex-1">{t.message}</span>
                            <button
                                onClick={() => dismiss(t.id)}
                                className="opacity-60 hover:opacity-100 transition-opacity ml-1 shrink-0"
                                aria-label="Dismiss notification"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}

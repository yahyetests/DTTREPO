import './app/globals.css';
import React, { useState, useEffect, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudentPurchasesProvider } from './context/StudentPurchasesContext';
import { ToastProvider } from './components/ui/toast';
import { ThemeProvider } from 'next-themes';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import Chatbot from './components/Chatbot';
import { navigate } from './lib/utils';

// Layouts (always loaded — needed for every page type)
import RootLayout from './app/layout';
import DashboardLayout from './app/(dashboard)/layout';
import AuthLayout from './app/(auth)/layout';
import ClassroomLayout from './app/(classroom)/layout';

// Lazy-loaded pages — split into separate chunks for faster initial load
const Home = React.lazy(() => import('./app/page'));
const StudentDashboardPage = React.lazy(() => import('./app/(dashboard)/dashboard/page'));
const TutorDashboardPage = React.lazy(() => import('./app/(dashboard)/tutor-dashboard/page'));
const ParentDashboardPage = React.lazy(() => import('./app/(dashboard)/parent-dashboard/page'));
const SessionsPage = React.lazy(() => import('./app/(dashboard)/dashboard/sessions/page'));
const TutorProfilePage = React.lazy(() => import('./app/(dashboard)/dashboard/tutors/[tutorId]/page'));
const ResourcesPage = React.lazy(() => import('./app/(dashboard)/dashboard/resources/page'));
const MessagesPage = React.lazy(() => import('./app/(dashboard)/dashboard/messages/page'));
const BillingPage = React.lazy(() => import('./app/(dashboard)/dashboard/billing/page'));
const SettingsPage = React.lazy(() => import('./app/(dashboard)/dashboard/settings/page'));
const StudentsPage = React.lazy(() => import('./app/(dashboard)/dashboard/students/page'));
const AvailabilityPage = React.lazy(() => import('./app/(dashboard)/dashboard/availability/page'));
const LoginPage = React.lazy(() => import('./app/(auth)/login/page'));
const RegisterPage = React.lazy(() => import('./app/(auth)/register/page'));
const GenericMarketingPage = React.lazy(() => import('./app/(marketing)/[slug]/page'));
const ClassroomPage = React.lazy(() => import('./app/(classroom)/classroom/[sessionId]/page'));
const SessionPage = React.lazy(() => import('./pages/SessionPage'));
const BecomeATutorPage = React.lazy(() => import('./pages/BecomeATutorPage'));
const SubjectsPage = React.lazy(() => import('./pages/SubjectsPage'));
const SubjectDetailPage = React.lazy(() => import('./pages/SubjectDetailPage'));
const StripeCheckoutPage = React.lazy(() => import('./pages/StripeCheckoutPage'));
const CheckoutCompletePage = React.lazy(() => import('./pages/CheckoutCompletePage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const BillingSuccessPage = React.lazy(() => import('./pages/BillingSuccessPage'));
const BillingCancelPage = React.lazy(() => import('./pages/BillingCancelPage'));
const EmailPreviewPage = React.lazy(() => import('./pages/EmailPreviewPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));

// Legal pages need named exports — use wrapper
const PrivacyPolicyPage = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.TermsPage })));
const CookiePolicyPage = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.CookiePolicyPage })));
const SafeguardingPage = React.lazy(() => import('./pages/LegalPages').then(m => ({ default: m.SafeguardingPage })));
const MockPaymentPage = React.lazy(() => import('./pages/MockPaymentPage').then(m => ({ default: m.MockPaymentPage })));

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
    </div>
);

// Helper to redirect /dashboard based on role
function DashboardRedirect() {
    const { user, loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    if (!user) {
        navigate('/login');
        return null;
    }
    switch (user.role) {
        case 'TUTOR': navigate('/tutor/dashboard'); break;
        case 'PARENT': navigate('/parent-dashboard'); break;
        case 'ADMIN': navigate('/admin'); break;
        default: navigate('/student/dashboard');
    }
    return null;
}

const Router = () => {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setPath(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Redirect map for old slugs
    const slugRedirects: Record<string, string> = {
        'poltics': 'politics',
    };

    // Simple Router Logic
    let content: React.ReactNode = null;
    let layout = 'root'; // root, dashboard, auth, classroom

    // Public routes
    if (path === '/' || path === '/index.html') {
        content = <Home />;
        layout = 'root';
    }
    // Become a Tutor
    else if (path === '/become-a-tutor') {
        content = <BecomeATutorPage />;
        layout = 'root';
    }
    // Subjects landing
    else if (path === '/subjects') {
        content = <SubjectsPage />;
        layout = 'root';
    }
    // Booking Funnel: /subjects/:slug/book
    else if (/^\/subjects\/([a-z0-9-]+)\/book$/.test(path)) {
        const subjectSlug = path.split('/')[2];
        if (slugRedirects[subjectSlug]) {
            window.location.replace(`/subjects/${slugRedirects[subjectSlug]}/book`);
            return null;
        }
        content = <BookingPage slug={subjectSlug} />;
        layout = 'root';
    }
    // Subject detail: /subjects/:slug
    else if (/^\/subjects\/([a-z0-9-]+)$/.test(path)) {
        const subjectSlug = path.split('/')[2];
        if (slugRedirects[subjectSlug]) {
            window.location.replace(`/subjects/${slugRedirects[subjectSlug]}`);
            return null;
        }
        content = <SubjectDetailPage slug={subjectSlug} />;
        layout = 'root';
    }
    // Checkout complete
    else if (path === '/checkout/complete') {
        content = <CheckoutCompletePage />;
        layout = 'root';
    }
    // Checkout
    else if (path === '/checkout') {
        content = <StripeCheckoutPage />;
        layout = 'root';
    }
    // Mock Payment (Dev only)
    else if (path.startsWith('/mock-payment')) {
        content = <MockPaymentPage />;
        layout = 'root';
    }
    // Billing Success
    else if (path === '/billing/success') {
        content = <BillingSuccessPage />;
        layout = 'root';
    }
    // Billing Cancel
    else if (path === '/billing/cancel') {
        content = <BillingCancelPage />;
        layout = 'root';
    }
    // Admin Email Preview
    else if (path === '/admin/emails') {
        content = <EmailPreviewPage />;
        layout = 'root';
    }
    // Legal Pages
    else if (path === '/privacy-policy') { content = <PrivacyPolicyPage />; layout = 'root'; }
    else if (path === '/terms') { content = <TermsPage />; layout = 'root'; }
    else if (path === '/cookie-policy') { content = <CookiePolicyPage />; layout = 'root'; }
    else if (path === '/safeguarding') { content = <SafeguardingPage />; layout = 'root'; }
    // Pricing Page
    else if (path === '/pricing') { content = <PricingPage />; layout = 'root'; }
    // Auth Routes
    else if (path === '/login') {
        content = <LoginPage />;
        layout = 'auth';
    } else if (path === '/register') {
        content = <RegisterPage />;
        layout = 'auth';
    }
    // Legacy /dashboard redirect
    else if (path === '/dashboard' || path === '/dashboard/') {
        content = <DashboardRedirect />;
        layout = 'root';
    }
    // Parent Routes (protected)
    else if (path.startsWith('/parent-dashboard')) {
        layout = 'dashboard';
        content = (
            <ProtectedRoute>
                <RoleRoute role="PARENT">
                    <ParentDashboardPage />
                </RoleRoute>
            </ProtectedRoute>
        );
    }
    // Student Routes (protected)
    else if (path.startsWith('/student/')) {
        layout = 'dashboard';
        content = (
            <ProtectedRoute>
                <RoleRoute role="STUDENT">
                    {path === '/student/dashboard' ? <StudentDashboardPage /> :
                        path === '/student/sessions' ? <SessionsPage /> :
                            path === '/student/messages' ? <MessagesPage /> :
                                path === '/student/billing' ? <BillingPage /> :
                                    path === '/student/resources' ? <ResourcesPage /> :
                                        path === '/student/settings' ? <SettingsPage /> :
                                            <StudentDashboardPage />}
                </RoleRoute>
            </ProtectedRoute>
        );
    }
    // Tutor Routes (protected)
    else if (path.startsWith('/tutor/')) {
        layout = 'dashboard';
        content = (
            <ProtectedRoute>
                <RoleRoute role="TUTOR">
                    {path === '/tutor/dashboard' ? <TutorDashboardPage /> :
                        path === '/tutor/sessions' ? <SessionsPage /> :
                            path === '/tutor/availability' ? <AvailabilityPage /> :
                                path === '/tutor/students' ? <StudentsPage /> :
                                    path === '/tutor/messages' ? <MessagesPage /> :
                                        path === '/tutor/settings' ? <SettingsPage /> :
                                            path.startsWith('/tutor/tutors/') ? (() => {
                                                const parts = path.split('/');
                                                return parts.length >= 4 ? <TutorProfilePage params={{ tutorId: parts[3] }} /> : <TutorDashboardPage />;
                                            })() :
                                                <TutorDashboardPage />}
                </RoleRoute>
            </ProtectedRoute>
        );
    }
    // Admin Routes (protected)
    else if (path.startsWith('/admin')) {
        layout = 'dashboard';
        content = (
            <ProtectedRoute>
                <RoleRoute role="ADMIN">
                    <div className="space-y-8">
                        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                        <p className="text-slate-500">Admin dashboard coming soon.</p>
                    </div>
                </RoleRoute>
            </ProtectedRoute>
        );
    }
    // Classroom Route (any authenticated user)
    else if (path.startsWith('/classroom/')) {
        const parts = path.split('/');
        if (parts.length >= 3) {
            const sessionId = parts[2];
            content = (
                <ProtectedRoute>
                    <ClassroomPage params={{ sessionId }} />
                </ProtectedRoute>
            );
            layout = 'classroom';
        } else {
            content = <GenericMarketingPage params={{ slug: "404" }} />;
            layout = 'root';
        }
    }
    // Live Session Route (any authenticated user)
    else if (/^\/session\/([^/]+)$/.test(path)) {
        const sessionId = path.split('/')[2];
        content = (
            <ProtectedRoute>
                <SessionPage sessionId={sessionId} />
            </ProtectedRoute>
        );
        layout = 'session';
    }
    // Marketing / Catch-all
    else {
        const slug = path.substring(1);
        if (slug) {
            content = <GenericMarketingPage params={{ slug }} />;
            layout = 'root';
        } else {
            content = <Home />;
            layout = 'root';
        }
    }

    // Wrap all content in Suspense for lazy loading
    const wrappedContent = (
        <Suspense fallback={<LoadingSpinner />}>
            {content}
        </Suspense>
    );

    // Render Layouts
    if (layout === 'dashboard') {
        return (
            <RootLayout>
                <DashboardLayout>
                    {wrappedContent}
                </DashboardLayout>
            </RootLayout>
        );
    } else if (layout === 'auth') {
        return (
            <RootLayout>
                <AuthLayout>
                    {wrappedContent}
                </AuthLayout>
            </RootLayout>
        );
    } else if (layout === 'classroom') {
        return (
            <ClassroomLayout>
                {wrappedContent}
            </ClassroomLayout>
        );
    } else if (layout === 'session') {
        return <>{wrappedContent}</>;
    }

    return <RootLayout>{wrappedContent}</RootLayout>;
};

const App = () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
            <ToastProvider>
                <StudentPurchasesProvider>
                    <Router />
                    <Chatbot />
                </StudentPurchasesProvider>
            </ToastProvider>
        </AuthProvider>
    </ThemeProvider>
);

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

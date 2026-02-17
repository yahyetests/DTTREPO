import './app/globals.css';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudentPurchasesProvider } from './context/StudentPurchasesContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Layouts
import RootLayout from './app/layout';
import DashboardLayout from './app/(dashboard)/layout';
import AuthLayout from './app/(auth)/layout';
import ClassroomLayout from './app/(classroom)/layout';

// Pages
import Home from './app/page';
import StudentDashboardPage from './app/(dashboard)/dashboard/page';
import TutorDashboardPage from './app/(dashboard)/tutor-dashboard/page';
import SessionsPage from './app/(dashboard)/dashboard/sessions/page';
import TutorProfilePage from './app/(dashboard)/dashboard/tutors/[tutorId]/page';
import ResourcesPage from './app/(dashboard)/dashboard/resources/page';
import MessagesPage from './app/(dashboard)/dashboard/messages/page';
import BillingPage from './app/(dashboard)/dashboard/billing/page';
import SettingsPage from './app/(dashboard)/dashboard/settings/page';
import StudentsPage from './app/(dashboard)/dashboard/students/page';
import AvailabilityPage from './app/(dashboard)/dashboard/availability/page';
import LoginPage from './app/(auth)/login/page';
import RegisterPage from './app/(auth)/register/page';
import GenericMarketingPage from './app/(marketing)/[slug]/page';
import ClassroomPage from './app/(classroom)/classroom/[sessionId]/page';
import SessionPage from './pages/SessionPage';
import BecomeATutorPage from './pages/BecomeATutorPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import StripeCheckoutPage from './pages/StripeCheckoutPage';
import CheckoutCompletePage from './pages/CheckoutCompletePage';
import BookingPage from './pages/BookingPage';
import BillingSuccessPage from './pages/BillingSuccessPage';
import BillingCancelPage from './pages/BillingCancelPage';
import EmailPreviewPage from './pages/EmailPreviewPage';
import { PrivacyPolicyPage, TermsPage, CookiePolicyPage, SafeguardingPage } from './pages/LegalPages';
import { MockPaymentPage } from './pages/MockPaymentPage';
import PricingPage from './pages/PricingPage';

// Helper to redirect /dashboard based on role
function DashboardRedirect() {
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
  switch (user.role) {
    case 'TUTOR': window.location.href = '/tutor/dashboard'; break;
    case 'ADMIN': window.location.href = '/admin'; break;
    default: window.location.href = '/student/dashboard';
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
    content = <BookingPage slug={subjectSlug} />;
    layout = 'root';
  }
  // Subject detail: /subjects/:slug
  else if (/^\/subjects\/([a-z0-9-]+)$/.test(path)) {
    const subjectSlug = path.split('/')[2];
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
    layout = 'root'; // or dashboard layout if preferred
  }
  // Legal Pages
  else if (path === '/privacy-policy') { content = <PrivacyPolicyPage />; layout = 'root'; }
  else if (path === '/terms') { content = <TermsPage />; layout = 'root'; }
  else if (path === '/cookie-policy') { content = <CookiePolicyPage />; layout = 'root'; }
  else if (path === '/safeguarding') { content = <SafeguardingPage />; layout = 'root'; }
  // Pricing Page
  else if (path === '/pricing') { content = <PricingPage />; layout = 'root'; }
  // Auth Routes
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

  // Render Layouts
  if (layout === 'dashboard') {
    return (
      <RootLayout>
        <DashboardLayout>
          {content}
        </DashboardLayout>
      </RootLayout>
    );
  } else if (layout === 'auth') {
    return (
      <RootLayout>
        <AuthLayout>
          {content}
        </AuthLayout>
      </RootLayout>
    );
  } else if (layout === 'classroom') {
    return (
      <ClassroomLayout>
        {content}
      </ClassroomLayout>
    );
  } else if (layout === 'session') {
    // SessionPage renders full-screen, no wrapping layout
    return <>{content}</>;
  }

  return <RootLayout>{content}</RootLayout>;
};

const App = () => (
  <AuthProvider>
    <StudentPurchasesProvider>
      <Router />
    </StudentPurchasesProvider>
  </AuthProvider>
);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Layouts
import RootLayout from './app/layout';
import DashboardLayout from './app/(dashboard)/layout';
import AuthLayout from './app/(auth)/layout';
import ClassroomLayout from './app/(classroom)/layout';

// Pages
import Home from './app/page';
import DashboardPage from './app/(dashboard)/dashboard/page';
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

const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple Router Logic
  let content: React.ReactNode = null;
  let layout = 'root'; // root, dashboard, auth, classroom

  // Strict routing logic
  if (path === '/' || path === '/index.html') {
    content = <Home />;
    layout = 'root';
  } 
  // Auth Routes
  else if (path === '/login') {
    content = <LoginPage />;
    layout = 'auth';
  } else if (path === '/register') {
    content = <RegisterPage />;
    layout = 'auth';
  } 
  // Dashboard Routes
  else if (path.startsWith('/dashboard')) {
    layout = 'dashboard';
    if (path === '/dashboard' || path === '/dashboard/') content = <DashboardPage />;
    else if (path === '/dashboard/sessions') content = <SessionsPage />;
    else if (path === '/dashboard/resources') content = <ResourcesPage />;
    else if (path === '/dashboard/messages') content = <MessagesPage />;
    else if (path === '/dashboard/billing') content = <BillingPage />;
    else if (path === '/dashboard/settings') content = <SettingsPage />;
    else if (path === '/dashboard/students') content = <StudentsPage />;
    else if (path === '/dashboard/availability') content = <AvailabilityPage />;
    else if (path.startsWith('/dashboard/tutors/')) {
        const parts = path.split('/');
        // Handle /dashboard/tutors/[id]
        if (parts.length >= 4) {
             const tutorId = parts[3];
             content = <TutorProfilePage params={{ tutorId }} />;
        } else {
             content = <DashboardPage />; // Fallback
        }
    } else {
        content = <DashboardPage />;
    }
  } 
  // Classroom Route
  else if (path.startsWith('/classroom/')) {
      const parts = path.split('/');
      if (parts.length >= 3) {
          const sessionId = parts[2];
          content = <ClassroomPage params={{ sessionId }} />;
          layout = 'classroom';
      } else {
           content = <GenericMarketingPage params={{ slug: "404" }} />;
           layout = 'root';
      }
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
  }

  return <RootLayout>{content}</RootLayout>;
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

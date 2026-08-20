import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Helper for lazy loading named exports
const lazyPage = (importFn, exportName) =>
  lazy(() => importFn().then((m) => ({ default: m[exportName] })));

// Public pages (lazy loaded)
const HomePage = lazyPage(() => import('./pages/public/HomePage'), 'HomePage');
const AboutPage = lazyPage(() => import('./pages/public/AboutPage'), 'AboutPage');
const ServicesPage = lazyPage(() => import('./pages/public/ServicesPage'), 'ServicesPage');
const EventsPage = lazyPage(() => import('./pages/public/EventsPage'), 'EventsPage');
const SermonsPage = lazyPage(() => import('./pages/public/SermonsPage'), 'SermonsPage');
const BlogPage = lazyPage(() => import('./pages/public/BlogPage'), 'BlogPage');
const BlogDetailPage = lazyPage(() => import('./pages/public/BlogDetailPage'), 'BlogDetailPage');
const PrayerRequestPage = lazyPage(() => import('./pages/public/PrayerRequestPage'), 'PrayerRequestPage');
const ContactPage = lazyPage(() => import('./pages/public/ContactPage'), 'ContactPage');
const TestimonialsPage = lazyPage(() => import('./pages/public/TestimonialsPage'), 'TestimonialsPage');

// Admin pages (lazy loaded)
const AdminLoginPage = lazyPage(() => import('./pages/admin/AdminLoginPage'), 'AdminLoginPage');
const AdminDashboardPage = lazyPage(() => import('./pages/admin/AdminDashboardPage'), 'AdminDashboardPage');
const AdminBlogsPage = lazyPage(() => import('./pages/admin/AdminBlogsPage'), 'AdminBlogsPage');
const AdminEventsPage = lazyPage(() => import('./pages/admin/AdminEventsPage'), 'AdminEventsPage');
const AdminSermonsPage = lazyPage(() => import('./pages/admin/AdminSermonsPage'), 'AdminSermonsPage');
const AdminPrayersPage = lazyPage(() => import('./pages/admin/AdminPrayersPage'), 'AdminPrayersPage');
const AdminMessagesPage = lazyPage(() => import('./pages/admin/AdminMessagesPage'), 'AdminMessagesPage');
const AdminSettingsPage = lazyPage(() => import('./pages/admin/AdminSettingsPage'), 'AdminSettingsPage');

const PageFallback = () => (
  <div className="page-loader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div className="spinner" aria-label="Loading page content..."></div>
  </div>
);

export function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="sermons" element={<SermonsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="prayer-request" element={<PrayerRequestPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="sermons" element={<AdminSermonsPage />} />
          <Route path="prayers" element={<AdminPrayersPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;


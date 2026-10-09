import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    addToast('Logged out successfully', 'info');
    navigate('/admin/login');
  };

  const navSections = [
    {
      title: null,
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-th-large' },
      ],
    },
    {
      title: 'Content',
      items: [
        { label: 'Blogs', path: '/admin/blogs', icon: 'fas fa-blog' },
        { label: 'Sermons', path: '/admin/sermons', icon: 'fas fa-video' },
        { label: 'Events', path: '/admin/events', icon: 'fas fa-calendar-alt' },
      ],
    },
    {
      title: 'Ministry & Care',
      items: [
        { label: 'Prayer Requests', path: '/admin/prayers', icon: 'fas fa-praying-hands' },
        { label: 'Lay Hand Prayers', path: '/admin/lay-hand-prayers', icon: 'fas fa-hand-holding-heart' },
        { label: 'Contact Messages', path: '/admin/messages', icon: 'fas fa-envelope' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { label: 'General Settings', path: '/admin/settings', icon: 'fas fa-cog' },
      ],
    },
  ];

  return (
    <div className="admin-wrapper">
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          style={{ display: 'block', opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">✝</div>
          <div className="admin-sidebar-title">
            TCONG Admin
            <small>Content Management</small>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {navSections.map((section, idx) => (
            <div key={idx} className="admin-nav-section">
              {section.title && <div className="admin-nav-label">{section.title}</div>}
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className={item.icon}></i> {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {user?.full_name?.substring(0, 2).toUpperCase() || 'SA'}
            </div>
            <div>
              <div className="admin-user-name">{user?.full_name || 'Super Admin'}</div>
              <div className="admin-user-role">{user?.role_name || user?.role || 'Super Admin'}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ width: '100%', justifyContent: 'flex-start' }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="admin-topbar-title">TCONG CMS</h2>
          </div>
          <div className="admin-topbar-right">
            <Link to="/" target="_blank" className="admin-view-site">
              <i className="fas fa-external-link-alt"></i> View Site
            </Link>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

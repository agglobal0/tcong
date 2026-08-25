import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

export const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = () => {
    setLoading(true);
    api.admin
      .getDashboard()
      .then((res) => {
        if (res && res.data) {
          setDashboardData(res.data);
        } else if (res) {
          setDashboardData(res);
        }
      })
      .catch((err) => {
        console.error('Dashboard fetch error:', err);
        setDashboardData(null);
      })
      .finally(() => setLoading(false));
  };

  const s = dashboardData?.stats || dashboardData || {};
  const recentActivity = dashboardData?.recent_activity || [];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  const pendingPrayersCount = s.pending_prayers ?? s.new_prayer_requests ?? 0;
  const publishedBlogsCount = s.total_blogs ?? s.published_blogs ?? 0;
  const unreadMessagesCount = s.unread_messages ?? 0;
  const publishedSermonsCount = s.published_sermons ?? 0;

  return (
    <div className="admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Dashboard Overview</h3>
          <p className="text-muted small mb-0">Real-time church activity counters and administration</p>
        </div>
        <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={fetchDashboard}>
          <i className="fas fa-sync-alt me-1"></i> Refresh Data
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <span className="text-muted small fw-semibold">PRAYER REQUESTS</span>
            <h3 className="fw-bold text-warning mb-0 mt-2">
              {pendingPrayersCount} Pending
            </h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <span className="text-muted small fw-semibold">PUBLISHED BLOGS</span>
            <h3 className="fw-bold text-success mb-0 mt-2">
              {publishedBlogsCount}
            </h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <span className="text-muted small fw-semibold">CONTACT INQUIRIES</span>
            <h3 className="fw-bold text-info mb-0 mt-2">
              {unreadMessagesCount} Unread
            </h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <span className="text-muted small fw-semibold">PUBLISHED SERMONS</span>
            <h3 className="fw-bold text-primary mb-0 mt-2">
              {publishedSermonsCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Log Section */}
      {recentActivity.length > 0 && (
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <h5 className="fw-bold mb-3">Recent Activity</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((log) => (
                  <tr key={log.id}>
                    <td className="fw-semibold">{log.user_name || 'System'}</td>
                    <td><span className="badge bg-secondary">{log.action || 'Activity'}</span></td>
                    <td className="small text-muted">{log.details || log.description || '-'}</td>
                    <td className="small text-muted">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;

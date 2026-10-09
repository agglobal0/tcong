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
  const pendingLayHandCount = s.pending_lay_hand ?? 0;
  const publishedBlogsCount = s.total_blogs ?? s.published_blogs ?? 0;
  const unreadMessagesCount = s.unread_messages ?? 0;
  const publishedSermonsCount = s.published_sermons ?? 0;

  return (
    <div className="admin-dashboard">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">Dashboard Overview</h3>
          <p className="text-muted small mb-0">Real-time church activity counters and administration</p>
        </div>
        <button className="btn btn-sm btn-outline-primary rounded-pill px-3 text-nowrap" onClick={fetchDashboard}>
          <i className="fas fa-sync-alt me-1"></i> Refresh Data
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
              <span className="text-muted small fw-semibold text-truncate pe-1">PRAYER REQUESTS</span>
              <i className="fas fa-praying-hands text-warning flex-shrink-0" style={{ fontSize: '1.25rem' }}></i>
            </div>
            <h3 className="fw-bold text-warning mb-1">
              {pendingPrayersCount} Pending
            </h3>
            <small className="text-muted">{s.total_prayer_requests || 0} Total</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
              <span className="text-muted small fw-semibold text-truncate pe-1">LAY HAND PRAYERS</span>
              <i className="fas fa-hand-holding-heart text-danger flex-shrink-0" style={{ fontSize: '1.25rem' }}></i>
            </div>
            <h3 className="fw-bold text-danger mb-1">
              {pendingLayHandCount} Pending
            </h3>
            <small className="text-muted">{s.total_lay_hand || 0} Total Submissions</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
              <span className="text-muted small fw-semibold text-truncate pe-1">PUBLISHED BLOGS</span>
              <i className="fas fa-blog text-success flex-shrink-0" style={{ fontSize: '1.25rem' }}></i>
            </div>
            <h3 className="fw-bold text-success mb-1">
              {publishedBlogsCount}
            </h3>
            <small className="text-muted">Articles active</small>
          </div>
        </div>

        <div className="col-6 col-md-6 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
              <span className="text-muted small fw-semibold text-truncate pe-1">CONTACT INQUIRIES</span>
              <i className="fas fa-envelope text-info flex-shrink-0" style={{ fontSize: '1.25rem' }}></i>
            </div>
            <h3 className="fw-bold text-info mb-1">
              {unreadMessagesCount} Unread
            </h3>
            <small className="text-muted">Visitor inquiries</small>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
              <span className="text-muted small fw-semibold text-truncate pe-1">SERMONS</span>
              <i className="fas fa-video text-primary flex-shrink-0" style={{ fontSize: '1.25rem' }}></i>
            </div>
            <h3 className="fw-bold text-primary mb-1">
              {publishedSermonsCount}
            </h3>
            <small className="text-muted">Videos published</small>
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

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
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Dashboard Overview</h3>
          <p className="text-muted small mb-0">Real-time church activity counters and administration</p>
        </div>
        <button className="btn btn-sm btn-outline-primary rounded-pill px-3 text-nowrap" onClick={fetchDashboard}>
          <i className="fas fa-sync-alt me-1"></i> Refresh Data
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-2 mb-4">
        <div className="col-6 col-md-4 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>PRAYERS</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-warning-subtle text-warning" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-praying-hands" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
              <h3 className="fw-bold text-warning mb-0">{pendingPrayersCount}</h3>
              <span className="small text-muted fw-semibold">Pending</span>
            </div>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>{s.total_prayer_requests || 0} Total</div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>LAY HAND</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-danger-subtle text-danger" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-hand-holding-heart" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
              <h3 className="fw-bold text-danger mb-0">{pendingLayHandCount}</h3>
              <span className="small text-muted fw-semibold">Pending</span>
            </div>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>{s.total_lay_hand || 0} Total</div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>BLOGS</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-success-subtle text-success" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-blog" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
              <h3 className="fw-bold text-success mb-0">{publishedBlogsCount}</h3>
            </div>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>Articles active</div>
          </div>
        </div>

        <div className="col-6 col-md-6 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>INQUIRIES</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-info-subtle text-info" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-envelope" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
              <h3 className="fw-bold text-info mb-0">{unreadMessagesCount}</h3>
              <span className="small text-muted fw-semibold">Unread</span>
            </div>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>Visitor messages</div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>SERMONS</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary-subtle text-primary" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-video" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
              <h3 className="fw-bold text-primary mb-0">{publishedSermonsCount}</h3>
            </div>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>Published videos</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log Section */}
      {recentActivity.length > 0 && (
        <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 bg-white">
          <h5 className="fw-bold mb-3">Recent Activity</h5>

          {/* Mobile view for recent activity (< 768px) */}
          <div className="d-md-none">
            {recentActivity.map((log) => (
              <div key={log.id} className="p-2.5 rounded-3 bg-light mb-2 border">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold text-dark small">{log.user_name || 'System'}</span>
                  <span className="badge bg-secondary text-capitalize" style={{ fontSize: '0.7rem' }}>
                    {log.action || 'Activity'}
                  </span>
                </div>
                {log.details || log.description ? (
                  <div className="small text-muted mb-1">{log.details || log.description}</div>
                ) : null}
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  <i className="fas fa-clock me-1"></i>
                  {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table view (>= 768px) */}
          <div className="table-responsive d-none d-md-block" style={{ overflowX: 'auto', width: '100%' }}>
            <table className="table table-hover align-middle mb-0 w-100">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: '130px' }}>User</th>
                  <th style={{ minWidth: '110px' }}>Action</th>
                  <th style={{ minWidth: '200px' }}>Details</th>
                  <th style={{ minWidth: '150px' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((log) => (
                  <tr key={log.id}>
                    <td className="fw-semibold">{log.user_name || 'System'}</td>
                    <td><span className="badge bg-secondary">{log.action || 'Activity'}</span></td>
                    <td className="small text-muted">{log.details || log.description || '-'}</td>
                    <td className="small text-muted text-nowrap">{new Date(log.created_at).toLocaleString()}</td>
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

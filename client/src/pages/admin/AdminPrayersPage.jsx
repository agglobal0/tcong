import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminPrayersPage = () => {
  const { addToast } = useToast();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrayers = () => {
    setLoading(true);
    api.admin
      .getPrayers()
      .then((res) => setPrayers(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.admin.updatePrayer(id, { status });
      addToast(`Prayer status updated to ${status}`, 'success');
      fetchPrayers();
    } catch (err) {
      addToast(err.message || 'Failed to update prayer status', 'error');
    }
  };

  return (
    <div className="admin-prayers">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Prayer Request Workflow</h3>
          <p className="text-muted small mb-0">Track intercessory prayer pipeline and care notes</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Category</th>
                <th>Submitted By</th>
                <th>Request Text</th>
                <th>Status</th>
                <th className="text-end pe-4">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {prayers.length > 0 ? (
                prayers.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-4">
                      <span className="badge bg-primary-subtle text-primary">{p.category || 'General'}</span>
                    </td>
                    <td>{p.is_anonymous ? <em>Anonymous</em> : p.name || 'Visitor'}</td>
                    <td className="small" style={{ maxWidth: '300px' }}>{p.request_text}</td>
                    <td>
                      <span
                        className={`badge ${
                          (p.status || '').toUpperCase() === 'CLOSED'
                            ? 'bg-secondary'
                            : (p.status || '').toUpperCase() === 'PRAYED'
                            ? 'bg-success'
                            : (p.status || '').toUpperCase() === 'IN_PRAYER'
                            ? 'bg-info'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {(p.status || 'NEW').toUpperCase()}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <select
                        className="form-select form-select-sm d-inline-block w-auto"
                        value={(p.status || 'new').toLowerCase()}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      >
                        <option value="new">NEW</option>
                        <option value="assigned">ASSIGNED</option>
                        <option value="in_prayer">IN_PRAYER</option>
                        <option value="prayed">PRAYED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No prayer requests in pipeline.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

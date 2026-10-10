import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminMessagesPage = () => {
  const { addToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    api.admin
      .getMessages()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setMessages(list);
      })
      .catch((err) => {
        console.error('Failed to fetch messages:', err);
        addToast(err?.message || 'Failed to load messages', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      await api.admin.deleteMessage(id);
      addToast('Message deleted', 'info');
      fetchMessages();
    } catch (err) {
      addToast(err.message || 'Failed to delete message', 'error');
    }
  };

  return (
    <div className="admin-messages">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">Contact Messages Inbox</h3>
          <p className="text-muted small mb-0">Inquiries and visitor messages received from website</p>
        </div>
        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={fetchMessages}>
          <i className="fas fa-sync-alt me-1"></i> Refresh Inbox
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-2 mb-4">
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>TOTAL MESSAGES</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-info-subtle text-info" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-envelope" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <h3 className="fw-bold text-info mb-0">{messages.length}</h3>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>Visitor inquiries</div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>RECENT INQUIRIES</span>
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary-subtle text-primary" style={{ width: '28px', height: '28px' }}>
                <i className="fas fa-clock" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
            <h3 className="fw-bold text-primary mb-0">
              {messages.filter(m => (Date.now() - new Date(m.created_at || Date.now()).getTime()) < 7 * 86400000).length}
            </h3>
            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>Past 7 days</div>
          </div>
        </div>
      </div>

      {/* Content: Mobile Cards + Desktop Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <>
          {/* Mobile Card View (visible on < 768px screens) */}
          <div className="d-md-none">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div key={m.id} className="admin-mobile-card">
                  <div className="admin-mobile-card-header">
                    <div>
                      <div className="fw-bold text-dark fs-6">{m.name || 'Visitor'}</div>
                      <small className="text-muted">
                        <i className="fas fa-calendar-alt me-1"></i>
                        {new Date(m.created_at || Date.now()).toLocaleDateString()}
                      </small>
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary px-2.5 py-1 rounded-pill">
                      {m.subject || 'Inquiry'}
                    </span>
                  </div>

                  <div className="mb-2">
                    {m.phone && (
                      <div className="small mb-1">
                        <i className="fas fa-phone-alt text-primary me-1"></i>
                        <a href={`tel:${m.phone}`} className="text-decoration-none text-dark fw-semibold">
                          {m.phone}
                        </a>
                      </div>
                    )}
                    {m.email && (
                      <div className="small text-muted text-truncate mb-1">
                        <i className="fas fa-envelope text-primary me-1"></i>
                        <a href={`mailto:${m.email}`} className="text-decoration-none text-muted">
                          {m.email}
                        </a>
                      </div>
                    )}
                    <div className="p-2.5 rounded-3 bg-light text-dark small mt-2" style={{ lineHeight: '1.45' }}>
                      {m.message}
                    </div>
                  </div>

                  <div className="admin-mobile-card-footer justify-content-end">
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                      onClick={() => handleDelete(m.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i> Delete Message
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white text-muted">
                <i className="fas fa-inbox fa-2x mb-2 opacity-50"></i>
                <p className="mb-0 small">Inbox is empty.</p>
              </div>
            )}
          </div>

          {/* Desktop Table View (visible on >= 768px screens) */}
          <div className="card border-0 shadow-sm rounded-4 bg-white d-none d-md-block">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
              <table className="table table-hover align-middle mb-0 w-100">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3 ps-md-4" style={{ minWidth: '160px' }}>Sender</th>
                    <th style={{ minWidth: '130px' }}>Subject</th>
                    <th style={{ minWidth: '220px' }}>Message</th>
                    <th style={{ minWidth: '100px' }}>Date</th>
                    <th className="text-end pe-3 pe-md-4" style={{ minWidth: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length > 0 ? (
                    messages.map((m) => (
                      <tr key={m.id}>
                        <td className="ps-3 ps-md-4">
                          <div className="fw-semibold text-dark">{m.name}</div>
                          <small className="text-muted d-block text-truncate" style={{ maxWidth: '160px' }}>{m.email}</small>
                          {m.phone && <small className="text-muted"><i className="fas fa-phone-alt me-1"></i>{m.phone}</small>}
                        </td>
                        <td className="fw-semibold text-secondary">{m.subject || 'General Inquiry'}</td>
                        <td className="small text-muted" style={{ maxWidth: '300px' }}>{m.message}</td>
                        <td className="text-nowrap small text-muted">{new Date(m.created_at || Date.now()).toLocaleDateString()}</td>
                        <td className="text-end pe-3 pe-md-4 text-nowrap">
                          <button className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" onClick={() => handleDelete(m.id)}>
                            <i className="fas fa-trash-alt me-1"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        Inbox is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

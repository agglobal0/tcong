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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Contact Messages Inbox</h3>
          <p className="text-muted small mb-0">Inquiries and visitor messages received from website</p>
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
                <th className="ps-4">Sender</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((m) => (
                  <tr key={m.id}>
                    <td className="ps-4">
                      <div className="fw-semibold">{m.name}</div>
                      <small className="text-muted d-block">{m.email}</small>
                      {m.phone && <small className="text-muted"><i className="fas fa-phone-alt me-1"></i>{m.phone}</small>}
                    </td>
                    <td>{m.subject || 'General Inquiry'}</td>
                    <td className="small" style={{ maxWidth: '300px' }}>{m.message}</td>
                    <td>{new Date(m.created_at || Date.now()).toLocaleDateString()}</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>
                        Delete
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
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const cleanEmail = String(email).trim().toLowerCase();
      const cleanPassword = String(password).trim();
      await login(cleanEmail, cleanPassword);
      addToast('Welcome to TCONG Admin Portal', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
        padding: '1.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4" style={{ background: '#FFFFFF' }}>
          <div className="text-center mb-4">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                margin: '0 auto 1rem',
              }}
            >
              ✝
            </div>
            <h2 className="fw-bold mb-1" style={{ color: '#1E293B' }}>Admin Sign In</h2>
            <p className="text-muted small">The Church of New Generation CMS</p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger py-2 small mb-3" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">Email Address</label>
              <input
                type="email"
                name="admin_email"
                autoComplete="off"
                className="form-control"
                placeholder="admin@tcong.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small text-secondary">Password</label>
              <input
                type="password"
                name="admin_password"
                autoComplete="new-password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

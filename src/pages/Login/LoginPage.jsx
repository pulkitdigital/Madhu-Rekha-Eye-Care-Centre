import { useState } from 'react';
import { FaHospital, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';

// ✅ YAHAN APNA LOGIN ID AUR PASSWORD LIKHO
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'madhurekha123';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      onLogin();
    } else {
      setError('Galat ID ya Password. Dobara try karein.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* Logo / Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <FaHospital size={28} color="#fff" />
          </div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
            Hospital Management
          </h1>
          <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px' }}>
            Please login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
              Login ID
            </label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="Enter your ID"
              required
              style={{
                width: '100%', padding: '10px 14px',
                border: '1.5px solid #e2e8f0', borderRadius: '8px',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#0ea5e9'}
              onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password"
                required
                style={{
                  width: '100%', padding: '10px 40px 10px 14px',
                  border: '1.5px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: '#94a3b8',
                  display: 'flex', alignItems: 'center',
                }}>
                {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: '8px', padding: '10px 14px',
              color: '#dc2626', fontSize: '13px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <FiAlertCircle size={15} />
              {error}
            </div>
          )}

          <button type="submit" style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
            border: 'none', borderRadius: '8px',
            color: '#fff', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', letterSpacing: '0.3px',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '12402556' && password === 'nihal666') {
      localStorage.setItem('admin_session', 'active_' + Date.now());
      navigate('/admin');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-secondary border border-border rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-accent">ADMIN ACCESS</h1>
          <p className="text-textSecondary text-sm">Enter secure credentials to proceed</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-statusOutOfStock/10 border border-statusOutOfStock/20 text-statusOutOfStock text-sm font-bold text-center rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">Username</label>
            <input 
              required
              type="text" 
              className="w-full bg-primary border border-border rounded-lg p-3 text-white focus:border-accent outline-none transition-all"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">Password</label>
            <input 
              required
              type="password" 
              className="w-full bg-primary border border-border rounded-lg p-3 text-white focus:border-accent outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-accentHover text-white py-4 rounded-full font-black tracking-widest transition-all shadow-xl shadow-accent/20 active:scale-95"
          >
            AUTHORIZE
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

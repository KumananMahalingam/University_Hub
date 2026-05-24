import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { loginUser }           = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password });
      loginUser({ id: res.data.id, name: res.data.name, email }, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email"    value={email}    onChange={e => setEmail(e.target.value)}
                 placeholder="Email"    required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                 placeholder="Password" required />
          <div className="options">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <Link to="/register" style={{ marginLeft: 'auto', color: 'white', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to="/register" id="register">Register</Link></p>
        </form>
      </div>
    </div>
  );
}
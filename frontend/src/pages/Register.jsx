import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/api';

export default function Register() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { loginUser }           = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await register({ name, email, password });
      loginUser({ id: res.data.id, name: res.data.name, email }, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h2>Register</h2>
        {error && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text"     value={name}     onChange={e => setName(e.target.value)}
                 placeholder="Name"     required />
          <input type="email"    value={email}    onChange={e => setEmail(e.target.value)}
                 placeholder="Email"    required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                 placeholder="Password" required minLength={6} />
          <div className="options">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/login" id="login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
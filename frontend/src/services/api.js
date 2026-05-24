import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────
export const login    = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// ── Universities ──────────────────────────────────────────────────────────
export const getUniversity = (id)  => api.get(`/universities/${id}`);

// ── Reviews ──────────────────────────────────────────────────────────────
export const getReviews    = (uid) => api.get(`/reviews/${uid}`);
export const submitReview  = (data) => api.post('/submit-review', data);

// ── Calculator ────────────────────────────────────────────────────────────
export const getAverages       = (uniId, majorId) => api.get(`/averages/${uniId}/${majorId}`);
export const getAiInsight      = (data)           => api.post('/ai-admission-insight', data);

export default api;
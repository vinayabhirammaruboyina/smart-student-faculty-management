import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.smartcampus.internal/v1',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor injecting simulated JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') || 'DEMO_JWT_SESSION_PARUL_MCA';
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sms-user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock latency simulator
export const simulateLatency = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

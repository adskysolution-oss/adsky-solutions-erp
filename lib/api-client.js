/**
 * AdSky API Client
 * Centralized fetch wrapper for backend communication.
 * Primarily uses internal Next.js API routes (/api).
 */
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper to get cookie by name
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getCookie('token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  // Force internal /api/admin to use the built-in Next.js backend
  const baseUrl = '/api/admin';
  const url = `${baseUrl}${endpoint}`;


  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'API request failed');
  }

  return data;
};

export const adminAPI = {
  getUsers: () => apiFetch('/users'),
  getApplications: () => apiFetch('/applications'),
  updateApplicationStatus: (id, status, remarks) => apiFetch('/applications', {
    method: 'PATCH',
    body: JSON.stringify({ applicationId: id, applicationStatus: status, remarks })
  }),
  getPartners: () => apiFetch('/partners'),
  getEmployees: () => apiFetch('/employees'),
  getStats: () => apiFetch('/stats'),
  getLeads: () => apiFetch('/leads'),
  
  // Generic CRUD wrappers
  post: (endpoint, body) => apiFetch(endpoint.replace('/api/admin', ''), {
    method: 'POST',
    body: JSON.stringify(body)
  }),
  patch: (endpoint, body) => apiFetch(endpoint.replace('/api/admin', ''), {
    method: 'PATCH',
    body: JSON.stringify(body)
  }),
  delete: (endpoint) => apiFetch(endpoint.replace('/api/admin', ''), {
    method: 'DELETE'
  }),
};



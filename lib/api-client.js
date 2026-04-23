/**
 * AdSky API Client
 * Centralized fetch wrapper for backend communication.
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

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

export const adminAPI = {
  getUsers: () => apiFetch('/users'),
  getLoans: () => apiFetch('/loans'),
  updateLoanStatus: (id, status) => apiFetch(`/loans/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  getPartners: () => apiFetch('/partners'),
  getEmployees: () => apiFetch('/employees'),
  getSummaryReport: () => apiFetch('/reports/summary'),
  getPayments: () => apiFetch('/payments/verify'), // Placeholder for list
};

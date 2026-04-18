/**
 * AdSky API Client
 * Centralized fetch wrapper for backend communication.
 */
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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

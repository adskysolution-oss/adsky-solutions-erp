'use client';
import { useState, useEffect } from 'react';
import { 
  CreditCard, Search, Filter, Download, 
  Loader2, CheckCircle2, AlertCircle, 
  Clock, IndianRupee, User, Building,
  X, Calendar, RefreshCcw
} from 'lucide-react';

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  async function loadPayments() {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        status: statusFilter,
        search: searchTerm,
        dateRange: dateFilter
      }).toString();
      const res = await fetch(`/api/admin/payments?${query}`);
      const data = await res.json();
      setPayments(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadPayments();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [statusFilter, searchTerm, dateFilter]);

  const exportCSV = () => {
    if (payments.length === 0) return;
    const headers = ['Order ID', 'Employer', 'Company', 'Plan', 'Amount', 'Status', 'Date'];
    const rows = payments.map(p => [
      p.orderId,
      p.employerId?.name || 'Unknown',
      p.employerId?.companyName || 'N/A',
      p.planName,
      p.amount,
      p.status,
      new Date(p.createdAt).toLocaleDateString()
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_${dateFilter}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE': return '#22c55e';
      case 'PENDING': return '#f59e0b';
      case 'FAILED': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Transaction Log</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Monitor all employer subscription payments and order history.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={loadPayments} style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
            <RefreshCcw size={18} />
          </button>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,1)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <Download size={16} />
            Export Filtered
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input type="text" placeholder="Search by Order ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '10px 12px 10px 42px', color: 'white', fontSize: '14px' }} />
        </div>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 16px', color: '#94a3b8', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 16px', color: '#94a3b8', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Employer / Plan</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Transaction Info</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: '60px', textAlign: 'center' }}><Loader2 size={32} className="animate-spin mx-auto text-blue-500" /></td></tr>
            ) : payments.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                      <Building size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{p.employerId?.companyName || 'Unknown Corp'}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{p.planName} Plan</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: '600', marginBottom: '4px' }}>{p.orderId}</div>
                  <div style={{ fontSize: '11px', color: '#475569', letterSpacing: '0.05em' }}>ID: {p.paymentId || 'N/A'}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IndianRupee size={14} />
                    {p.amount}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '10px', background: `${getStatusColor(p.status)}15`, color: getStatusColor(p.status), fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(p.status) }} />
                    {p.status}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#94a3b8' }}>
                  {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {!loading && payments.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#475569' }}>No transactions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

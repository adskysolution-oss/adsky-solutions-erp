'use client';
import { useState, useEffect } from 'react';
import { 
  CreditCard, CheckCircle2, XCircle, Clock, 
  Download, Search, Filter, RefreshCw, Loader2,
  IndianRupee, TrendingUp, AlertCircle, ExternalLink,
  BarChart2, Calendar, User, Hash
} from 'lucide-react';

const statusColors = {
  PAID: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', label: 'PAID' },
  ACTIVE: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', label: 'ACTIVE' },
  pending: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', label: 'PENDING' },
  failed: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', label: 'FAILED' },
};

export default function PaymentsAdmin() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cashfreeConfig, setCashfreeConfig] = useState({
    clientId: '', clientSecret: '', env: 'sandbox'
  });
  const [activeTab, setActiveTab] = useState('transactions');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const saveCashfreeConfig = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/cms/config', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cashfreeConfig })
      });
      setShowSuccess('Cashfree settings saved!');
      setTimeout(() => setShowSuccess(''), 3000);
    } catch (e) {} finally { setSaving(false); }
  };

  const totalRevenue = subscriptions.filter(s => ['PAID', 'ACTIVE'].includes(s.status)).reduce((sum, s) => sum + (s.amount || 0), 0);
  const pending = subscriptions.filter(s => s.status === 'pending').length;
  const successful = subscriptions.filter(s => ['PAID', 'ACTIVE'].includes(s.status)).length;

  const downloadCSV = () => {
    const headers = ['Order ID', 'Plan', 'Amount', 'Status', 'Date'];
    const rows = subscriptions.map(s => [s.orderId, s.planName, s.amount, s.status, new Date(s.createdAt).toLocaleString('en-IN')]);
    const csv = "data:text/csv;charset=utf-8," + headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = 'payments_report.csv';
    a.click();
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '950', color: 'white', margin: 0 }}>Payment Intelligence</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Cashfree Gateway · Transaction Reports · Revenue Analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={downloadCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '14px', color: '#60a5fa', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {showSuccess && (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: '700' }}>
          <CheckCircle2 size={18} /> {showSuccess}
        </div>
      )}

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
          { label: 'Successful Payments', value: successful, icon: CheckCircle2, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
          { label: 'Pending Orders', value: pending, icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Total Transactions', value: subscriptions.length, icon: BarChart2, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
        ].map((card, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: card.bg, color: card.color }}><card.icon size={20} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>{card.value}</div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '16px', width: 'fit-content', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { id: 'transactions', label: 'Transactions' },
          { id: 'gateway', label: 'Cashfree Settings' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === tab.id ? 'rgba(59,130,246,0.15)' : 'transparent', color: activeTab === tab.id ? '#60a5fa' : '#64748b', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      {activeTab === 'transactions' && (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><Loader2 className="animate-spin" size={40} color="#3b82f6" /></div>
          ) : subscriptions.length === 0 ? (
            <div style={{ padding: '80px', textAlign: 'center', color: '#475569' }}>
              <CreditCard size={48} style={{ marginBottom: '16px', opacity: 0.1 }} />
              <p style={{ fontWeight: '800', fontSize: '16px' }}>No transactions yet</p>
              <p style={{ fontSize: '13px', opacity: 0.6, marginTop: '8px' }}>Payments will appear here when users checkout.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['ORDER ID', 'PLAN / PRODUCT', 'AMOUNT', 'STATUS', 'DATE', 'ACTION'].map(h => (
                    <th key={h} style={{ padding: '18px 20px', textAlign: h === 'ACTION' ? 'right' : 'left', fontSize: '11px', color: '#475569', fontWeight: '800', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, i) => {
                  const st = statusColors[sub.status] || { bg: 'rgba(255,255,255,0.05)', color: '#94a3b8', label: sub.status };
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', fontFamily: 'monospace' }}>{sub.orderId?.slice(-12)}</div>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: 'white' }}>{sub.planName || 'Subscription'}</div>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '900', color: '#10b981' }}>₹{(sub.amount || 0).toLocaleString('en-IN')}</div>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '900', background: st.bg, color: st.color }}>{st.label}</span>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-IN') : '—'}</div>
                      </td>
                      <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                        <a href={`/api/payment/cashfree?order_id=${sub.orderId}`} target="_blank" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: 'none', borderRadius: '10px', color: '#64748b', cursor: 'pointer', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <ExternalLink size={14} /> View
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Cashfree Settings Tab */}
      {activeTab === 'gateway' && (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '40px', maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', padding: '20px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '18px' }}>
            <img src="https://cashfreelogo.cashfree.com/cashfreepayments/website-logo/white.png" alt="Cashfree" style={{ height: '28px', filter: 'brightness(0) invert(1)' }} onError={e => e.currentTarget.style.display='none'} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>Cashfree Payment Gateway</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>India's leading payment gateway · UPI, Cards, NetBanking, Wallets</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {['sandbox', 'production'].map(env => (
              <button key={env} onClick={() => setCashfreeConfig({ ...cashfreeConfig, env })} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid', borderColor: cashfreeConfig.env === env ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.07)', background: cashfreeConfig.env === env ? 'rgba(59,130,246,0.1)' : 'transparent', color: cashfreeConfig.env === env ? '#60a5fa' : '#64748b', fontWeight: '800', cursor: 'pointer', textTransform: 'capitalize', fontSize: '13px' }}>
                {env === 'sandbox' ? '🧪 Test Mode' : '🚀 Live Mode'}
              </button>
            ))}
          </div>

          {cashfreeConfig.env === 'production' && (
            <div style={{ padding: '14px 18px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '10px', color: '#ef4444', fontSize: '13px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>Live mode will charge real money. Use Sandbox for testing first.</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', letterSpacing: '0.08em', marginBottom: '8px', display: 'block' }}>CASHFREE CLIENT ID</label>
              <input style={inputStyle} placeholder="Your Cashfree App ID" value={cashfreeConfig.clientId} onChange={e => setCashfreeConfig({ ...cashfreeConfig, clientId: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', letterSpacing: '0.08em', marginBottom: '8px', display: 'block' }}>CASHFREE CLIENT SECRET</label>
              <input type="password" style={inputStyle} placeholder="Your Cashfree Secret Key" value={cashfreeConfig.clientSecret} onChange={e => setCashfreeConfig({ ...cashfreeConfig, clientSecret: e.target.value })} />
            </div>
          </div>

          <div style={{ marginTop: '28px', padding: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '12px' }}>WEBHOOK URL (Add this in Cashfree Dashboard)</div>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#60a5fa', wordBreak: 'break-all' }}>
              {typeof window !== 'undefined' ? window.location.origin : 'https://adskysolution.com'}/api/payment/webhook
            </div>
          </div>

          <div style={{ padding: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '10px' }}>WHERE TO GET YOUR CREDENTIALS:</div>
            <a href="https://merchant.cashfree.com/merchants/login" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>
              <ExternalLink size={14} /> Login to Cashfree Dashboard → API Keys
            </a>
          </div>

          <button onClick={saveCashfreeConfig} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {saving ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
            {saving ? 'Saving...' : 'Save Cashfree Configuration'}
          </button>
        </div>
      )}
    </div>
  );
}

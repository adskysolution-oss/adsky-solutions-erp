'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Users, 
  Briefcase, 
  CreditCard, 
  FileText,
  Filter,
  CheckCircle,
  AlertCircle,
  Loader2,
  Database
} from 'lucide-react';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'users', label: 'User Reports', icon: Users },
    { id: 'jobs', label: 'Job Analytics', icon: Briefcase },
    { id: 'earnings', label: 'Revenue/Earnings', icon: CreditCard },
  ];

  async function fetchReport(type) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports?type=${type}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchReport(activeTab);
  }, [activeTab]);

  const downloadCSV = () => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(v => `"${v}"`).join(','));
    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adsky_${activeTab}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Database className="text-blue-500" size={32} /> Central Reporting Engine
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Audit and export ERP-wide data for analysis.</p>
        </div>
        <button 
          onClick={downloadCSV}
          disabled={loading || data.length === 0}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 24px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 20px rgba(16,185,129,0.2)' }}
        >
          <Download size={20} /> Export to CSV
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)', width: 'fit-content' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', borderRadius: '14px', border: 'none', background: activeTab === tab.id ? 'rgba(59,130,246,0.1)' : 'transparent', color: activeTab === tab.id ? '#60a5fa' : '#64748b', fontWeight: activeTab === tab.id ? '800' : '600', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Data Grid */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
            <Loader2 size={48} className="animate-spin mx-auto mb-4" />
            Compiling report data...
          </div>
        ) : data.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
            <FileText size={48} className="mx-auto mb-4 opacity-20" />
            No records found for this category.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                   {Object.keys(data[0]).filter(k => k !== '_id' && k !== '__v' && k !== 'password').slice(0, 7).map(key => (
                     <th key={key} style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{key}</th>
                   ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', hover: { background: 'rgba(255,255,255,0.01)' } }}>
                    {Object.keys(data[0]).filter(k => k !== '_id' && k !== '__v' && k !== 'password').slice(0, 7).map(key => (
                      <td key={key} style={{ padding: '18px 24px', fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>
                        {typeof row[key] === 'object' ? JSON.stringify(row[key]?.name || row[key]) : String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

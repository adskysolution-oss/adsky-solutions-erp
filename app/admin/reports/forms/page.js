'use client';
import { useState, useEffect } from 'react';
import { 
  FileText, Download, Trash2, Search, Filter, 
  ChevronRight, Calendar, User, Mail, Smartphone,
  CheckCircle2, XCircle, Clock, Loader2, Database
} from 'lucide-react';

export default function FormReports() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await fetch('/api/admin/forms/responses');
      const data = await res.json();
      setResponses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const headers = ['Form Name', 'Data', 'Status', 'Date'];
    const rows = responses.map(r => [
      r.form?.formName,
      JSON.stringify(r.data),
      r.status,
      new Date(r.createdAt).toLocaleString()
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "form_responses.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 className="animate-spin" size={40} color="#3b82f6" /></div>;

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
         <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0 }}>Form Intelligence Reports</h1>
            <p style={{ color: '#475569', fontSize: '15px', marginTop: '8px' }}>Manage all applications and lead submissions from dynamic site nodes.</p>
         </div>
         <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', color: '#60a5fa', fontSize: '14px', fontWeight: '900', cursor: 'pointer' }}>
            <Download size={18} /> Export Data (CSV)
         </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
         {[
           { label: 'Total Submissions', value: responses.length, icon: Database, color: '#3b82f6' },
           { label: 'New Entries', value: responses.filter(r => r.status === 'New').length, icon: Clock, color: '#f59e0b' },
           { label: 'Reviewed', value: responses.filter(r => r.status === 'Reviewed').length, icon: CheckCircle2, color: '#10b981' }
         ].map((stat, i) => (
           <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                 <div style={{ padding: '10px', borderRadius: '12px', background: `${stat.color}11`, color: stat.color }}><stat.icon size={20} /></div>
                 <div style={{ fontSize: '11px', color: '#475569', fontWeight: '800' }}>REAL-TIME</div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</div>
           </div>
         ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', overflow: 'hidden' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
               <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '24px', textAlign: 'left', fontSize: '12px', color: '#475569', fontWeight: '800' }}>NODE / FORM TYPE</th>
                  <th style={{ padding: '24px', textAlign: 'left', fontSize: '12px', color: '#475569', fontWeight: '800' }}>SUBMISSION INTELLIGENCE</th>
                  <th style={{ padding: '24px', textAlign: 'left', fontSize: '12px', color: '#475569', fontWeight: '800' }}>STATUS</th>
                  <th style={{ padding: '24px', textAlign: 'right', fontSize: '12px', color: '#475569', fontWeight: '800' }}>ACTION</th>
               </tr>
            </thead>
            <tbody>
               {responses.map((res, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}>
                    <td style={{ padding: '24px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}><FileText size={20} /></div>
                          <div>
                             <div style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>{res.form?.formName || 'Generic Form'}</div>
                             <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>PLATFORM ID: {res._id.slice(-6)}</div>
                          </div>
                       </div>
                    </td>
                    <td style={{ padding: '24px' }}>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {Object.entries(res.data || {}).slice(0, 3).map(([key, val]) => (
                            <div key={key} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', fontSize: '12px', color: '#94a3b8' }}>
                               <span style={{ fontWeight: '800', color: '#475569' }}>{key}:</span> {val}
                            </div>
                          ))}
                       </div>
                    </td>
                    <td style={{ padding: '24px' }}>
                       <span style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '900', background: res.status === 'New' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)', color: res.status === 'New' ? '#f59e0b' : '#10b981' }}>{res.status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right' }}>
                       <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', border: 'none', borderRadius: '10px', color: '#64748b' }}><ChevronRight size={18} /></button>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
         {responses.length === 0 && (
           <div style={{ padding: '100px', textAlign: 'center', color: '#475569' }}>
              <Database size={48} style={{ marginBottom: '16px', opacity: 0.1 }} />
              <p style={{ fontWeight: '800' }}>No form submissions detected yet.</p>
           </div>
         )}
      </div>
    </div>
  );
}

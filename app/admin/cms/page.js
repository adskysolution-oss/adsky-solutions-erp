'use client';
import { useState, useEffect } from 'react';
import { 
  Globe, Layout, Settings, Image as ImageIcon, 
  Trash2, Plus, Save, ExternalLink, ChevronRight,
  ShieldCheck, Smartphone, Target, Globe2, 
  Layers, Palette, Twitter, Linkedin, Instagram, 
  Facebook, Mail, Phone, MapPin, Loader2,
  ListOrdered, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function WebsiteCMS() {
  const [activeTab, setActiveTab] = useState('branding');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({});
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [configRes, pagesRes] = await Promise.all([
        fetch('/api/admin/cms/config'),
        fetch('/api/admin/cms/pages')
      ]);
      const configData = await configRes.json();
      const pagesData = await pagesRes.json();
      setConfig(configData || {});
      setPages(Array.isArray(pagesData) ? pagesData : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/cms/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={48} color="#3b82f6" /></div>;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '950', color: 'white', letterSpacing: '-0.02em', margin: 0 }}>SaaS Engine & CMS</h1>
          <p style={{ color: '#475569', fontSize: '15px', marginTop: '8px' }}>Manage identity, global routing, and structural design from a single hub.</p>
        </div>
        <button 
           onClick={handleConfigSave}
           disabled={saving}
           style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(59,130,246,0.3)', transition: 'all 0.3s' }}
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Synchronizing Site Intelligence...' : 'Deploy Content Structure'}
        </button>
      </div>

      {showSuccess && (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '16px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', fontWeight: '700' }}>
           <CheckCircle2 size={20} /> Site configuration pushed successfully to global CDN.
        </div>
      )}

      {/* Main Tabs */}
      <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '18px', width: 'fit-content', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
        {[
          { id: 'branding', label: 'Identity & Brand', icon: Palette },
          { id: 'pages', label: 'Dynamic Pages', icon: Layout },
          { id: 'socials', label: 'Social Velocity', icon: Target },
          { id: 'footer', label: 'Global Footer', icon: FileText }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: '12px 24px', borderRadius: '12px', border: 'none',
              background: activeTab === tab.id ? 'rgba(59,130,246,0.15)' : 'transparent',
              color: activeTab === tab.id ? '#60a5fa' : '#64748b',
              fontSize: '14px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '40px', minHeight: '600px' }}>
        {activeTab === 'branding' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}><Globe2 color="#3b82f6" /> Main Site Identity</h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <label style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '0.05em' }}>SITE PLATFORM NAME</label>
                 <input type="text" value={config.siteName} onChange={e => setConfig({...config, siteName: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontWeight: '700' }} />
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <label style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '0.05em' }}>BROWSER TAB TITLE</label>
                 <input type="text" value={config.siteTitle} onChange={e => setConfig({...config, siteTitle: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontWeight: '700' }} />
               </div>

               <div style={{ display: 'flex', gap: '32px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '0.05em' }}>UPLOAD MAIN LOGO</label>
                    <div style={{ padding: '40px', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '24px', textAlign: 'center', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.borderColor='#3b82f6'} onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}>
                       <ImageIcon size={32} color="#475569" style={{ marginBottom: '12px' }} />
                       <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700' }}>Drop logo or click to upload</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '0.05em' }}>UPLOAD FAVICON</label>
                    <div style={{ padding: '40px', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '24px', textAlign: 'center', cursor: 'pointer' }}>
                       <Globe size={32} color="#475569" style={{ marginBottom: '12px' }} />
                       <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700' }}>16x16 or 32x32 recommended</div>
                    </div>
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '32px', padding: '32px' }}>
               <h4 style={{ color: '#60a5fa', fontSize: '15px', fontWeight: '900', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} /> Global Live View</h4>
               <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>Current site branding is active across all routing nodes. Favicon and Logos will refresh automatically upon saving.</div>
               <div style={{ background: '#0a0f1e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px 16px', borderRadius: '12px', marginBottom: '12px' }}>
                     <Globe size={14} color="#475569" />
                     <div style={{ fontSize: '11px', color: '#94a3b8' }}>https://adskysolution.com</div>
                  </div>
                  <div style={{ height: '40px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                     <div style={{ width: '80px', height: '14px', background: 'linear-gradient(90deg, #3b82f6, #6366f1)', borderRadius: '4px' }} />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
               <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}><Layers color="#8b5cf6" /> Full Network Map (Dynamic Routing)</h3>
                  <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Define routes, sub-pages, and section-wise hierarchy.</p>
               </div>
               <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', color: '#60a5fa', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
                 <Plus size={18} /> Provision New Route
               </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pages.map(page => (
                    <div 
                      key={page._id} 
                      onClick={() => setSelectedPage(page)}
                      style={{ 
                        padding: '16px 20px', borderRadius: '18px', border: '1px solid',
                        borderColor: selectedPage?._id === page._id ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)',
                        background: selectedPage?._id === page._id ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)',
                        color: selectedPage?._id === page._id ? 'white' : '#94a3b8',
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '800' }}>{page.title}</span>
                          <span style={{ fontSize: '10px', color: '#475569', fontWeight: '900' }}>/{page.slug}</span>
                       </div>
                       <ChevronRight size={18} />
                    </div>
                  ))}
               </div>

               <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', padding: '32px' }}>
                  {selectedPage ? (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                           <h4 style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>Node Config: {selectedPage.title}</h4>
                           <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{ padding: '8px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px', color: '#ef4444' }}><Trash2 size={16} /></button>
                              <button style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: '#64748b' }}><Settings size={16} /></button>
                           </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                           <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                 <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}><Plus size={16} /></div>
                                 <span style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>Append New Component Section</span>
                              </div>
                           </div>

                           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '900', color: '#64748b' }}>1</div>
                                    <div>
                                       <div style={{ fontSize: '13px', fontWeight: '800', color: 'white' }}>Hero Pulse Section</div>
                                       <div style={{ fontSize: '10px', color: '#475569', fontWeight: '700' }}>TYPE: HERO ENGINE</div>
                                    </div>
                                 </div>
                                 <MoreVertical size={16} color="#475569" />
                              </div>
                           </div>
                        </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#475569' }}>
                       <Layers size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                       <p style={{ fontWeight: '800', fontSize: '15px' }}>Assemble your page structure</p>
                       <p style={{ opacity: 0.5, fontSize: '12px' }}>Select a route node from the left to start provisioning sections.</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'socials' && (
           <div style={{ maxWidth: '600px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}><Target color="#f59e0b" /> Social Connectivity Mesh</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { id: 'instagram', label: 'Instagram Velocity', icon: Instagram, color: '#e1306c' },
                  { id: 'linkedin', label: 'LinkedIn Engine', icon: Linkedin, color: '#0077b5' },
                  { id: 'twitter', label: 'Twitter Node', icon: Twitter, color: '#1da1f2' },
                  { id: 'facebook', label: 'Facebook Core', icon: Facebook, color: '#4267b2' }
                ].map(social => (
                  <div key={social.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <div style={{ padding: '12px', borderRadius: '14px', background: `${social.color}11`, color: social.color }}>
                        <social.icon size={24} />
                     </div>
                     <input type="text" placeholder={`https://${social.id}.com/adskysolution`} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '14px' }} />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '12px' }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontSize: '14px', fontWeight: '800' }}>Cross-Platform Sync Active</span>
                 </div>
                 <p style={{ color: '#475569', fontSize: '12px', lineHeight: '1.6' }}>Updated links will instantly refresh in the Website Sidebar and Global Footer components.</p>
              </div>
           </div>
        )}

        {/* Footer Tab */}
        {activeTab === 'footer' && (
           <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                 <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}><FileText color="#3b82f6" /> Strategic Footer Control</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   <label style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '0.05em' }}>GLOBAL COPYRIGHT TEXT</label>
                   <input type="text" value={config.footer?.copyright} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontWeight: '700' }} />
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '0.05em' }}>STRATEGIC POLICY LINKS</label>
                    {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Contact Us'].map(policy => (
                      <div key={policy} style={{ display: 'flex', gap: '12px' }}>
                         <div style={{ flex: 1, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: '700' }}>{policy}</div>
                         <div style={{ flex: 1.5, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#64748b', fontSize: '13px' }}>/{policy.toLowerCase().replace(/ /g, '-')}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '32px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', marginBottom: '20px' }}>
                    <AlertCircle size={18} />
                    <span style={{ fontSize: '15px', fontWeight: '900' }}>Footer Intelligence</span>
                 </div>
                 <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.8' }}>Footer content is globally distributed. Ensure policy URLs match the Slugs defined in the Page Manager to avoid 404 errors during client navigation.</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}

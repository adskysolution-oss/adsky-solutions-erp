'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  
  const [cashfreeAppId, setCashfreeAppId] = useState('');
  const [cashfreeSecret, setCashfreeSecret] = useState('');
  const [cashfreeEnv, setCashfreeEnv] = useState('sandbox');

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.hero) {
          setHeroTitle(data.hero.title || '');
          setHeroDesc(data.hero.description || '');
        }
        if (data.cashfree_keys) {
          setCashfreeAppId(data.cashfree_keys.appId || '');
          setCashfreeSecret(data.cashfree_keys.secretKey || '');
          setCashfreeEnv(data.cashfree_keys.environment || 'sandbox');
        }
      });
  }, []);

  const handleSaveContent = async (key, value) => {
    setMessage('Saving...');
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    if (res.ok) {
      setMessage('✅ Successfully saved to database!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ Failed to save.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>AD SKY ADMIN</div>
        <nav>
          <a 
            className={`${styles.navLink} ${activeTab === 'home' ? styles.navLinkActive : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 Home Page Content
          </a>
          <a 
            className={`${styles.navLink} ${activeTab === 'inner' ? styles.navLinkActive : ''}`}
            onClick={() => setActiveTab('inner')}
          >
            📄 Inner Pages Editor
          </a>
          <a 
            className={`${styles.navLink} ${activeTab === 'gallery' ? styles.navLinkActive : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            🖼️ Gallery & Logos
          </a>
          <a 
            className={`${styles.navLink} ${activeTab === 'payment' ? styles.navLinkActive : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            💳 Cashfree Settings
          </a>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.topbar}>
          <h1>
            {activeTab === 'home' && 'Manage Home Page'}
            {activeTab === 'inner' && 'Inner Pages Management'}
            {activeTab === 'gallery' && 'Gallery / Partners'}
            {activeTab === 'payment' && 'Payment Gateway'}
          </h1>
          <a href="/" className={styles.visitSite} target="_blank">🌐 Live Preview</a>
        </div>

        {message && <div className={styles.alert}>{message}</div>}

        {activeTab === 'home' && (
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Hero Section Setup</h2>
              <div className={styles.formGroup}>
                <label>Main Headline</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={heroTitle} 
                  onChange={e => setHeroTitle(e.target.value)} 
                  placeholder="e.g. Integrated IT Solutions..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>Sub Headline (Description)</label>
                <textarea 
                  className={styles.input} 
                  value={heroDesc} 
                  onChange={e => setHeroDesc(e.target.value)} 
                  placeholder="e.g. Delivering expert IT consulting..."
                />
              </div>
              <button 
                className={styles.button}
                onClick={() => handleSaveContent('hero', { title: heroTitle, description: heroDesc })}
              >
                Update Live Server
              </button>
            </div>
            
            <div className={styles.card}>
              <h2>Dynamic Capabilities</h2>
              <p className={styles.helpText}>Our advanced dynamic system is currently mapping all your frontend nodes. Once the database is connected via Vercel, adding fields here will instantly apply globally across front-end APIs without any re-deployments needed.</p>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Cashfree API Keys</h2>
              <p className={styles.helpText} style={{marginBottom: '2rem'}}>Configure your payment gateway seamlessly. These keys are securely stored and read by the Checkout API.</p>
              
              <div className={styles.formGroup}>
                <label>Merchant App ID</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={cashfreeAppId} 
                  onChange={e => setCashfreeAppId(e.target.value)} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Merchant Secret Key</label>
                <input 
                  type="password" 
                  className={styles.input} 
                  value={cashfreeSecret} 
                  onChange={e => setCashfreeSecret(e.target.value)} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Current Environment</label>
                <select className={styles.input} value={cashfreeEnv} onChange={e => setCashfreeEnv(e.target.value)}>
                  <option value="sandbox">Sandbox (Testing Mode)</option>
                  <option value="production">Production (Live Mode)</option>
                </select>
              </div>
              <button 
                className={styles.button}
                onClick={() => handleSaveContent('cashfree_keys', { 
                  appId: cashfreeAppId, 
                  secretKey: cashfreeSecret, 
                  environment: cashfreeEnv 
                })}
              >
                Save API Gateway
              </button>
            </div>
          </div>
        )}

        {(activeTab === 'inner' || activeTab === 'gallery') && (
          <div className={styles.card} style={{textAlign: 'center', padding: '5rem 2rem'}}>
            <h2 style={{border: 'none', marginBottom: '1rem'}}>Section Coming Soon</h2>
            <p className={styles.helpText} style={{maxWidth: '500px', margin: '0 auto'}}>
              This dynamic editor block will be unlocked once we set up your global MongoDB Atlas clusters during the Vercel live deployment phase. 
            </p>
          </div>
        )}

      </main>
    </div>
  );
}

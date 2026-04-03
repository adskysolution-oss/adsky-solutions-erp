'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, PlusCircle, Briefcase, Users, Settings,
  ChevronLeft, ChevronRight, Bell, LogOut, Menu, X,
  Building2, FileText, BarChart2
} from 'lucide-react';

const navItems = [
  { href: '/employer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/employer/jobs/new', icon: PlusCircle, label: 'Post New Job' },
  { href: '/employer/jobs/manage', icon: Briefcase, label: 'My Jobs' },
  { href: '/employer/applicants', icon: Users, label: 'Applicants' },
  { href: '/employer/profile', icon: Settings, label: 'Company Profile' },
];

export default function EmployerLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [employer, setEmployer] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/login') || pathname.includes('/register')) return;
    const stored = localStorage.getItem('employerUser');
    if (!stored) {
      router.push('/employer/login');
    } else {
      setEmployer(JSON.parse(stored));
    }
  }, [pathname]);

  if (pathname.includes('/login') || pathname.includes('/register')) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('employerUser');
    router.push('/employer/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e', color: '#e2e8f0', fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? '72px' : '240px',
        background: 'linear-gradient(180deg, #0d1424 0%, #0a0f1e 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'fixed', top: 0, left: mobileOpen ? 0 : undefined,
        height: '100vh', zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white' }}>H</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>AD SKY</div>
                <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold' }}>HIRE PORTAL</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white' }}>H</div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '24px 8px' }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px', marginBottom: '8px',
                  background: active ? 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))' : 'transparent',
                  color: active ? '#10b981' : '#94a3b8',
                  border: active ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                  justifyContent: collapsed ? 'center' : 'flex-start'
                }}>
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  {!collapsed && <span style={{ fontSize: '14px', fontWeight: active ? '700' : '500' }}>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '12px', color: '#f87171', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <LogOut size={20} />
            {!collapsed && <span style={{ fontSize: '14px', fontWeight: '600' }}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: collapsed ? '72px' : '240px', transition: 'margin 0.3s ease', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '64px', background: 'rgba(13,20,36,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
              <Menu size={20} />
            </button>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
              {navItems.find(n => pathname === n.href)?.label || 'Employer Portal'}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid #0a0f1e' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {employer?.companyName?.[0] || 'C'}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{employer?.companyName || 'Company'}</div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

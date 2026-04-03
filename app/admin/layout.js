'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, Briefcase, Target, Settings,
  ChevronLeft, ChevronRight, Bell, LogOut, Menu, X,
  TrendingUp, FileText, CreditCard, Globe, UserCheck,
  Building2, Layers, BarChart3, ShieldCheck
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/monitoring', icon: BarChart3, label: 'Employee Monitor' }, // New Enterprise Feature
  { href: '/admin/employees', icon: Users, label: 'Manage Team' },
  { href: '/admin/leads', icon: Target, label: 'Lead CRM' },
  { href: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { href: '/admin/services', icon: Layers, label: 'Services' },
  { href: '/admin/jobs', icon: Building2, label: 'Job Portal' },
  { href: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { href: '/admin/cms', icon: Globe, label: 'Website CMS' },
  { href: '/admin/reports/forms', icon: FileText, label: 'Form Reports' },
  { href: '/admin/settings/permissions', icon: ShieldCheck, label: 'Role Permissions' }, // New Enterprise Feature
  { href: '/admin/settings', icon: Settings, label: 'System Settings' },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin' || pathname === '/admin/login') return;
    const token = document.cookie.includes('admin_token');
    const stored = localStorage.getItem('adminUser');
    if (!token && !stored) {
      router.push('/admin/login');
    } else if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, [pathname]);

  if (pathname === '/admin' || pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = 'admin_token=; Max-Age=0; path=/';
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
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
        minWidth: collapsed ? '72px' : '240px',
        background: 'linear-gradient(180deg, #0d1424 0%, #0a0f1e 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'fixed', top: 0, left: mobileOpen ? 0 : undefined,
        height: '100vh', zIndex: 50,
        boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: 'white' }}>A</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', letterSpacing: '0.05em' }}>AD SKY</div>
                <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '0.1em' }}>SUPER ADMIN</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: 'white' }}>A</div>
          )}
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}>
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '16px 8px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px', borderRadius: '10px', marginBottom: '4px',
                  background: active ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.1))' : 'transparent',
                  border: active ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                  color: active ? '#60a5fa' : '#94a3b8',
                  cursor: 'pointer', transition: 'all 0.2s',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  position: 'relative',
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                  {!collapsed && <span style={{ fontSize: '13px', fontWeight: active ? '600' : '500' }}>{item.label}</span>}
                  {active && !collapsed && <div style={{ position: 'absolute', right: '12px', width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }} />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom - collapse & logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', borderRadius: '8px' }}>
              <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: collapsed ? '72px' : '240px', transition: 'margin 0.3s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Header */}
        <header style={{
          height: '64px', background: 'rgba(13,20,36,0.8)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'none' }}>
              <Menu size={20} />
            </button>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
                {navItems.find(n => pathname.startsWith(n.href))?.label || 'Admin Panel'}
              </div>
              <div style={{ fontSize: '12px', color: '#475569' }}>AdSky Solution ERP</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px', color: '#94a3b8', cursor: 'pointer' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', border: '2px solid #0d1424' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: 'white' }}>
                {admin?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>{admin?.name || 'Super Admin'}</div>
                <div style={{ fontSize: '10px', color: '#475569' }}>Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

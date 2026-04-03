'use client';
import { LayoutGrid } from 'lucide-react';

export default function PlaceholderPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#64748b' }}>
      <LayoutGrid size={64} opacity={0.1} />
      <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginTop: '24px' }}>Section Coming Soon</h1>
      <p style={{ marginTop: '8px' }}>This module is currently being integrated as part of Phase 2.</p>
    </div>
  );
}

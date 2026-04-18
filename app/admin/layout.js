'use client';

import React, { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { io } from 'socket.io-client';

export default function AdminLayout({ children }) {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.on('connect', () => {
      console.log('📡 Connected to AdSky Transmission Node');
    });

    socket.on('live-location', (data) => {
      console.log('📍 New Live Location Broadcast:', data);
      // In a real app, you'd update a context or state here to move pins on a map
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-[#e5e7eb] flex overflow-hidden">
      {/* Premium Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col lg:pl-72 relative transition-all duration-300">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6366f1]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        
        <Topbar />
        
        <div className="flex-grow p-6 md:p-10 relative z-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-5 duration-1000">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

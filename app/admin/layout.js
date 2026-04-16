import DashboardSidebar from '@/components/admin/DashboardSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen mesh-gradient-vibrant flex flex-col md:flex-row bg-white relative overflow-x-hidden">
      <DashboardSidebar />
      <main className="flex-grow md:ml-80 p-6 md:p-12 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

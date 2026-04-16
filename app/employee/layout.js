import DashboardSidebar from '@/components/admin/DashboardSidebar';

export default function EmployeeLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar role="employee" />
      <main className="flex-grow md:ml-[280px] p-4 md:p-8 animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

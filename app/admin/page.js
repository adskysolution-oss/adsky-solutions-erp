'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  IndianRupee, 
  Zap, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck,
  Globe,
  Database,
  BarChart3,
  ArrowRight,
  Flame,
  Layout,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const chartData = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 2000, users: 9800 },
  { name: 'Thu', revenue: 2780, users: 3908 },
  { name: 'Fri', revenue: 1890, users: 4800 },
  { name: 'Sat', revenue: 2390, users: 3800 },
  { name: 'Sun', revenue: 3490, users: 4300 },
];

export default function SuperAdminDashboard() {
  const [mounted, setMounted] = React.useState(false);
  const [stats] = useState({
    users: 1280,
    partners: 84,
    employees: 156,
    farmers: 2450,
    todayRegistrations: 42,
    totalRevenue: 154200,
    todayRevenue: 4200,
    pendingPayments: 12,
    successPayments: 412,
    failedPayments: 8,
    health: 'Optimal'
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const kpiCards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+12%' },
    { title: 'Active Partners', value: stats.partners, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+5%' },
    { title: 'Field Force', value: stats.employees, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+8%' },
    { title: 'Total Farmers', value: stats.farmers, icon: Globe, color: 'text-rose-600', bg: 'bg-rose-50', trend: '+15%' },
    { title: 'Today Reg.', value: stats.todayRegistrations, icon: Clock, color: 'text-sky-600', bg: 'bg-sky-50', trend: '+4%' },
  ];

  const paymentCards = [
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-slate-900', bg: 'bg-slate-50' },
    { title: 'Today Revenue', value: `₹${stats.todayRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Pending', value: stats.pendingPayments, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Success', value: stats.successPayments, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Failed', value: stats.failedPayments, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 pb-20 mesh-gradient-vibrant min-h-screen pt-4 px-4 overflow-x-hidden">
      {/* Compact Command Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border-white/60"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-rose-500/5 to-amber-500/5 opacity-40" />
         
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
                  Command <span className="text-gradient-vibrant">Cockpit</span>
               </h1>
               <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full tracking-[0.1em] italic">Priority Access</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 
                    {stats.health}
                  </span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <div className="glass-card bg-white/40 p-4 rounded-3xl flex items-center gap-4 border-white/40 shadow-sm">
               <div className="text-right">
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">Auth Node</p>
                  <p className="text-xs font-black text-slate-900 uppercase">MASTER_SESSION_X</p>
               </div>
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600">
                  <Activity size={20} />
               </div>
            </div>
         </div>
      </motion.div>

      {/* Primary KPI Grid - Dense */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
         {kpiCards.map((card, idx) => (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.05 }}
             key={card.title}
             className="p-6 glass-card rounded-[2rem] shadow-lg border-white/50 group hover:shadow-xl transition-all"
           >
              <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                 <card.icon size={20} />
              </div>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">{card.title}</p>
              <div className="flex items-baseline justify-between gap-2">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">{card.value.toLocaleString()}</h3>
                 <span className="text-[10px] font-bold text-emerald-600">{card.trend}</span>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Combined Analytics & Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart Section */}
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-8 glass-card rounded-[3rem] shadow-xl border-white/60 relative overflow-hidden"
         >
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h4 className="text-xl font-black text-slate-900 italic tracking-tight">Revenue <span className="text-indigo-600">Pulse</span></h4>
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] mt-1">Global Settlement Analytics</p>
               </div>
               <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black rounded-full italic uppercase tracking-widest">Growth</button>
                  <button className="px-4 py-1.5 bg-white text-slate-400 text-[9px] font-black rounded-full uppercase tracking-widest border border-slate-100">Nodes</button>
               </div>
            </div>

            <div className="h-[300px] w-full mt-4">
               {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <Tooltip 
                           contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900 }}
                           cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                     </AreaChart>
                  </ResponsiveContainer>
               ) : (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-2xl" />
               )}
            </div>
         </motion.div>

         {/* Distribution & Performance */}
         <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group border-4 border-slate-800"
            >
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-all duration-1000" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <Flame size={20} className="text-rose-500 animate-pulse" />
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Yield Prediction</p>
                  </div>
                  <h4 className="text-4xl font-black italic tracking-tighter mb-2">₹4.2M</h4>
                  <p className="text-[11px] text-indigo-400 font-bold italic mb-8">Expected Monthly Volume</p>
                  
                  <div className="space-y-4 pt-6 border-t border-white/10">
                     <div className="flex justify-between items-center text-[10px] font-black font-mono tracking-tighter uppercase">
                        <span className="text-slate-500">Node Accuracy</span>
                        <span className="text-emerald-400">99.2%</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[92%] shadow-[0_0_10px_#10b981]" />
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Payment Pulse - Simplified */}
            <div className="p-8 glass-card rounded-[3rem] shadow-xl border-white/60">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                 <div className="w-1 h-3 bg-rose-500/40 rounded-full" />
                 Payment Stream
               </h4>
               <div className="space-y-4">
                  {paymentCards.slice(2).map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white hover:bg-white transition-colors">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>
                             <item.icon size={16} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black italic text-slate-900">{item.title}</p>
                          </div>
                       </div>
                       <span className="text-xs font-black italic text-slate-900">{item.value}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Operations Intelligence Stream - Compact Table */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 glass-card rounded-[4rem] shadow-xl border-white/50"
      >
         <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-black text-slate-900 italic tracking-tight">System <span className="text-gradient-vibrant">Traffic</span></h4>
            <Link href="/admin/leads" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
               View All Stream <ArrowRight size={14} />
            </Link>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
               <thead>
                  <tr className="text-left text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
                     <th className="px-6 pb-2">Node ID</th>
                     <th className="px-6 pb-2">Operation</th>
                     <th className="px-6 pb-2">Status</th>
                     <th className="px-6 pb-2 text-right">Sequence</th>
                  </tr>
               </thead>
               <tbody>
                  {[
                    { id: 'ADS-1042', action: 'Direct Server Payout', status: 'Success', time: '2m ago', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { id: 'ADS-1041', action: 'Identity Hash Verified', status: 'Success', time: '14m ago', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { id: 'ADS-1040', action: 'New Farmer Protocol', status: 'Pending', time: '28m ago', color: 'text-amber-600', bg: 'bg-amber-50' }
                  ].map((log) => (
                    <tr key={log.id} className="group bg-white/40 hover:bg-slate-900 hover:text-white transition-all duration-300">
                       <td className="px-6 py-4 rounded-l-2xl border-y border-l border-white/60">
                          <span className="text-[10px] font-black tracking-tighter uppercase font-mono">{log.id}</span>
                       </td>
                       <td className="px-6 py-4 border-y border-white/60">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white">
                                <Activity size={16} />
                             </div>
                             <span className="text-[11px] font-black italic">{log.action}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 border-y border-white/60">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic ${log.bg} ${log.color} group-hover:bg-white group-hover:text-slate-900 border border-current`}>
                             {log.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 rounded-r-2xl border-y border-r border-white/60 text-right">
                          <span className="text-[9px] font-black text-slate-400 italic group-hover:text-slate-500">{log.time}</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </motion.div>
    </div>
  );
}

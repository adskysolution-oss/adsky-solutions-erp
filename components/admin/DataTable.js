'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Download, Filter as FilterIcon, XCircle, Edit3, Eye } from 'lucide-react';

export default function DataTable({ title, columns, data, onFilter, onExport, onEdit, onDelete, actionLabel = "Actions" }) {
  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    
    const headers = columns.map(col => col.label).join(',');
    const rows = data.map(row => 
      columns.map(col => {
        const val = row[col.key];
        if (React.isValidElement(val)) return 'Element';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',')
    ).join('\n');
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
      {/* Table Header */}
      <div className="p-8 border-b border-[#1f2937] flex flex-col sm:flex-row justify-between items-center gap-6 bg-gradient-to-r from-transparent to-[#38bdf8]/5">
        <div>
          <h2 className="text-2xl font-black text-[#f3f4f6] tracking-tight italic">{title}</h2>
          <p className="text-[11px] font-black uppercase text-[#9ca3af] tracking-widest mt-1 italic">Total {data?.length || 0} Records Found</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onFilter}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1f2937] text-[#f3f4f6] rounded-xl text-xs font-black italic hover:bg-[#38bdf8] hover:text-[#0b1220] transition-all shadow-lg border border-[#38bdf8]/10"
          >
            <FilterIcon size={16} /> FILTER
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#38bdf8] text-[#0b1220] rounded-xl text-xs font-black italic hover:scale-105 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <Download size={16} /> EXPORT
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0b1220]/50">
              {columns.map((col) => (
                <th key={col.key} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#6b7280] italic border-b border-[#1f2937]">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2937]">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#1f2937]/30 transition-colors group">
                {columns.map((col) => (
                  <td key={col.key} className="px-8 py-5">
                    <div className="text-[13px] font-bold text-[#f3f4f6] italic">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-[#1f2937] flex items-center justify-between bg-[#0b1220]/30">
        <p className="text-[11px] font-black italic text-[#6b7280]">Showing entries</p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-[#1f2937] text-[#6b7280] hover:bg-[#1f2937] transition-all">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg bg-[#38bdf8] text-[#0b1220] text-xs font-black italic">1</button>
          </div>
          <button className="p-2 rounded-lg border border-[#1f2937] text-[#6b7280] hover:bg-[#1f2937] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

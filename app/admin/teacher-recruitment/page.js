"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Download, User, CheckCircle, XCircle, Clock, Eye } from "lucide-react";

export default function TeacherAdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [postFilter, setPostFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("Paid");

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        state: stateFilter,
        post: postFilter,
        payment: paymentFilter
      }).toString();
      
      const res = await fetch(`/api/admin/teacher-recruitment?${query}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [stateFilter, postFilter, paymentFilter]); // Run on filter change

  const exportToCSV = () => {
    if (applications.length === 0) return;
    
    // Headers
    const headers = [
      "App ID", "Status", "Full Name", "Father Name", "Gender", "DOB", 
      "Mobile", "WhatsApp", "Email", "State", "District", "Address",
      "Post", "Subject", "Qualification", "Specialization", "Passing Year",
      "Experience", "Organization", "Order ID", "Payment ID"
    ];
    
    const csvContent = [
      headers.join(","),
      ...applications.map(app => [
        app.application_id || "N/A",
        app.payment_status,
        `"${app.full_name}"`,
        `"${app.father_name}"`,
        app.gender,
        app.dob,
        app.mobile,
        app.whatsapp,
        app.email,
        `"${app.state}"`,
        `"${app.district}"`,
        `"${app.address}"`,
        app.post_applied,
        app.subject,
        `"${app.qualification}"`,
        `"${app.specialization}"`,
        app.passing_year,
        `"${app.experience}"`,
        `"${app.organization_name || "N/A"}"`,
        app.cashfree_order_id || "",
        app.cashfree_payment_id || ""
      ].join(","))
    ].join("\\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `teacher_applications_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8]">
                <User size={20} />
              </span>
              Teacher Recruitment 2026
            </h1>
            <p className="text-gray-400 text-sm mt-1 ml-13">Manage PRT, TGT & PGT candidate applications</p>
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 hover:bg-[#10b981]/30 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <input 
            type="text"
            placeholder="Search Name, App ID, Mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchApplications()}
            className="w-full bg-[#111827] border border-[#374151] text-white px-11 py-3 rounded-xl focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        </div>
        
        {/* State Filter */}
        <div className="relative">
          <select 
            value={stateFilter} 
            onChange={(e) => setStateFilter(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#38bdf8] appearance-none"
          >
            <option value="">All States</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Odisha">Odisha</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>
          <Filter className="absolute right-4 top-3.5 text-gray-400" size={16} />
        </div>

        {/* Post Filter */}
        <div className="relative">
          <select 
            value={postFilter} 
            onChange={(e) => setPostFilter(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#38bdf8] appearance-none"
          >
            <option value="">All Posts</option>
            <option value="PRT">PRT</option>
            <option value="TGT">TGT</option>
            <option value="PGT">PGT</option>
          </select>
          <Filter className="absolute right-4 top-3.5 text-gray-400" size={16} />
        </div>

        {/* Payment Filter */}
        <div className="relative">
          <select 
            value={paymentFilter} 
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#38bdf8] appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Pending Only</option>
            <option value="Failed">Failed Only</option>
          </select>
          <Filter className="absolute right-4 top-3.5 text-gray-400" size={16} />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-[#111827] text-gray-400 border-b border-[#374151]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">App ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Candidate</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Post & Subject</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Contact</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Photo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-[#38bdf8]/30 border-t-[#38bdf8] rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-[#374151]/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-[#f3f4f6]">
                      {app.application_id || <span className="text-gray-500 italic">Not Generated</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{app.full_name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{app.state} • {app.gender}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
                        {app.post_applied}
                      </div>
                      <div className="text-xs mt-1.5">{app.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{app.mobile}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {app.payment_status === "Paid" ? (
                        <div className="flex items-center gap-1.5 text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full w-max text-xs font-medium border border-[#10b981]/20">
                          <CheckCircle size={14} /> Paid
                        </div>
                      ) : app.payment_status === "Failed" ? (
                        <div className="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full w-max text-xs font-medium border border-red-400/20">
                          <XCircle size={14} /> Failed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-orange-400 bg-orange-400/10 px-2.5 py-1 rounded-full w-max text-xs font-medium border border-orange-400/20">
                          <Clock size={14} /> Pending
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedPhoto(app.photo_url)}
                        className="p-2 bg-[#111827] rounded-lg text-gray-400 hover:text-white hover:bg-[#38bdf8]/20 transition-all border border-[#374151]"
                        title="View Photo"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination summary */}
        {!loading && applications.length > 0 && (
          <div className="px-6 py-4 border-t border-[#374151] bg-[#111827] text-sm text-gray-400 flex justify-between items-center">
            <span>Showing {applications.length} result(s)</span>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-md w-full bg-[#1f2937] p-2 rounded-2xl border border-[#374151] shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <XCircle size={20} />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Applicant" 
              className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState("verifying");
  const [appId, setAppId] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("order_id");
    
    if (!id) {
      router.push("/teacherrecruitmentform");
      return;
    }
    
    setOrderId(id);

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/teacher-payment-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: id })
        });
        
        const data = await response.json();
        
        if (response.ok && data.status === "Paid") {
          setStatus("success");
          setAppId(data.application_id);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
      }
    };
    
    verifyPayment();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", maxWidth: "500px", width: "100%", textAlign: "center" }}>
        
        {status === "verifying" && (
          <>
            <div style={{ width: "60px", height: "60px", border: "4px solid #DBEAFE", borderTopColor: "#0A3D91", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }}></div>
            <h2 style={{ marginTop: "24px", color: "#0A3D91", fontSize: "1.5rem" }}>Verifying Payment...</h2>
            <p style={{ color: "#64748B", marginTop: "10px" }}>Please wait while we confirm your payment with the bank.</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <div style={{ width: "80px", height: "80px", background: "#D1FAE5", color: "#10B981", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 style={{ marginTop: "24px", color: "#0A3D91", fontSize: "1.8rem", fontWeight: "700" }}>Application Submitted!</h2>
            <p style={{ color: "#64748B", marginTop: "10px", lineHeight: "1.5" }}>
              Your payment of ₹100 was successful. Your application for PRT, TGT & PGT Teacher Recruitment 2026 has been registered.
            </p>
            
            <div style={{ marginTop: "30px", background: "#F8FAFC", padding: "20px", borderRadius: "12px", border: "1px dashed #CBD5E1", textAlign: "left" }}>
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "0.85rem", color: "#64748B", textTransform: "uppercase", fontWeight: "600" }}>Application ID</span>
                <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1E293B" }}>{appId}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.85rem", color: "#64748B", textTransform: "uppercase", fontWeight: "600" }}>Order ID</span>
                <div style={{ fontSize: "1rem", fontWeight: "600", color: "#475569" }}>{orderId}</div>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()} 
              style={{ marginTop: "30px", background: "#0A3D91", color: "white", border: "none", padding: "14px 24px", borderRadius: "8px", fontWeight: "600", width: "100%", cursor: "pointer", fontSize: "1rem" }}
            >
              Print Confirmation
            </button>
          </>
        )}
        
        {status === "failed" && (
          <>
            <div style={{ width: "80px", height: "80px", background: "#FEE2E2", color: "#EF4444", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <h2 style={{ marginTop: "24px", color: "#B91C1C", fontSize: "1.5rem", fontWeight: "700" }}>Payment Failed or Pending</h2>
            <p style={{ color: "#64748B", marginTop: "10px", lineHeight: "1.5" }}>
              We could not verify your payment. If the amount was deducted, please wait 24 hours. Otherwise, try registering again.
            </p>
            <button 
              onClick={() => router.push("/teacherrecruitmentform")} 
              style={{ marginTop: "30px", background: "#EF4444", color: "white", border: "none", padding: "14px 24px", borderRadius: "8px", fontWeight: "600", width: "100%", cursor: "pointer", fontSize: "1rem" }}
            >
              Back to Home
            </button>
          </>
        )}

      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media print {
          body { background: white; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}

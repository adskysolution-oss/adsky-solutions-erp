"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage({ searchParams }) {
  const router = useRouter();

  // Next.js 13+ searchParams comes from the page props, but we can also use useSearchParams hook.
  // Wait, in Next 13+ page components, searchParams is an async prop in server components, but since this is 'use client', it's better to use `useSearchParams` hook, but we can't easily destructure it if we use standard 'use client' props. Let me use window.location instead or standard Next.js hooks.
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get("session_id");
    const order_id = params.get("order_id");

    if (!session_id || !order_id) {
      alert("Invalid payment session.");
      router.push("/teacherrecruitmentform");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    
    script.onload = () => {
      const cashfree = window.Cashfree({
        mode: "production", // Production mode for real transactions
      });

      let checkoutOptions = {
        paymentSessionId: session_id,
        redirectTarget: "_self", // Redirects the page
      };

      cashfree.checkout(checkoutOptions);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [router]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f8fafc" }}>
      <div style={{ width: "50px", height: "50px", border: "4px solid #DBEAFE", borderTopColor: "#0A3D91", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
      <h2 style={{ marginTop: "20px", color: "#0A3D91", fontWeight: "600" }}>Redirecting to Secure Payment Gateway...</h2>
      <p style={{ color: "#64748B", marginTop: "8px" }}>Please do not close or refresh this page.</p>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

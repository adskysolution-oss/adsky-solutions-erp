'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const order_id = searchParams.get('order_id');
  const [status, setStatus] = useState('verifying'); // verifying, success, failed

  useEffect(() => {
    if (order_id) {
      verifyPayment();
    }
  }, [order_id]);

  const verifyPayment = async () => {
    try {
      const res = await fetch(`/api/payment/verify?order_id=${order_id}`);
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('failed');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '48px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', textAlign: 'center' }}>
        {status === 'verifying' && (
          <>
            <Loader2 size={64} className="animate-spin text-blue-500 mx-auto mb-6" />
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Verifying Payment</h2>
            <p style={{ color: '#64748b' }}>Please wait while we confirm your subscription...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={48} color="#10b981" />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Payment Successful!</h2>
            <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Welcome to the Premium club! Your subscription is now active.</p>
            <Link href="/employer/dashboard" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '14px', color: 'white', fontWeight: '700', textDecoration: 'none' }}>
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <XCircle size={48} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Payment Failed</h2>
            <p style={{ color: '#94a3b8', marginBottom: '32px' }}>We couldn't verify your payment. If money was deducted, please contact support.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/employer/subscription" style={{ padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontWeight: '700', textDecoration: 'none' }}>
                Try Again
              </Link>
              <Link href="/employer/dashboard" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Back to Dashboard</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 size={64} className="animate-spin text-blue-500" /></div>}>
      <VerifyPaymentContent />
    </Suspense>
  );
}

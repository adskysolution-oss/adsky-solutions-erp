'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

function PaymentVerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState('loading');
  const [orderDetails, setOrderDetails] = useState(null);
  const [formSubmitStatus, setFormSubmitStatus] = useState('');

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      return;
    }

    const verifyAndSubmit = async () => {
      try {
        // 1. Verify payment status from Cashfree
        const res = await fetch(`/api/payment/cashfree?order_id=${orderId}`);
        const data = await res.json();
        
        if (data.success && data.order) {
          setOrderDetails(data.order);

          if (data.order.order_status === 'PAID') {
            setStatus('success');

            // 2. Check if there's a pending form submission in localStorage
            const pendingRaw = localStorage.getItem('pending_form_submission');
            if (pendingRaw) {
              try {
                const pending = JSON.parse(pendingRaw);
                
                // Only process if order ID matches
                if (pending.orderId === orderId && pending.formData && pending.formType) {
                  setFormSubmitStatus('submitting');
                  
                  const updatedFormData = {
                    ...pending.formData,
                    txnId: orderId,
                    paymentStatus: 'Success'
                  };

                  const apiRoute = pending.formType === 'rabbit-farming'
                    ? '/api/forms/rabbit-farming/save'
                    : '/api/forms/moringa-farming/save';

                  const saveRes = await fetch(apiRoute, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedFormData)
                  });

                  if (saveRes.ok) {
                    // Clear all draft/pending data
                    localStorage.removeItem('pending_form_submission');
                    localStorage.removeItem('rabbit_farming_draft');
                    localStorage.removeItem('rabbit_farming_step');
                    localStorage.removeItem('moringa_farming_draft');
                    localStorage.removeItem('moringa_farming_step');
                    setFormSubmitStatus('done');
                  } else {
                    setFormSubmitStatus('failed');
                  }
                }
              } catch (parseErr) {
                console.error('Error parsing pending submission:', parseErr);
              }
            }
          } else {
            setStatus('failed');
          }
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
      }
    };

    verifyAndSubmit();
  }, [orderId]);

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col pt-32 px-6">
      <div className="max-w-2xl mx-auto w-full text-center">
        {status === 'loading' && (
          <div className="py-20 flex flex-col items-center">
            <Loader2 className="animate-spin mb-6 text-blue-500" size={60} />
            <h2 className="text-3xl font-black mb-2 tracking-tighter">Verifying Payment...</h2>
            <p className="text-slate-400">Please wait while we confirm your transaction securely.</p>
          </div>
        )}

        {status === 'success' && orderDetails && (
          <div className="py-16 px-8 rounded-3xl bg-green-900/20 border border-green-500/30">
            <CheckCircle className="mx-auto mb-6 text-green-500" size={80} />
            <h2 className="text-4xl font-black mb-2 text-green-400 tracking-tighter">Payment Successful!</h2>
            <p className="text-slate-300 mb-6">Your transaction has been securely processed.</p>
            
            <div className="bg-[#0f172a] rounded-2xl p-6 text-left border border-white/5 space-y-4 max-w-sm mx-auto mb-8">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Order ID</p>
                <p className="font-mono text-sm">{orderDetails.order_id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Amount Paid</p>
                <p className="font-bold text-xl text-white">₹{orderDetails.order_amount}</p>
              </div>
            </div>

            {/* Form submission status */}
            {formSubmitStatus === 'submitting' && (
              <div className="flex items-center justify-center gap-3 text-blue-400 mb-6 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                <Loader2 className="animate-spin" size={20} />
                <p className="font-bold">Saving your application... Please wait.</p>
              </div>
            )}
            {formSubmitStatus === 'done' && (
              <div className="flex items-center justify-center gap-3 text-green-400 mb-6 bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                <CheckCircle size={20} />
                <p className="font-bold">Application submitted successfully! ✅</p>
              </div>
            )}
            {formSubmitStatus === 'failed' && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mb-6 text-yellow-300 text-sm font-bold">
                Payment was successful but application saving failed. Please contact support with Order ID: <span className="font-mono">{orderId}</span>
              </div>
            )}

            <button 
              onClick={() => router.push('/')}
              className="mt-4 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider transition-all"
            >
              Return Home
            </button>
          </div>
        )}

        {(status === 'error' || status === 'failed') && (
          <div className="py-16 px-8 rounded-3xl bg-red-900/20 border border-red-500/30">
            <XCircle className="mx-auto mb-6 text-red-500" size={80} />
            <h2 className="text-4xl font-black mb-2 text-red-400 tracking-tighter">Payment Failed</h2>
            <p className="text-slate-300 mb-8">We could not verify your payment. Please try again or contact support.</p>
            
            <button 
              onClick={() => router.push('/pricing')}
              className="mt-4 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PaymentVerifyPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#020617]"><Loader2 className="animate-spin text-blue-500" size={48} /></div>}>
        <PaymentVerifyContent />
      </Suspense>
      <Footer />
    </div>
  );
}

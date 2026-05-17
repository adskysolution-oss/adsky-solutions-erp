'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function PaymentVerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState('loading');
  const [orderDetails, setOrderDetails] = useState(null);
  const [formSubmitStatus, setFormSubmitStatus] = useState('');

  const [returnFormUrl, setReturnFormUrl] = useState('/');

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      return;
    }

    // Determine return URL
    const pendingRaw = localStorage.getItem('pending_form_submission');
    if (pendingRaw) {
      try {
        const pending = JSON.parse(pendingRaw);
        let formUrl = '/';
        if (pending.formType === 'rabbit-farming') {
          formUrl = '/applicationformrabbitfarming';
        } else if (pending.formType === 'moringa-farming') {
          formUrl = '/applicationformmoringafarming';
        } else if (pending.formType === 'custom' && pending.slug) {
          formUrl = `/${pending.slug}`;
        }
        setReturnFormUrl(formUrl);
        localStorage.setItem('last_form_url', formUrl);
      } catch (e) {}
    } else {
      const lastUrl = localStorage.getItem('last_form_url');
      if (lastUrl) {
        setReturnFormUrl(lastUrl);
      }
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
                  
                  let apiRoute = '';
                  let postBody = {};

                  if (pending.formType === 'custom') {
                    apiRoute = '/api/forms/submit';
                    postBody = {
                      slug: pending.slug,
                      txnId: orderId,
                      paymentStatus: 'Success',
                      ...pending.formData
                    };
                  } else {
                    apiRoute = pending.formType === 'rabbit-farming'
                      ? '/api/forms/rabbit-farming/save'
                      : '/api/forms/moringa-farming/save';
                    postBody = {
                      aadhar: pending.formData.aadhar,
                      txnId: orderId,
                      paymentStatus: 'Success'
                    };
                  }

                  const saveRes = await fetch(apiRoute, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postBody)
                  });

                  if (saveRes.ok) {
                    // Clear all draft/pending data
                    localStorage.removeItem('pending_form_submission');
                    localStorage.removeItem('rabbit_farming_draft');
                    localStorage.removeItem('rabbit_farming_step');
                    localStorage.removeItem('moringa_farming_draft');
                    localStorage.removeItem('moringa_farming_step');
                    if (pending.slug) {
                      localStorage.removeItem(`custom_form_draft_${pending.slug}`);
                    }
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
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl mx-auto w-full text-center flex flex-col items-center justify-center">
        {status === 'loading' && (
          <div className="py-20 flex flex-col items-center">
            <Loader2 className="animate-spin mb-6 text-blue-500" size={60} />
            <h2 className="text-3xl font-black mb-2 tracking-tighter">Verifying Payment...</h2>
            <p className="text-slate-400">Please wait while we confirm your transaction securely.</p>
          </div>
        )}

        {status === 'success' && orderDetails && (
          <div className="flex items-center justify-center p-2 md:p-6 text-slate-800">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border-2 border-[#DEB887] rounded-3xl p-6 md:p-10 text-center shadow-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-black text-[#B32D2D] mb-4">सफलतापूर्वक जमा!</h2>
              <p className="text-gray-600 font-black mb-6">आपका आवेदन सफलतापूर्वक जमा कर लिया गया है।</p>
              
              <div className="bg-slate-50 rounded-2xl p-5 text-left border border-gray-100 space-y-3 mb-8 text-xs font-bold">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-500 uppercase tracking-wider text-[9px]">Order ID</span>
                  <span className="font-mono text-slate-700 truncate max-w-[200px]">{orderDetails.order_id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 uppercase tracking-wider text-[9px]">Amount Paid</span>
                  <span className="text-sm font-black text-[#B32D2D]">₹{orderDetails.order_amount}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-slate-500 uppercase tracking-wider text-[9px]">Status</span>
                  <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-2 py-1 rounded">Confirmed ✓</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  router.push(returnFormUrl);
                  localStorage.removeItem('last_form_url');
                }} 
                className="w-full py-4 bg-[#B32D2D] text-white font-black rounded-xl hover:bg-[#8e2424] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] uppercase tracking-wider text-sm"
              >
                OK / ठीक है
              </button>
            </motion.div>
          </div>
        )}

        {(status === 'error' || status === 'failed') && (
          <div className="py-16 px-8 rounded-3xl bg-red-900/20 border border-red-500/30">
            <XCircle className="mx-auto mb-6 text-red-500" size={80} />
            <h2 className="text-4xl font-black mb-2 text-red-400 tracking-tighter">Payment Failed</h2>
            <p className="text-slate-300 mb-8">We could not verify your payment. Please try again or contact support.</p>
            
            <button 
              onClick={() => router.push(returnFormUrl)}
              className="mt-4 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
            >
              Return to Form / फॉर्म पर वापस जाएं
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
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#020617]"><Loader2 className="animate-spin text-blue-500" size={48} /></div>}>
        <PaymentVerifyContent />
      </Suspense>
    </div>
  );
}

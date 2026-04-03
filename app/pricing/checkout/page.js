'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Example dummy details for consultation
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    amount: 999
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/payment/cashfree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: formData.amount,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          orderNote: 'Consulting Session Booking'
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.paymentSessionId) {
        // Load script dynamically
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          const cashfree = window.Cashfree({
            mode: 'sandbox' // or production based on your environment
          });
          
          cashfree.checkout({
            paymentSessionId: data.paymentSessionId,
            returnUrl: `${window.location.origin}/payment/verify?order_id={order_id}`,
          });
        };
      } else {
        throw new Error('Payment session failed to initialize');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong during checkout.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col pt-32 px-6">
      <Navbar />
      
      <main className="flex-grow max-w-2xl mx-auto w-full mb-20">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} /> Back to Pricing
        </button>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black italic">Secure Checkout</h1>
              <p className="text-slate-400">Consulting Session - ₹{formData.amount}</p>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="space-y-6 relative z-10">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder-slate-600"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder-slate-600"
                  placeholder="Enter phone number" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder-slate-600"
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider transition-all disabled:opacity-50 flex justify-center items-center gap-2 mt-8"
            >
              {loading ? <><Loader2 className="animate-spin" /> Processing...</> : `Pay ₹${formData.amount}`}
            </button>
            
            <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-4">Protected by Cashfree PG</p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight,
  TrendingUp,
  Globe,
  Loader2,
  CheckCircle
} from 'lucide-react';

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Free');
  const [status, setStatus] = useState(null);

  const plans = [
    {
      name: 'Basic',
      price: 999,
      icon: Zap,
      color: '#3b82f6',
      features: ['5 Job Postings', 'Standard Listing', 'Basic Applicant Tracking', 'Email Support'],
      bestFor: 'Individual Recruiters'
    },
    {
      name: 'Premium',
      price: 2499,
      icon: TrendingUp,
      color: '#10b981',
      popular: true,
      features: ['20 Job Postings', 'Priority Listing', 'Advanced Filter Tools', 'WhatsApp Alerts', 'Bulk Messaging'],
      bestFor: 'Growing Startups'
    },
    {
      name: 'Enterprise',
      price: 9999,
      icon: Globe,
      color: '#8b5cf6',
      features: ['Unlimited Postings', 'Verified Badge', 'AI-Candidate Matching', 'Dedicated Account Manager', 'Custom API Access'],
      bestFor: 'Large Corporations'
    }
  ];

  // Load Cashfree SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpgrade = async (plan) => {
    setLoading(true);
    setStatus(null);
    try {
      const employer = JSON.parse(localStorage.getItem('employerUser'));
      if (!employer?._id) return alert('Session expired. Please login again.');

      // 1. Create order on backend
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employerId: employer._id,
          planName: plan.name,
          amount: plan.price,
          customerPhone: '9560410655', // Test phone
          customerEmail: employer.email
        }),
      });

      const data = await res.json();
      if (data.success && window.Cashfree) {
        // 2. Initialize Cashfree checkout
        const cashfree = window.Cashfree({ mode: 'sandbox' });
        await cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          returnUrl: `${window.location.origin}/employer/subscription/verify?order_id=${data.orderId}`,
        });
      } else {
        alert('Payment initiation failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Check console.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'white', letterSpacing: '-0.02em', marginBottom: '12px' }}>
           Supercharge Your Hiring 🚀
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Choose a premium plan to unlock advanced recruiting tools and reach 10x more candidates.
        </p>
      </div>

      {/* Current Plan Status Card */}
      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: '24px', 
        padding: '32px', 
        marginBottom: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.05))', pointerEvents: 'none' }}></div>
        <div>
           <div style={{ fontSize: '12px', fontWeight: '800', color: '#3b82f6', letterSpacing: '0.1em', marginBottom: '8px' }}>CURRENT PLAN</div>
           <div style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>{currentPlan} Member</div>
           <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Last billed: Sep 12, 2025 • Next renewal: Oct 12, 2025</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
           <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '700' }}>Active</div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
        {plans.map((plan, idx) => (
          <div 
            key={idx}
            style={{ 
              background: plan.popular ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.02)', 
              border: `1px solid ${plan.popular ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)'}`, 
              borderRadius: '28px', 
              padding: '40px',
              position: 'relative',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {plan.popular && (
              <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
                MOST POPULAR
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${plan.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <plan.icon size={28} color={plan.color} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: 0 }}>{plan.name}</h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{plan.bestFor}</p>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '48px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                <span style={{ fontSize: '20px', color: '#475569', marginTop: '10px' }}>₹</span>
                {plan.price}
                <span style={{ fontSize: '14px', color: '#475569', fontWeight: '600', alignSelf: 'flex-end', marginBottom: '12px' }}>/mo</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {plan.features.map((feature, fidx) => (
                <div key={fidx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle2 size={18} color="#4ade80" />
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleUpgrade(plan)}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '18px', 
                borderRadius: '16px', 
                background: plan.popular ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(255,255,255,0.05)', 
                border: 'none', 
                color: 'white', 
                fontSize: '15px', 
                fontWeight: '700', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={18} /></>}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '64px', textAlign: 'center', padding: '32px', borderRadius: '24px', background: 'rgba(255,255,245,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', opacity: 0.5 }}>
           {/* Trust indicators */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <ShieldCheck size={20} />
             <span style={{ fontSize: '14px', fontWeight: '600' }}>Secure Checkout</span>
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <CreditCard size={20} />
             <span style={{ fontSize: '14px', fontWeight: '600' }}>GST Compliant Invoice</span>
           </div>
        </div>
      </div>
    </div>
  );
}

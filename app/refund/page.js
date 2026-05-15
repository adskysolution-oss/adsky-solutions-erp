'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-white/40">
              Refund & Cancellation
            </h1>
            <p className="text-slate-400 italic">Last Updated: May 15, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-12 text-slate-300">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">1. Cancellation Policy</h2>
              <p className="leading-relaxed">
                At <span className="text-emerald-400 font-bold">AD Sky Solution</span>, we strive to provide the best service experience. If you wish to cancel a service or a scheduled consultation, please note our cancellation terms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations requested at least <span className="text-emerald-400 font-bold">24 hours</span> before the scheduled session are eligible for a full refund or rescheduling.</li>
                <li>Cancellations made less than 24 hours before the session may not be eligible for a refund, as the consultant's time is already reserved.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">2. Refund Eligibility</h2>
              <p className="leading-relaxed">
                Refunds are granted under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>If a service is cancelled within the allowed timeframe (24 hours prior).</li>
                <li>In case of duplicate payments for the same service.</li>
                <li>If AD Sky Solution is unable to provide the service due to internal reasons.</li>
              </ul>
              <p className="italic text-slate-400 mt-4">Note: Consulting fees are generally non-refundable once the session has been completed.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">3. Refund Process & Timeline</h2>
              <p className="leading-relaxed">
                Once your refund request is approved, the amount will be credited back to your original payment method (Bank Account, Credit/Debit Card, or UPI) within <span className="text-emerald-400 font-bold">5 to 7 working days</span>.
              </p>
              <p className="leading-relaxed">
                The timeline for the refund to reflect in your account may vary depending on your bank's policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">4. Non-Refundable Items</h2>
              <p className="leading-relaxed">
                Certain services, such as customized software strategy reports or completed technical audits, are non-refundable as they represent work already performed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">5. Contact for Refunds</h2>
              <p className="leading-relaxed">
                To request a refund or cancellation, please email us with your transaction details:
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 italic">
                <p><strong>AD Sky Solution - Billing Dept</strong></p>
                <p>Email: info@adskysolution.com</p>
                <p>Phone: +91 8076611842</p>
                <p>Address: 126 Satyam Enclave Sahibabad, Ghaziabad, Uttar Pradesh 201003</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

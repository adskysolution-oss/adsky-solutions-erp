'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40">
              Terms & Conditions
            </h1>
            <p className="text-slate-400 italic">Last Updated: May 15, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-12 text-slate-300">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using the services provided by <span className="text-blue-400 font-bold">AD Sky Solution</span> ("Company", "we", "us", or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">2. Services Offered</h2>
              <p className="leading-relaxed">
                AD Sky Solution provides expert IT consulting, software development strategy, business process automation, and specialized workforce solutions. All services are subject to these terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">3. Payment Terms</h2>
              <p className="leading-relaxed">
                Payments for our services are processed securely through our authorized payment gateways, including but not limited to <span className="text-blue-400 font-bold">PhonePe, Razorpay, and PayU</span>. 
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All fees are quoted in Indian Rupees (INR) unless otherwise specified.</li>
                <li>Users are responsible for providing accurate billing information.</li>
                <li>Access to services or consultation sessions will only be granted upon successful payment confirmation.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">4. User Obligations</h2>
              <p className="leading-relaxed">
                You agree to provide true, accurate, and complete information when registering or using our forms. Unauthorized use of this website or its content is strictly prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">5. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, trademarks, logos, and intellectual property on this website are owned by AD Sky Solution. No part of this site may be reproduced or used without prior written consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                AD Sky Solution shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or for any loss of data or profits.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">7. Governing Law</h2>
              <p className="leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in <span className="text-blue-400 font-bold">Ghaziabad, Uttar Pradesh</span>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">8. Contact Information</h2>
              <p className="leading-relaxed">
                For any queries regarding these terms, please contact us at:
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 italic">
                <p><strong>AD Sky Solution</strong></p>
                <p>126 Satyam Enclave Sahibabad, Ghaziabad, Uttar Pradesh 201003</p>
                <p>Email: info@adskysolution.com</p>
                <p>Phone: +91 8076611842</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


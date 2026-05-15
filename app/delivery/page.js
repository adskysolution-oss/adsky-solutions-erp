'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DeliveryPage() {
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
              Service Delivery
            </h1>
            <p className="text-slate-400 italic">Last Updated: May 15, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-12 text-slate-300">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">1. Digital Nature of Services</h2>
              <p className="leading-relaxed">
                All services provided by <span className="text-blue-400 font-bold">AD Sky Solution</span> are digital in nature. We specialize in IT consulting, software development strategy, and specialized workforce solutions.
              </p>
              <p className="font-bold text-blue-400 italic">Important: There are no physical products to be shipped for any of our services.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">2. Delivery Timeline</h2>
              <p className="leading-relaxed">
                Once a successful payment is confirmed through our secure gateways (<span className="text-blue-400 font-bold">PhonePe, Razorpay, or PayU</span>), our team will process your request:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-bold text-white">Consultation Sessions:</span> You will be contacted via email or phone within <span className="text-blue-400 font-bold">24 hours</span> to schedule your session.</li>
                <li><span className="font-bold text-white">Digital Reports/Strategy:</span> The delivery timeline for custom documents will be communicated at the time of order, typically ranging from 3-7 business days.</li>
                <li><span className="font-bold text-white">Software Solutions:</span> Delivery milestones will be defined as per the specific project agreement.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">3. Delivery Mode</h2>
              <p className="leading-relaxed">
                Services are delivered through online communication channels, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Video conferencing platforms (Zoom, Google Meet, etc.).</li>
                <li>Secure email communication for reports and documentation.</li>
                <li>Authorized client portals or shared workspaces.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">4. Confirmation of Delivery</h2>
              <p className="leading-relaxed">
                Service delivery is considered complete once the consultation session has been conducted or the final digital deliverable has been shared via email or the agreed-upon platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">5. Contact Information</h2>
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

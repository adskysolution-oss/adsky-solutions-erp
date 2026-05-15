'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 relative">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40">
              Privacy Policy
            </h1>
            <p className="text-slate-400 italic">Last Updated: May 15, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-12 text-slate-300">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to <span className="text-blue-400 font-bold">AD Sky Solution</span>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">2. Information We Collect</h2>
              <p className="leading-relaxed">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number.</li>
                <li>Billing information and transaction details.</li>
                <li>Information provided in application or contact forms.</li>
                <li>Device information and IP addresses via cookies.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the collected data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and manage our consulting and technical services.</li>
                <li>To process payments securely through <span className="text-blue-400 font-bold">PhonePe, Razorpay, or PayU</span>.</li>
                <li>To communicate with you regarding updates, support, or marketing (with your consent).</li>
                <li>To improve our website functionality and user experience.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">4. Data Sharing and Disclosure</h2>
              <p className="leading-relaxed">
                We do not sell your personal information. However, we may share data with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="text-blue-400 font-bold">Payment Processors:</span> Your billing details are shared with our payment gateway partners (PhonePe, Razorpay, PayU) to process transactions.</li>
                <li><span className="text-blue-400 font-bold">Service Providers:</span> Trusted third parties that assist us in operating our website or conducting our business.</li>
                <li><span className="text-blue-400 font-bold">Legal Compliance:</span> If required by law or to protect our rights.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures, including SSL encryption, to protect your data during transmission. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">6. Cookies Policy</h2>
              <p className="leading-relaxed">
                Our website uses cookies to enhance user experience and analyze traffic. You can choose to disable cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">7. Your Rights</h2>
              <p className="leading-relaxed">
                You have the right to access, correct, or request the deletion of your personal data. Please contact us to exercise these rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-white italic tracking-tight">8. Contact Us</h2>
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


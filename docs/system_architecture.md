# System Architecture: AdSky Solution – 25X Enterprise System
**Date**: April 16, 2026  
**Status**: Production-Ready Blueprint  

## 🚀 1. Technology Stack
Enterprise-grade modular stack for 1M+ users scalability.

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend Orchestration**: Next.js API Routes (Serverless optimized) with Service-Controller architecture.
- **Database**: PostgreSQL (Managed RDS) with Prisma ORM for type-safe query orchestration.
- **Infrastructure**:
  - **Auth**: JWT with HTTP-only cookies and RBAC node.
  - **Storage**: AWS S3 (Signed URLs for farmer document security).
  - **Financials**: Razorpay/Cashfree Webhooks with idempotency keys.
  - **Messaging**: Twilio/Interakt WhatsApp Sentinel + SMTP.

## 🏢 2. Multi-Tenant Architecture
The system is partitioned into four distinct operational nodes (Panels).

| Node | Purpose | Core Interaction |
| :--- | :--- | :--- |
| **Super Admin** | Platform Governance | Configuration, Global Analytics, Partner Onboarding. |
| **Partner Hub** | Franchise Management | Regional Field Force recruitment, Commission tracking. |
| **Field Agent** | Mission Execution | Farmer onboarding, Geolocation capture, Offline drafts. |
| **Farmer Node** | End-User Portal | Mission application, Digital payment, Status tracking. |

## 🧬 3. System Data Flow
Detailed lifecycle of a Mission Lead in the 25X ecosystem.

1. **Mission Initialization**: Admin defines a `Form` schema (JSON).
2. **Field Deployment**: Employee generates a unique referral link `/lead?p=ADS001&e=EMP001`.
3. **Capture**: Farmer submits details via mobile-first `Farmer Panel`. Geolocation captured.
4. **Settlement**: Farmer pays ₹249. System triggers `processCommissionSplit`.
5. **Wallet Pulsing**: 
   - Admin Wallet: Platform fee credit.
   - Partner Wallet: Regional commission credit.
   - Employee Wallet: Field mission reward credit.
6. **Audit Node**: Submission moves to "Under Review" in Admin/Partner queue.

## 📂 4. Project Directory Blueprint
Standardized enterprise directory structure.

```bash
adsky-solution/
├── app/                    # Next.js App Router (Layouts & Pages)
│   ├── admin/              # Super Admin Command Center
│   ├── partner/            # Regional Franchise Hub
│   ├── field/              # Mobile-First Agent Panel
│   └── farmer/             # End-User Portal (Multilingual)
├── components/             # High-Fidelity React UI Components
│   ├── admin/              # Admin exclusive UI (Builder, etc.)
│   ├── forms/              # Dynamic Form Engines
│   ├── cms/                # JSON Page Renderer
│   └── shared/             # Universal enterprise elements
├── lib/                    # Logic & Services (Backend equivalent)
│   ├── services/           # Business logic (Wallet, SMS, Payment)
│   ├── prisma.js           # Database singleton
│   └── security/           # RBAC & Auth protection nodes
├── prisma/                 # Database schema and migrations
└── docs/                   # Production documentation
```

## 🔐 5. Security Protocols
- **RBAC**: Role-based access control implemented at edge middleware.
- **Data Isolation**: All Partner/Employee queries are strictly scoped by `partnerCode` or `employeeCode`.
- **Audit Logging**: Every sensitive action (Payout, Status Change, Config Update) is logged in the `AuditLog` table with IP and User metadata.

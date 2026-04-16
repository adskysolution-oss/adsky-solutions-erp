-- AdSky 25X Enterprise System
-- PostgreSQL Production DDL Logic
-- Generated: April 16, 2026

-- 1. Identity & Auth Nodes
CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT DEFAULT 'farmer' NOT NULL, -- admin, partner, employee, farmer
    "status" TEXT DEFAULT 'active' NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Multi-tenant Franchise System
CREATE TABLE "Partner" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE NOT NULL REFERENCES "User"("id"),
    "partnerCode" TEXT UNIQUE NOT NULL,
    "region" TEXT,
    "commissionRate" FLOAT DEFAULT 30.0 NOT NULL
);

CREATE TABLE "Employee" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE NOT NULL REFERENCES "User"("id"),
    "partnerId" UUID NOT NULL REFERENCES "Partner"("id"),
    "employeeCode" TEXT UNIQUE NOT NULL
);

-- 3. Lead Capture & Form Engine
CREATE TABLE "Form" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "schemaJson" JSONB NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Submission" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "formId" UUID NOT NULL REFERENCES "Form"("id"),
    "partnerCode" TEXT,
    "employeeCode" TEXT,
    "dataJson" JSONB NOT NULL,
    "state" TEXT,
    "district" TEXT,
    "tehsil" TEXT,
    "village" TEXT,
    "pincode" TEXT,
    "status" TEXT DEFAULT 'submitted' NOT NULL,
    "paymentStatus" TEXT DEFAULT 'pending' NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Treasury & Wallet System
CREATE TABLE "Wallet" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE NOT NULL REFERENCES "User"("id"),
    "balance" FLOAT DEFAULT 0.0 NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Transaction" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "walletId" UUID NOT NULL REFERENCES "Wallet"("id"),
    "type" TEXT NOT NULL, -- credit, debit
    "amount" FLOAT NOT NULL,
    "description" TEXT,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CMS & Website Nodes
CREATE TABLE "Page" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "slug" TEXT UNIQUE NOT NULL,
    "title" TEXT NOT NULL,
    "layoutJson" JSONB NOT NULL,
    "seoMeta" JSONB,
    "published" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Audit & Security
CREATE TABLE "AuditLog" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES "User"("id"),
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for 1M+ Scale Performance
CREATE INDEX idx_submission_state ON "Submission" ("state");
CREATE INDEX idx_submission_district ON "Submission" ("district");
CREATE INDEX idx_submission_partner ON "Submission" ("partnerCode");
CREATE INDEX idx_submission_employee ON "Submission" ("employeeCode");
CREATE INDEX idx_submission_status ON "Submission" ("status");
CREATE INDEX idx_page_slug ON "Page" ("slug");

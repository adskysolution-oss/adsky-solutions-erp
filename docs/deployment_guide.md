# Deployment Guide: AdSky Solution – 25X Enterprise System
**Target Environment**: AWS + Vercel (Production)  
**Configuration Date**: April 16, 2026

## ☁️ 1. Infrastructure Requirements
The 25X system requires the following managed services:

- **Frontend/API**: Vercel (Next.js 14)
- **Database**: AWS RDS PostgreSQL (v15+)
- **Storage**: AWS S3 Bucket (Public access blocked, use Signed URLs)
- **Cache/Queue**: Managed Redis (Upstash or AWS ElastiCache)

## 🔑 2. Environment Variables (.env.production)
Copy these to your Vercel/EC2 project settings.

```bash
# Database
DATABASE_URL="postgresql://user:password@rds-endpoint:5432/adsky_db"

# Authentication
JWT_SECRET="generate-a-32-char-random-string"
REFRESH_TOKEN_SECRET="another-random-string"

# Payments (Production Keys)
CASHFREE_APP_ID="your_app_id"
CASHFREE_SECRET_KEY="your_secret_key"
RAZORPAY_KEY_ID="rzp_live_xxxx"
RAZORPAY_SECRET="xxxx"

# Storage
AWS_ACCESS_KEY_ID="xxxx"
AWS_SECRET_ACCESS_KEY="xxxx"
AWS_S3_BUCKET="adsky-assets-production"
AWS_REGION="ap-south-1"

# External APIs
WHATSAPP_API_KEY="xxxx"
SMTP_HOST="email-smtp.ap-south-1.amazonaws.com"
SMTP_USER="xxxx"
SMTP_PASS="xxxx"
```

## 🚀 3. Deployment Steps

### Step 1: Database Provisioning
Connect to your RDS instance and run the provided DDL script:
```bash
psql -h rds-endpoint -U user -d adsky_db -f docs/database_schema.sql
```

### Step 2: Prisma Orchestration
Generate the production client and push the schema (if using Prisma db push):
```bash
npx prisma generate
npx prisma db push --accept-data-loss # Only for initial setup
```

### Step 3: Vercel Deployment
1. Connect your GitHub repository to Vercel.
2. Add all environment variables listed above.
3. Build command: `npm run build`.
4. Output directory: `.next`.

### Step 4: Webhook Configuration
Navigate to your Payment Gateway dashboard and set the webhook URL to:
`https://your-domain.com/api/webhooks/razorpay`
Select events: `payment.captured`.

## 🛡️ 4. Security Hardening
- **SSL/TLS**: Ensure "Always use HTTPS" is enabled on Vercel.
- **S3 Bucket Policy**: Apply `Block Public Access` to ensure farmer documents are only accessible via the platform.
- **Rate Limiting**: Enable Vercel Application Firewall for `/api/auth` endpoints.

## 📊 5. Maintenance Nodes
- **Audit Logs**: Regularly monitor the `AuditLog` table for suspicious admin activity.
- **Wallet Reconciliation**: Use the `Stats Engine` to reconcile platform balances every 24 hours.

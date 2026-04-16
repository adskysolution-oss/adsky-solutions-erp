# Production Configuration: adskysolution.com Launch
**Target**: Vercel + Neon.tech (PostgreSQL)

Platform ko live le jaane ke liye niche diye gaye steps follow karein. Isse aapke main domain ka control aapke paas rahega aur panels sahi subdomains par load honge.

## 🗄️ 1. Database Setup (Neon.tech) - AWS Alternative

1.  **Neon.tech** par account banayein (Free).
2.  Ek naya project create karein: `AdSky-ERP-25X`.
3.  "Connection String" copy karein aur use `.env.production` file mein `DATABASE_URL` ke roop mein set karein.
    - Example: `postgresql://user:password@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

## ☁️ 2. Vercel Configuration

1.  Vercel par naya project import karein (`adsky-solution`).
2.  **Environment Variables** add karein (Wait for my `deployment_guide.md` for the full list).
3.  **SUBDOMAIN SETUP**:
    - Vercel Dashboard mein "Settings" -> "Domains" par jayein.
    - Ye 5 domains add karein:
      - `adskysolution.com` (Main Website)
      - `admin.adskysolution.com` (Admin Panel)
      - `partner.adskysolution.com` (Partner Panel)
      - `field.adskysolution.com` (Agent Panel)
      - `farmer.adskysolution.com` (Customer Portal)
    - Vercel aapko CNAME records dega.

## 🌐 3. DNS Orchestration (Domain Registrar)

Apne Domain provider (Hostinger/GoDaddy) ke DNS records mein ye CNAME records add karein:

| Type | Host | Value |
| :--- | :--- | :--- |
| CNAME | admin | cname.vercel-dns.com |
| CNAME | partner | cname.vercel-dns.com |
| CNAME | field | cname.vercel-dns.com |
| CNAME | farmer | cname.vercel-dns.com |

## 🚀 4. Live Launch Mission

1.  Ek baar DNS propagate ho jaye (max 2-24h), toh aapka middleware automatically subdomains ko handle karne lagega.
2.  `admin.adskysolution.com` par aapka Super Admin panel khulega.
3.  `adskysolution.com` par aapki existing homepage load hogi.

---

### Important Checklist:
- [ ] Database URL mapped to Neon.tech.
- [ ] JWT Secrets generated and added to Vercel.
- [ ] 4 Subdomains registered in Vercel settings.
- [ ] CNAME records added in DNS management.

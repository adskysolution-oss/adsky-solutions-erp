# Production Vault: Environment Variables for adskysolution.com
**Last Updated**: April 16, 2026

Iche diye gaye Variables ko aapke **Vercel Project Settings** -> **Environment Variables** mein add karein.

## 🔐 1. Core Platform Secrets
| Key | Value (Example/Description) |
| :--- | :--- |
| `DATABASE_URL` | Aapka Neon.tech PostgreSQL connection string. |
| `JWT_SECRET` | Ek random 32+ char string (e.g., `adsky_erp_master_key_2026`). |
| `NEXT_PUBLIC_SITE_URL` | `https://adskysolution.com` |

## 💰 2. Financial Gateway (Payments)
| Key | Value |
| :--- | :--- |
| `CASHFREE_CLIENT_ID` | Production App ID (from Cashfree dashboard). |
| `CASHFREE_CLIENT_SECRET` | Production Secret Key. |
| `CASHFREE_ENV` | `PRODUCTION` (Sandbox for testing). |
| `RAZORPAY_KEY_ID` | `rzp_live_xxxx` |
| `RAZORPAY_SECRET` | `xxxx` |

## 📦 3. Cloud Storage (Documents/Photos)
| Key | Value |
| :--- | :--- |
| `AWS_ACCESS_KEY_ID` | IAM User access key. |
| `AWS_SECRET_ACCESS_KEY` | IAM User secret key. |
| `AWS_S3_BUCKET` | `adskysolution-production-files` |
| `AWS_REGION` | `ap-south-1` |

## 📲 4. Mission Notifications
| Key | Value |
| :--- | :--- |
| `WHATSAPP_API_KEY` | Twilio/Interakt API credentials. |
| `SMTP_HOST` | `email-smtp.ap-south-1.amazonaws.com` |
| `SMTP_USER` | AWS SES User. |
| `SMTP_PASS` | AWS SES Password. |

---

### 🚀 Implementation Hack:
Vercel par ye key-value pairs copy-paste karne ke baad, project ko **Redeploy** karein taaki naye settings active ho jayein.

> [!CAUTION]
> Kabhi bhi `.env` file ko GitHub par commit na karein. Sirf Vercel dashboard ka hi upyog karein.

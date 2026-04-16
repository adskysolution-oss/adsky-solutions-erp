# API Documentation: AdSky 25X Enterprise Node
**Protocol**: REST (JSON)  
**Security**: Bearer JWT in Authorization Header  

## 🔐 1. Authentication Node
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/login` | Public | Authenticates user & returns JWT tokens. |
| POST | `/api/auth/refresh` | Public | Generates new Access Token via Refresh Token. |
| POST | `/api/auth/logout` | User | Revokes current session tokens. |

## 🕹️ 2. Admin Command Center (Super Control)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| GET | `/api/admin/stats` | Admin | Real-time KPI data (Revenue, Growth, Health). |
| POST | `/api/admin/partners` | Admin | Provision new regional franchise hub. |
| GET | `/api/admin/submissions` | Admin | Filterable queue of all system-wide missions. |
| PUT | `/api/admin/config` | Admin | Update system fees and commission rates globally. |
| POST | `/api/admin/cms/pages` | Admin | Lifecycle management for dynamic web pages. |

## 🏢 3. Partner Hub (Franchise Operations)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| GET | `/api/partner/stats` | Partner | Regional KPI node (Earnings, Team leads). |
| POST | `/api/partner/employees` | Partner | Recruit new field agents into the franchise. |
| GET | `/api/partner/leads` | Partner | Filterable regional mission log (Scoped). |
| POST | `/api/partner/payouts` | Partner | Initialize regional commission withdrawal. |

## 📲 4. Field Agent Panel (Mission Execution)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/api/field/submissions` | Agent | Commit new farmer onboarding dossier (with GPS). |
| GET | `/api/field/history` | Agent | Personal mission log and commission status. |
| GET | `/api/field/referrals` | Agent | Generate unique tracking nexus links. |

## 🚜 5. Farmer Portal (End-User Access)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| GET | `/api/farmer/status` | Farmer | Real-time mission tracking (Submitted → Approved). |
| POST | `/api/farmer/checkout` | Farmer | Initialize ₹249 activation fee (Razorpay Order). |
| GET | `/api/farmer/receipt` | Farmer | Generate digital mission pass / tax invoice. |

## 💰 6. Financial & Webhook Nodes
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| POST | `/api/webhooks/razorpay` | Razorpay | Captures payment success & triggers split logic. |
| POST | `/api/webhooks/whatsapp` | WhatsApp | Handle mission updates via two-way notifications. |

---

### Request Formatting:
All POST/PUT requests must include `Content-Type: application/json`.  
Standard Error Response Schema:
```json
{
  "error": {
    "code": "MISSING_FIELD",
    "message": "Field 'farmer_name' is missing in payload."
  }
}
```

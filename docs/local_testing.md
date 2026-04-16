# Testing Guide: AdSky 25X Subdomain Simulation
**Date**: April 16, 2026

Kyunki hum subdomains (`admin`, `partner`, etc.) use kar rahe hain, isliye seedhe `localhost:3000` par test karne se middleware block ho sakta hai. Aapko apne computer ki `hosts` file mein ye domains map karne honge.

## 🖥️ 1. Local DNS Setup (Windows)

1.  **Notepad** ko "Run as Administrator" karke open karein.
2.  File open karein: `C:\Windows\System32\drivers\etc\hosts`
3.  End mein ye lines add karein:
    ```text
    127.0.0.1 adskysolution.local
    127.0.0.1 admin.adskysolution.local
    127.0.0.1 partner.adskysolution.local
    127.0.0.1 field.adskysolution.local
    127.0.0.1 farmer.adskysolution.local
    ```
4.  File save karein.

## 🚀 2. Local Launch Sequence

1.  **Terminal** open karein (adsky-solution folder mein).
2.  Database setup karein (agar naya DB hai):
    ```bash
    npx prisma db push
    ```
3.  Test accounts create karein:
    ```bash
    npm run seed
    ```
4.  Project start karein:
    ```bash
    npm run dev
    ```

## 🧪 3. Verification Protocol

Ab aap niche diye gaye URLs ko apne browser mein open karke check kar sakte hain:

- **Admin Control**: `http://admin.adskysolution.local:3000` (Login: admin@adskysolution.com / admin123)
- **Franchise Hub**: `http://partner.adskysolution.local:3000` (Login: partner@adskysolution.com / partner123)
- **Agent Panel**: `http://field.adskysolution.local:3000` (Login: agent@adskysolution.com / agent123)
- **Farmer Portal**: `http://farmer.adskysolution.local:3000` (Login: farmer@adskysolution.com / farmer123)

> [!NOTE]
> Humne `adskysolution.local` isliye use kiya hai taaki aapka main `adskysolution.com` site par koi asar na ho. Middleware automatically ise detect kar lega.

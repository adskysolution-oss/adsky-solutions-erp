import { NextResponse } from 'next/server';

// Mock OTP storage (in-memory for demo, should use Redis or DB in production)
const otpStore = new Map();

export async function POST(req) {
  try {
    const { action, mobile, otp } = await req.json();

    if (action === 'send') {
      if (!mobile || mobile.length !== 10) {
        return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
      }

      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(mobile, { otp: generatedOtp, expires: Date.now() + 300000 }); // 5 mins expiry

      console.log(`[OTP DEBUG] OTP for ${mobile} is: ${generatedOtp}`);
      
      // In production, integrate with MSG91, Twilio, or Firebase here.
      
      return NextResponse.json({ success: true, message: 'OTP sent successfully (Check console in dev mode)' });
    }

    if (action === 'verify') {
      const stored = otpStore.get(mobile);
      
      if (!stored) {
        return NextResponse.json({ error: 'OTP not requested or expired' }, { status: 400 });
      }

      if (Date.now() > stored.expires) {
        otpStore.delete(mobile);
        return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
      }

      if (otp === stored.otp || otp === '123456') { // Allow 123456 for testing
        otpStore.delete(mobile);
        return NextResponse.json({ success: true, message: 'Mobile verified successfully' });
      }

      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

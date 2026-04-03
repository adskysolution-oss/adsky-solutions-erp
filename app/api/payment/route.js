import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Content from '@/models/Content';
import { Cashfree } from "cashfree-pg";

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Fetch user inputs (e.g., amount, customer details)
    const { orderAmount, customerId, customerPhone, customerEmail } = await request.json();

    // 1. Fetch Dynamic Admin Keys from Database
    const cashfreeConfig = await Content.findOne({ key: 'cashfree_keys' });
    if (!cashfreeConfig || !cashfreeConfig.value || !cashfreeConfig.value.appId || !cashfreeConfig.value.secretKey) {
      return NextResponse.json({ error: 'Payment Gateway is not configured by Admin.' }, { status: 500 });
    }

    const { appId, secretKey, environment } = cashfreeConfig.value;

    // 2. Setup Cashfree SDK
    Cashfree.XClientId = appId;
    Cashfree.XClientSecret = secretKey;
    Cashfree.XEnvironment = environment === 'production' 
      ? Cashfree.Environment.PRODUCTION 
      : Cashfree.Environment.SANDBOX;

    // 3. Create Order Request
    const orderId = `order_${Date.now()}`;
    const requestArgs = {
      order_amount: orderAmount || 1.00,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId || "cust_123",
        customer_phone: customerPhone || "9999999999",
        customer_email: customerEmail || "info@adskysolution.com"
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/status?order_id=${orderId}`
      }
    };

    // 4. Generate URL/Session from Cashfree
    const response = await Cashfree.PGCreateOrder("2023-08-01", requestArgs);
    
    return NextResponse.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: orderId
    });

  } catch (err) {
    console.error("Cashfree Order Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

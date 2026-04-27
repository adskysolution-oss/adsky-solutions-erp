import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';

// POST: Create a generic payment order using Direct API Call (more reliable than SDK)
export async function POST(req) {
  try {
    await connectToDatabase();

    const clientId = process.env.CASHFREE_CLIENT_ID?.trim();
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET?.trim();
    const isProduction = process.env.CASHFREE_ENV === 'production';
    
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Cashfree API Keys are missing' }, { status: 500 });
    }

    const body = await req.json();
    const {
      orderId,
      amount,
      currency = 'INR',
      customerName,
      customerPhone,
      customerEmail,
      customerId,
      returnUrl,
      orderNote
    } = body;

    const generatedOrderId = orderId || `adsky_${Date.now()}_${Math.floor(Math.random() * 9999)}`;

    const url = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    const payload = {
      order_amount: parseFloat(amount),
      order_currency: currency,
      order_id: generatedOrderId,
      order_note: orderNote || 'Payment via AdSky Solution',
      customer_details: {
        customer_id: customerId || `cust_${Date.now()}`,
        customer_name: customerName || 'Customer',
        customer_phone: customerPhone,
        customer_email: customerEmail || 'customer@adskysolution.com'
      },
      order_meta: {
        return_url: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adskysolution.com'}/payment/verify?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adskysolution.com'}/api/payment/webhook`
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree API Error Response:', data);
      throw new Error(data.message || 'Authentication Failed at Cashfree');
    }

    return NextResponse.json({
      success: true,
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
      orderStatus: data.order_status
    });

  } catch (error) {
    console.error('Cashfree Fetch Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Verify order status using Direct API
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');
    const isProduction = process.env.CASHFREE_ENV === 'production';

    if (!orderId) return NextResponse.json({ error: 'order_id required' }, { status: 400 });

    const url = isProduction 
      ? `https://api.cashfree.com/pg/orders/${orderId}` 
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
        'x-api-version': '2023-08-01'
      }
    });

    const data = await response.json();
    return NextResponse.json({ success: true, order: data });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import WebsiteConfig from '@/models/WebsiteConfig';

// Initialize based on DB/ENV config
async function initCashfree() {
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  const isProduction = process.env.CASHFREE_ENV === 'production';

  Cashfree.XClientId = clientId;
  Cashfree.XClientSecret = clientSecret;
  Cashfree.XEnvironment = isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;
}

// POST: Create a generic payment order for ANY product/service
export async function POST(req) {
  try {
    await connectToDatabase();
    await initCashfree();

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

    if (!amount || !customerPhone) {
      return NextResponse.json({ error: 'Amount and phone are required' }, { status: 400 });
    }

    const generatedOrderId = orderId || `adsky_${Date.now()}_${Math.floor(Math.random() * 9999)}`;

    const request = {
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

    const response = await Cashfree.PGCreateOrder('2023-08-01', request);
    const orderData = response.data;

    return NextResponse.json({
      success: true,
      orderId: orderData.order_id,
      paymentSessionId: orderData.payment_session_id,
      orderStatus: orderData.order_status
    });
  } catch (error) {
    console.error('Cashfree Create Order Error:', error?.response?.data || error.message);
    return NextResponse.json({ error: error?.response?.data?.message || error.message }, { status: 500 });
  }
}

// GET: Verify payment status
export async function GET(req) {
  try {
    await initCashfree();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) return NextResponse.json({ error: 'order_id required' }, { status: 400 });

    const response = await Cashfree.PGFetchOrder('2023-08-01', orderId);
    return NextResponse.json({ success: true, order: response.data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

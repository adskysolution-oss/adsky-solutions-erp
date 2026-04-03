import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Cashfree webhook handler - receives payment notifications
export async function POST(req) {
  try {
    const body = await req.json();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    const isProduction = process.env.CASHFREE_ENV === 'production';
    Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
    Cashfree.XEnvironment = isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

    // Log the webhook for monitoring
    console.log('Cashfree Webhook received:', {
      type: body.type,
      orderId: body.data?.order?.order_id,
      status: body.data?.payment?.payment_status,
      amount: body.data?.payment?.payment_amount
    });

    // Handle different event types
    if (body.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const { order, payment, customer_details } = body.data;
      // Update DB based on order_id
      // This is automatically handled by the subscription verify endpoint
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

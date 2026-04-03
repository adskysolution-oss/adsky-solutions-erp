import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Subscription from '@/models/Subscription';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID || 'TEST10477006857ea2687a4ba7ff664960077401';
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET || 'cfsk_ma_test_0be9ce069c9b4e6b9a8f4c2e5d9a9b4e_9a8f4c2e';
Cashfree.XEnvironment = CFEnvironment.SANDBOX;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch order status from Cashfree
    const response = await Cashfree.PGFetchOrder('2023-08-01', orderId);
    const orderData = response.data;

    // Update subscription status in DB
    if (orderData.order_status === 'PAID') {
      await Subscription.findOneAndUpdate(
        { orderId },
        { 
          status: 'ACTIVE', 
          paymentId: orderData.cf_order_id,
          startDate: new Date()
        }
      );
      return NextResponse.json({ success: true, status: 'PAID' });
    } else {
      await Subscription.findOneAndUpdate(
        { orderId },
        { status: 'failed' }
      );
      return NextResponse.json({ success: false, status: orderData.order_status });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

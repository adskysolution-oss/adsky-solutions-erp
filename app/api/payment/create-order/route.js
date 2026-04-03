import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Subscription from '@/models/Subscription';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID || 'TEST10477006857ea2687a4ba7ff664960077401';
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET || 'cfsk_ma_test_0be9ce069c9b4e6b9a8f4c2e5d9a9b4e_9a8f4c2e';
Cashfree.XEnvironment = CFEnvironment.SANDBOX;

export async function POST(req) {
  try {
    await connectToDatabase();
    const { employerId, planName, amount, customerPhone, customerEmail } = await req.json();

    const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const request = {
      order_amount: amount,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: employerId,
        customer_phone: customerPhone || '9999999999',
        customer_email: customerEmail || 'test@adskysolution.com'
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/employer/subscription/verify?order_id={order_id}`
      }
    };

    const response = await Cashfree.PGCreateOrder('2023-08-01', request);
    const orderData = response.data;

    // Create pending subscription in DB
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month validity

    await Subscription.create({
      employerId,
      planName,
      orderId,
      amount,
      status: 'pending',
      expiryDate,
      features: ['Priority Listing', 'Unlimited Applicants', 'Email Support']
    });

    return NextResponse.json({ 
      success: true, 
      paymentSessionId: orderData.payment_session_id,
      orderId: orderData.order_id
    });
  } catch (error) {
    console.error('Cashfree Order Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

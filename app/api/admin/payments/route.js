import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Subscription from '@/models/Subscription';
import User from '@/models/User';

// GET all payments with filtering
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';
    const dateRange = searchParams.get('dateRange') || 'all';
    const search = searchParams.get('search') || '';

    let query = {};
    
    // Status Filter
    if (status !== 'all') {
      query.status = status;
    }

    // Date Range Filter
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate = new Date();
      if (dateRange === 'today') {
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === 'week') {
        startDate.setDate(now.getDate() - 7);
      } else if (dateRange === 'month') {
        startDate.setMonth(now.getMonth() - 1);
      }
      query.createdAt = { $gte: startDate };
    }

    // Search by Order ID or User info (Requires fetching & filtering if searching user)
    // For simplicity, we search by OrderId here, but could populate and filter if needed.
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { paymentId: { $regex: search, $options: 'i' } }
      ];
    }

    const payments = await Subscription.find(query)
      .populate('employerId', 'name email companyName')
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: payments });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

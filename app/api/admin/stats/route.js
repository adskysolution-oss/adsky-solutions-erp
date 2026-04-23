import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Partner from '@/models/Partner';
import Employee from '@/models/Employee';
import Application from '@/models/Application';

export async function GET() {
  try {
    await connectToDatabase();

    const [totalUsers, totalPartners, totalEmployees, totalApplications, totalRevenueResult, recentApplications] = await Promise.all([
      User.countDocuments(),
      Partner.countDocuments(),
      Employee.countDocuments(),
      Application.countDocuments(),
      Application.aggregate([
        { $match: { paymentStatus: 'success' } },
        { $group: { _id: null, total: { $sum: 249 } } }
      ]),
      Application.find().sort({ createdAt: -1 }).limit(10)
    ]);

    const stats = {
      totalUsers,
      totalPartners,
      totalEmployees,
      totalApplications,
      totalRevenue: totalRevenueResult[0]?.total || 0,
      pendingApplications: await Application.countDocuments({ applicationStatus: 'submitted' }),
      recentApplications: recentApplications.map(app => ({
        id: app._id,
        user: app.farmerName,
        amount: 249,
        status: app.paymentStatus,
        date: app.createdAt
      }))
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


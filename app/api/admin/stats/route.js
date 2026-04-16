import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Partner from '@/models/Partner';
import Employee from '@/models/Employee';
import Application from '@/models/Application';

export async function GET() {
  try {
    await connectToDatabase();

    const [totalPartners, totalEmployees, totalFarmers, totalRevenue] = await Promise.all([
      Partner.countDocuments(),
      Employee.countDocuments(),
      Application.countDocuments(),
      Application.aggregate([
        { $match: { paymentStatus: 'success' } },
        { $group: { _id: null, total: { $sum: 249 } } }
      ])
    ]);

    const stats = {
      totalPartners,
      totalEmployees,
      totalFarmers,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingApplications: await Application.countDocuments({ applicationStatus: 'submitted' }),
      recentActivity: [] // Will populate later
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

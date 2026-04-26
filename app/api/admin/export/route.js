import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Partner from '@/models/Partner';

/**
 * AdSky Universal Export Pipeline (Mongoose Migrated)
 */
export async function POST(req) {
  try {
    await connectToDatabase();
    const { target, filters } = await req.json();

    let data = [];
    if (target === 'users') {
      data = await User.find({}).sort({ createdAt: -1 }).lean();
    } else if (target === 'partners') {
      data = await Partner.find({}).populate('userId').sort({ createdAt: -1 }).lean();
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'No data matches these criteria' }, { status: 404 });
    }

    // Convert to CSV
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => {
      return Object.values(obj).map(v => `"${v}"`).join(',');
    });

    const csvContent = [headers, ...rows].join('\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=adsky_export_${target}.csv`
      }
    });

  } catch (error) {
    console.error('Export Failed:', error);
    return NextResponse.json({ error: 'Export Failed' }, { status: 500 });
  }
}

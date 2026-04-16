import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { buildPrismaQuery } from '@/lib/services/filter';

/**
 * AdSky 25X Universal Export Pipeline
 * Streams filtered data as CSV assets for enterprise dossiers.
 */
export async function POST(req) {
  try {
    const { target, filters, logic } = await req.json();

    // 1. Build the dynamic query
    const where = buildPrismaQuery(filters, logic);

    // 2. Fetch data based on target model
    let data = [];
    if (target === 'submissions' || target === 'missions') {
      data = await prisma.submission.findMany({
        where,
        include: { form: true },
        orderBy: { createdAt: 'desc' }
      });
    } else if (target === 'users') {
      data = await prisma.user.findMany({ where, orderBy: { createdAt: 'desc' } });
    } else if (target === 'partners') {
      data = await prisma.partner.findMany({ where, include: { user: true } });
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'No data matches these criteria' }, { status: 404 });
    }

    // 3. Convert to CSV (Universal Data Format)
    const headers = Object.keys(data[0]).filter(k => k !== 'passwordHash').join(',');
    const rows = data.map(obj => {
      return Object.entries(obj)
        .filter(([k]) => k !== 'passwordHash')
        .map(([_, v]) => {
          const val = typeof v === 'object' ? JSON.stringify(v) : v;
          return `"${val}"`;
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\n');

    // 4. Return as downloadable file
    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=adsky_dossier_${target}_${Date.now()}.csv`
      }
    });

  } catch (error) {
    console.error('Export Failed:', error);
    return NextResponse.json({ error: 'Advanced Export Pipeline Failed' }, { status: 500 });
  }
}

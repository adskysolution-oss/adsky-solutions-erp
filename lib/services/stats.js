import prisma from '@/lib/prisma';

/**
 * AdSky 25X System Stats Engine
 * Collects high-performance aggregated metrics from PostgreSQL.
 */
export async function getSystemKPIs() {
  try {
    const [
      userCount,
      partnerCount,
      employeeCount,
      submissionCount,
      revenueTotal
    ] = await Promise.all([
      prisma.user.count(),
      prisma.partner.count(),
      prisma.employee.count(),
      prisma.submission.count(),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'credit' }
      })
    ]);

    // Calculate Today's Revenue
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    
    const todayRevenue = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'credit',
        createdAt: { gte: startOfToday }
      }
    });

    return {
      users: userCount,
      partners: partnerCount,
      employees: employeeCount,
      submissions: submissionCount,
      totalRevenue: revenueTotal._sum.amount || 0,
      todayRevenue: todayRevenue._sum.amount || 0,
      health: 'Optimal'
    };
  } catch (error) {
    console.error('System KPI Fetch Failed:', error);
    return {
      users: 0,
      partners: 0,
      employees: 0,
      submissions: 0,
      totalRevenue: 0,
      todayRevenue: 0,
      health: 'Degraded'
    };
  }
}

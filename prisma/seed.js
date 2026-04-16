const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Initializing AdSky 25X Seed Engine...');

  // 🛡️ 1. Clear existing nodes (Optional)
  // await prisma.user.deleteMany();

  // 🔑 2. Seed Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@adskysolution.com' },
    update: {},
    create: {
      email: 'admin@adskysolution.com',
      passwordHash: 'admin123', // IN PROD: Use bcrypt!
      role: 'admin',
      status: 'active'
    }
  });
  console.log('✅ Admin Node Provisioned: admin@adskysolution.com');

  // 🏢 3. Seed Partner
  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@adskysolution.com' },
    update: {},
    create: {
      email: 'partner@adskysolution.com',
      passwordHash: 'partner123',
      role: 'partner'
    }
  });

  const partner = await prisma.partner.upsert({
    where: { partnerCode: 'ADS-101' },
    update: {},
    create: {
      userId: partnerUser.id,
      partnerCode: 'ADS-101',
      region: 'Satna, MP',
      commissionRate: 30.0
    }
  });
  console.log('✅ Partner Node Provisioned: ADS-101');

  // 📲 4. Seed Employee (Agent)
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@adskysolution.com' },
    update: {},
    create: {
      email: 'agent@adskysolution.com',
      passwordHash: 'agent123',
      role: 'employee'
    }
  });

  await prisma.employee.upsert({
    where: { employeeCode: 'EMP-900' },
    update: {},
    create: {
      userId: agentUser.id,
      partnerId: partner.id,
      employeeCode: 'EMP-900'
    }
  });
  console.log('✅ Agent Node Provisioned: EMP-900');

  // 🚜 5. Seed Farmer
  await prisma.user.upsert({
    where: { email: 'farmer@adskysolution.com' },
    update: {},
    create: {
      email: 'farmer@adskysolution.com',
      passwordHash: 'farmer123',
      role: 'farmer'
    }
  });
  console.log('✅ Farmer Node Provisioned: farmer@adskysolution.com');

  // ⚙️ 6. Seed Global Configuration
  await prisma.websiteConfig.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      applicationFee: 249.0,
      partnerCommission: 74.0,
      employeeCommission: 74.0,
      isLive: true
    }
  });
  console.log('✅ Global Mission Configuration Set');

  console.log('🏁 Seeding Complete. Use "npm run dev" to test panels.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

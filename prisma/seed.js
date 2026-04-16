const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Initializing AdSky 25X Seed Engine (SECURE MODE)...');

  // Helper to hash password
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  // 🔑 1. Seed Super Admin
  const adminPwd = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@adskysolution.com' },
    update: { passwordHash: adminPwd },
    create: {
      email: 'admin@adskysolution.com',
      passwordHash: adminPwd,
      role: 'admin',
      status: 'active'
    }
  });
  console.log('✅ Admin Node Provisioned (Secure Hash): admin@adskysolution.com');

  // 🏢 2. Seed Partner
  const partnerPwd = await hashPassword('partner123');
  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@adskysolution.com' },
    update: { passwordHash: partnerPwd },
    create: {
      email: 'partner@adskysolution.com',
      passwordHash: partnerPwd,
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

  // 📲 3. Seed Employee (Agent)
  const agentPwd = await hashPassword('agent123');
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@adskysolution.com' },
    update: { passwordHash: agentPwd },
    create: {
      email: 'agent@adskysolution.com',
      passwordHash: agentPwd,
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

  // 🚜 4. Seed Farmer
  const farmerPwd = await hashPassword('farmer123');
  await prisma.user.upsert({
    where: { email: 'farmer@adskysolution.com' },
    update: { passwordHash: farmerPwd },
    create: {
      email: 'farmer@adskysolution.com',
      passwordHash: farmerPwd,
      role: 'farmer'
    }
  });
  console.log('✅ Farmer Node Provisioned: farmer@adskysolution.com');

  // ⚙️ 5. Seed Global Configuration
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

  console.log('🏁 Seeding Complete. All passwords encrypted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

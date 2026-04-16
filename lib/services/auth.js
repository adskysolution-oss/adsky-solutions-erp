import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adsky-25x-master-secret-2026';

/**
 * AdSky 25X Auth Service
 * High-performance authentication for enterprise scale.
 */
export async function registerUser({ email, password, role = 'farmer', partnerCode = null, employeeCode = null }) {
  // 1. Check if exists
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error('User already exists');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return await prisma.$transaction(async (tx) => {
    // 2. Create Base User
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        role,
        status: 'active'
      }
    });

    // 3. Handle Role Specific Metadata & Wallets
    await tx.wallet.create({ data: { userId: user.id, balance: 0 } });

    if (role === 'partner') {
      await tx.partner.create({
        data: {
          userId: user.id,
          partnerCode: partnerCode || `PART-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        }
      });
    }

    if (role === 'employee') {
      const partner = await tx.partner.findUnique({ where: { partnerCode: partnerCode } });
      if (!partner) throw new Error('Invalid Partner Code');

      await tx.employee.create({
        data: {
          userId: user.id,
          partnerId: partner.id,
          employeeCode: employeeCode || `EMP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        }
      });
    }

    return user;
  });
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: { partner: true, employee: true }
  });

  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      partnerCode: user.partner?.partnerCode,
      employeeCode: user.employee?.employeeCode
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );

  return { user, token };
}

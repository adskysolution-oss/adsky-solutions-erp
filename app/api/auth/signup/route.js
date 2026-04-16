import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const { name, email, phone, password, role } = await req.json();

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'Identity credentials incomplete' }, { status: 400 });
    }

    // 🛡️ Check Identity Collision
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Node already active in network' }, { status: 400 });
    }

    // 🔒 Secure Keyphrase
    const passwordHash = await bcrypt.hash(password, 10);

    // 🧬 Transactional Identity Provisioning
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Core User
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role,
          status: 'active',
        }
      });

      // 2. Role-specific logic
      if (role === 'partner') {
        const lastPartner = await tx.partner.findFirst({
           orderBy: { partnerCode: 'desc' }
        });
        
        let nextCode = 'ADS-101';
        if (lastPartner) {
           const lastNum = parseInt(lastPartner.partnerCode.split('-')[1]);
           nextCode = `ADS-${lastNum + 1}`;
        }

        await tx.partner.create({
          data: {
            userId: user.id,
            partnerCode: nextCode,
            region: 'Universal Branch'
          }
        });
      } else if (role === 'employee') {
        const lastEmployee = await tx.employee.findFirst({
           orderBy: { employeeCode: 'desc' }
        });

        let nextCode = 'EMP-201';
        if (lastEmployee) {
           const lastNum = parseInt(lastEmployee.employeeCode.split('-')[1]);
           nextCode = `EMP-${lastNum + 1}`;
        }

        // Assign to a default master partner if none provided
        const masterPartner = await tx.partner.findFirst();
        
        await tx.employee.create({
           data: {
             userId: user.id,
             employeeCode: nextCode,
             partnerId: masterPartner ? masterPartner.id : 'default-master'
           }
        });
      }

      // 3. Provision Wallet Node
      await tx.wallet.create({
        data: {
          userId: user.id,
          balance: 0.0
        }
      });

      return user;
    });

    return NextResponse.json({ 
       message: 'Node synchronized successfully', 
       identityId: result.id, 
       role: result.role 
    }, { status: 201 });

  } catch (error) {
    console.error('SIGNUP_ENGINE_ERROR:', error);
    return NextResponse.json({ error: 'Identity synchronization failed' }, { status: 500 });
  }
}

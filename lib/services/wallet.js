import prisma from '../prisma';

/**
 * 25X Financial Service
 * Handles PostgreSQL-backed wallet movements and commission splitting.
 */
export async function creditWallet(userId, amount, description, referenceId = null) {
  return await prisma.$transaction(async (tx) => {
    // 1. Get or Create Wallet
    let wallet = await tx.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      wallet = await tx.wallet.create({ data: { userId, balance: 0 } });
    }

    // 2. Update Balance
    const updatedWallet = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: { increment: amount } }
    });

    // 3. Create Transaction Audit Entry
    await tx.transaction.create({
      data: {
        walletId: wallet.id,
        type: 'credit',
        amount,
        description,
        referenceId
      }
    });

    return updatedWallet;
  });
}

export async function processCommissionSplit(submissionId) {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { form: true }
  });

  if (!submission || submission.paymentStatus !== 'success') return;

  const config = await prisma.websiteConfig.upsert({
    where: { id: 'global' },
    update: {},
    create: { id: 'global' }
  });

  // Calculate Admin share
  const totalFee = config.applicationFee;
  const adminShare = totalFee - config.partnerCommission - config.employeeCommission;

  // 1. Admin Credit (Platform Fees)
  const admin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (admin) {
    await creditWallet(admin.id, adminShare, `Platform Fee: Submission ${submissionId}`, submissionId);
  }

  // 2. Partner Credit
  if (submission.partnerCode) {
    const partner = await prisma.partner.findUnique({ where: { partnerCode: submission.partnerCode } });
    if (partner) {
      await creditWallet(partner.userId, config.partnerCommission, `Partner Share: Submission ${submissionId}`, submissionId);
    }
  }

  // 3. Employee Credit
  if (submission.employeeCode) {
    const employee = await prisma.employee.findUnique({ where: { employeeCode: submission.employeeCode } });
    if (employee) {
      await creditWallet(employee.userId, config.employeeCommission, `Agent Reward: Submission ${submissionId}`, submissionId);
    }
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';
import Partner from '@/models/Partner';
import Employee from '@/models/Employee';
import WebsiteConfig from '@/models/WebsiteConfig';
import Wallet from '@/models/Wallet';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

async function updateWalletAndLog(userId, amount, description, referenceId) {
  let wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    wallet = await Wallet.create({ userId, balance: 0 });
  }
  wallet.balance += amount;
  wallet.lastUpdated = Date.now();
  await wallet.save();

  await Transaction.create({
    userId,
    type: 'credit',
    amount,
    description,
    referenceId,
    status: 'completed'
  });
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { applicationId, paymentId, status } = await req.json();

    if (status !== 'SUCCESS') {
      return NextResponse.json({ error: 'Payment failed' }, { status: 400 });
    }

    const application = await Application.findById(applicationId);
    if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (application.paymentStatus === 'success') return NextResponse.json({ success: true });

    // 1. Fetch System Settings
    const config = await WebsiteConfig.findOne() || { partnerCommission: 30, employeeCommission: 50 };

    // 2. Update Application
    application.paymentStatus = 'success';
    application.paymentDetails = { transactionId: paymentId, amount: 249 };
    await application.save();

    // 3. Admin Share (Remaining amount)
    let adminShare = 249 - config.partnerCommission - config.employeeCommission;
    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser) {
      await updateWalletAndLog(adminUser._id, adminShare, `Platform Fee: ${application.farmerName}`, application.partnerCode);
    }

    // 4. Partner Commission
    if (application.partnerCode) {
      const partnerUser = await User.findOne({ partnerCode: application.partnerCode });
      if (partnerUser) {
        await updateWalletAndLog(partnerUser._id, config.partnerCommission, `Partner Share: ${application.farmerName}`, application.partnerCode);
      }
    }

    // 5. Employee Reward
    if (application.employeeCode) {
      const employeeUser = await User.findOne({ employeeCode: application.employeeCode });
      if (employeeUser) {
        await updateWalletAndLog(employeeUser._id, config.employeeCommission, `Agent Reward: ${application.farmerName}`, application.employeeCode);
      }
    }

    return NextResponse.json({ success: true, message: 'Financial ledger updated successfully.' });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

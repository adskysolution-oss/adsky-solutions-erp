import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Job from '@/models/Job';
import Subscription from '@/models/Subscription';
import Application from '@/models/Application';

export async function GET(req) {
  try {
    // Basic auth logic can be implemented here if needed using JWT
    // Currently removing next-auth as it is not installed

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'users', 'jobs', 'earnings'

    await connectToDatabase();

    let data = [];
    if (type === 'users') {
      data = await User.find({}, '-password').sort('-createdAt').limit(100);
    } else if (type === 'jobs') {
      data = await Job.find().populate('employerId', 'name email').sort('-createdAt');
    } else if (type === 'earnings') {
      data = await Subscription.find({ status: 'ACTIVE' }).populate('employerId', 'name email').sort('-createdAt');
    } else if (type === 'applications') {
        data = await Application.find().populate('jobId', 'title').populate('candidateId', 'name email').sort('-createdAt');
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';
import { authorize, rbacResponse } from '@/lib/security/rbac';

export async function GET(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const partnerCode = searchParams.get('partnerCode');

  try {
    await connectToDatabase();
    const query = {};
    if (status) query.applicationStatus = status;
    if (partnerCode) query.partnerCode = partnerCode;

    const applications = await Application.find(query).sort({ createdAt: -1 }).limit(200);

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve mission stream' }, { status: 500 });
  }
}

export async function PATCH(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  try {
    await connectToDatabase();
    const { id, status, remarks } = await req.json();
    const updated = await Application.findByIdAndUpdate(
      id, 
      { applicationStatus: status, adminRemarks: remarks }, 
      { new: true }
    );
    
    if (!updated) {
       return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Mission node updated', submission: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Mission update failed' }, { status: 500 });
  }
}


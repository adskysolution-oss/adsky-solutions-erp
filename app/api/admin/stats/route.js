import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Employee from '@/models/Employee';
import Lead from '@/models/Lead';
import Project from '@/models/Project';

export async function GET() {
  try {
    await connectToDatabase();

    // Get counts
    const totalEmployees = await User.countDocuments({ role: { $in: ['admin', 'manager', 'sales', 'support'] } });
    const activeEmployees = await User.countDocuments({ role: { $in: ['admin', 'manager', 'sales', 'support'] }, status: 'active' });
    
    const totalLeads = await Lead.countDocuments();
    const pendingLeads = await Lead.countDocuments({ status: { $in: ['new', 'contacted'] } });
    const noResponseLeads = await Lead.countDocuments({ status: 'not_interested' }); // Adjusted for demo
    
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const soldProjects = await Project.countDocuments({ status: 'sold' });

    const totalCandidates = await User.countDocuments({ role: 'candidate' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayApplied = 0; // Would query Job Applications model when created

    // Mock revenue for now (as we haven't integrated payments DB yet)
    const revenue = {
      total: 526000,
      monthly: 110000,
      today: 12500
    };

    return NextResponse.json({
      success: true,
      employees: { total: totalEmployees, active: activeEmployees },
      leads: { total: totalLeads, pending: pendingLeads, noResponse: noResponseLeads },
      projects: { total: totalProjects, active: activeProjects, sold: soldProjects, pending: totalProjects - activeProjects - soldProjects },
      candidates: { total: totalCandidates, todayApplied },
      revenue
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

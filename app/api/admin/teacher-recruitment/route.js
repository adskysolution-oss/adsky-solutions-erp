import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeacherRecruitment from "@/models/TeacherRecruitment";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const post = searchParams.get("post") || "";
    const payment = searchParams.get("payment") || "Paid"; // Default show paid

    let query = {};

    if (search) {
      query.$or = [
        { full_name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { application_id: { $regex: search, $options: "i" } }
      ];
    }
    
    if (state) {
      query.state = state;
    }
    
    if (post) {
      query.post_applied = post;
    }
    
    if (payment) {
      query.payment_status = payment;
    }

    const applications = await TeacherRecruitment.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error("Fetch Admin Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

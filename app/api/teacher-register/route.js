import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeacherRecruitment from "@/models/TeacherRecruitment";

// Cashfree REST API - no SDK needed, works perfectly on Vercel
const CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg";
const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID || "TEST10477006857ea2687a4ba7ff664960077401";
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET || "cfsk_ma_test_0be9ce069c9b4e6b9a8f4c2e5d9a9b4e_9a8f4c2e";

async function createCashfreeOrder(orderRequest) {
  const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": CASHFREE_CLIENT_ID,
      "x-client-secret": CASHFREE_CLIENT_SECRET,
    },
    body: JSON.stringify(orderRequest),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cashfree API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.formData();

    // Document upload - convert to Base64 for MongoDB storage
    const photo = data.get("photo");
    let photoUrl = "";
    if (photo && typeof photo !== "string") {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      photoUrl = `data:${photo.type};base64,${buffer.toString("base64")}`;
    } else {
      return NextResponse.json({ error: "Document upload is required." }, { status: 400 });
    }

    // Prepare application data
    const applicationData = {
      full_name: data.get("fullName"),
      father_name: data.get("fatherName"),
      gender: data.get("gender"),
      dob: data.get("dob"),
      mobile: data.get("mobile"),
      whatsapp: data.get("whatsapp"),
      email: data.get("email"),
      state: data.get("state"),
      district: data.get("district"),
      address: data.get("address"),
      post_applied: data.get("postApplied"),
      subject: data.get("subject"),
      qualification: data.get("qualification"),
      specialization: data.get("specialization"),
      passing_year: data.get("passingYear"),
      experience: data.get("experience"),
      organization_name: data.get("organizationName") || null,
      photo_url: photoUrl,
      declaration_accepted: true,
      amount: 100.0,
      payment_status: "Pending",
    };

    // Save to MongoDB (Pending status)
    const newRecord = await TeacherRecruitment.create(applicationData);
    const orderId = `TCH_${newRecord._id.toString().slice(-8)}_${Date.now()}`;

    // Create Cashfree order via REST API directly
    const orderRequest = {
      order_amount: 100.0,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: newRecord._id.toString(),
        customer_phone: applicationData.mobile,
        customer_name: applicationData.full_name,
        customer_email: applicationData.email,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.adskysolution.com"}/teacherrecruitmentform/success?order_id={order_id}`,
      },
    };

    const cashfreeOrder = await createCashfreeOrder(orderRequest);

    newRecord.cashfree_order_id = orderId;
    await newRecord.save();

    return NextResponse.json({
      success: true,
      order_id: orderId,
      payment_session_id: cashfreeOrder.payment_session_id,
    });
  } catch (error) {
    console.error("Teacher Registration Error:", error);
    return NextResponse.json(
      { error: "Failed to process application. " + error.message },
      { status: 500 }
    );
  }
}

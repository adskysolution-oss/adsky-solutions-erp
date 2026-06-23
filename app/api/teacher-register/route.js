import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeacherRecruitment from "@/models/TeacherRecruitment";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Cashfree SDK
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID?.trim() || process.env.CASHFREE_APP_ID?.trim() || "";
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET?.trim() || process.env.CASHFREE_SECRET_KEY?.trim() || "";
Cashfree.XEnvironment = process.env.CASHFREE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

// Helper: Upload buffer to Cloudinary (supports image, PDF, Word)
function uploadToCloudinary(buffer, mimeType) {
  return new Promise((resolve, reject) => {
    // Images use 'image' resource_type, PDF/Word use 'raw'
    const isImage = mimeType && mimeType.startsWith("image/");
    const resourceType = isImage ? "image" : "raw";

    cloudinary.uploader.upload_stream(
      { folder: "teacher-recruitment", resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.formData();

    // Upload document to Cloudinary (image, PDF, or Word)
    const photo = data.get("photo");
    let photoUrl = "";
    if (photo && typeof photo !== "string") {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer, photo.type);
      photoUrl = result.secure_url;
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

    // Save to MongoDB as Pending first
    const newRecord = await TeacherRecruitment.create(applicationData);
    const orderId = `TCH_${newRecord._id.toString().slice(-8)}_${Date.now()}`;

    const hasCashfreeKeys = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID;

    if (!hasCashfreeKeys) {
      // Mock for local dev testing
      newRecord.cashfree_order_id = orderId;
      await newRecord.save();
      return NextResponse.json({
        success: true,
        order_id: orderId,
        payment_session_id: "session_mock_12345",
      });
    }

    // Create real Cashfree order
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

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);

    newRecord.cashfree_order_id = orderId;
    await newRecord.save();

    return NextResponse.json({
      success: true,
      order_id: orderId,
      payment_session_id: response.data.payment_session_id,
    });
  } catch (error) {
    console.error("Teacher Registration Error:", error);
    return NextResponse.json({ error: "Failed to process application. " + error.message }, { status: 500 });
  }
}

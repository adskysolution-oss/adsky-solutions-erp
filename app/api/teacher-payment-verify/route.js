import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeacherRecruitment from "@/models/TeacherRecruitment";
import { Cashfree, CFEnvironment } from "cashfree-pg";

// Initialize Cashfree SDK
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID?.trim() || process.env.CASHFREE_APP_ID?.trim() || "";
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET?.trim() || process.env.CASHFREE_SECRET_KEY?.trim() || "";
Cashfree.XEnvironment = process.env.CASHFREE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

export async function POST(req) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json({ error: "Order ID missing" }, { status: 400 });
    }

    await connectDB();
    const record = await TeacherRecruitment.findOne({ cashfree_order_id: order_id });

    if (!record) {
      return NextResponse.json({ error: "Order not found in DB" }, { status: 404 });
    }

    // Already verified
    if (record.payment_status === "Paid") {
      return NextResponse.json({ status: "Paid", application_id: record.application_id });
    }

    const hasCashfreeKeys = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID;

    // Mock verification for local/dev testing
    if (!hasCashfreeKeys) {
      record.payment_status = "Paid";
      const count = await TeacherRecruitment.countDocuments({ payment_status: "Paid" });
      record.application_id = `TCH2026${String(1000 + count + 1).padStart(4, "0")}`;
      record.cashfree_payment_id = "mock_payment_" + Date.now();
      await record.save();
      return NextResponse.json({ status: "Paid", application_id: record.application_id });
    }

    // Verify with Cashfree API
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
    const payments = response.data;

    const successfulPayment = Array.isArray(payments)
      ? payments.find((p) => p.payment_status === "SUCCESS")
      : null;

    if (successfulPayment) {
      record.payment_status = "Paid";
      record.cashfree_payment_id = successfulPayment.cf_payment_id?.toString() || "";
      record.transaction_id = successfulPayment.order_id || order_id;

      const count = await TeacherRecruitment.countDocuments({ payment_status: "Paid" });
      record.application_id = `TCH2026${String(1000 + count + 1).padStart(4, "0")}`;

      await record.save();
      return NextResponse.json({ status: "Paid", application_id: record.application_id });
    } else {
      record.payment_status = "Failed";
      await record.save();
      return NextResponse.json({ status: "Failed" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TeacherRecruitment from "@/models/TeacherRecruitment";

// Cashfree REST API - Production
const CASHFREE_BASE_URL = "https://api.cashfree.com/pg";
const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

async function getCashfreeOrderPayments(orderId) {
  const response = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": CASHFREE_CLIENT_ID,
      "x-client-secret": CASHFREE_CLIENT_SECRET,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cashfree verify error ${response.status}: ${errText}`);
  }

  return response.json();
}

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

    // Already verified - return immediately
    if (record.payment_status === "Paid") {
      return NextResponse.json({ status: "Paid", application_id: record.application_id });
    }

    // Verify with Cashfree Production REST API
    const payments = await getCashfreeOrderPayments(order_id);

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
    return NextResponse.json({ error: "Verification failed: " + error.message }, { status: 500 });
  }
}

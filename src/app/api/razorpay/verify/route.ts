import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY)
      .update(body)
      .digest("hex");

    const isVerified = expectedSignature === razorpay_signature;
    
    return NextResponse.json({ message: "OK", isVerified }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

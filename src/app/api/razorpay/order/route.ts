import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
});

interface options {
    amount: number; 
    currency: string;
}

export async function POST(request: NextRequest) {
  const {amount} = await request.json();
  try {
    const options: options = {
        amount: amount*100,
        currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ message: "OK", order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
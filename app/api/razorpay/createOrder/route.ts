// app/api/createOrder/route.ts

import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

interface OrderRequestBody {
  amount: number;
  currency?: string;
  receipt?: string;
  userId: string;
  eventId: string;
}

export async function POST(request: Request) {
  const { amount, currency, receipt, userId, eventId }: OrderRequestBody = await request.json();

  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const options = {
      amount: amount * 100, // Amount in paisa
      currency: currency || 'INR',
      receipt: receipt || 'receipt#1',
      notes: { userId, eventId }, // Add userId to the notes field
    };

    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}

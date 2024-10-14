// app/api/webhook/route.ts

import { createOrder } from '@/lib/actions/order.action';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment: {
      entity: {
        notes: {
          userId: string;
          eventId: string;
        };
        [key: string]: any;
      };
    };
  };
}

export async function POST(request: Request) {
    console.log('hehehehehehehehehehehe')
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
    const signature = request.headers.get('x-razorpay-signature') as string;
    const rawBody = await request.text();

    // Validate webhook signature
    const hash = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    if (hash === signature) {
      const event: RazorpayWebhookPayload = JSON.parse(rawBody);

      if (event.event === 'payment.captured') {
        const paymentDetails = event.payload.payment.entity;
        const userId = paymentDetails.notes.userId; 
        const eventId = paymentDetails.notes.eventId;
        // Extract userId from notes
        console.log('Payment Captured:', paymentDetails);
        const order  = {
            razorpayId: paymentDetails.id,
            buyerId: userId,
            eventId: eventId,
            totalAmount: (paymentDetails.amount/100).toString(),
            createdAt: new Date(),
        }

        const newOrder = await createOrder(order)
       return NextResponse.json({message: 'OK', order: newOrder})
     
      }

      return NextResponse.json({ status: 'ok' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  }
}

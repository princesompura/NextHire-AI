import Razorpay from "razorpay";
import { supabase } from "@/services/supabaseClient";

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    // Validate request
    if (!amount || !email) {
      return new Response(JSON.stringify({ error: "Amount and email are required" }), {
        status: 400,
      });
    }

    // Check environment variables
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay environment variables are missing");
      return new Response(JSON.stringify({ error: "Server configuration error: Razorpay keys are missing" }), {
        status: 500,
      });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (e.g., ₹500 = 50000 paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { email },
    });

    return new Response(JSON.stringify({ orderId: order.id }), { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message, error.stack);
    return new Response(JSON.stringify({ error: error.message || "Failed to create order" }), { status: 500 });
  }
}
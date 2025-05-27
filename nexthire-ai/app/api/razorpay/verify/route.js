import Razorpay from "razorpay";
import crypto from "crypto";
import { supabase } from "@/services/supabaseClient";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, creditsToAdd } =
      await req.json();

    // Validate request
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email || !creditsToAdd) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: "Invalid payment signature" }), { status: 400 });
    }

    // Fetch current user credits from Supabase
    const { data: userData, error: fetchError } = await supabase
      .from("Users")
      .select("credits")
      .eq("email", email)
      .single();

    if (fetchError || !userData) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Update user credits
    const newCredits = Number(userData.credits) + Number(creditsToAdd);
    const { error: updateError } = await supabase
      .from("Users")
      .update({ credits: newCredits })
      .eq("email", email);

    if (updateError) {
      return new Response(JSON.stringify({ error: "Failed to update credits" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, newCredits }), { status: 200 });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: "Payment verification failed" }), { status: 500 });
  }
}
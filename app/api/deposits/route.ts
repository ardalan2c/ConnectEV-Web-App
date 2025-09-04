import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Feature gate: only process deposits if Stripe is configured
  const depositsEnabled = process.env.NEXT_PUBLIC_DEPOSITS_ENABLED === "true";
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  if (!depositsEnabled || !stripeKey) {
    return NextResponse.json(
      { error: "Deposits not enabled or Stripe not configured" }, 
      { status: 501 }
    );
  }
  
  // TODO: Implement Stripe payment intent creation
  // const stripe = new Stripe(stripeKey);
  // const paymentIntent = await stripe.paymentIntents.create({...});
  
  return NextResponse.json(
    { error: "Not implemented yet", todo: "Add Stripe integration" }, 
    { status: 501 }
  );
}
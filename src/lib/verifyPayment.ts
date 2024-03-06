export interface Razorpay_response {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
}
export default async function verifyPayment(Razorpay_response: Razorpay_response) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = Razorpay_response;

    const response = await fetch("/api/razorpay/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    });

    if (response.ok) {
      const {isVerified} = await response.json();
      return isVerified as boolean
    }
  } catch (error) {
    console.log(error);
  }
}

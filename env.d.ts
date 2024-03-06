declare global {

  interface Window {
    Razorpay: any
  }

  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET_ID: string;
      RAZORPAY_KEY: string;
      NEXT_PUBLIC_RAZORPAY_ID: string;
      NODE_ENV: "development" | "production";
    }
  }
}
export {}
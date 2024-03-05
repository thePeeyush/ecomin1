declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET_ID: string;
      NODE_ENV: "development" | "production";
    }
  }
}
export {}
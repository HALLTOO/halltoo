import { verifyTurnstile } from "@/lib/security/verifyTurnstile";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password, turnstileToken } = await req.json();
    const ip = headers().get("x-forwarded-for") || "127.0.0.1";

    // 1. Verify Turnstile
    const turnstileResult = await verifyTurnstile(turnstileToken, ip);
    
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ 
        error: turnstileResult.message,
        code: turnstileResult.errorCode 
      }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Mock Registration Logic
    // In a real app, you would validate input and save to DB here
    console.log("Registering user:", email, "from IP:", ip);
    
    // Simulate DB delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return new Response(JSON.stringify({ success: true, userId: "mock-user-id" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

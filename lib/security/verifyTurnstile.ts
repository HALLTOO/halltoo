interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstile(token: string, ip?: string): Promise<{ success: boolean; message?: string; errorCode?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn("TURNSTILE_SECRET_KEY is not set. Skipping verification (dev mode only).");
    return { success: true };
  }

  if (!token) {
    return { success: false, message: "Turnstile token is missing", errorCode: "missing-input-response" };
  }

  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (ip) formData.append("remoteip", ip);

  try {
    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const outcome: TurnstileVerifyResponse = await result.json();

    if (outcome.success) {
      return { success: true };
    }

    // Cloudflare returns "timeout-or-duplicate" for expired tokens
    // We pass this code back so frontend can trigger a reset
    const errorCode = outcome["error-codes"]?.[0] || "unknown-error";
    
    return { 
      success: false, 
      message: "Security check failed", 
      errorCode 
    };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, message: "Internal verification error", errorCode: "internal-error" };
  }
}

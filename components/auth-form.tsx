"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Apple } from "lucide-react";
import { signIn } from "next-auth/react";

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setMessage("EmailJS configuration error");
      console.error("Missing EmailJS configuration");
      return;
    }

    setLoading(true);
    const code = generateCode();
    setSentCode(code);

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          user_email: email,
          email: email,
          verification_code: code,
          to_name: email.split("@")[0],
          message: `Your verification code is: ${code}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setCodeSent(true);
      setMessage("Code sent to your email");
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setMessage(`Failed: ${error.text || error.message || "Try again"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const savedEmail = localStorage.getItem("userEmail");
      const savedPassword = localStorage.getItem("userPassword");

      if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        onSuccess();
      } else {
        setMessage("Incorrect email or password");
      }
    } else {
      if (!codeSent) {
        setMessage("Please send verification code first");
        return;
      }

      if (verificationCode !== sentCode) {
        setMessage("Incorrect verification code");
        return;
      }

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isLoggedIn", "true");
      setMessage("Success!");
      setTimeout(() => onSuccess(), 800);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-black px-6 pb-8 pt-12">
      {/* Top Section - Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-1 items-center justify-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl">
          <Sparkles className="h-10 w-10 text-black" />
        </div>
      </motion.div>

      {/* Bottom Section - Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded-2xl bg-zinc-900 px-4 text-lg text-white placeholder-zinc-500 transition-colors focus:bg-zinc-800 focus:outline-none"
              placeholder="Email address"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 w-full rounded-2xl bg-zinc-900 px-4 text-lg text-white placeholder-zinc-500 transition-colors focus:bg-zinc-800 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          {/* Verification Code (Register only) */}
          {!isLogin && (
            <div className="flex gap-2">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="h-14 flex-1 rounded-2xl bg-zinc-900 px-4 text-lg text-white placeholder-zinc-500 transition-colors focus:bg-zinc-800 focus:outline-none"
                placeholder="Verification code"
                required
              />
              <motion.button
                type="button"
                onClick={sendVerificationEmail}
                disabled={loading || codeSent}
                whileTap={{ scale: 0.95 }}
                className="h-14 rounded-2xl bg-zinc-800 px-6 text-base font-semibold text-white transition-colors active:bg-zinc-700 disabled:opacity-50"
              >
                {loading ? "..." : codeSent ? "Sent" : "Send"}
              </motion.button>
            </div>
          )}

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl px-4 py-3 text-sm ${
                message.includes("Success") || message.includes("sent")
                  ? "bg-green-900/30 text-green-400"
                  : "bg-red-900/30 text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="h-14 w-full rounded-2xl bg-white text-lg font-bold text-black transition-all active:bg-gray-200"
          >
            Continue
          </motion.button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-3 text-zinc-500">OR</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <motion.button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              whileTap={{ scale: 0.95 }}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white border border-gray-300 text-base font-semibold text-gray-700 transition-colors active:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-zinc-900 text-base font-semibold text-white transition-colors active:bg-zinc-800"
            >
              <Apple className="h-5 w-5" />
              Continue with Apple
            </motion.button>
          </div>
        </form>

        {/* Toggle Login/Register */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setCodeSent(false);
              setVerificationCode("");
            }}
            className="text-base text-zinc-400 active:text-white"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-600">
          <a href="#" className="active:text-zinc-400">Terms of use</a>
          {" · "}
          <a href="#" className="active:text-zinc-400">Privacy policy</a>
        </div>
      </motion.div>
    </div>
  );
}

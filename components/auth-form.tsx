"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { AnimatedLogo } from "./animated-logo";

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
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[440px] space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <AnimatedLogo size={48} />
            <h1 className="text-2xl font-semibold text-gray-900">Halltoo</h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-gray-900">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {isLogin ? "Sign in to continue to Halltoo" : "Get started with Halltoo"}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-gray-400 focus:outline-none focus:ring-0"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-gray-400 focus:outline-none focus:ring-0"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Verification Code (Register only) */}
            {!isLogin && (
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification code
                </label>
                <div className="flex gap-2">
                  <input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="h-11 flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Enter code"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={sendVerificationEmail}
                    disabled={loading || codeSent}
                    whileTap={{ scale: 0.98 }}
                    className="h-11 rounded-lg border border-gray-200 bg-white px-5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    {loading ? "..." : codeSent ? "Sent" : "Send"}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg px-4 py-3 text-sm ${
                  message.includes("Success") || message.includes("sent")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="h-11 w-full rounded-lg bg-black text-sm font-medium text-white transition-all hover:bg-gray-800"
            >
              Continue
            </motion.button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <motion.button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/" })}
                whileTap={{ scale: 0.98 }}
                className="flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-black text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </motion.button>
            </div>
          </motion.form>

          {/* Toggle Login/Register */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
                setCodeSent(false);
                setVerificationCode("");
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-xs text-gray-400"
          >
            <a href="#" className="hover:text-gray-600">Terms of use</a>
            {" · "}
            <a href="#" className="hover:text-gray-600">Privacy policy</a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Animation */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Large Animated Logo */}
          <div className="relative z-10">
            <AnimatedLogo size={320} />
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-200 to-blue-300 opacity-20 blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-300 opacity-20 blur-2xl"
          />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              AI-Powered Conversations
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Experience the future of intelligent assistance with advanced AI models
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

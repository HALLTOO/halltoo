"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail } from "lucide-react";

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
      setMessage("Verification code sent to your email");
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setMessage(`Failed to send: ${error.text || error.message || "Please try again"}`);
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
      setMessage("Registration successful!");
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[320px] space-y-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex justify-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10A37F] shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#10A37F] focus:outline-none focus:ring-1 focus:ring-[#10A37F] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#10A37F] focus:outline-none focus:ring-1 focus:ring-[#10A37F] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Verification Code (Register only) */}
        {!isLogin && (
          <div>
            <label htmlFor="code" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Verification code
            </label>
            <div className="flex gap-2">
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="h-12 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#10A37F] focus:outline-none focus:ring-1 focus:ring-[#10A37F] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                placeholder="Enter code"
                required
              />
              <button
                type="button"
                onClick={sendVerificationEmail}
                disabled={loading || codeSent}
                className="h-12 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {loading ? "..." : codeSent ? "Sent" : "Send"}
              </button>
            </div>
          </div>
        )}

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-md px-3 py-2 text-xs ${
              message.includes("success") || message.includes("sent")
                ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Continue Button */}
        <button
          type="submit"
          className="h-12 w-full rounded-md bg-[#10A37F] text-sm font-medium text-white transition-all hover:bg-[#0d8c6d] focus:outline-none focus:ring-2 focus:ring-[#10A37F] focus:ring-offset-2"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500 dark:bg-black dark:text-gray-400">OR</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Mail className="h-4 w-4" />
          Continue with Google
        </button>
      </motion.form>

      {/* Toggle Login/Register */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-center"
      >
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
            setCodeSent(false);
            setVerificationCode("");
          }}
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-center text-xs text-gray-400"
      >
        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Terms of use</a>
        {" | "}
        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy policy</a>
      </motion.div>
    </motion.div>
  );
}

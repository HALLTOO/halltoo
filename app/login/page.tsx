"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async () => {
    if (!email) {
      setMessage("请输入邮箱地址");
      return;
    }

    // 检查环境变量
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setMessage("EmailJS 配置错误，请联系管理员");
      console.error("Missing EmailJS configuration");
      return;
    }

    setLoading(true);
    const code = generateCode();
    setSentCode(code);

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          verification_code: code,
          to_name: email.split("@")[0],
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);
      setCodeSent(true);
      setMessage("验证码已发送到您的邮箱");
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setMessage(`发送失败: ${error.text || error.message || "请检查邮箱地址或稍后重试"}`);
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
        router.push("/");
      } else {
        setMessage("邮箱或密码错误");
      }
    } else {
      if (!codeSent) {
        setMessage("请先发送验证码");
        return;
      }

      if (verificationCode !== sentCode) {
        setMessage("验证码错误");
        return;
      }

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isLoggedIn", "true");
      setMessage("注册成功！");
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          {isLogin ? "登录" : "注册"} Halltoo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              邮箱地址
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                验证码
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="输入验证码"
                  required
                />
                <button
                  type="button"
                  onClick={sendVerificationEmail}
                  disabled={loading || codeSent}
                  className="rounded-lg bg-gray-800 px-6 py-3 text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
                >
                  {loading ? "发送中..." : codeSent ? "已发送" : "发送"}
                </button>
              </div>
            </div>
          )}

          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                message.includes("成功") || message.includes("已发送")
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            {isLogin ? "登录" : "注册"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setCodeSent(false);
              setVerificationCode("");
            }}
            className="text-sm text-gray-600 hover:text-black"
          >
            {isLogin ? "还没有账号？立即注册" : "已有账号？立即登录"}
          </button>
        </div>
      </div>
    </div>
  );
}

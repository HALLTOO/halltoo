"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  const handleSuccess = () => {
    router.push("/");
  };

  if (!mounted) return null;

  return <AuthForm onSuccess={handleSuccess} />;
}

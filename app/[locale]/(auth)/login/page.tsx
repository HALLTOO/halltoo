"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Apple, Eye, EyeOff, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const loginSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  password: z.string().min(8, { message: "密码至少需要 8 个字符" }),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const router = useRouter()
  const turnstileRef = useRef<TurnstileInstance>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    if (!turnstileToken) {
      alert("Please complete the security check")
      return
    }

    setIsLoading(true)
    // 模拟 API 请求
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Login submitted:", data, "Token:", turnstileToken)
    setIsLoading(false)
    router.push("/app")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLockOn(true)
    } else {
      setCapsLockOn(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Apple-style spring/ease
        className="w-full max-w-[420px]"
      >
        <Card className="glass w-full rounded-2xl border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <CardTitle className="text-2xl font-semibold tracking-tight">
                登录 halltoo
              </CardTitle>
              <CardDescription className="text-muted-foreground/80 mt-2">
                请输入您的账号与密码以继续
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-[0.98]">
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-[0.98]">
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Google
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/50 px-2 text-muted-foreground backdrop-blur-sm">
                  Or continue with
                </span>
              </div>
            </motion.div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            className="rounded-xl border-white/10 bg-white/5 focus-visible:ring-primary/50 transition-all duration-300 focus:scale-[1.01]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <AnimatePresence>
                            {capsLockOn && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="text-xs text-yellow-500 font-medium"
                              >
                                Caps Lock is on
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="rounded-xl border-white/10 bg-white/5 pr-10 focus-visible:ring-primary/50 transition-all duration-300 focus:scale-[1.01]"
                              onKeyDown={handleKeyDown}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword((prev) => !prev)}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:text-primary/90 hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex justify-center py-2">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                      ref={turnstileRef}
                      onSuccess={setTurnstileToken}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-white/10 p-6 bg-white/5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-center text-sm text-muted-foreground"
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:text-primary/90 hover:underline transition-colors"
              >
                Sign up
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

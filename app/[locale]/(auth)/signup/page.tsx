"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "@/i18n/routing"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2, Sparkles, CheckCircle2, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useLocale } from "next-intl"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  
  const locale = useLocale()
  const router = useRouter()
  const turnstileRef = useRef<TurnstileInstance>(null)
  const { toast } = useToast()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    if (!turnstileToken) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          turnstileToken
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.code === "timeout-or-duplicate") {
           toast({
             variant: "destructive",
             title: "Verification expired",
             description: "Please verify you are human again."
           })
           turnstileRef.current?.reset()
           setTurnstileToken(null)
        } else {
           throw new Error(result.error || "Registration failed")
        }
        return
      }

      router.push("/app")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:w-[45%] xl:w-[40%]">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl w-fit mx-auto md:mx-0 mb-6">
              <div className="bg-primary text-primary-foreground p-1 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              halltoo
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} className="h-11" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-11 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                  ref={turnstileRef}
                  onSuccess={setTurnstileToken}
                  options={{
                    theme: 'auto',
                    language: locale === 'zh' ? 'zh-cn' : 'en',
                  }}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11" 
                disabled={isLoading || !turnstileToken}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </form>
          </Form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
          
          <div className="text-center text-sm">
             Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Poster */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-zinc-900">
           {/* Gradient Background */}
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow" />
           <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
           
           <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
             <div className="space-y-6 mt-20">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="space-y-2"
               >
                 <h2 className="text-4xl font-bold tracking-tight">Unlock Infinite Possibilities</h2>
                 <p className="text-lg text-zinc-400">Join thousands of developers and teams building the future with halltoo.</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 className="space-y-4"
               >
                 {[
                   "Access GPT-4, Claude 3.5, and Gemini Pro in one place",
                   "Enterprise-grade security and data privacy",
                   "Seamless collaboration features for teams"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                       <CheckCircle2 className="h-3.5 w-3.5" />
                     </div>
                     <span className="text-zinc-300">{item}</span>
                   </div>
                 ))}
               </motion.div>
             </div>

             {/* Mock Chat Window */}
             <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="relative mx-auto w-full max-w-md"
             >
               <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl p-4 space-y-4">
                 <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                   <div className="h-3 w-3 rounded-full bg-red-500/80" />
                   <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                   <div className="h-3 w-3 rounded-full bg-green-500/80" />
                 </div>
                 <div className="space-y-3">
                   <div className="flex gap-3 items-start">
                      <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">U</div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 text-sm text-zinc-300">
                        Help me write a Python script for data analysis.
                      </div>
                   </div>
                   <div className="flex gap-3 items-start flex-row-reverse">
                      <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl rounded-tr-none p-3 text-sm text-zinc-300">
                        Certainly! Here's a script using pandas to analyze your dataset...
                      </div>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
        </div>
      </div>
    </div>
  )
}

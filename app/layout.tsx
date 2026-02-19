import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "halltoo - Unified AI Chat Workspace",
  description: "Access OpenAI, Claude, Gemini, and DeepSeek in one powerful, unified interface designed for teams and power users.",
  openGraph: {
    title: "halltoo - Unified AI Chat Workspace",
    description: "Access OpenAI, Claude, Gemini, and DeepSeek in one powerful, unified interface designed for teams and power users.",
    type: "website",
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased bg-noise`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

import { motion } from "framer-motion"
import { Check, Shield, Lock, Server, EyeOff, FileText, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SecurityPage() {
  return (
    <div className="container max-w-5xl py-24 px-4 mx-auto space-y-24">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
          Security First. Always.
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We process millions of tokens daily. Our commitment to your data privacy and security is absolute.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Shield className="w-8 h-8 text-primary" />, title: "Zero Training", desc: "We explicitly opt-out of model training. Your data never improves public models." },
          { icon: <Lock className="w-8 h-8 text-blue-500" />, title: "Encryption", desc: "AES-256 at rest. TLS 1.3 in transit. Keys rotated daily." },
          { icon: <Server className="w-8 h-8 text-green-500" />, title: "Isolation", desc: "Logical separation of tenant data with strict access controls." }
        ].map((item, i) => (
          <Card key={i} className="bg-secondary/5 border-border/40 backdrop-blur-sm">
            <CardHeader>
              <div className="mb-4 bg-background/50 w-fit p-3 rounded-xl border border-border/50 shadow-sm">{item.icon}</div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription className="text-base">{item.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Data Handling */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Data Handling Practices</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-muted-foreground" /> Data Privacy
            </h3>
            <ul className="space-y-4">
              {["No data is sold to third parties", "Staff access is restricted and logged", "Data retention is configurable (30-365 days)", "Automated PII redaction available"].map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" /> Compliance
            </h3>
            <ul className="space-y-4">
              {["SOC 2 Type II Certified (In Progress)", "GDPR & CCPA Compliant", "HIPAA BAA Available (Enterprise)", "Regular 3rd-party Pen Tests"].map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Subprocessors */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Subprocessors</h2>
        <Card className="overflow-hidden border-border/40">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Vercel", purpose: "Hosting & Edge Functions", loc: "Global" },
                { name: "Supabase", purpose: "Database & Auth", loc: "US East (AWS)" },
                { name: "OpenAI", purpose: "LLM Provider", loc: "US" },
                { name: "Anthropic", purpose: "LLM Provider", loc: "US" },
                { name: "Stripe", purpose: "Payment Processing", loc: "Global" },
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell className="text-muted-foreground">{row.loc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Contact */}
      <div className="bg-secondary/10 rounded-2xl p-8 md:p-12 text-center space-y-6 border border-border/40">
        <h3 className="text-2xl font-bold">Security Contacts</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you believe you have found a security vulnerability in halltoo, please report it to our security team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-background px-6 py-3 rounded-lg border border-border/50 font-mono text-sm">
            security@halltoo.com
          </div>
          <div className="bg-background px-6 py-3 rounded-lg border border-border/50 font-mono text-sm">
            PGP Key ID: 0x4A2B9C
          </div>
        </div>
      </div>
    </div>
  )
}

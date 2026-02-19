import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ChangelogItemProps {
  date: string
  version: string
  title: string
  description: string
  tags: string[]
}

const changelogData: ChangelogItemProps[] = [
  {
    date: "February 12, 2026",
    version: "v1.4.0",
    title: "DeepSeek V3 Integration & Streaming Improvements",
    description: "Added full support for DeepSeek V3 model with optimized token handling. Reduced time-to-first-token by 40% across all providers through improved edge caching.",
    tags: ["Models", "Performance"],
  },
  {
    date: "January 28, 2026",
    version: "v1.3.2",
    title: "Team Workspaces Beta",
    description: "Collaborate on prompts and share chat sessions with your team. Added granular role-based access control (RBAC) for organization admins.",
    tags: ["Team", "Beta"],
  },
  {
    date: "January 15, 2026",
    version: "v1.3.0",
    title: "Prompt Library & Variables",
    description: "Create, save, and version your best prompts. Support for {{variables}} allows for dynamic prompt templates that can be reused across different contexts.",
    tags: ["Features", "DX"],
  },
  {
    date: "December 20, 2025",
    version: "v1.2.5",
    title: "Dark Mode 2.0 & UI Refresh",
    description: "Complete overhaul of the dark mode color palette for better contrast and reduced eye strain. Updated component library to shadcn/ui base.",
    tags: ["Design", "UX"],
  },
  {
    date: "December 05, 2025",
    version: "v1.2.0",
    title: "Enterprise SSO & Audit Logs",
    description: "Added support for SAML 2.0 and OIDC authentication. Enterprise customers can now access detailed audit logs for compliance and security monitoring.",
    tags: ["Security", "Enterprise"],
  },
  {
    date: "November 18, 2025",
    version: "v1.1.0",
    title: "Gemini Pro 1.5 Support",
    description: "Integrated Google's Gemini Pro 1.5 with 1M token context window. Perfect for analyzing large documents and codebases.",
    tags: ["Models"],
  },
]

export default function ChangelogPage() {
  return (
    <div className="container max-w-4xl py-24 px-4 mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Changelog</h1>
        <p className="text-muted-foreground text-lg">
          New updates and improvements to halltoo.
        </p>
      </div>

      <div className="relative border-l border-border/40 ml-4 md:ml-0 space-y-12">
        {changelogData.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-0">
            {/* Timeline dot */}
            <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-primary border-4 border-background ring-1 ring-border" />
            
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
              <div className="text-sm text-muted-foreground md:text-right pt-1">
                <div className="font-medium text-foreground">{item.date}</div>
                <div className="font-mono text-xs opacity-70">{item.version}</div>
              </div>
              
              <div className="space-y-3 pb-8 border-b border-border/40 last:border-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal bg-secondary/50 backdrop-blur-sm border-border/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

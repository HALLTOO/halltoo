import { motion } from "framer-motion"
import { Check, X, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function StatusPage() {
  const incidents = [
    { date: "Oct 12", title: "API Degradation (OpenAI)", status: "resolved", desc: "Resolved issue with high latency for GPT-4o requests." },
    { date: "Sep 28", title: "Scheduled Maintenance", status: "completed", desc: "Database optimization completed successfully." },
    { date: "Sep 15", title: "Login Issues", status: "resolved", desc: "Fixed intermittent login failures for Google Auth." },
  ]

  const systems = [
    { name: "Core API", status: "operational" },
    { name: "Web Interface", status: "operational" },
    { name: "Database", status: "operational" },
    { name: "OpenAI Gateway", status: "operational" },
    { name: "Anthropic Gateway", status: "degraded" },
    { name: "Gemini Gateway", status: "operational" },
    { name: "DeepSeek Gateway", status: "operational" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tight">All Systems Operational</h1>
        </div>
        <div className="text-sm text-muted-foreground flex gap-2 items-center">
          Last updated: {new Date().toLocaleTimeString()}
          <Badge variant="outline" className="ml-2 font-mono text-xs">REFRESH</Badge>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((sys, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-secondary/5 rounded-xl border border-border/40 hover:bg-secondary/10 transition-colors">
            <span className="font-medium">{sys.name}</span>
            <div className="flex items-center gap-2 text-sm font-medium">
              {sys.status === "operational" ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Operational</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-yellow-500">Degraded</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Incident History */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold">Past Incidents</h2>
        <div className="relative border-l border-border/40 ml-2 space-y-8 pl-8">
          {incidents.map((inc, i) => (
            <div key={i} className="relative">
              <div className={`absolute left-[-37px] top-1 h-4 w-4 rounded-full border-4 border-background ring-1 ${inc.status === 'resolved' || inc.status === 'completed' ? 'bg-green-500 ring-green-500/20' : 'bg-yellow-500 ring-yellow-500/20'}`} />
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-lg">{inc.title}</h3>
                  <span className="text-sm text-muted-foreground font-mono">{inc.date}</span>
                </div>
                <p className="text-muted-foreground text-sm">{inc.desc}</p>
                <div className="flex gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/60 pt-1">
                  {inc.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
